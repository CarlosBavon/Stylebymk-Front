import React, { useState, useEffect, useRef, useCallback } from "react";
import GoldButton from "../components/GoldButton";
import "./Home.css";
import { createTestimonial } from "../api";

const Home = () => {
  // ----- Testimonials State -----
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselInterval = useRef(null);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);

  // Fetch testimonials from backend
  const fetchTestimonials = async () => {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setTestimonials(data);
    } catch (error) {
      console.error("Error loading testimonials:", error);
    } finally {
      setLoadingTestimonials(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Carousel auto-rotation
  const startCarousel = useCallback(() => {
    if (carouselInterval.current) clearInterval(carouselInterval.current);
    if (testimonials.length === 0) return;
    carouselInterval.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length > 0) {
      startCarousel();
    }
    return () => clearInterval(carouselInterval.current);
  }, [testimonials, startCarousel]);

  const goToSlide = (index) => {
    setActiveIndex(index);
    clearInterval(carouselInterval.current);
    startCarousel();
  };

  // ----- Add Testimonial Modal -----
  const [showModal, setShowModal] = useState(false);
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    role: "",
    text: "",
    rating: 5,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTestimonial((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setNewTestimonial((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTestimonial.name.trim() || !newTestimonial.text.trim()) {
      alert("Please enter your name and testimonial.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTestimonial),
      });
      if (!res.ok) throw new Error("Submission failed");
      const saved = await res.json();
      // Prepend new testimonial (newest first)
      setTestimonials((prev) => [saved, ...prev]);
      // Reset form & close modal
      setNewTestimonial({ name: "", role: "", text: "", rating: 5 });
      setShowModal(false);
      // Reset carousel to first slide
      setActiveIndex(0);
      clearInterval(carouselInterval.current);
      startCarousel();
    } catch (error) {
      console.error(error);
      alert("Could not add testimonial. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  // ----- Count Up Animation -----
  const [counts, setCounts] = useState({ clients: 0, years: 0 });
  const statsRef = useRef(null);
  const hasAnimated = useRef(false);
  const targetCounts = { clients: 500, years: 5 };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const steps = 60;
          let step = 0;
          const startValues = { clients: 0, years: 0 };
          const updateCounts = () => {
            step++;
            const newCounts = {};
            for (let key in targetCounts) {
              const progress = Math.min(1, step / steps);
              newCounts[key] = Math.floor(
                startValues[key] + (targetCounts[key] - startValues[key]) * progress
              );
            }
            setCounts(newCounts);
            if (step < steps) requestAnimationFrame(updateCounts);
            else setCounts(targetCounts);
          };
          requestAnimationFrame(updateCounts);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  // Scroll Reveal Animation
  useEffect(() => {
    const revealElements = document.querySelectorAll(".reveal-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("revealed");
        });
      },
      { threshold: 0.15 }
    );
    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  if (loadingTestimonials) {
    return <div className="loading-spinner">Loading experiences...</div>;
  }

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="video-background">
          <video autoPlay loop muted playsInline>
            <source
              src="https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226515/Recording_2026-05-19_184843_online-video-cutter.com_1_u7hpvh.mp4"
              type="video/mp4"
            />
          </video>
          <div className="video-overlay"></div>
        </div>
        <div className="hero-content fade-up">
          <div className="floating-gold-spheres"></div>
          <h1 className="main-title">
            <span>STYLESBY</span>
            <span className="gold-text-glow">MK</span>
          </h1>
          <p className="subtitle">Experience The Art of Hair Design</p>
          <div className="cta-buttons">
            <GoldButton to="/booking">
              Book Appointment <i className="fa-solid fa-calendar"></i>
            </GoldButton>
            <GoldButton to="/enquiry">
              Make Enquiry <i className="fa-solid fa-note-sticky"></i>
            </GoldButton>
          </div>
          <div className="scroll-indicator">
            <div className="mouse"></div>
            <p>Scroll to explore</p>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section reveal-on-scroll" ref={statsRef}>
        <div className="section-container">
          <div className="stats-grid">
            <div className="stat-card">
              <i className="fa-solid fa-users stat-icon"></i>
              <div className="stat-number">{counts.clients.toLocaleString()}+</div>
              <div className="stat-label">Happy Clients</div>
            </div>
            <div className="stat-card">
              <i className="fa-solid fa-calendar-alt stat-icon"></i>
              <div className="stat-number">{counts.years}+</div>
              <div className="stat-label">Years of Excellence</div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="services-section reveal-on-scroll">
        <div className="section-container">
          <div className="section-header">
            <h2 className="gold-gradient-text">Signature Services</h2>
            <div className="gold-line"></div>
            <p className="section-subtitle">Crafted with precision, elevated by artistry</p>
          </div>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">
                <i className="fa-solid fa-crown"></i>
              </div>
              <h3>Bridal & Editorial</h3>
              <p>
                Runway-ready updos and transformative styling for your most important moments.
              </p>
              <div className="service-glow"></div>
            </div>
            <div className="service-card">
              <div className="service-icon">
                <i className="fa-solid fa-palette"></i>
              </div>
              <h3>Color Alchemy</h3>
              <p>
                Custom color formulations from balayage to fantasy hues, with 3D dimension.
              </p>
              <div className="service-glow"></div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="testimonials-section reveal-on-scroll">
        <div className="section-container">
          <div className="section-header">
            <h2 className="gold-gradient-text">Whispers of Gold</h2>
            <div className="gold-line"></div>
            <p className="section-subtitle">What our luminous guests radiate</p>
            <button className="add-testimonial-btn" onClick={() => setShowModal(true)}>
              <i className="fa-solid fa-pen"></i> Share Your Story
            </button>
          </div>
          <div className="carousel-container">
            {testimonials.length > 0 ? (
              <>
                <div className="testimonial-slide">
                  <div className="testimonial-card">
                    <i className="fa-solid fa-quote-left quote-icon"></i>
                    <p className="testimonial-text">"{testimonials[activeIndex].text}"</p>
                    <div className="testimonial-author">
                      <div className="author-avatar">{testimonials[activeIndex].avatar}</div>
                      <div className="author-info">
                        <h4>{testimonials[activeIndex].name}</h4>
                        <span>{testimonials[activeIndex].role}</span>
                        <div className="rating">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`fa-solid fa-star ${i < testimonials[activeIndex].rating ? "gold-star" : "gray-star"
                                }`}
                            ></i>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="carousel-dots">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      className={`dot ${idx === activeIndex ? "active" : ""}`}
                      onClick={() => goToSlide(idx)}
                    ></button>
                  ))}
                </div>
              </>
            ) : (
              <p className="no-testimonials">No testimonials yet. Be the first to share your experience!</p>
            )}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="final-cta-section reveal-on-scroll">
        <div className="cta-glow-bg"></div>
        <div className="section-container">
          <h2 className="cta-title">Ready to transcend ordinary?</h2>
          <p className="cta-text">
            Step into a world where hair becomes a masterpiece. Your transformation awaits.
          </p>
          <GoldButton to="/booking" className="cta-gold-button">
            Claim Your Moment <i className="fa-solid fa-sparkle"></i>
          </GoldButton>
        </div>
      </section>

      {/* MODAL for adding testimonial */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowModal(false)}>
              &times;
            </button>
            <h2 className="modal-title">Share Your Luminous Experience</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={newTestimonial.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Your Role (optional)</label>
                <input
                  type="text"
                  name="role"
                  value={newTestimonial.role}
                  onChange={handleInputChange}
                  placeholder="e.g., Bridal Client, VIP Guest"
                />
              </div>
              <div className="form-group">
                <label>Your Testimonial *</label>
                <textarea
                  name="text"
                  rows="4"
                  value={newTestimonial.text}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              <div className="form-group">
                <label>Rating</label>
                <div className="rating-input">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={star}
                      className={`fa-solid fa-star ${star <= newTestimonial.rating ? "gold-star" : "gray-star"
                        }`}
                      onClick={() => handleRatingChange(star)}
                      style={{ cursor: "pointer" }}
                    ></i>
                  ))}
                </div>
              </div>
              <button type="submit" className="submit-testimonial" disabled={submitting}>
                {submitting ? "Submitting..." : "Submit Testimonial"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;