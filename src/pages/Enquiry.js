import React, { useState } from "react";
import GoldButton from "../components/GoldButton";
import { createEnquiry } from "../api";
import "./Enquiry.css";

const Enquiry = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
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
      await createEnquiry(formData);
      setMessage({
        type: "success",
        text: "Enquiry sent! We'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setMessage({
        type: "error",
        text: "Failed to send enquiry. Please try again.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 5000);
    }
  };

  return (
    <div className="enquiry-page">
      <div className="enquiry-header">
        <h1>
          Send an <span className="gold-text">Enquiry</span>
        </h1>
        <p>Have questions? We're here to help</p>
      </div>

      <div className="enquiry-container">
        <form onSubmit={handleSubmit} className="enquiry-form">
          <div className="form-group">
            <label>Your Name</label>
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
            <label>Your Message</label>
            <textarea
              name="message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <GoldButton type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send Enquiry 💫"}
          </GoldButton>

          {message && (
            <div className={`message ${message.type}`}>{message.text}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Enquiry;
