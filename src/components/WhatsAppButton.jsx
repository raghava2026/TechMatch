import React, { useState } from 'react';
import { FiMessageCircle } from 'react-icons/fi';
import { openWhatsApp } from '../config/contactConfig';
import '../styles/WhatsAppButton.css';

const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleWhatsAppClick = () => {
    openWhatsApp();
  };

  return (
    <div
      className="whatsapp-button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleWhatsAppClick}
      role="button"
      tabIndex={0}
      aria-label="Contact us on WhatsApp"
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleWhatsAppClick();
        }
      }}
    >
      <div className={`whatsapp-icon-wrapper ${isHovered ? 'hovered' : ''}`}>
        <FiMessageCircle size={28} className="whatsapp-icon" />
      </div>
      {isHovered && (
        <div className="whatsapp-tooltip">
          Message us on WhatsApp
        </div>
      )}
    </div>
  );
};

export default WhatsAppButton;
