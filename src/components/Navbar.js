import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { FiSearch, FiMenu, FiX, FiChevronDown, FiLogOut, FiUser } from "react-icons/fi";
import { useAuth } from '../context/AuthContext';
import { signOutUser } from '../firebase';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [signingOut, setSigningOut] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = async () => {
    setSigningOut(true);
    try {
      await signOutUser();
      setProfileMenuOpen(false);
      setMobileMenuOpen(false);
      navigate('/');
    } catch (err) {
      console.error('Sign out failed:', err);
      setSigningOut(false);
    }
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };


  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
          <img src="/assets/techmathch_logo.png" alt="TechMatch" className="logo-image" />
          <span className="brand">TECH <span className="brand-match">MATCH</span></span>
        </Link>
      </div>

      {/* Hamburger Menu Icon - Mobile */}
      <button 
        className="hamburger-menu" 
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Navigation Menu */}
      <ul className={`nav-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
        <li>
          <Link to="/" onClick={closeMobileMenu}>Home</Link>
        </li>
        <li
          className="nav-item-with-submenu"
          onMouseEnter={() => setActiveMenu('services')}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <Link to="/services">Services</Link>
          <ul className={`submenu ${activeMenu === 'services' ? 'active' : ''}`}>
            <li>
              <Link to="/services/admissions" onClick={closeMobileMenu}>Admissions</Link>
            </li>
            <li>
              <Link to="/services/counselling" onClick={closeMobileMenu}>Counselling</Link>
            </li>
            <li>
              <Link to="/services/freelance" onClick={closeMobileMenu}>Freelance</Link>
            </li>
          </ul>
        </li>
        <li
          className="nav-item-with-submenu"
          onMouseEnter={() => setActiveMenu('testimonials')}
          onMouseLeave={() => setActiveMenu(null)}
        >
          <Link to="/testimonials">Testimonials</Link>
          <ul className={`submenu ${activeMenu === 'testimonials' ? 'active' : ''}`}>
            <li>
              <Link to="/testimonials" onClick={closeMobileMenu}>All Testimonials</Link>
            </li>
            <li>
              <Link to="/testimonials" onClick={closeMobileMenu}>Client Stories</Link>
            </li>
            <li>
              <Link to="/testimonials" onClick={closeMobileMenu}>Success Cases</Link>
            </li>
          </ul>
        </li>
        
        <li>
          <Link to="/about" onClick={closeMobileMenu}>About</Link>
        </li>
        <li>
          <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
        </li>
      </ul>

      {/* Search Bar - Center */}
      <div className="navbar-center">
        <div className="search">
          <button className="search-icon" aria-label="Search">
            <FiSearch size={20} />
          </button>
          <input
            type="search"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
              }
            }}
          />
        </div>
      </div>

      {/* User Section - Right */}
      <div className="navbar-right">
        {loading ? (
          <span className="loading-text">Loading...</span>
        ) : user ? (
          <div className="user-profile-menu">
            <button 
              className="profile-button"
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              title="Profile menu"
            >
              <FiUser size={20} />
              <FiChevronDown size={16} className={`chevron ${profileMenuOpen ? 'open' : ''}`} />
            </button>
            
            {/* Profile Dropdown */}
            {profileMenuOpen && (
              <div className="profile-dropdown">
                <div className="profile-header">
                  <div className="profile-avatar">
                    {user.photoURL ? (
                      <img src={user.photoURL} alt={user.displayName || 'User'} />
                    ) : (
                      <div className="avatar-placeholder">
                        {(user.displayName || user.email || 'U').charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="profile-info">
                    <p className="profile-name">{user.displayName || 'User'}</p>
                    <p className="profile-email">{user.email}</p>
                  </div>
                </div>
                
                <hr className="dropdown-divider" />
                
                <div className="dropdown-actions">
                  <Link 
                    to="/dashboard" 
                    className="dropdown-item"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <FiUser size={16} /> Dashboard
                  </Link>
                  <button 
                    className="dropdown-item logout-btn"
                    onClick={handleLogout}
                    disabled={signingOut}
                  >
                    <FiLogOut size={16} /> {signingOut ? 'Signing out...' : 'Sign Out'}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signin" className="btn-get-started">Get Started</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
