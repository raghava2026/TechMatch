import React from 'react';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel';
import ClientSlider from '../components/ClientSlider';
import '../styles/Pages.css';

const Home = () => {
  return (
    <div className="page-container home-page">
      {/* Carousel placed first */}
      <Carousel />

      {/* Client Slider */}
      <ClientSlider />
 
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Digital Transformation Starts Here</h1>
          <p className="hero-subtitle">Partner with TechMatch for cutting-edge IT consultancy solutions</p>
          <div className="hero-buttons">
            <Link to="/signin" className="cta-button primary">
              Get Started
            </Link>
            <Link to="/services" className="cta-button secondary">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2>Why Choose TechMatch?</h2>
          <p>We combine expertise, innovation, and dedication to deliver exceptional results</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">💡</div>
            <h3>Expert Consultation</h3>
            <p>Leverage decades of combined expertise in IT strategy, cloud architecture, and digital innovation.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Proven Results</h3>
            <p>Trusted by Fortune 500 companies and innovative startups. 95% client satisfaction rate.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Custom Solutions</h3>
            <p>Tailored strategies that align perfectly with your unique business goals and objectives.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast Implementation</h3>
            <p>Rapid deployment cycles without compromising on quality or security standards.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Enterprise Security</h3>
            <p>Industry-leading security practices and compliance certifications for your peace of mind.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Scalability</h3>
            <p>Solutions designed to grow with your business from startup to enterprise level.</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">150+</div>
            <div className="stat-label">Projects Completed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">50+</div>
            <div className="stat-label">Enterprise Clients</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">15+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">98%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Transform Your Business?</h2>
        <p>Let's work together to achieve your digital transformation goals</p>
        <Link to="/booking" className="cta-button large">
          Schedule a Consultation Today
        </Link>
      </section>
    </div>
  );
};

export default Home;
