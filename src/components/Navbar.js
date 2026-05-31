import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import myLogo from "./logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/about", label: "ABOUT" },
    { path: "/gallery", label: "GALLERY" },
    { path: "/enquiry", label: "ENQUIRY" },
    { path: "/contact", label: "CONTACT" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo + Name */}
        <Link to="/" className="nav-logo">
          <img src={myLogo} alt="StylesbyMK Logo" className="profile-img" />
          <span className="logo-text">STYLESBY</span>
          <span className="logo-gold">MK</span>
        </Link>

        {/* Centered navigation links */}
        <div className={`nav-menu ${isOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
              <span className="nav-underline"></span>
            </Link>
          ))}
          {/* Book Now button - shown inside mobile menu */}
          <Link to="/booking" className="mobile-book-btn" onClick={() => setIsOpen(false)}>
            BOOK NOW
          </Link>
        </div>

        {/* Desktop Book Now button */}
        <Link to="/booking" className="desktop-book-btn">
          BOOK NOW
        </Link>

        {/* Hamburger toggle */}
        <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          <span className={`bar ${isOpen ? "active" : ""}`}></span>
          <span className={`bar ${isOpen ? "active" : ""}`}></span>
          <span className={`bar ${isOpen ? "active" : ""}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;