import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GoldButton from "../components/GoldButton";
import {
  createBooking,
  initiateMpesaPayment,
  checkPaymentStatus,
} from "../api";
import axios from "axios";
import "./Booking.css";
import { Link } from "react-router-dom";
import { createBooking, initiateMpesaPayment, checkPaymentStatus } from "../api";

// Hairstyle prices in KES
const servicePrices = {
  Cornrows: 1500,
  Twists: 1800,
  "Barrel Twists": 2000,
  "Senegalese Twists": 2200,
  "Box Braids": 2500,
  "Locs (Dreadlocks)": 3000,
  "Faux Locs": 2800,
  "Goddess Locs": 3500,
  "Knotless Braids": 2700,
  "Feed-in Braids": 2300,
  "Fulani Braids": 2600,
  "Crochet Braids": 2400,
};

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: new Date(),
    time: "",
    service: "Cornrows",
  });
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fetchingSlots, setFetchingSlots] = useState(false);

  // Deposit modal states
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [selectedServicePrice, setSelectedServicePrice] = useState(
    servicePrices["Cornrows"],
  );
  const [depositAmount, setDepositAmount] = useState(
    servicePrices["Cornrows"] * 0.1,
  );
  const [remainingAmount, setRemainingAmount] = useState(
    servicePrices["Cornrows"] * 0.9,
  );
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(""); // idle, processing, success, failed
  const [checkoutRequestId, setCheckoutRequestId] = useState("");

  const services = Object.keys(servicePrices);

  // Update price when service changes
  useEffect(() => {
    const price = servicePrices[formData.service] || 1500;
    setSelectedServicePrice(price);
    setDepositAmount(price * 0.1);
    setRemainingAmount(price * 0.9);
  }, [formData.service]);

  // Fetch booked slots when date changes
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!formData.date) return;
      setFetchingSlots(true);
      try {
        const dateStr = formData.date.toISOString().split("T")[0];
        const response = await axios.get(
          `https://stylebymk-back.onrender.com/api/bookings/slots/${dateStr}`,
        );
        setAvailableTimes(response.data.availableTimes || []);
        if (
          formData.time &&
          !response.data.availableTimes.includes(formData.time)
        ) {
          setFormData((prev) => ({ ...prev, time: "" }));
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
        setAvailableTimes([]);
      } finally {
        setFetchingSlots(false);
      }
    };
    fetchBookedSlots();
  }, [formData.date]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date, time: "" });
  };

  // Open deposit modal instead of direct booking
  const handleOpenDepositModal = (e) => {
    e.preventDefault();
    if (!formData.time) {
      setMessage({
        type: "error",
        text: "Please select an available time slot.",
      });
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    setShowDepositModal(true);
  };

  // Initiate M-Pesa payment
  const handleInitiatePayment = async () => {
    setPaymentProcessing(true);
    setPaymentStatus("processing");

    try {
      // Format phone number (254XXXXXXXXX)
      let phoneNumber = formData.phone.replace(/\D/g, "");
      if (phoneNumber.startsWith("0")) {
        phoneNumber = "254" + phoneNumber.substring(1);
      }
      if (!phoneNumber.startsWith("254")) {
        phoneNumber = "254" + phoneNumber;
      }

      const paymentData = {
        phoneNumber: phoneNumber,
        amount: Math.round(depositAmount), // Round to nearest KES
        accountReference: `DEP${Date.now()}`,
        transactionDesc: `Deposit for ${formData.service}`,
        bookingData: formData,
        totalAmount: selectedServicePrice,
        depositAmount: depositAmount,
        remainingAmount: remainingAmount,
      };

      const response = await initiateMpesaPayment(paymentData);

      if (response.success) {
        setCheckoutRequestId(response.checkoutRequestID);
        // Start polling for payment status
        pollPaymentStatus(response.checkoutRequestID);
      } else {
        setPaymentStatus("failed");
        setMessage({
          type: "error",
          text: response.message || "Payment initialization failed",
        });
        setPaymentProcessing(false);
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentStatus("failed");
      setMessage({
        type: "error",
        text: "Failed to initiate payment. Please try again.",
      });
      setPaymentProcessing(false);
    }
  };

  // Poll payment status
  const pollPaymentStatus = async (checkoutRequestId) => {
    const maxAttempts = 30; // 30 seconds
    let attempts = 0;

    const interval = setInterval(async () => {
      attempts++;
      try {
        const statusResponse = await checkPaymentStatus(checkoutRequestId);

        if (statusResponse.success && statusResponse.resultCode === 0) {
          // Payment successful
          clearInterval(interval);
          setPaymentStatus("success");
          // Now create the booking with payment info
          await finalizeBookingWithPayment(statusResponse);
        } else if (
          statusResponse.resultCode &&
          statusResponse.resultCode !== 0
        ) {
          // Payment failed
          clearInterval(interval);
          setPaymentStatus("failed");
          setMessage({
            type: "error",
            text: statusResponse.resultDesc || "Payment failed",
          });
          setPaymentProcessing(false);
        }

        if (attempts >= maxAttempts) {
          clearInterval(interval);
          if (paymentStatus !== "success") {
            setPaymentStatus("failed");
            setMessage({
              type: "error",
              text: "Payment timeout. Please try again.",
            });
            setPaymentProcessing(false);
          }
        }
      } catch (error) {
        console.error("Status check error:", error);
        if (attempts >= maxAttempts) {
          clearInterval(interval);
          setPaymentStatus("failed");
          setPaymentProcessing(false);
        }
      }
    }, 2000);
  };

  // Finalize booking after successful payment
  const finalizeBookingWithPayment = async (paymentData) => {
    try {
      const bookingPayload = {
        ...formData,
        depositPaid: true,
        depositAmount: depositAmount,
        totalAmount: selectedServicePrice,
        remainingAmount: remainingAmount,
        mpesaReceiptNumber: paymentData.mpesaReceiptNumber,
        transactionId: paymentData.transactionId,
        paymentStatus: "completed",
      };

      const response = await createBooking(bookingPayload);

      setMessage({
        type: "success",
        text: `Booking confirmed! Deposit of KES ${depositAmount} paid. Remaining KES ${remainingAmount} to pay at salon. Check your email.`,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        date: new Date(),
        time: "",
        service: "Cornrows",
      });
      setShowDepositModal(false);
      setPaymentProcessing(false);

      setTimeout(() => setMessage(""), 8000);
    } catch (error) {
      console.error("Booking creation error:", error);
      setMessage({
        type: "error",
        text: "Payment received but booking failed. Please contact support.",
      });
      setPaymentProcessing(false);
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>
          Book Your <span className="gold-text">Hairstyle</span>
        </h1>
        <p>Reserve your spot for a transformative hairstyling session</p>
      </div>

      <div className="booking-form-container">
        <form onSubmit={handleOpenDepositModal} className="booking-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone Number (for M-Pesa payment)</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="0712345678"
              required
            />
          </div>

          <div className="form-group">
            <label>Select Date</label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              minDate={new Date()}
              className="date-picker"
              required
            />
          </div>

          <div className="form-group">
            <label>Select Time</label>
            {fetchingSlots ? (
              <p style={{ color: "#D4AF37" }}>Loading available times...</p>
            ) : (
              <div className="time-slots">
                {availableTimes.length === 0 ? (
                  <p style={{ color: "#ff6b6b" }}>
                    No available slots for this date. Please choose another day.
                  </p>
                ) : (
                  <div className="time-buttons">
                    {availableTimes.map((time) => (
                      <button
                        key={time}
                        type="button"
                        className={`time-slot-btn ${formData.time === time ? "selected" : ""}`}
                        onClick={() => setFormData({ ...formData, time })}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Select Hairstyle</label>
            <select
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              {services.map((service) => (
                <option key={service} value={service}>
                  {service} - KES {servicePrices[service]}
                </option>
              ))}
            </select>
          </div>

          <div className="price-summary">
            <p>
              Total Price:{" "}
              <strong className="gold-text">KES {selectedServicePrice}</strong>
            </p>
            <p>
              Deposit (10%):{" "}
              <strong className="gold-text">KES {depositAmount}</strong>
            </p>
            <p>
              Pay at Salon:{" "}
              <strong className="gold-text">KES {remainingAmount}</strong>
            </p>
          </div>

          <GoldButton
            type="submit"
            disabled={loading || !formData.time || fetchingSlots}
          >
            {loading ? "Processing..." : "Proceed to Deposit"}
          </GoldButton>
          <li className="cancel">
            <Link to="/cancel" className="cancel-link">
              Cancel Booking ✕
            </Link>
          </li>

          {message && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}
        </form>
      </div>

      {/* Deposit Payment Modal - FIXED VERSION */}
      {showDepositModal && (
        <div className="modal-overlay">
          <div className="deposit-modal">
            <h2>Complete Your Deposit</h2>
            <div className="modal-details">
              <p>
                <strong>Hairstyle:</strong> {formData.service}
              </p>
              <p>
                <strong>Total Amount:</strong> KES {selectedServicePrice}
              </p>
              <p>
                <strong>Deposit Required (10%):</strong> KES {depositAmount}
              </p>
              <p>
                <strong>Remaining to pay at salon:</strong> KES{" "}
                {remainingAmount}
              </p>
              <p>
                <strong>Phone:</strong> {formData.phone}
              </p>
            </div>

            {/* Always show payment buttons unless processing or success/failed */}
            {paymentStatus === "idle" && (
              <div className="modal-actions">
                <button
                  className="pay-btn"
                  onClick={handleInitiatePayment}
                  disabled={paymentProcessing}
                >
                  Pay KES {depositAmount} via M-Pesa
                </button>
                <button
                  className="cancel-btn"
                  onClick={() => {
                    setShowDepositModal(false);
                    setPaymentStatus("idle");
                    setPaymentProcessing(false);
                  }}
                >
                  Cancel
                </button>
              </div>
            )}

            {paymentStatus === "processing" && (
              <div className="payment-processing">
                <div className="spinner"></div>
                <p>Waiting for M-Pesa PIN entry on your phone...</p>
                <p className="instruction">
                  Please check your phone and enter your M-Pesa PIN to complete
                  payment.
                </p>
              </div>
            )}

            {paymentStatus === "success" && (
              <div className="payment-success">
                <p>✓ Payment successful! Your booking is being confirmed...</p>
              </div>
            )}

            {paymentStatus === "failed" && (
              <div className="payment-failed">
                <p>✗ Payment failed. Please try again.</p>
                <button
                  className="retry-btn"
                  onClick={() => {
                    setPaymentStatus("idle");
                    setPaymentProcessing(false);
                  }}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
