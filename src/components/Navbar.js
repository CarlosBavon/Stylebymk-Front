import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import myLogo from "./logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Scrolling down & past 50px → hide navbar
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up → show navbar
        setIsHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close the mobile drawer on route change (covers back/forward nav too)
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Close on Escape, and lock body scroll while the drawer is open
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/about", label: "ABOUT" },
    { path: "/gallery", label: "GALLERY" },
    { path: "/enquiry", label: "ENQUIRY" },
    { path: "/contact", label: "CONTACT" },
  ];

  return (
    <nav className={`navbar ${isHidden ? "hidden" : ""} ${isScrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src={myLogo} alt="StylesbyMK Logo" className="profile-img" />
          <span className="logo-text">STYLESBY</span>
          <span className="logo-gold">MK</span>
        </Link>

        <div className={`nav-menu ${isOpen ? "active" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          <Link to="/booking" className="mobile-book-btn" onClick={() => setIsOpen(false)}>
            BOOK NOW
          </Link>
        </div>

        {/* Desktop Book Now button */}
        <Link to="/booking" className="desktop-book-btn">
          BOOK NOW
        </Link>

        {/* Hamburger toggle */}
        <button
          type="button"
          className="nav-toggle"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          <span className={`bar ${isOpen ? "active" : ""}`}></span>
          <span className={`bar ${isOpen ? "active" : ""}`}></span>
          <span className={`bar ${isOpen ? "active" : ""}`}></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
