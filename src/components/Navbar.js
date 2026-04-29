import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/about", label: "ABOUT" },
    { path: "/gallery", label: "GALLERY" },
    { path: "/booking", label: "BOOKING" },
    { path: "/enquiry", label: "ENQUIRY" },
    { path: "/contact", label: "CONTACT" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
        <span className="logo-text">STYLEBY</span>
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
              <span className="nav-underline"></span>
            </Link>
          ))}
        </div>

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
