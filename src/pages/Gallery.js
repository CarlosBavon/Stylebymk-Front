import React, { useState, useEffect } from "react";
import "./Gallery.css";
import heartCornrows from "../assets/heartcornrows.png";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredImages, setFilteredImages] = useState([]);

  // Full image collection with categories
  const allImages = [
    { id: 1, url: heartCornrows, title: "Heart Cornrows", category: "cornrows" },
    { id: 2, url: "https://images.unsplash.com/photo-1582095133179-bfd08f2fc215?w=600", title: "Modern Cut", category: "color" },
    { id: 3, url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600", title: "Color Transformation", category: "color" },
    { id: 4, url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600", title: "Bridal Style", category: "bridal" },
    { id: 5, url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600", title: "Luxury Styling", category: "color" },
    { id: 6, url: "https://images.unsplash.com/photo-1582095133179-bfd08f2fc215?w=600", title: "Texture & Volume", category: "color" },
    { id: 7, url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600", title: "Golden Highlights", category: "color" },
    { id: 8, url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600", title: "Sleek & Smooth", category: "bridal" },
    // Additional images for other categories
    { id: 9, url: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600", title: "Classic Cornrows", category: "cornrows" },
    { id: 10, url: "https://images.unsplash.com/photo-1588702547919-26089e3ace6c?w=600", title: "Twisted Updo", category: "twists" },
    { id: 11, url: "https://images.unsplash.com/photo-1594849543504-bf2f3e3e0e2a?w=600", title: "Faux Locs", category: "locs" },
    { id: 12, url: "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?w=600", title: "Bridal Bun", category: "bridal" },
  ];

  // Update filtered images when category changes
  useEffect(() => {
    if (activeCategory === "all") {
      setFilteredImages(allImages);
    } else {
      setFilteredImages(allImages.filter(img => img.category === activeCategory));
    }
  }, [activeCategory]);

  // Category mapping for display
  const categories = [
    { key: "all", label: "All Work", icon: "✨" },
    { key: "cornrows", label: "Cornrows & Braids", icon: "🔲" },
    { key: "twists", label: "Twists", icon: "🌀" },
    { key: "locs", label: "Locs", icon: "🌿" },
    { key: "bridal", label: "Bridal", icon: "💍" },
    { key: "color", label: "Color & Style", icon: "🎨" }
  ];

  // Handle lightbox navigation
  const currentIndex = filteredImages.findIndex(img => img.id === selectedImage?.id);
  const nextImage = () => {
    const next = (currentIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[next]);
  };
  const prevImage = () => {
    const prev = (currentIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prev]);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") setSelectedImage(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, currentIndex]);

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>
          The <span className="gold-text">Gallery</span>
        </h1>
        <p className="gallery-subtitle">A showcase of our finest work – every style tells a story</p>
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
        {filteredImages.map((image) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => setSelectedImage(image)}
          >
            <img src={image.url} alt={image.title} loading="lazy" />
            <div className="gallery-overlay">
              <h3>{image.title}</h3>
              <span className="view-icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="lightbox-close" onClick={() => setSelectedImage(null)}>✕</button>
            <button className="lightbox-prev" onClick={prevImage}>‹</button>
            <div className="lightbox-image-container">
              <img src={selectedImage.url} alt={selectedImage.title} />
              <div className="lightbox-caption">
                <h3>{selectedImage.title}</h3>
                <p className="category-badge">
                  {categories.find(c => c.key === selectedImage.category)?.label || "Style"}
                </p>
              </div>
            </div>
            <button className="lightbox-next" onClick={nextImage}>›</button>
            <div className="lightbox-counter">
              {currentIndex + 1} / {filteredImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
