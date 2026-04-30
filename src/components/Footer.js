import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-decoration">
        <div className="gold-line"></div>
        <div className="gold-line reverse"></div>
      </div>
      
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">
            <span className="gold-text">STYLE</span>BYMK
          </h3>
          <p className="footer-tagline">Where Style Meets Elegance</p>
          <div className="social-icons">
            <a href="https://www.instagram.com/_stylebymk/" target='_blank' rel="noreferrer" className="social-icon"><i class="fa-brands fa-instagram"></i></a>
            <a href="https://www.tiktok.com/@stylesby_mk?lang=en" target='_blank' rel="noreferrer" className="social-icon"><i class="fa-brands fa-tiktok"></i></a>
            <a href="https://wa.me/0712608661" target='_blank' rel="noreferrer" className="social-icon"><i class="fa-brands fa-whatsapp"></i></a>
            <a href="https://x.com" target='_blank' rel="noreferrer" className="social-icon"><i class="fa-brands fa-x-twitter"></i></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/booking">Book Now</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p><i class="fa-solid fa-location-pin"></i> Beaver House 2nd floor, Hairtips salon</p>
          <p><i class="fa-solid fa-phone"></i> +254 712 608661</p>
          <p><i class="fa-solid fa-envelope"></i> davidmuigai241@gmail.com</p>
        </div>
        
        <div className="footer-section">
          <h4>Working Hours</h4>
          <p>Mon-Fri: 9am - 8pm</p>
          <p>Saturday: 10am - 6pm</p>
          <p>Sunday: Closed</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2026 STYLEBYMK | All Rights Reserved | Crafted with <span style={{color: '#D4AF37'}}>✦</span></p>
      </div>
    </footer>
  );
};

export default Footer;