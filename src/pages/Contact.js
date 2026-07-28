import React, { useState } from "react";
import GoldButton from "../components/GoldButton";
import { createContact } from "../api";
import "./Contact.css";
import { Helmet } from 'react-helmet-async';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createContact(formData);
      setMessage({
        type: "success",
        text: "Message sent! We'll respond within 24 hours.",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <>
      <Helmet>
        <title>StylesbyMK – Premium Hair Studio | Braids, Twists, Locs in Nairobi</title>
        <meta name="description" content="Experience the art of hair design at StylesbyMK. Book your session for cornrows, twists, barrel twists, locs and more. Premium quality, gold‑standard service." />
        <link rel="canonical" href="https://stylesbymk.vercel.app/" />
      </Helmet>

      <div className="contact-page">

        <section className="contact-hero">
          <span className="eyebrow fade-up">Say Hello</span>
          <h1 className="contact-title fade-up">
            Get in <span className="gold-text italic">Touch</span>
          </h1>
          <p className="hero-subtitle fade-up">
            Questions, bookings, or just curious about a style? We'd love to hear from you.
          </p>
          <div className="hero-divider fade-up"><span /></div>
        </section>

        <div className="contact-wrapper">
          <div className="contact-info fade-up">
            <span className="eyebrow">Contact Information</span>

            <div className="info-item">
              <span className="info-icon"><i className="fa-solid fa-location-pin"></i></span>
              <div className="info-text">
                <span className="info-label">Studio</span>
                <span className="info-value">Beaver House, 2nd Floor — Hairtips Salon</span>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon"><i className="fa-solid fa-phone"></i></span>
              <div className="info-text">
                <span className="info-label">Phone</span>
                <span className="info-value">+254 712 608661</span>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon"><i className="fa-solid fa-envelope"></i></span>
              <div className="info-text">
                <span className="info-label">Email</span>
                <span className="info-value">davidmuigai241@gmail.com</span>
              </div>
            </div>

            <div className="info-item">
              <span className="info-icon"><i className="fa-solid fa-alarm-clock"></i></span>
              <div className="info-text">
                <span className="info-label">Hours</span>
                <span className="info-value">Mon – Sat, 8am – 6pm</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form fade-up">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <GoldButton type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </GoldButton>

            {message && (
              <div className={`form-message ${message.type}`}>{message.text}</div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
