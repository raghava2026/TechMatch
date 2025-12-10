import React from 'react';
import '../styles/ClientSlider.css';

const ClientSlider = () => {
  // Client logos - using sample images; replace with actual client logos
  const clientLogos = [
    
    'https://gyaanarth.com/wp-content/uploads/2022/04/NIMS-uni-logo-1.png',
	'https://i.pinimg.com/736x/0d/34/ed/0d34edae95e038a379e38d50e9174538.jpg',
	'https://admission.itmuniversity.ac.in/LP/admission/logos/logo.png',
	'https://bvrit.ac.in/wp-content/uploads/2023/04/BVRIT-engineering-technology-college-logo-narsapur.webp'

  ];

  return (
    
      
      <div className="slider">
        <div className="slide-track">
          {/* First set of logos */}
          {clientLogos.map((logo, idx) => (
            <div key={`logo-1-${idx}`} className="slide">
              <img src={logo} height="150" width="250" alt="Client logo" />
            </div>
          ))}
          {/* Duplicate set for seamless infinite scroll */}
          {clientLogos.map((logo, idx) => (
            <div key={`logo-2-${idx}`} className="slide">
              <img src={logo} height="100" width="250" alt="Client logo" />
            </div>
          ))}
        </div>
      </div>
   
  );
};

export default ClientSlider;