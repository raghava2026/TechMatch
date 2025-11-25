import React from 'react';

const MainContent = ({ isVisible = false, children }) => {
  return (
    <div
      className={`main-content ${isVisible ? 'visible' : ''}`}
      style={{
        position: 'relative',
        zIndex: 2,
        minHeight: '100vh',
        opacity: isVisible ? 1 : 0,
        visibility: isVisible ? 'visible' : 'hidden',
        transition: isVisible
          ? 'opacity 1.2s ease-in-out 0.3s, visibility 1.2s 0.3s'
          : 'opacity 1.2s ease-in-out, visibility 1.2s',
        overflowY: 'auto',
      }}
    >
      {children}
    </div>
  );
};

export default MainContent;
