import React, { useState, useEffect } from "react";
import axios from "axios";
import GoldButton from "../components/GoldButton";
import RatingModal from "../components/RatingModal";
import "./Home.css";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const Home = () => {
  const [averageRating, setAverageRating] = useState(4.9);
  const [ratingCount, setRatingCount] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const API_BASE = process.env.REACT_APP_API_URL || 'https://stylebymk-back.onrender.com/api';

  useEffect(() => {
    fetchAverageRating();
  }, []);

  const fetchAverageRating = async () => {
    try {
      const res = await axios.get(`${API_BASE}/ratings/average`);
      if (res.data.success) {
        setAverageRating(res.data.average);
        setRatingCount(res.data.count);
      }
    } catch (err) {
      console.error('Failed to fetch ratings:', err);
    }
  };

  const handleRatingClick = () => {
    setShowRatingModal(true);
  };

  return (
    <>
      <Helmet>
        <title>StylesbyMK – Premium Hair Studio | Braids, Twists, Locs in Nairobi</title>
        <meta name="description" content="Experience the art of hair design at StylesbyMK. Book your session for cornrows, twists, barrel twists, locs and more. Premium quality, gold‑standard service." />
        <link rel="canonical" href="https://stylesbymk.vercel.app/" />
      </Helmet>
      <div className="home-container">
        <div className="video-background">
          <video autoPlay loop muted playsInline>
            <source src="https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226515/Recording_2026-05-19_184843_online-video-cutter.com_1_u7hpvh.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>

        <div className="home-content fade-up">
          <div className="establishment-badge">
            <span className="dash">—</span>
            <span>EST. 2026</span>
            <span className="separator">·</span>
            <span>PREMIUM HAIR STUDIO</span>
            <span className="dash">—</span>
          </div>
          <h1 className="main-title">
            <span>STYLESBY</span>
            <br /><span className="gold-text-glow">MK</span>
          </h1>
          <p className="subtitle">Experience The Art of Hair Design</p>
          <div className="cta-buttons">
            <GoldButton to="/booking">
              BOOK A SESSION{" "}
              <i className="fa-solid fa-calendar" style={{ color: "black" }}></i>
            </GoldButton>
            <GoldButton to="/enquiry" variant="outline">
              MAKE AN ENQUIRY{" "}
              <i className="fa-solid fa-note-sticky" style={{ color: "gold" }}></i>
            </GoldButton>
          </div>
          <div className="stats-container">
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">CLIENTS SERVED</div>
            </div>
            <div className="stat-card" onClick={handleRatingClick} style={{ cursor: 'pointer' }}>
              <div className="stat-number">{averageRating}★</div>
              <div className="stat-label">RATING ({ratingCount})</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">5+</div>
              <div className="stat-label">YEARS EXPERIENCE</div>
            </div>
          </div>
          <div className="scroll-indicator" onClick={() => document.getElementById('work-section').scrollIntoView({ behavior: 'smooth' })}>
            <div className="mouse"></div>
            <p>Tap to scroll</p>
          </div>
        </div>
        {/* THE WORK Section */}
        <div id="work-section" className="the-work-section">
          <div className="the-work-container">
            <h2 className="the-work-title">THE WORK</h2>
            <div className="work-nav">
              <p className="the-work-subtitle">Crafted with <span style={{ color: "gold" }}>precision.</span></p>
              <div className="work-button-wrapper">
                <Link to="/gallery" className="outline-gold-link">
                  VIEW FULL GALLERY
                </Link>
              </div>
            </div>
            <div className="work-grid">
              <div className="work-item" style={{ backgroundImage: "url('https://res.cloudinary.com/dbaqo3rql/image/upload/v1780571109/photo-collage.png_cmyed6.png')" }}>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RatingModal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        onRatingSubmitted={fetchAverageRating}
      />
    </>
  );
};

export default Home;
