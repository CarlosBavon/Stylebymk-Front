import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GoldButton from "../components/GoldButton";
import { createBooking } from "../api";
import axios from "axios";
import "./Booking.css";
import { Link } from "react-router-dom";

// Helper: get local YYYY-MM-DD from a Date object (no timezone shift)
const getLocalDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Hairstyle prices (KSh)
const servicePrices = {
  Cornrows: 1500,
  Twists: 1800,
  "Barrel Twists": 2000,
  "Senegalese Twists": 2200,
  "Box Braids": 2500,
  "Locs (Dreadlocks)": 3000,
  "Faux Locs": 2800,
  "Goddess Locs": 3200,
  "Knotless Braids": 2700,
  "Feed-in Braids": 2300,
  "Fulani Braids": 2600,
  "Crochet Braids": 2100,
};

const API_BASE =
  process.env.REACT_APP_API_URL || "https://stylebymk-back.onrender.com/api";

const Booking = () => {
  // Set initial date to TOMORROW (not today)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: tomorrow,
    time: "",
    service: "Cornrows",
  });
  const [availableTimes, setAvailableTimes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [fetchingSlots, setFetchingSlots] = useState(false);

  // Deposit modal states
  const [showModal, setShowModal] = useState(false);
  const [depositAmount, setDepositAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [currentBookingCode, setCurrentBookingCode] = useState("");
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null); // null, 'waiting', 'success', 'failed'

  const services = Object.keys(servicePrices);

  // Fetch booked slots when date changes
  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!formData.date) return;
      setFetchingSlots(true);
      try {
        const dateStr = getLocalDateString(formData.date);
        const response = await axios.get(
          `${API_BASE}/bookings/slots/${dateStr}`,
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData.date]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date, time: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.time) {
      setMessage({
        type: "error",
        text: "Please select an available time slot.",
      });
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    setLoading(true);
    try {
      const total = servicePrices[formData.service];
      const deposit = total * 0.15;
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        date: getLocalDateString(formData.date),
        time: formData.time,
        service: formData.service,
        totalPrice: total,
        depositRequired: deposit,
        balance: total - deposit,
      };
      const response = await createBooking(payload);
      const { bookingCode } = response.data;
      setCurrentBookingCode(bookingCode);
      setTotalPrice(total);
      setDepositAmount(deposit);
      setShowModal(true);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const handlePayDeposit = async () => {
    setPaymentLoading(true);
    setPaymentStatus("waiting");
    try {
      await axios.post(`${API_BASE}/bookings/initiate-payment`, {
        bookingCode: currentBookingCode,
        phoneNumber: formData.phone,
      });

      // Poll payment status every 3 seconds
      const interval = setInterval(async () => {
        try {
          const statusRes = await axios.get(
            `${API_BASE}/bookings/status/${currentBookingCode}`,
          );
          if (statusRes.data.paymentStatus === "paid") {
            clearInterval(interval);
            setPaymentStatus("success");
            setTimeout(() => {
              setShowModal(false);
              setMessage({
                type: "success",
                text: "Booking confirmed! Check your email & Google Calendar.",
              });
              // Reset form after success
              const newTomorrow = new Date();
              newTomorrow.setDate(newTomorrow.getDate() + 1);
              setFormData({
                name: "",
                email: "",
                phone: "",
                date: newTomorrow,
                time: "",
                service: "Cornrows",
              });
            }, 2000);
          } else if (statusRes.data.paymentStatus === "failed") {
            clearInterval(interval);
            setPaymentStatus("failed");
          }
        } catch (err) {
          console.error("Polling error", err);
        }
      }, 3000);
    } catch (error) {
      console.error("STK Push error:", error);
      setPaymentStatus("failed");
    } finally {
      setPaymentLoading(false);
    }
  };

  const minSelectableDate = new Date();
  minSelectableDate.setDate(minSelectableDate.getDate() + 1);

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>
          Book Your <span className="gold-text">Hairstyle</span>
        </h1>
        <p>Reserve your spot for a transformative hairstyling session</p>
      </div>

      <div className="booking-form-container">
        <form onSubmit={handleSubmit} className="booking-form">
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
            <label>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Select Date</label>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              minDate={minSelectableDate}
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
                  {service} - KSh {servicePrices[service]}
                </option>
              ))}
            </select>
          </div>

          <GoldButton
            type="submit"
            disabled={loading || !formData.time || fetchingSlots}
          >
            {loading ? "Processing..." : "Confirm Booking"}
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

      {/* Deposit Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              ×
            </button>
            <h3 style={{ color: "#D4AF37", marginBottom: "1rem" }}>
              Pay 15% Deposit
            </h3>
            <p>
              <strong>Service:</strong> {formData.service}
            </p>
            <p>
              <strong>Total Price:</strong> KSh {totalPrice}
            </p>
            <p>
              <strong>Deposit (15%):</strong> KSh {depositAmount}
            </p>
            <p>
              <strong>Balance to pay in salon:</strong> KSh{" "}
              {totalPrice - depositAmount}
            </p>
            <hr style={{ borderColor: "#D4AF37", margin: "1rem 0" }} />
            {paymentStatus === null && (
              <GoldButton onClick={handlePayDeposit} disabled={paymentLoading}>
                {paymentLoading ? "Sending STK Push..." : "Pay with M-Pesa"}
              </GoldButton>
            )}
            {paymentStatus === "waiting" && (
              <p style={{ color: "#D4AF37" }}>
                Check your phone for M-Pesa prompt. Enter PIN to complete
                payment.
              </p>
            )}
            {paymentStatus === "success" && (
              <p style={{ color: "#4caf50" }}>
                Payment successful! Redirecting...
              </p>
            )}
            {paymentStatus === "failed" && (
              <p style={{ color: "#f44336" }}>
                Payment failed. Please try again or contact support.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Booking;
