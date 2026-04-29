import React, { useState } from 'react';
import GoldButton from '../components/GoldButton';
import { createContact } from '../api';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createContact(formData);
      setMessage({ type: 'success', text: 'Message sent! We\'ll respond within 24 hours.' });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(''), 5000);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Get in <span className="gold-text">Touch</span></h1>
        <p>We'd love to hear from you</p>
      </div>
      
      <div className="contact-wrapper">
        <div className="contact-info">
          <h3>Contact Information</h3>
          <div className="info-item">📍 123 Style Avenue, NYC 10001</div>
          <div className="info-item">📞 +1 (555) 123-4567</div>
          <div className="info-item">✉️ hello@stylebymk.com</div>
          <div className="info-item">⏰ Mon-Sat: 9am - 8pm</div>
        </div>
        
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label>Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Subject</label>
            <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
          </div>
          
          <div className="form-group">
            <label>Message</label>
            <textarea name="message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          
          <GoldButton type="submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message ✨'}
          </GoldButton>
          
          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;