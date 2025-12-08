import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>TechMatch</h3>
            <p>Your partner in digital transformation and IT consultancy solutions.</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/tech-match-073a99392/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <span>in</span>
              </a>
              <a href="https://twitter.com/techmatch" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <span>𝕏</span>
              </a>
              <a href="https://github.com/techmatch" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <span>⚙</span>
              </a>
              <a href="mailto:techmatch2k25@gmail.com" aria-label="Email">
                <span>✉</span>
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/about">About Us</a>
              </li>
              <li>
                <a href="/services">Services</a>
              </li>
              <li>
                <a href="/testimonials">Testimonials</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li>
                <a href="/services/admissions">Admissions</a>
              </li>
              <li>
                <a href="/services/counselling">Counselling</a>
              </li>
              
              <li>
                <a href="/services/freelance">Freelance</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact Info</h4>
            <ul>
              <li>
                <a href="mailto:techmatch2k25@gmail.com">techmatch2k25@gmail.com</a>
              </li>
              <li>
                <a href="tel:+18008324825">+1 (800) TECH-MATCH</a>
              </li>
              <li>123 Tech Street, Innovation City, IC 12345</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} TechMatch. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;