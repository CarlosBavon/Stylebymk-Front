import React, { useState, useEffect, useCallback } from "react";
import "./Gallery.css";
import { Helmet } from 'react-helmet-async';

const allVideos = [
  { id: 1, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226897/Screen_Recording_2026-05-19_185532_lywhoy.mp4", title: "Braiding Artistry", category: "cornrows" },
  { id: 2, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779229561/Screen_Recording_2026-05-20_012453_kssjwv.mp4", title: "Twist Sculpting", category: "barrel" },
  { id: 3, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226898/Screen_Recording_2026-05-19_185741_f4vdsq.mp4", title: "Braiding Artistry", category: "cornrows" },
  { id: 4, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226920/Screen_Recording_2026-05-19_192647_zfii7z.mp4", title: "TwistOuts", category: "twists" },
  { id: 5, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779229558/Screen_Recording_2026-05-20_012414_azuqeh.mp4", title: "Everyday Glam", category: "barrel" },
  { id: 6, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779229556/Screen_Recording_2026-05-20_012250_abfhcq.mp4", title: "Twist Sculpting", category: "barrel" },
  { id: 7, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226917/Screen_Recording_2026-05-19_192142_sofnqy.mp4", title: "Curling Magic", category: "twists" },
  { id: 8, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779229553/Screen_Recording_2026-05-20_012140_y3imeb.mp4", title: "Silky Smooth", category: "barrel" },
  { id: 9, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226898/Screen_Recording_2026-05-19_185834_qmu8gq.mp4", title: "Braiding Artistry", category: "cornrows" },
  { id: 10, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226899/Screen_Recording_2026-05-19_185943_z4jklx.mp4", title: "Braiding Artistry", category: "cornrows" },
  { id: 11, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226903/Screen_Recording_2026-05-19_190035_vu9sc1.mp4", title: "Braiding Artistry", category: "cornrows" },
  { id: 12, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226904/Screen_Recording_2026-05-19_190256_xlvcob.mp4", title: "Braiding Artistry", category: "cornrows" },
  { id: 13, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226905/Screen_Recording_2026-05-19_190522_ewksue.mp4", title: "Braiding Artistry", category: "cornrows" },
  { id: 14, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226906/Screen_Recording_2026-05-19_190353_t89apx.mp4", title: "Braiding Artistry", category: "cornrows" },
  { id: 15, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226907/Screen_Recording_2026-05-19_190631_ozppq9.mp4", title: "Braiding Artistry", category: "cornrows" },
  { id: 16, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226908/Screen_Recording_2026-05-19_190840_sqny9r.mp4", title: "Braiding Artistry", category: "cornrows" },
  { id: 17, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226908/Screen_Recording_2026-05-19_190939_slipik.mp4", title: "Braiding Artistry", category: "cornrows" },
  { id: 18, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226908/Screen_Recording_2026-05-19_191016_hmqm9h.mp4", title: "Braiding Artistry", category: "cornrows" },
  { id: 19, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226908/Screen_Recording_2026-05-19_190146_rbhfd2.mp4", title: "Braiding Artistry", category: "cornrows" },
  { id: 20, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226909/Screen_Recording_2026-05-19_191710_agque3.mp4", title: "Braiding Artistry", category: "cornrows" },
  { id: 21, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226911/Screen_Recording_2026-05-19_190731_yfgc0f.mp4", title: "Braiding Artistry", category: "cornrows" },
  { id: 22, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226918/Screen_Recording_2026-05-19_192554_opo5nm.mp4", title: "Braiding Artistry", category: "cornrows" },
  { id: 23, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226918/Screen_Recording_2026-05-19_192410_bn1teh.mp4", title: "Braiding Artistry", category: "cornrows" },
  { id: 24, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226917/Screen_Recording_2026-05-19_192240_ydg2nr.mp4", title: "TwistOuts", category: "twists" },
  { id: 25, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226917/Screen_Recording_2026-05-19_192329_p6u4un.mp4", title: "TwistOuts", category: "twists" },
  { id: 26, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226917/Screen_Recording_2026-05-19_192454_jc2l6j.mp4", title: "TwistOuts", category: "twists" },
  { id: 27, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226914/Screen_Recording_2026-05-19_192046_ilcutg.mp4", title: "TwistOuts", category: "twists" },
  { id: 28, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226913/Screen_Recording_2026-05-19_191956_tykgje.mp4", title: "TwistOuts", category: "twists" },
  { id: 29, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226912/Screen_Recording_2026-05-19_191818_zfprcp.mp4", title: "TwistOuts", category: "twists" },
  { id: 30, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226911/Screen_Recording_2026-05-19_191858_tqdmfn.mp4", title: "TwistOuts", category: "twists" },
  { id: 31, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226909/Screen_Recording_2026-05-19_191622_guol5g.mp4", title: "TwistOuts", category: "twists" },
  { id: 32, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226899/Screen_Recording_2026-05-19_185701_i7rnsh.mp4", title: "TwistOuts", category: "twists" },
  { id: 33, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226897/Screen_Recording_2026-05-19_185357_n4xfzm.mp4", title: "TwistOuts", category: "twists" },
  { id: 34, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779226896/Screen_Recording_2026-05-19_184431_rs4e3f.mp4", title: "TwistOuts", category: "twists" },
  { id: 35, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779229551/Screen_Recording_2026-05-20_012051_y5wm4i.mp4", title: "Twist Sculpting", category: "barrel" },
  { id: 36, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779229551/Screen_Recording_2026-05-20_011938_iotbgi.mp4", title: "TwistOuts", category: "twists" },
  { id: 37, url: "https://res.cloudinary.com/dbaqo3rql/video/upload/v1779229549/Screen_Recording_2026-05-20_011747_lwmit7.mp4", title: "TwistOuts", category: "twists" }
];

const Gallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredVideos, setFilteredVideos] = useState([]);

  const categories = [
    { key: "all", label: "All Work" },
    { key: "cornrows", label: "Cornrows & Braids" },
    { key: "twists", label: "TwistOuts" },
    { key: "barrel", label: "Barrel Twists" }
  ];

  // Category filter logic (same as before)
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredVideos(allVideos);
    } else {
      setFilteredVideos(allVideos.filter(v => v.category === activeCategory));
    }
  }, [activeCategory]);

  const currentIndex = filteredVideos.findIndex(v => v.id === selectedVideo?.id);
  const nextVideo = useCallback(() => {
    const next = (currentIndex + 1) % filteredVideos.length;
    setSelectedVideo(filteredVideos[next]);
  }, [currentIndex, filteredVideos]);

  const prevVideo = useCallback(() => {
    const prev = (currentIndex - 1 + filteredVideos.length) % filteredVideos.length;
    setSelectedVideo(filteredVideos[prev]);
  }, [currentIndex, filteredVideos]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedVideo) return;
      if (e.key === "ArrowRight") nextVideo();
      if (e.key === "ArrowLeft") prevVideo();
      if (e.key === "Escape") setSelectedVideo(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedVideo, currentIndex, nextVideo, prevVideo]);

  return (
    <>
      <Helmet>
        <title>StylesbyMK – Premium Hair Studio | Braids, Twists, Locs in Nairobi</title>
        <meta name="description" content="Experience the art of hair design at StylesbyMK. Book your session for cornrows, twists, barrel twists, locs and more. Premium quality, gold‑standard service." />
        <link rel="canonical" href="https://stylesbymk.vercel.app/" />
      </Helmet>

      <div className="gallery-page">
        <section className="gallery-hero">
          <span className="eyebrow fade-up">In Motion</span>
          <h1 className="gallery-title fade-up">
            The <span className="gold-text italic">Gallery</span>
          </h1>
          <p className="hero-subtitle fade-up">
            Watch our artistry in motion — every style tells a story.
          </p>
          <div className="hero-divider fade-up"><span /></div>
        </section>

        <div className="gallery-filters fade-up">
          {categories.map(cat => (
            <button
              key={cat.key}
              className={`filter-btn ${activeCategory === cat.key ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.key)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="gallery-grid">
          {filteredVideos.map((video) => (
            <div
              key={video.id}
              className="gallery-item"
              onClick={() => setSelectedVideo(video)}
            >
              <video
                src={video.url}
                muted
                loop
                playsInline
                className="gallery-thumbnail"
              />
              <div className="gallery-overlay">
                <h3>{video.title}</h3>
                <span className="play-icon">
                  <i className="fa-solid fa-play"></i>
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox video player */}
        {selectedVideo && (
          <div className="lightbox" onClick={() => setSelectedVideo(null)}>
            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <button className="lightbox-close" onClick={() => setSelectedVideo(null)} aria-label="Close">✕</button>
              <button className="lightbox-prev" onClick={prevVideo} aria-label="Previous video">‹</button>
              <div className="lightbox-video-container">
                <video
                  src={selectedVideo.url}
                  controls
                  autoPlay
                  muted
                  className="lightbox-video"
                />
                <div className="lightbox-caption">
                  <h3>{selectedVideo.title}</h3>
                  <p className="category-badge">
                    {categories.find(c => c.key === selectedVideo.category)?.label || "Style"}
                  </p>
                </div>
              </div>
              <button className="lightbox-next" onClick={nextVideo} aria-label="Next video">›</button>
              <div className="lightbox-counter">
                {currentIndex + 1} / {filteredVideos.length}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Gallery;
