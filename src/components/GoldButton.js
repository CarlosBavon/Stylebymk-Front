import React from 'react';
import './GoldButton.css';

const GoldButton = ({ children, onClick, to, type = 'button', variant = 'solid' }) => {
  const buttonClass = `gold-button ${variant === 'outline' ? 'gold-button-outline' : ''}`;
  
  if (to) {
    return (
      <a href={to} className={buttonClass}>
        <span className="button-text">{children}</span>
        <span className="button-glow"></span>
      </a>
    );
  }
  
  return (
    <button type={type} className={buttonClass} onClick={onClick}>
      <span className="button-text">{children}</span>
      <span className="button-glow"></span>
    </button>
  );
};

export default GoldButton;