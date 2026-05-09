import React from "react";
import GoldButton from "../components/GoldButton";
import "./Home.css";
import Video from "../assets/video/video.mp4";

const Home = () => {
  return (
    <div className="home-container">
      <div className="video-background">
        <video autoPlay loop muted playsInline>
          <source src={Video} type="video/mp4" />
        </video>
        <div className="video-overlay"></div>
      </div>

      <div className="home-content fade-up">
        <h1 className="main-title">
          <span>STYLEBY</span>
          <span className="gold-text-glow">MK</span>
        </h1>
        <p className="subtitle">Experience The Art of Hair Design</p>
        <div className="cta-buttons">
          <GoldButton to="/booking">
            Book Appointment{" "}
            <i class="fa-solid fa-calendar" style={{ color: "black" }}></i>
          </GoldButton>
          <GoldButton to="/enquiry">
            Make Enquiry{" "}
            <i class="fa-solid fa-note-sticky" style={{ color: "black" }}></i>
          </GoldButton>
        </div>
        <div className="scroll-indicator">
          <div className="mouse"></div>
          <p>Scroll to explore</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
