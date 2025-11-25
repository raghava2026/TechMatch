import React from 'react';
import '../styles/Pages.css';

const Clients = () => {
  const clientCategories = {
    'Fortune 500': [
      'Tech Giants & Software Companies',
      'Financial Institutions & Banking',
      'Retail & E-commerce Leaders',
      'Telecommunications & Media',
      'Energy & Utilities',
    ],
    'Mid-Market': [
      'Healthcare Providers',
      'Manufacturing & Industrial',
      'Insurance Companies',
      'Educational Institutions',
      'Hospitality & Travel',
    ],
    Startups: [
      'SaaS & Cloud Platforms',
      'FinTech Solutions',
      'E-commerce & Marketplaces',
      'EdTech Platforms',
      'AI & Analytics Startups',
    ],
  };

  const caseStudies = [
    {
      title: 'Enterprise Cloud Migration',
      company: 'Financial Services Firm',
      challenge: 'Legacy systems causing operational bottlenecks',
      solution: 'Complete cloud migration with zero downtime',
      result: '40% cost reduction, 99.99% uptime',
      badge: 'Cloud Migration',
    },
    {
      title: 'Digital Transformation Initiative',
      company: 'Healthcare Provider',
      challenge: 'Manual processes reducing patient care efficiency',
      solution: 'End-to-end process automation with AI',
      result: '35% efficiency gain, improved patient outcomes',
      badge: 'Digital Transformation',
    },
    {
      title: 'Custom SaaS Platform Development',
      company: 'Tech Startup',
      challenge: 'Need for scalable platform to support rapid growth',
      solution: 'Full-stack SaaS development with microservices',
      result: '10,000+ users in 6 months, Series B funding',
      badge: 'Development',
    },
    {
      title: 'Data Analytics & BI Implementation',
      company: 'Retail Enterprise',
      challenge: 'Lack of real-time business insights',
      solution: 'Advanced analytics platform with real-time dashboards',
      result: '25% revenue increase through data-driven decisions',
      badge: 'Analytics',
    },
    {
      title: 'Cybersecurity & Compliance',
      company: 'Enterprise Corporation',
      challenge: 'Security vulnerabilities and compliance gaps',
      solution: 'Comprehensive security audit and remediation',
      result: 'Zero breaches, full compliance certification',
      badge: 'Security',
    },
    {
      title: 'AI-Powered Automation',
      company: 'Manufacturing Company',
      challenge: 'Production inefficiencies due to manual processes',
      solution: 'Machine learning models for predictive maintenance',
      result: '30% downtime reduction, $5M annual savings',
      badge: 'AI & ML',
    },
  ];

  return (
    <div className="page-container clients-page">
      <section className="content-section">
        <h1>Our Clients & Portfolio</h1>
        <p className="section-intro">
          Trusted by leading organizations across diverse industries worldwide
        </p>

        {/* Client Categories */}
        <div className="clients-grid">
          {Object.entries(clientCategories).map(([category, clients]) => (
            <div key={category} className="client-category">
              <h2>{category}</h2>
              <ul>
                {clients.map((client, index) => (
                  <li key={index}>{client}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Statistics */}
        <div className="client-stats">
          <div className="stat">
            <div className="stat-value">150+</div>
            <p>Projects Delivered</p>
          </div>
          <div className="stat">
            <div className="stat-value">50+</div>
            <p>Enterprise Clients</p>
          </div>
          <div className="stat">
            <div className="stat-value">95%</div>
            <p>Satisfaction Rate</p>
          </div>
          <div className="stat">
            <div className="stat-value">$2B+</div>
            <p>Client Value Created</p>
          </div>
        </div>

        {/* Case Studies */}
        <div className="case-studies">
          <h2>Featured Case Studies</h2>
          <p className="case-intro">
            Proven success stories demonstrating our expertise and commitment to client success
          </p>
          <div className="case-study-grid">
            {caseStudies.map((study, index) => (
              <div key={index} className="case-study-card">
                <div className="case-study-header">
                  <h3>{study.title}</h3>
                  <span className="company-name">{study.company}</span>
                </div>
                <div className="case-study-content">
                  <div className="challenge">
                    <h4>Challenge</h4>
                    <p>{study.challenge}</p>
                  </div>
                  <div className="solution">
                    <h4>Solution</h4>
                    <p>{study.solution}</p>
                  </div>
                  <div className="result">
                    <h4>Results</h4>
                    <p>{study.result}</p>
                  </div>
                </div>
                <span className="badge">{study.badge}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Client Testimonials Section */}
        <div className="testimonials-section">
          <h2>What Our Clients Say</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "TechMatch transformed our legacy infrastructure into a scalable cloud platform. Their expertise
                and dedication were instrumental to our success."
              </p>
              <div className="testimonial-author">
                <strong>CEO</strong>
                <span>Fortune 500 Tech Company</span>
              </div>
              <div className="stars">⭐⭐⭐⭐⭐</div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Working with TechMatch was a game-changer. They understood our business needs and delivered
                solutions that exceeded our expectations."
              </p>
              <div className="testimonial-author">
                <strong>CTO</strong>
                <span>Innovative Startup</span>
              </div>
              <div className="stars">⭐⭐⭐⭐⭐</div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Exceptional service, attention to detail, and remarkable results. TechMatch is our go-to
                partner for all IT consultancy needs."
              </p>
              <div className="testimonial-author">
                <strong>VP Engineering</strong>
                <span>Healthcare Enterprise</span>
              </div>
              <div className="stars">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clients;
