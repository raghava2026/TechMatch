import React from 'react';
import '../styles/Pages.css';

const About = () => {
  return (
    <div className="page-container about-page">
      <section className="content-section">
        <h1>About TechMatch</h1>

        {/* Main Content */}
        <div className="content-grid">
          <div className="content-block highlight">
            <h2>Who We Are</h2>
            <p>
              TechMatch is a premier IT consultancy firm specializing in digital transformation, cloud solutions,
              and custom software development. With over 15 years of industry experience, we've successfully guided
              150+ organizations through their digital journeys, from Fortune 500 enterprises to innovative startups.
            </p>
            <p>
              Our team of expert consultants brings deep technical knowledge and strategic business acumen to every
              project, ensuring that technology investments directly drive business value and competitive advantage.
            </p>
          </div>

          <div className="content-block">
            <h2>Our Vision</h2>
            <p>
              To be the most trusted partner for businesses seeking technology-driven growth and operational
              excellence. We envision a world where organizations leverage technology not just as a tool, but as a
              strategic catalyst for innovation and sustainable growth.
            </p>
          </div>

          <div className="content-block">
            <h2>Our Mission</h2>
            <p>
              To bridge the gap between complex technology and business objectives. We're committed to delivering
              solutions that are not only technically sound but strategically aligned with each client's unique
              challenges and opportunities.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="values-section">
          <h2>Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Innovation</h3>
              <p>Constantly pushing boundaries and embracing emerging technologies to create cutting-edge solutions</p>
            </div>
            <div className="value-card">
              <div className="value-icon">⭐</div>
              <h3>Excellence</h3>
              <p>Delivering exceptional quality in every project, every interaction, and every deliverable</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Collaboration</h3>
              <p>Working closely with clients as true partners, understanding their vision and making it reality</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🛡️</div>
              <h3>Integrity</h3>
              <p>Maintaining the highest ethical standards and being transparent in all our business dealings</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💼</div>
              <h3>Professionalism</h3>
              <p>Bringing expertise, accountability, and dedication to every engagement and partnership</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Growth</h3>
              <p>Investing in continuous learning and development for our team and our clients</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="team-section">
          <h2>Why Our Clients Choose Us</h2>
          <ul className="checklist">
            <li>15+ years of proven industry experience</li>
            <li>150+ successful projects across diverse industries</li>
            <li>98% client satisfaction and retention rate</li>
            <li>Team of certified cloud architects and solution designers</li>
            <li>End-to-end support from strategy to implementation</li>
            <li>24/7 dedicated support and maintenance services</li>
            <li>Flexible engagement models tailored to your needs</li>
            <li>Proven track record with Fortune 500 companies</li>
          </ul>
        </div>
      </section>
    </div>
  );
};

export default About;
