

import React, { useMemo, useState, useRef } from 'react';
import '../styles/Admissions.css';
import { colleges } from '../data/collegesData';
import { IoSearchOutline } from 'react-icons/io5';
const Admissions = () => {
  const [sectionFilter, setSectionFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchInputRef = useRef(null);

  // Colleges and universities list (complete data from user)
 
  // Section-based filters requested by user
  const sections = useMemo(() => [
    'All',
    'Colleges in Bangalore',
    'Universities in Bangalore',
    'Universities in Telangana',
    'Universities in Chennai',
    'North Universities',
  ], []);

  const filteredColleges = useMemo(() => {
    let list;
    switch (sectionFilter) {
      case 'Colleges in Bangalore':
        list = colleges.filter(c => c.region === 'Bangalore' && c.category === 'Engineering');
        break;
      case 'Universities in Bangalore':
        list = colleges.filter(c => c.region === 'Bangalore' && c.category === 'University');
        break;
      case 'Universities in Telangana':
        // Include any college whose region or city indicates Telangana/Hyderabad.
        // User requested "all list of colleges and universities in telengana" —
        // include both 'University' and 'Engineering' categories located in Telangana.
        list = colleges.filter(c => {
          const region = (c.region || '').toString().toLowerCase();
          const city = (c.city || '').toString().toLowerCase();
          const inTelangana = region === 'telangana' || region === 'hyderabad' || city === 'hyderabad';
          const isRelevantCategory = c.category === 'University' || c.category === 'Engineering';
          return inTelangana && isRelevantCategory;
        });
        break;
      case 'Universities in Chennai':
        list = colleges.filter(c => c.region === 'Chennai' && c.category === 'University');
        break;
      case 'North Universities':
        list = colleges.filter(c => ['Jaipur', 'Rajkot', 'Gwalior'].includes(c.region) && c.category === 'University');
        break;
      default:
        list = colleges;
    }

    // Apply search query (case-insensitive) if present
    if (query && query.trim() !== '') {
      const q = query.trim().toLowerCase();
      list = list.filter(c => (c.name || '').toLowerCase().includes(q));
    }

    return list;
  }, [sectionFilter, query]);

  return (
    <div className="page-container admissions-page">
      {/* Hero Section */}
      <section className="admissions-hero">
        <h1 className="admissions-title">Admissions Guidance</h1>
        <p className="admissions-subtitle">
          Explore top colleges and universities across India. Find the perfect institution for your academic journey.
        </p>
        <br></br>
        <a class = "cta-button" href="https://techmatch-schudling.lovable.app">Book Your Session</a>
        
      </section>

      {/* Content Section */}
      <section className="content-section admissions-content">
        {/* Filter Controls (section based) */}
        <div className={`filter-row ${searchOpen ? 'search-open' : ''}`}>
          <div className="filter-group">
            {/* Mobile/Tablet: show select dropdown. Desktop: buttons (CSS controls visibility) */}
            <select
              className="section-select"
              value={sectionFilter}
              onChange={(e) => setSectionFilter(e.target.value)}
              aria-label="Filter sections"
            >
              {sections.map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            <div className="section-buttons">
              {sections.map(s => (
                <button
                  key={s}
                  className={`filter-btn ${sectionFilter === s ? 'active' : ''}`}
                  onClick={() => setSectionFilter(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Search control - visible in all views. On small screens it toggles expansion. */}
          <div className="search-container">
            <button
              className="search-toggle"
              aria-label="Open search"
              onClick={() => {
                setSearchOpen(prev => {
                  const next = !prev;
                  // focus input when opening
                  setTimeout(() => {
                    if (next && searchInputRef.current) searchInputRef.current.focus();
                  }, 120);
                  return next;
                });
              }}
            >
              <IoSearchOutline />
            </button>

            <input
              ref={searchInputRef}
              type="search"
              className="search-input"
              placeholder="Search colleges by name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search colleges"
            />
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
                {/* Use gallery/image if provided, otherwise show a simple placeholder */}
                <img
                  src={college.image || `https://source.unsplash.com/800x600/?college,${encodeURIComponent(college.city || college.region)}&sig=${college.id}`}
                  alt={college.name}
                  className="college-image"
                />
                <div className="college-category-badge">{college.category}</div>
              </div>

              <div className="college-content">
                <h3 className="college-name">{college.name}</h3>
                <p className="college-location"><span className="location-icon">📍</span>{college.city || college.region}</p>
                <p className="college-description">{college.description || ''}</p>

                <a
                  href={college.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="more-info-btn"
                >
                  Visit Website
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredColleges.length === 0 && (
          <div className="no-results">
            <p>No colleges found for the selected filters.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Admissions;


