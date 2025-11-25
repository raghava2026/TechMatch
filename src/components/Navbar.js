import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-logo">
          <img src="/assets/techmathch_logo.png" alt="TechMatch" className="logo-image" />
          <span className="brand">TECH <span className="brand-match">MATCH</span></span>
        </Link>
      </div>
      <ul className="nav-menu">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li
          className="nav-item-with-submenu"
          onMouseEnter={() => setActiveMenu('clients')}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <Link to="/clients">Clients</Link>
          <ul className={`submenu ${activeMenu === 'clients' ? 'active' : ''}`}>
            <li>
              <Link to="/clients">Fortune 500</Link>
            </li>
            <li>
              <Link to="/clients">Startups</Link>
            </li>
            <li>
              <Link to="/clients">Enterprises</Link>
            </li>
          </ul>
        </li>
        <li
          className="nav-item-with-submenu"
          onMouseEnter={() => setActiveMenu('services')}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <Link to="/services">Services</Link>
          <ul className={`submenu ${activeMenu === 'services' ? 'active' : ''}`}>
            <li>
              <Link to="/services">Cloud Consulting</Link>
            </li>
            <li>
              <Link to="/services">Digital Transformation</Link>
            </li>
            <li>
              <Link to="/services">Custom Development</Link>
            </li>
          </ul>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      <div className="navbar-center">
        <div className="search">
          <button className="search-icon" aria-label="Search">
            🔍
          </button>
          <input
            type="search"
            placeholder="Search services or information..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // Navigate to search results page (simple approach: use query param)
                window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
              }
            }}
          />
        </div>
      </div>

      <div className="navbar-right">
        <Link to="/signin" className="btn-get-started">Get Started</Link>
      </div>
    </nav>
  );
};

export default Navbar;
