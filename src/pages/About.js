import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';

const About = () => {
  return (
    <div className="page-container about-page">
      <section className="content-section about-hero" aria-labelledby="about-hero-title">
        <div className="about-hero-inner">
          <div className="about-hero-text">
            <h1 id="about-hero-title">About TechMatch</h1>
            <p className="lead">
              We help organizations accelerate growth through practical cloud strategies, resilient engineering,
              and clear delivery. Our approach blends technical excellence with business focus so every project
              drives measurable results.
            </p>
            <div className="about-hero-cta">
              <a className="cta-button primary" href="/services">Our Services</a>
              <a className="cta-button secondary" href="/contact">Contact Us</a>
            </div>
          </div>
          <div className="about-hero-media">
            <img src="/assets/about-hero.jpg" alt="TechMatch team working together" onError={(e)=>{e.target.style.display='none'}} />
          </div>
        </div>
      </section>

      <section className="content-section about-content" aria-labelledby="about-content-title">
        {/* JSON-LD structured data for Organization and WebPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "TechMatch",
            "url": typeof window !== 'undefined' ? window.location.origin : 'https://example.com',
            "logo": typeof window !== 'undefined' ? `${window.location.origin}/assets/logo.png` : '/assets/logo.png',
            "contactPoint": [{
              "@type": "ContactPoint",
              "telephone": "+91-6303319981",
              "contactType": "customer service"
            }]
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "About - TechMatch",
            "description": "TechMatch is a technology consulting firm focused on secure, scalable solutions and cloud transformation",
            "url": typeof window !== 'undefined' ? window.location.href : 'https://example.com/about'
          })}
        </script>
        <div className="about-content-grid">
          <article className="about-text">
            <h2 id="about-content-title">Who we are</h2>
            <p>
              TechMatch is a technology consulting firm focused on delivering secure, scalable, and maintainable
              solutions. We work with companies of all sizes — from startups to enterprises — to modernize platforms,
              migrate to cloud, and build customer-facing applications.
            </p>
            <p>
              Our teams include certified cloud architects, software engineers, and product-minded strategists who
              partner with stakeholders to set realistic roadmaps and then deliver with discipline.
            </p>
          </article>

          <aside className="about-quick-stats">
            <div className="stat">
              <div className="stat-number">15+</div>
              <div className="stat-label">Years experience</div>
            </div>
            <div className="stat">
              <div className="stat-number">150+</div>
              <div className="stat-label">Projects delivered</div>
            </div>
            <div className="stat">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Client support</div>
            </div>
          </aside>
        </div>

        <div className="about-features">
          <div className="feature-card small">
            <div className="feature-icon">⚙️</div>
            <h4>Engineering Excellence</h4>
            <p>Robust code, repeatable processes, and strong testing practices.</p>
          </div>
          <div className="feature-card small">
            <div className="feature-icon">☁️</div>
            <h4>Cloud-First</h4>
            <p>Cost-effective, scalable cloud architecture and migrations.</p>
          </div>
          <div className="feature-card small">
            <div className="feature-icon">🔒</div>
            <h4>Security</h4>
            <p>Security embedded into design, infrastructure, and delivery.</p>
          </div>
        </div>

        {/* Team section - professional team cards */}
        <div className="team-section" aria-labelledby="team-title">
          <h2 id="team-title">Meet the Team</h2>
          <p className="section-intro">Our leadership blends engineering, delivery, and security expertise.</p>
          <div className="team-grid">
            <div className="team-card">
              <img className="team-avatar" src="/assets/team1.jpg" alt="Asha Rao, CTO" onError={(e)=>{e.target.src='/assets/avatar-placeholder.png'}} />
              <div className="team-card-body">
                <h3>Asha Rao</h3>
                <p className="team-role">CTO</p>
                <p className="team-bio">Expert in cloud architecture and platform engineering, leading large-scale migrations and platform builds.</p>
              </div>
            </div>

            <div className="team-card">
              <img className="team-avatar" src="/assets/yuvaraj.jpg" alt="Yuvaraj, Co-Founder" onError={(e)=>{e.target.src='/assets/avatar-placeholder.png'}} />
              <div className="team-card-body">
                <h3>Yuvaraj</h3>
                <p className="team-role">Co-Founder & Lead Admissions Counsellor</p>
                <p className="team-bio">Former college counsellor with deep experience in Andhra Pradesh entrance guidance, student mentoring and partner relations.</p>
                <p className="team-contact"><a href="tel:+916303319981">+91 63033 19981</a></p>
              </div>
            </div>

            <div className="team-card">
              <img className="team-avatar" src="/assets/nani.jpg" alt="Nani Prasad, Operations" onError={(e)=>{e.target.src='/assets/avatar-placeholder.png'}} />
              <div className="team-card-body">
                <h3>Nani Prasad</h3>
                <p className="team-role">Operations & Program Manager</p>
                <p className="team-bio">Handles program logistics, school campaigns and operational delivery across Andhra Pradesh and Karnataka.</p>
              </div>
            </div>

            <div className="team-card">
              <img className="team-avatar" src="/assets/arif.jpg" alt="Arif Nawaz, Partnerships" onError={(e)=>{e.target.src='/assets/avatar-placeholder.png'}} />
              <div className="team-card-body">
                <h3>Arif Nawaz</h3>
                <p className="team-role">Partnerships & External Relations</p>
                <p className="team-bio">Builds and maintains partner relationships, industry linkages and program collaborations.</p>
                <p className="team-contact"><a href="tel:+918309583137">+91 83095 83137</a></p>
              </div>
            </div>

            <div className="team-card">
              <img className="team-avatar" src="/assets/team2.jpg" alt="Daniel Kim, Head of Delivery" onError={(e)=>{e.target.src='/assets/avatar-placeholder.png'}} />
              <div className="team-card-body">
                <h3>Daniel Kim</h3>
                <p className="team-role">Head of Delivery</p>
                <p className="team-bio">Focused on execution excellence and client success across enterprise engagements.</p>
              </div>
            </div>

            <div className="team-card">
              <img className="team-avatar" src="/assets/team3.jpg" alt="Maya Singh, Head of Security" onError={(e)=>{e.target.src='/assets/avatar-placeholder.png'}} />
              <div className="team-card-body">
                <h3>Maya Singh</h3>
                <p className="team-role">Head of Security</p>
                <p className="team-bio">Drives secure-by-design programs, compliance and threat modeling for critical systems.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="content-section about-cta">
        <div className="cta-box">
          <h2>Ready to get started?</h2>
          <p>Book a free consultation and we'll map a practical plan for your next digital milestone.</p>
          <div className="about-hero-cta">
            <Link className="cta-button primary" to="/booking">Book Consultation</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
