import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import GoldButton from "../components/GoldButton";
import RatingModal from "../components/RatingModal";
import "./Home.css";
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const TECHNIQUES = ["BRAIDS", "TWISTS", "LOCS", "CORNROWS", "BARREL TWISTS", "FEED-INS"];

const Home = () => {
  const [averageRating, setAverageRating] = useState(4.9);
  const [ratingCount, setRatingCount] = useState(0);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const workRef = useRef(null);
  const tiltRef = useRef(null);

  const API_BASE = process.env.REACT_APP_API_URL || 'https://stylebymk-back.onrender.com/api';

  const fetchAverageRating = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/ratings/average`);
      if (res.data.success) {
        setAverageRating(res.data.average);
        setRatingCount(res.data.count);
      }
    } catch (err) {
      console.error('Failed to fetch ratings:', err);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchAverageRating();
  }, []);

  // Reveal "THE WORK" section as it scrolls into view
  useEffect(() => {
    const el = workRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Subtle tilt on the gallery piece, mouse-driven
  const handleTilt = (e) => {
    const node = tiltRef.current;
    if (!node) return;
    const rect = node.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    node.style.transform = `perspective(900px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg) scale(1.02)`;
  };
  const resetTilt = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "";
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
            <source src="https://res.cloudinary.com/dbaqo3rql/video/upload/v1780910042/202606081203_gf76dz.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
          <div className="grain-overlay"></div>
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

          {/* Signature: woven gold thread divider */}
          <svg className="braid-thread" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden="true">
            <path className="braid-strand strand-a" d="M0,12 C25,0 50,24 75,12 C100,0 125,24 150,12 C175,0 200,24 225,12 C250,0 275,24 300,12" />
            <path className="braid-strand strand-b" d="M0,12 C25,24 50,0 75,12 C100,24 125,0 150,12 C175,24 200,0 225,12 C250,24 275,0 300,12" />
          </svg>

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
              <div className="stat-number">1,000+</div>
              <div className="stat-label">CLIENTS SERVED</div>
            </div>
            <div className="stat-card stat-card--rate" onClick={handleRatingClick}>
              <p className="rate-here">Rate Here &#8595;</p>
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

        {/* Technique marquee ticker */}
        <div className="technique-marquee" aria-hidden="true">
          <div className="marquee-track">
            {[...TECHNIQUES, ...TECHNIQUES].map((t, i) => (
              <span className="marquee-item" key={i}>{t} <span className="marquee-dot">✦</span></span>
            ))}
          </div>
        </div>

        {/* THE WORK Section */}
        <div id="work-section" className={`the-work-section ${revealed ? "is-revealed" : ""}`} ref={workRef}>
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
              <div
                className="work-item"
                ref={tiltRef}
                onMouseMove={handleTilt}
                onMouseLeave={resetTilt}
                style={{ backgroundImage: "url('https://res.cloudinary.com/dbaqo3rql/image/upload/v1780571109/photo-collage.png_cmyed6.png')" }}
              >
                <div className="work-item-frame"></div>
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