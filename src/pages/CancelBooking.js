import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import GoldButton from '../components/GoldButton';
import './CancelBooking.css';

const CancelBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ bookingCode: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const email = params.get('email');
    if (code && email) {
      setFormData({ bookingCode: code, email: decodeURIComponent(email) });
    }
  }, [location]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('hhttps://stylebymk-back.onrender.com/api/bookings/cancel', formData);
      setMessage({ type: 'success', text: 'Your booking has been cancelled.' });
      setTimeout(() => navigate('/'), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.message || 'Cancellation failed.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="cancel-page">
      <div className="cancel-container">
        <h1>Cancel <span className="gold-text">Booking</span></h1>
        <p>Enter your booking code and email address</p>
        <form onSubmit={handleCancel}>
          <div className="form-group">
            <label>Booking Code</label>
            <input type="text" name="bookingCode" value={formData.bookingCode} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <GoldButton type="submit" disabled={loading}>{loading ? 'Cancelling...' : 'Cancel Booking'}</GoldButton>
          {message && <div className={`message ${message.type}`}>{message.text}</div>}
        </form>
      </div>
    </div>
  );
};

export default CancelBooking;