import React, { useState } from 'react';
import axios from 'axios';
import './RatingModal.css';

const RatingModal = ({ isOpen, onClose, onRatingSubmitted }) => {
    const [stars, setStars] = useState(0);
    const [hoverStars, setHoverStars] = useState(0);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async () => {
        if (stars === 0) {
            setError('Please select a star rating');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const API_BASE = process.env.REACT_APP_API_URL || 'https://stylebymk-back.onrender.com/api';
            await axios.post(`${API_BASE}/ratings`, { stars, comment });
            setSubmitted(true);
            if (onRatingSubmitted) onRatingSubmitted();
            setTimeout(() => onClose(), 1500);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit rating');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rating-overlay" onClick={onClose}>
            <div className="rating-modal" onClick={(e) => e.stopPropagation()}>
                <button className="rating-close" onClick={onClose}>✕</button>
                {!submitted ? (
                    <>
                        <h3>Rate your experience</h3>
                        <p>How was your hairstyle session with StylesbyMK?</p>
                        <div className="rating-stars">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${star <= (hoverStars || stars) ? 'filled' : ''}`}
                                    onClick={() => setStars(star)}
                                    onMouseEnter={() => setHoverStars(star)}
                                    onMouseLeave={() => setHoverStars(0)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                        <textarea
                            placeholder="Optional: Share your feedback..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows="3"
                        />
                        {error && <p className="rating-error">{error}</p>}
                        <div className="rating-buttons">
                            <button className="rating-btn not-now" onClick={onClose}>Not now</button>
                            <button className="rating-btn submit" onClick={handleSubmit} disabled={loading}>
                                {loading ? 'Submitting...' : 'Submit rating'}
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="rating-thanks">
                        <h3>Thank you!</h3>
                        <p>Your feedback helps us improve.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RatingModal;
