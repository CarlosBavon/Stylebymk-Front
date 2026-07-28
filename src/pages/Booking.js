import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import GoldButton from "../components/GoldButton";
import { createBooking } from "../api";
import API from "../api";
import "./Booking.css";
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet-async';

const getLocalDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const SERVICES = [
  { name: "Cornrows", icon: "fa-braille" },
  { name: "Natural twists", icon: "fa-spa" },
  { name: "Barrel Twists", icon: "fa-circle-notch" },
  { name: "Artificial locs!", icon: "fa-link" },
];

const Booking = () => {
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

  useEffect(() => {
    const fetchBookedSlots = async () => {
      if (!formData.date) return;
      setFetchingSlots(true);
      try {
        const dateStr = getLocalDateString(formData.date);
        const serviceParam = formData.service
          ? `?service=${encodeURIComponent(formData.service)}`
          : '';
        const response = await API.get(`/bookings/slots/${dateStr}${serviceParam}`);
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
  }, [formData.date, formData.service]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date, time: "" });
  };

  const handleServiceSelect = (name) => {
    setFormData({ ...formData, service: name, time: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.time) {
      setMessage({ type: "error", text: "Please select an available time slot." });
      setTimeout(() => setMessage(""), 3000);
      return;
    }
    setLoading(true);
    try {
      const payload = { ...formData, date: getLocalDateString(formData.date) };
      await createBooking(payload);
      setMessage({
        type: "success",
        text: "Booking confirmed! A calendar invitation has been sent to your email. Please check your inbox (and spam folder).",
      });
      const newTomorrow = new Date();
      newTomorrow.setDate(newTomorrow.getDate() + 1);
      setFormData({ name: "", email: "", phone: "", date: newTomorrow, time: "", service: "Cornrows" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error.response?.data?.message || "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  const minSelectableDate = new Date();
  minSelectableDate.setDate(minSelectableDate.getDate() + 1);

  const selectedService = SERVICES.find((s) => s.name === formData.service);
  const formattedDate = formData.date
    ? formData.date.toLocaleDateString(undefined, { weekday: "short", day: "numeric", month: "short", year: "numeric" })
    : "—";

  return (
    <>
      <Helmet>
        <title>StylesbyMK – Premium Hair Studio | Braids, Twists, Locs in Nairobi</title>
        <meta name="description" content="Experience the art of hair design at StylesbyMK. Book your session for cornrows, twists, barrel twists, locs and more. Premium quality, gold‑standard service." />
        <link rel="canonical" href="https://stylesbymk.vercel.app/" />
      </Helmet>

      <div className="booking-page">
        <div className="booking-shell">

          {/* --- Summary panel --- */}
          <aside className="booking-summary">
            <div className="summary-eyebrow">STYLESBYMK · BOOKING</div>
            <h1 className="summary-title">Reserve your <span className="gold-text">session</span></h1>
            <svg className="thread-divider" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
              <path className="thread-strand strand-a" d="M0,12 C25,0 50,24 75,12 C100,0 125,24 150,12 C175,0 200,24 225,12 C250,0 275,24 300,12" />
              <path className="thread-strand strand-b" d="M0,12 C25,24 50,0 75,12 C100,24 125,0 150,12 C175,24 200,0 225,12 C250,24 275,0 300,12" />
            </svg>
            <p className="summary-copy">A transformative hairstyling session, reserved in minutes.</p>

            <div className="summary-card">
              <div className="summary-row">
                <i className={`fa-solid ${selectedService?.icon || "fa-scissors"}`}></i>
                <div>
                  <span className="summary-label">Style</span>
                  <span className="summary-value">{formData.service || "—"}</span>
                </div>
              </div>
              <div className="summary-row">
                <i className="fa-solid fa-calendar-day"></i>
                <div>
                  <span className="summary-label">Date</span>
                  <span className="summary-value">{formattedDate}</span>
                </div>
              </div>
              <div className="summary-row">
                <i className="fa-solid fa-clock"></i>
                <div>
                  <span className="summary-label">Time</span>
                  <span className="summary-value">{formData.time || "Not selected yet"}</span>
                </div>
              </div>
              <div className="summary-row">
                <i className="fa-solid fa-user"></i>
                <div>
                  <span className="summary-label">Guest</span>
                  <span className="summary-value">{formData.name || "—"}</span>
                </div>
              </div>
            </div>

            <p className="summary-note">
              <i className="fa-solid fa-circle-check"></i>
              A calendar invitation is emailed the moment your booking is confirmed.
            </p>
          </aside>

          {/* --- Form panel --- */}
          <main className="booking-main">
            <form onSubmit={handleSubmit} className="booking-form">

              <section className="form-section">
                <div className="section-heading">
                  <span className="section-number">1</span>
                  <h2>Your details</h2>
                </div>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
                  </div>
                </div>
              </section>

              <section className="form-section">
                <div className="section-heading">
                  <span className="section-number">2</span>
                  <h2>Choose your style</h2>
                </div>
                <div className="service-grid">
                  {SERVICES.map((s) => (
                    <button
                      type="button"
                      key={s.name}
                      className={`service-card ${formData.service === s.name ? "selected" : ""}`}
                      onClick={() => handleServiceSelect(s.name)}
                    >
                      <i className={`fa-solid ${s.icon}`}></i>
                      <span>{s.name}</span>
                    </button>
                  ))}
                </div>
              </section>

              <section className="form-section">
                <div className="section-heading">
                  <span className="section-number">3</span>
                  <h2>Date &amp; time</h2>
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
                    <p className="slot-status loading">Loading available times...</p>
                  ) : (
                    <div className="time-slots">
                      {availableTimes.length === 0 ? (
                        <p className="slot-status empty">No available slots for this date. Please choose another day.</p>
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
              </section>

              <GoldButton type="submit" disabled={loading || !formData.time || fetchingSlots}>
                {loading ? "Processing..." : "Confirm Booking"}
              </GoldButton>
              <div className="cancel">
                <Link to="/cancel" className="cancel-link">Cancel Booking</Link>
              </div>

              {message && <div className={`message ${message.type}`}>{message.text}</div>}
            </form>
          </main>

        </div>
      </div>
    </>
  );
};

export default Booking;
