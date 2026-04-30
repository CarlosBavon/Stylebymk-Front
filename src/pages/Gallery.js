import React, { useState } from "react";
import "./Gallery.css";
import heartCornrows from "../assets/heartcornrows.png";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      id: 1,
      url: heartCornrows,
      title: "Heart Cornrows",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1582095133179-bfd08f2fc215?w=600",
      title: "Modern Cut",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600",
      title: "Color Transformation",
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600",
      title: "Bridal Style",
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=600",
      title: "Luxury Styling",
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1582095133179-bfd08f2fc215?w=600",
      title: "Texture & Volume",
    },
    {
      id: 7,
      url: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=600",
      title: "Golden Highlights",
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600",
      title: "Sleek & Smooth",
    },
  ];

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <h1>
          The <span className="gold-text">Portfolio</span>
        </h1>
        <p>A showcase of our finest work</p>
      </div>

      <div className="gallery-grid">
        {images.map((image) => (
          <div
            key={image.id}
            className="gallery-item"
            onClick={() => setSelectedImage(image)}
          >
            <img src={image.url} alt={image.title} />
            <div className="gallery-overlay">
              <h3>{image.title}</h3>
              <span className="view-icon">
                <i class="fa-solid fa-magnifying-glass"></i>
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="lightbox" onClick={() => setSelectedImage(null)}>
          <div className="lightbox-content">
            <img src={selectedImage.url} alt={selectedImage.title} />
            <h3>{selectedImage.title}</h3>
            <button className="close-btn">✕</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
