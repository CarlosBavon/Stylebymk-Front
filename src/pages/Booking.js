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

// Use environment variable for API base, fallback to production URL
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

  // Service list
  const services = [
    "Cornrows",
    "Twists",
    "Barrel Twists",
    "Senegalese Twists",
    "Box Braids",
    "Locs (Dreadlocks)",
    "Faux Locs",
    "Goddess Locs",
    "Knotless Braids",
    "Feed-in Braids",
    "Fulani Braids",
    "Crochet Braids",
  ];

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
      const payload = {
        ...formData,
        date: getLocalDateString(formData.date),
      };
      await createBooking(payload);
      setMessage({
        type: "success",
        text: "Booking confirmed! A calendar invitation has been sent to your email. Please check your inbox (and spam folder).",
      });
      // Reset form
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

  const minSelectableDate = new Date();
  minSelectableDate.setDate(minSelectableDate.getDate() + 1);

  return (
    <div className="booking-page">
      <div className="booking-header">
        <h1>
          Book Your <span className="gold-text">Hairstyle</span>
        </h1>
        <p>Reserve your spot – instant confirmation, calendar invite sent.</p>
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
                  {service}
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
    </div>
  );
};

export default Booking;
