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
                <a href="/projects">Projects</a>
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
                {/* Projects is the canonical replacement for Freelance */}
                <a href="/services/projects">Projects</a>
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
                <a href="tel:+916303319981">R.Yuvaraj +91 63033 19981</a>
              </li>
              <li>
                <a href="tel:+918309583137">sheikh Arif Nawaz +91 83095 83137</a>
              </li>
              <li>#227, #228, 4th Floor, Skanda Mall, Beside D-MART, Ballari Chowrasta, Kurnool - 518003</li>
            </ul>
          </div>
          <div className="footer-section footer-partner">
            {/* FIREBIRD partner card in footer */}
            <h4>Partner</h4>
            <div className="partner-card" style={{cursor: 'pointer'}} onClick={() => window.open('https://firebird.ac.in','_blank','noopener')}>
              <div className="partner-info" style={{display:'inline-block',verticalAlign:'top'}}>
                <div style={{fontWeight:600}}>FIREBIRD — Institute of Research in Management</div>
                <div style={{fontSize:'0.9em'}}>PGDM · Global MBA · PGP</div>
              </div>
            </div>
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