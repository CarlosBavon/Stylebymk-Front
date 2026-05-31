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
        <div className="about-hero">
          <h1 className="about-title fade-up">About <span className="gold-text">STYLESBYMK</span></h1>
        </div>

        <div className="about-content">
          <div className="about-card fade-up">
            <div className="about-icon"><i class="fa-solid fa-user-gear"></i></div>
            <h3>5+ Years Experience</h3>
            <p>Mastering the art of hairstyling with passion and precision</p>
          </div>

          <div className="about-card fade-up">
            <div className="about-icon"><i class="fa-solid fa-trophy"></i></div>
            <h3>Award Winning</h3>
            <p>Recognized for excellence in hair design and customer service</p>
          </div>

          <div className="about-card fade-up">
            <div className="about-icon"><i class="fa-regular fa-money-bill-1"></i></div>
            <h3>Premium Products</h3>
            <p>Only the finest products to ensure your hair's health and beauty</p>
          </div>
        </div>

        <div className="about-story">
          <h2>My <span className="gold-text">Story</span></h2>
          <p>Founded by master stylist MK, my journey began with a simple vision: to transform hairstyling into an art form. With over a decade of experience in the industry, MK has worked with celebrities, fashion shows, and individuals seeking the perfect look. Our philosophy combines technical expertise with creative expression, ensuring every client leaves feeling confident and beautiful.</p>
          <p>At STYLESBYMK, I believe that hair is more than just strands - it's a statement of personality. Our commitment to excellence and attention to detail has made us one of the most sought-after hairstyling destinations.</p>
        </div>
      </div>
    </>
  );
};

export default About;