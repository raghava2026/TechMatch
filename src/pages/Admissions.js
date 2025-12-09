import React, { useState } from 'react';
import '../styles/Admissions.css';
import { colleges } from '../data/collegesData';
const Admissions = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Get unique categories from colleges
  const categories = ['All', ...new Set(colleges.map(college => college.category))];

  // Filter colleges based on active filter
  const filteredColleges = activeFilter === 'All' 
    ? colleges 
    : colleges.filter(college => college.category === activeFilter);

  return (
    <div className="page-container admissions-page">
      {/* Hero Section */}
      <section className="admissions-hero">
        <h1 className="admissions-title">Admissions Guidance</h1>
        <p className="admissions-subtitle">
          Explore top colleges and universities across India. Find the perfect institution for your academic journey.
        </p>
      </section>

      {/* Content Section */}
      <section className="content-section admissions-content">
        {/* Filter Buttons */}
        <div className="filter-container">
          <div className="filter-buttons">
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="results-info">
          <p>Showing {filteredColleges.length} college{filteredColleges.length !== 1 ? 's' : ''}</p>
        </div>

        {/* College Grid */}
        <div className="colleges-grid">
          {filteredColleges.map(college => (
            <div key={college.id} className="college-card">
              <div className="college-image-wrapper">
                <img 
                  src={college.image} 
                  alt={college.name}
                  className="college-image"
                />
                <div className="college-category-badge">{college.region}</div>
              </div>

              <div className="college-content">
                <h3 className="college-name">{college.name}</h3>
                <p className="college-location">
                  <span className="location-icon">📍</span>
                  {college.city}
                </p>
                <p className="college-description">{college.description}</p>

                <a 
                  href={college.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="more-info-btn"
                >
                  More Info
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredColleges.length === 0 && (
          <div className="no-results">
            <p>No colleges found in this category.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Admissions;
