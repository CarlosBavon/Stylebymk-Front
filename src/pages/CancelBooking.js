import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import GoldButton from "../components/GoldButton";
import "./CancelBooking.css";

const CancelBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ bookingCode: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [showPenaltyWarning, setShowPenaltyWarning] = useState(false);
  const [penaltyAmount, setPenaltyAmount] = useState(0);
  const [refundAmount, setRefundAmount] = useState(0);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get("code");
    const email = params.get("email");
    if (code && email) {
      setFormData({ bookingCode: code, email: decodeURIComponent(email) });
      // Fetch booking details to calculate penalty
      fetchBookingDetails(code, decodeURIComponent(email));
    }
  }, [location]);

  const fetchBookingDetails = async (code, email) => {
    try {
      const response = await axios.get(
        `https://stylebymk-back.onrender.com/api/bookings/details/${code}?email=${email}`,
      );
      if (response.data.success) {
        setBookingDetails(response.data.booking);
        // Calculate penalty: 2% of total price
        const penalty = response.data.booking.totalAmount * 0.02;
        const refund = response.data.booking.depositAmount - penalty;
        setPenaltyAmount(penalty);
        setRefundAmount(refund);
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(
        `https://stylebymk-back.onrender.com/api/bookings/details/${formData.bookingCode}?email=${formData.email}`,
      );
      if (response.data.success) {
        setBookingDetails(response.data.booking);
        const penalty = response.data.booking.totalAmount * 0.02;
        const refund = response.data.booking.depositAmount - penalty;
        setPenaltyAmount(penalty);
        setRefundAmount(refund);
        setShowPenaltyWarning(true);
      } else {
        setMessage({
          type: "error",
          text: "Booking not found. Check code and email.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message || "Failed to fetch booking details.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    setLoading(true);
    try {
      await axios.post(
        "https://stylebymk-back.onrender.com/api/bookings/cancel",
        {
          bookingCode: formData.bookingCode,
          email: formData.email,
          penaltyAmount: penaltyAmount,
          refundAmount: refundAmount,
        },
      );
      setMessage({
        type: "success",
        text: `Booking cancelled. A 2% penalty (KES ${penaltyAmount}) applies. Refund amount: KES ${refundAmount}. You will receive email confirmation.`,
      });
      setTimeout(() => navigate("/"), 3000);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Cancellation failed.",
      });
    } finally {
      setLoading(false);
      setShowPenaltyWarning(false);
    }
  };

  return (
    <div className="cancel-page">
      <div className="cancel-container">
        <h1>
          Cancel <span className="gold-text">Booking</span>
        </h1>
        <p>Enter your booking code and email address</p>

        {!bookingDetails && (
          <form onSubmit={handleCheckBooking}>
            <div className="form-group">
              <label>Booking Code</label>
              <input
                type="text"
                name="bookingCode"
                value={formData.bookingCode}
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
            <GoldButton type="submit" disabled={loading}>
              {loading ? "Checking..." : "Find Booking"}
            </GoldButton>
          </form>
        )}

        {showPenaltyWarning && bookingDetails && (
          <div className="penalty-warning">
            <h3>⚠️ Cancellation Penalty Warning</h3>
            <div className="booking-summary">
              <p>
                <strong>Hairstyle:</strong> {bookingDetails.service}
              </p>
              <p>
                <strong>Total Price:</strong> KES {bookingDetails.totalAmount}
              </p>
              <p>
                <strong>Deposit Paid:</strong> KES{" "}
                {bookingDetails.depositAmount}
              </p>
            </div>
            <div className="penalty-details">
              <p style={{ color: "#ff4444" }}>
                <strong>Penalty (2% of total price):</strong> -KES{" "}
                {penaltyAmount.toFixed(2)}
              </p>
              <p>
                <strong>Refund Amount:</strong> KES {refundAmount.toFixed(2)}
              </p>
            </div>
            <p className="warning-text">
              By cancelling, you agree to a 2% deduction from your deposit.
            </p>
            <div className="cancel-actions">
              <button
                onClick={handleCancel}
                className="confirm-cancel-btn"
                disabled={loading}
              >
                {loading ? "Cancelling..." : "Confirm Cancellation"}
              </button>
              <button
                onClick={() => navigate("/")}
                className="keep-booking-btn"
              >
                Keep Booking
              </button>
            </div>
          </div>
        )}

        {message && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}
      </div>
    </div>
  );
};

export default CancelBooking;
