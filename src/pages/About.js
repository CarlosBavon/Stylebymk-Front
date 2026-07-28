import React from 'react';
import './About.css';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
      <Helmet>
        <title>StylesbyMK – Premium Hair Studio | Braids, Twists, Locs in Nairobi</title>
        <meta name="description" content="Experience the art of hair design at StylesbyMK. Book your session for cornrows, twists, barrel twists, locs and more. Premium quality, gold‑standard service." />
        <link rel="canonical" href="https://stylesbymk.vercel.app/" />
      </Helmet>

      <div className="about-page">

        {/* Hero */}
        <section className="about-hero">
          <span className="eyebrow fade-up">Nairobi &middot; Hair Atelier</span>
          <h1 className="about-title fade-up">
            The Art Behind <span className="gold-text italic">Every Style</span>
          </h1>
          <p className="hero-subtitle fade-up">
            Where precision meets personality — cornrows, twists, locs and everything
            in between, shaped by hand, one client at a time.
          </p>
          <div className="hero-divider fade-up"><span /></div>
        </section>

        {/* Stats band */}
        <section className="about-stats">
          <div className="stat-item fade-up">
            <i className="fa-solid fa-scissors"></i>
            <h3>5+ Years</h3>
            <p>Mastering the craft with passion and precision</p>
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat-item fade-up">
            <i className="fa-solid fa-award"></i>
            <h3>Award-Winning</h3>
            <p>Recognized for excellence in hair design</p>
          </div>
          <div className="stat-divider" aria-hidden="true" />
          <div className="stat-item fade-up">
            <i className="fa-solid fa-spa"></i>
            <h3>Premium Care</h3>
            <p>Only the finest products for healthy, beautiful hair</p>
          </div>
        </section>

        {/* Story */}
        <section className="about-story">
          <div className="story-visual fade-up">
            <div className="portrait-frame">
              <i className="fa-solid fa-scissors frame-icon"></i>
              <span className="frame-caption">MK — Founder &amp; Master Stylist</span>
            </div>
            <div className="mk-seal" aria-hidden="true">
              <span className="seal-ring" />
              <span className="seal-initials">MK</span>
            </div>
          </div>

          <div className="story-text fade-up">
            <span className="eyebrow">My Story</span>
            <h2>Hair as an <span className="gold-text italic">Art Form</span></h2>
            <p className="drop-cap">
              Founded by master stylist MK, my journey began with a simple vision: to turn
              hairstyling into an art form. With over a decade in the industry, MK has worked
              across celebrity bookings, fashion shows and individuals seeking the perfect look.
            </p>
            <p className="pull-quote">Hair is more than strands — it's a statement of who you are.</p>
            <p>
              At STYLESBYMK, technical expertise meets creative expression, so every client
              leaves feeling confident, seen and beautiful. That attention to detail has made
              us one of Nairobi's most sought-after hairstyling destinations.
            </p>
          </div>
        </section>

        {/* Values */}
        <section className="about-values fade-up">
          <div className="value">
            <span className="value-label">Craft</span>
            <p>Every parting, plait and finish done by hand</p>
          </div>
          <div className="value">
            <span className="value-label">Confidence</span>
            <p>Styles built to move the way you do</p>
          </div>
          <div className="value">
            <span className="value-label">Care</span>
            <p>Healthy hair first, always</p>
          </div>
        </section>

        {/* CTA */}
        <section className="about-cta fade-up">
          <h2>Ready for <span className="gold-text italic">Your Transformation</span>?</h2>
          <a href="/booking" className="cta-button">Book Your Session</a>
        </section>

      </div>
    </>
  );
};

export default About;
