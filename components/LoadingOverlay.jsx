import React from 'react';

const LoadingOverlay = ({ isVisible = true }) => {
  return (
    <div
      className={`loading-overlay ${!isVisible ? 'hidden' : ''}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9,
        background: '#000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isVisible ? 1 : 0,
        pointerEvents: isVisible ? 'auto' : 'none',
        transition: 'opacity 0.5s ease-in-out',
      }}
    >
      <div style={{ color: '#868686', fontSize: '1.2rem' }}>Loading...</div>
    </div>
  );
};

export default LoadingOverlay;
