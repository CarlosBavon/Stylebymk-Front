import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <span className="footer-emblem" aria-hidden="true"></span>

      <div className="footer-content">
        <div className="footer-section footer-brand">
          <h3 className="footer-title">
            <span className="gold-text">STYLESBY</span>
            <span className="gold-text-soft">MK</span>
          </h3>
          <p className="footer-tagline">Where Style Meets Elegance</p>

          <div className="social-icons">
            <a
              href="https://www.instagram.com/_stylebymk/"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
              aria-label="Follow us on Instagram"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a
              href="https://www.tiktok.com/@stylesby_mk?lang=en"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
              aria-label="Follow us on TikTok"
            >
              <i className="fa-brands fa-tiktok"></i>
            </a>
            <a
              href="https://wa.me/254712608661"
              target="_blank"
              rel="noreferrer"
              className="social-icon"
              aria-label="Message us on WhatsApp"
            >
              <i className="fa-brands fa-whatsapp"></i>
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/booking">Book Now</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact Info</h4>
          <p className="contact-item">
            <i className="fa-solid fa-location-pin"></i>
            <span>Beaver House 2nd floor, Hairtips salon</span>
          </p>
          <p className="contact-item">
            <i className="fa-solid fa-phone"></i>
            <a href="tel:+254712608661">+254 712 608661</a>
          </p>
          <p className="contact-item">
            <i className="fa-solid fa-envelope"></i>
            <a href="mailto:davidmuigai241@gmail.com">davidmuigai241@gmail.com</a>
          </p>
        </div>

        <div className="footer-section">
          <h4>Working Hours</h4>
          <p className="hours-item"><span>Mon – Sat</span><span>8am – 6pm</span></p>
          <p className="hours-item"><span>Sunday</span><span>10am – 4pm</span></p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 STYLESBYMK <span className="dot">✦</span> All Rights Reserved <span className="dot">✦</span> Crafted with <span className="heart">✦</span></p>
      </div>
    </footer>
  );
};

export default Footer;
