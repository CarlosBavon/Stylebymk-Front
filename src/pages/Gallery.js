import React, { useState, useEffect } from "react";
import "./Gallery.css";

const Gallery = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredVideos, setFilteredVideos] = useState([]);

  // Sample video collection (replace with your own MP4/YouTube URLs)
  const allVideos = [
    {
      id: 1,
      url: "https://assets.mixkit.co/videos/preview/mixkit-hairdresser-cutting-hair-32157-large.mp4",
      poster: "https://assets.mixkit.co/videos/preview/mixkit-hairdresser-cutting-hair-32157-large.jpg",
      title: "Haircut & Style",
      category: "cornrows"
    },
    {
      id: 2,
      url: "https://assets.mixkit.co/videos/preview/mixkit-woman-dying-her-hair-32182-large.mp4",
      poster: "https://assets.mixkit.co/videos/preview/mixkit-woman-dying-her-hair-32182-large.jpg",
      title: "Color Transformation",
      category: "color"
    },
    {
      id: 3,
      url: "https://assets.mixkit.co/videos/preview/mixkit-hair-stylist-braiding-hair-32185-large.mp4",
      poster: "https://assets.mixkit.co/videos/preview/mixkit-hair-stylist-braiding-hair-32185-large.jpg",
      title: "Braiding Artistry",
      category: "cornrows"
    },
    {
      id: 4,
      url: "https://assets.mixkit.co/videos/preview/mixkit-bridal-hair-styling-32188-large.mp4",
      poster: "https://assets.mixkit.co/videos/preview/mixkit-bridal-hair-styling-32188-large.jpg",
      title: "Bridal Elegance",
      category: "bridal"
    },
    {
      id: 5,
      url: "https://assets.mixkit.co/videos/preview/mixkit-woman-styling-her-hair-32189-large.mp4",
      poster: "https://assets.mixkit.co/videos/preview/mixkit-woman-styling-her-hair-32189-large.jpg",
      title: "Everyday Glam",
      category: "color"
    },
    {
      id: 6,
      url: "https://assets.mixkit.co/videos/preview/mixkit-hairdresser-using-scissors-32192-large.mp4",
      poster: "https://assets.mixkit.co/videos/preview/mixkit-hairdresser-using-scissors-32192-large.jpg",
      title: "Precision Cut",
      category: "color"
    },
    {
      id: 7,
      url: "https://assets.mixkit.co/videos/preview/mixkit-woman-getting-her-hair-curled-32194-large.mp4",
      poster: "https://assets.mixkit.co/videos/preview/mixkit-woman-getting-her-hair-curled-32194-large.jpg",
      title: "Curling Magic",
      category: "bridal"
    },
    {
      id: 8,
      url: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-brushing-her-hair-32195-large.mp4",
      poster: "https://assets.mixkit.co/videos/preview/mixkit-young-woman-brushing-her-hair-32195-large.jpg",
      title: "Silky Smooth",
      category: "color"
    }
  ];

  // Category filter logic (same as before)
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredVideos(allVideos);
    } else {
      setFilteredVideos(allVideos.filter(v => v.category === activeCategory));
    }
  }, [activeCategory]);

  const categories = [
    { key: "all", label: "All Work", icon: "✨" },
    { key: "cornrows", label: "Cornrows & Braids", icon: "🔲" },
    { key: "bridal", label: "Bridal", icon: "💍" },
    { key: "color", label: "Color & Style", icon: "🎨" }
  ];

  // Lightbox navigation
  const currentIndex = filteredVideos.findIndex(v => v.id === selectedVideo?.id);
  const nextVideo = () => {
    const next = (currentIndex + 1) % filteredVideos.length;
    setSelectedVideo(filteredVideos[next]);
  };
  const prevVideo = () => {
    const prev = (currentIndex - 1 + filteredVideos.length) % filteredVideos.length;
    setSelectedVideo(filteredVideos[prev]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedVideo) return;
      if (e.key === "ArrowRight") nextVideo();
      if (e.key === "ArrowLeft") prevVideo();
      if (e.key === "Escape") setSelectedVideo(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedVideo, currentIndex]);

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>
          The <span className="gold-text">Video Gallery</span>
        </h1>
        <p className="gallery-subtitle">Watch our artistry in motion – every style tells a story</p>
      </div>

      {/* Category filters */}
      <div className="gallery-filters">
        {categories.map(cat => (
          <button
            key={cat.key}
            className={`filter-btn ${activeCategory === cat.key ? "active" : ""}`}
            onClick={() => setActiveCategory(cat.key)}
          >
            <span className="filter-icon">{cat.icon}</span>
            <span className="filter-label">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Masonry grid */}
      <div className="gallery-grid">
        {filteredVideos.map((video) => (
          <div
            key={video.id}
            className="gallery-item"
            onClick={() => setSelectedVideo(video)}
          >
            <img src={video.poster} alt={video.title} loading="lazy" />
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
            <button className="lightbox-close" onClick={() => setSelectedVideo(null)}>✕</button>
            <button className="lightbox-prev" onClick={prevVideo}>‹</button>
            <div className="lightbox-video-container">
              <video
                src={selectedVideo.url}
                poster={selectedVideo.poster}
                controls
                autoPlay
                className="lightbox-video"
              />
              <div className="lightbox-caption">
                <h3>{selectedVideo.title}</h3>
                <p className="category-badge">
                  {categories.find(c => c.key === selectedVideo.category)?.label || "Style"}
                </p>
              </div>
            </div>
            <button className="lightbox-next" onClick={nextVideo}>›</button>
            <div className="lightbox-counter">
              {currentIndex + 1} / {filteredVideos.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
