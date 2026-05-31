import React from "react";
import GoldButton from "../components/GoldButton";
import "./Home.css";
import { Link } from 'react-router-dom';


const Home = () => {
  return (
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
          <br></br><span className="gold-text-glow">MK</span>
        </h1>
        <p className="subtitle">Experience The Art of Hair Design</p>
        <div className="cta-buttons">
          <GoldButton to="/booking">
            BOOK A SESSION{" "}
            <i class="fa-solid fa-calendar" style={{ color: "black" }}></i>
          </GoldButton>
          <GoldButton to="/enquiry" variant="outline">
            MAKE AN ENQUIRY{" "}
            <i class="fa-solid fa-note-sticky" style={{ color: "gold" }}></i>
          </GoldButton>
        </div>
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">500+</div>
            <div className="stat-label">CLIENTS SERVED</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">4.9★</div>
            <div className="stat-label">RATING</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">5+</div>
            <div className="stat-label">YEARS EXPERIENCE</div>
          </div>
        </div>
        <div className="scroll-indicator" onClick={() => document.getElementById('work-section').scrollIntoView({ behavior: 'smooth' })}>
          <div className="mouse"></div>
          <p>Scroll to explore</p>
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
            <div className="work-item-large" style={{ backgroundImage: "url('https://res.cloudinary.com/dbaqo3rql/image/upload/v1780262894/Screenshot_2026-06-01_002531_ivrmxg.png')" }}>
            </div>
            <div className="work-grid-small">
              <div className="work-item" style={{ backgroundImage: "url('https://res.cloudinary.com/dbaqo3rql/image/upload/v1780262894/Screenshot_2026-06-01_002655_pkmfem.png')" }}>
              </div>
              <div className="work-item" style={{ backgroundImage: "url('https://res.cloudinary.com/dbaqo3rql/image/upload/v1780262894/Screenshot_2026-06-01_002425_d5lk7s.png')" }}>
              </div>
              <div className="work-item" style={{ backgroundImage: "url('https://res.cloudinary.com/dbaqo3rql/image/upload/v1780262894/Screenshot_2026-06-01_002616_f4ssy9.png')" }}>
              </div>
              <div className="work-item" style={{ backgroundImage: "url('https://res.cloudinary.com/dbaqo3rql/image/upload/v1780262895/Screenshot_2026-06-01_002630_dzkyal.png')" }}>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
