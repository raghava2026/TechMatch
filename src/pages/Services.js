import React from 'react';
import '../styles/Pages.css';

const Services = () => {
  const services = [
    {
      id: 'cloud',
      title: 'Cloud Consulting',
      icon: '☁️',
      description: 'Migrate, optimize, and manage your cloud infrastructure with expert guidance.',
      features: ['Cloud architecture design', 'Migration strategy', 'Cost optimization', 'Multi-cloud management'],
    },
    {
      id: 'digital',
      title: 'Digital Transformation',
      icon: '🔄',
      description: 'Modernize your business processes with cutting-edge technology solutions.',
      features: ['Process optimization', 'Legacy system modernization', 'Automation', 'Business model innovation'],
    },
    {
      id: 'development',
      title: 'Custom Development',
      icon: '💻',
      description: 'Build tailored software solutions that drive your business forward.',
      features: ['Full-stack development', 'Mobile applications', 'Enterprise solutions', 'API development'],
    },
    {
      id: 'data',
      title: 'Data Analytics',
      icon: '📊',
      description: 'Unlock insights from your data to make informed business decisions.',
      features: ['Business intelligence', 'Data warehousing', 'Predictive analytics', 'Real-time dashboards'],
    },
    {
      id: 'security',
      title: 'Cybersecurity',
      icon: '🔒',
      description: 'Protect your assets with comprehensive security solutions and strategies.',
      features: ['Security audits', 'Compliance management', 'Threat detection', 'Incident response'],
    },
    {
      id: 'ai',
      title: 'AI & Machine Learning',
      icon: '🤖',
      description: 'Leverage AI to automate processes and enhance decision-making.',
      features: ['ML model development', 'Process automation', 'NLP solutions', 'Predictive algorithms'],
    },
  ];

  return (
    <div className="page-container services-page">
      <section className="content-section">
        <h1>Our Services</h1>
        <p className="section-intro">
          Comprehensive IT solutions tailored to drive your digital transformation journey
        </p>

        <div className="services-grid">
          {services.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <div className="service-features">
                <h4>What's Included:</h4>
                <ul>
                  {service.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
              <button className="learn-more">Learn More →</button>
            </div>
          ))}
        </div>

        {/* Service Process Section */}
        <div className="service-process">
          <h2>Our Service Delivery Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h4>Discovery & Assessment</h4>
              <p>In-depth analysis of your current systems, challenges, and business objectives</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h4>Strategy Development</h4>
              <p>Comprehensive roadmap aligned with your business goals and timelines</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h4>Implementation</h4>
              <p>Agile execution with regular milestones and transparent communication</p>
            </div>
            <div className="process-arrow">→</div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h4>Optimization</h4>
              <p>Continuous monitoring, support, and optimization for maximum ROI</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
