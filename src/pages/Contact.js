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
        <div className="contact-header">
          <h1>
            Get in <span className="gold-text">Touch</span>
          </h1>
          <p>We'd love to hear from you</p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <div className="info-item">
              <i class="fa-solid fa-location-pin"></i> Beaver House 2nd floor,
              Hairtips salon
            </div>
            <div className="info-item">
              <i class="fa-solid fa-phone"></i> +254 712 608661
            </div>
            <div className="info-item">
              <i class="fa-solid fa-envelope"></i> davidmuigai241@gmail.com
            </div>
            <div className="info-item">
              <i class="fa-solid fa-alarm-clock"></i> Mon-Sat: 8am - 6pm
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
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
              {loading ? "Sending..." : "Send Message ✨"}
            </GoldButton>

            {message && (
              <div className={`message ${message.type}`}>{message.text}</div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
