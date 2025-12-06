import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/ServiceDetails.css';

const ServiceDetails = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const servicesData = {
    admissions: {
      icon: '🎓',
      title: 'Admissions (Domestic & International)',
      tagline: '"Your journey to the right college starts with the right guidance."',
      color: '#ff9c33ff',
      lightColor: 'rgba(255, 112, 41, 0.08)',
      overview: {
        description: 'Our comprehensive admissions support service is designed to guide you through every step of your educational journey. Whether you\'re seeking admission to premier domestic institutions or prestigious international universities, we provide end-to-end support with proven expertise and personalized guidance.',
        image: '🎓',
      },
      sections: [
        {
          title: 'College & Course Shortlisting',
          description: 'We analyze your academic profile, career goals, and aspirations to curate a personalized list of colleges and courses that align with your objectives. Our database includes verified information about top institutions worldwide.',
          benefits: [
            'Personalized college recommendations',
            'Course-specific career prospects',
            'Institution reputation analysis',
            'Location & lifestyle considerations',
          ],
        },
        {
          title: 'Domestic & International Admission Support',
          description: 'Our experts guide you through application procedures, eligibility requirements, and institutional nuances for both domestic and international universities. We ensure you meet all deadlines and requirements.',
          benefits: [
            'Step-by-step application guidance',
            'Eligibility verification',
            'Application timeline management',
            'Direct coordination with institutions',
          ],
        },
        {
          title: 'Application, SOP & LOR Assistance',
          description: 'Craft compelling applications that stand out. We help you write impactful Statements of Purpose and guide recommenders in creating strong Letters of Recommendation that highlight your strengths.',
          benefits: [
            'SOP brainstorming & drafting',
            'Multiple revision rounds',
            'LOR recommender guidance',
            'Application essay enhancement',
          ],
        },
        {
          title: 'Entrance & Interview Guidance',
          description: 'Ace your entrance exams and interviews with our comprehensive preparation program. Mock tests, interview coaching, and personalized strategies to boost your confidence.',
          benefits: [
            'Mock test series',
            'Interview preparation sessions',
            'Exam strategy development',
            'Performance analysis & feedback',
          ],
        },
        {
          title: 'Verified College Info & Direct Links',
          description: 'Access our curated database of verified college information with direct links to official portals, application systems, and institutional resources. Never miss important deadlines or information.',
          benefits: [
            'Verified institution databases',
            'Direct application portals',
            'Scholarship information',
            'Alumni network connections',
          ],
        },
      ],
      stats: [
        { number: '500+', label: 'Partner Institutions' },
        { number: '95%', label: 'Success Rate' },
        { number: '40+', label: 'Countries Covered' },
        { number: '2000+', label: 'Students Admitted' },
      ],
      process: [
        { step: 1, title: 'Profile Assessment', desc: 'Evaluate your academic profile and aspirations' },
        { step: 2, title: 'College Shortlist', desc: 'Create personalized list of target institutions' },
        { step: 3, title: 'Application Prep', desc: 'Prepare all documents and essays' },
        { step: 4, title: 'Submission', desc: 'Submit applications with regular follow-ups' },
        { step: 5, title: 'Interview Ready', desc: 'Prepare for interviews and selections' },
        { step: 6, title: 'Admission Success', desc: 'Finalize enrollment and visa process' },
      ],
    },
    counselling: {
      icon: '🧠',
      title: 'Counselling & Career Guidance',
      tagline: '"Clarity today creates confidence tomorrow."',
      color: '#FFA91B',
      lightColor: 'rgba(255, 169, 27, 0.08)',
      overview: {
        description: 'Discover your true potential with personalized career counselling from experienced mentors. Our holistic approach combines psychological assessment, career exploration, and strategic planning to guide you toward fulfilling career paths.',
        image: '🧠',
      },
      sections: [
        {
          title: '1-on-1 Expert Counselling',
          description: 'Personalized one-on-one sessions with experienced career counsellors who understand your unique strengths, interests, and aspirations. Build a trusted relationship with your mentor throughout your journey.',
          benefits: [
            'Dedicated career mentor',
            'Flexible scheduling',
            'Confidential discussions',
            'Personalized roadmap creation',
          ],
        },
        {
          title: 'Course & Career Planning',
          description: 'Strategic planning to align your educational choices with long-term career goals. Explore emerging career paths, industry trends, and skill requirements for your desired profession.',
          benefits: [
            'Career exploration tools',
            'Industry research reports',
            'Skills gap analysis',
            'Learning path recommendations',
          ],
        },
        {
          title: 'UG / PG / Abroad Guidance',
          description: 'Comprehensive guidance for undergraduate, postgraduate, and international studies. Navigate different educational pathways and make informed decisions about your academic future.',
          benefits: [
            'UG specialization guidance',
            'PG program selection',
            'Abroad education planning',
            'Visa & immigration insights',
          ],
        },
        {
          title: 'Scholarship & Fee Insights',
          description: 'Navigate the financial aspect of education. We provide detailed scholarship information, financial aid guidance, and cost-effective study options to make education affordable.',
          benefits: [
            'Scholarship database access',
            'Fee structure comparison',
            'Financial aid assistance',
            'Education loan guidance',
          ],
        },
        {
          title: 'Google Meet Sessions',
          description: 'Convenient online sessions via Google Meet allowing flexible scheduling from the comfort of your home. Direct interaction with expert counsellors whenever you need guidance.',
          benefits: [
            'Real-time video counselling',
            'Screen sharing capabilities',
            'Recording option for review',
            'Flexible time zones',
          ],
        },
        {
          title: 'Parent Counselling Support',
          description: 'Engage parents in the decision-making process. We conduct parent sessions to ensure family alignment with educational and career decisions, reducing stress and building confidence.',
          benefits: [
            'Family counselling sessions',
            'Parent-child discussion facilitation',
            'Expectation alignment',
            'Support system building',
          ],
        },
      ],
      stats: [
        { number: '1500+', label: 'Students Guided' },
        { number: '100%', label: 'Client Satisfaction' },
        { number: '50+', label: 'Expert Counsellors' },
        { number: '15+', label: 'Years Combined Experience' },
      ],
      process: [
        { step: 1, title: 'Assessment', desc: 'Personality & career interest assessment' },
        { step: 2, title: 'Exploration', desc: 'Explore various career options' },
        { step: 3, title: 'Planning', desc: 'Develop comprehensive career roadmap' },
        { step: 4, title: 'Action', desc: 'Execute plans with regular check-ins' },
        { step: 5, title: 'Support', desc: 'Ongoing support through transitions' },
      ],
    },
    freelance: {
      icon: '✨',
      title: 'Freelance & Student Support Services',
      tagline: '"Helping you grow beyond the classroom."',
      color: '#FF7041',
      lightColor: 'rgba(255, 112, 41, 0.08)',
      overview: {
        description: 'Accelerate your professional growth with comprehensive support for freelance projects, resume building, and skill development. We help you transition from student to confident professional ready for the real world.',
        image: '✨',
      },
      sections: [
        {
          title: 'Freelance Project Assistance',
          description: 'Get expert help with your freelance projects from ideation to completion. Our experienced professionals provide guidance, review, and enhancement to ensure project success and client satisfaction.',
          benefits: [
            'Project planning assistance',
            'Quality assurance review',
            'Client communication support',
            'Deadline management',
          ],
        },
        {
          title: 'Resume & Portfolio Improvement',
          description: 'Create a compelling resume and professional portfolio that showcases your skills and achievements. Stand out to potential employers and clients with well-crafted application materials.',
          benefits: [
            'Resume optimization',
            'Portfolio design consultation',
            'Achievement highlighting',
            'ATS optimization',
          ],
        },
        {
          title: 'Academic Presentation Help',
          description: 'Master the art of presenting academic work. From thesis presentations to project showcases, we help you communicate your ideas effectively and professionally.',
          benefits: [
            'Presentation design support',
            'Public speaking coaching',
            'Content organization',
            'Visual storytelling techniques',
          ],
        },
        {
          title: 'Skill & Internship Guidance',
          description: 'Identify and develop in-demand skills while securing internship opportunities that provide valuable real-world experience and career connections.',
          benefits: [
            'Skill gap identification',
            'Training recommendations',
            'Internship opportunity sourcing',
            'Interview preparation',
          ],
        },
        {
          title: 'Professional Writing Support',
          description: 'Enhance your writing across all professional contexts - from articles and blogs to technical documentation. Develop clear, compelling written communication skills.',
          benefits: [
            'Writing style refinement',
            'Content editing & proofreading',
            'Technical writing guidance',
            'Publication support',
          ],
        },
      ],
      stats: [
        { number: '800+', label: 'Projects Completed' },
        { number: '85%', label: 'Client Repeat Rate' },
        { number: '30+', label: 'Skill Areas' },
        { number: '200+', label: 'Internships Placed' },
      ],
      process: [
        { step: 1, title: 'Assessment', desc: 'Evaluate your current skills and goals' },
        { step: 2, title: 'Planning', desc: 'Create development and project strategy' },
        { step: 3, title: 'Execution', desc: 'Work on projects with guidance' },
        { step: 4, title: 'Review', desc: 'Get expert feedback and improvements' },
        { step: 5, title: 'Showcase', desc: 'Present polished work to opportunities' },
      ],
    },
  };

  const service = servicesData[serviceId];

  if (!service) {
    return (
      <div className="page-container service-details-page">
        <div className="content-section">
          <h1>Service Not Found</h1>
          <p>Sorry, we couldn't find the service you're looking for.</p>
          <button className="cta-button" onClick={() => navigate('/services')}>
            Back to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container service-details-page">
      {/* Hero Section */}
      <section className="service-hero" style={{ background: service.lightColor, borderTop: `4px solid ${service.color}` }}>
        <div className="hero-content">
          <span className="hero-icon">{service.icon}</span>
          <h1 style={{ color: service.color }}>{service.title}</h1>
          <p className="hero-tagline">{service.tagline}</p>
          <a href="https://techmatch-call-flow.lovable.app"  rel="noopener noreferrer" className="cta-button">
            Get Started Today
          </a>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="content-section">
        <div className="tab-navigation">
          <button
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
            style={{ borderBottomColor: activeTab === 'overview' ? service.color : 'transparent' }}
          >
            Overview
          </button>
          <button
            className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
            style={{ borderBottomColor: activeTab === 'details' ? service.color : 'transparent' }}
          >
            Service Details
          </button>
          <button
            className={`tab-btn ${activeTab === 'process' ? 'active' : ''}`}
            onClick={() => setActiveTab('process')}
            style={{ borderBottomColor: activeTab === 'process' ? service.color : 'transparent' }}
          >
            Our Process
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="tab-content overview-content">
            <div className="overview-grid">
              <div className="overview-text">
                <h2 style={{ color: service.color }}>Service Overview</h2>
                <p className="overview-description">{service.overview.description}</p>
              </div>
              <div className="overview-image">
                <div className="image-placeholder" style={{ background: service.lightColor, borderColor: service.color }}>
                  {service.overview.image}
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="stats-container">
              <h3 style={{ color: service.color }}>Our Impact</h3>
              <div className="stats-grid">
                {service.stats.map((stat, idx) => (
                  <div key={idx} className="stat-item" style={{ borderColor: service.color }}>
                    <div className="stat-number" style={{ color: service.color }}>
                      {stat.number}
                    </div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Details Tab */}
        {activeTab === 'details' && (
          <div className="tab-content details-content">
            <h2 style={{ color: service.color }} className="section-title">Service Components</h2>
            <div className="details-grid">
              {service.sections.map((section, idx) => (
                <div key={idx} className="detail-card" style={{ borderLeftColor: service.color }}>
                  <h3 style={{ color: service.color }}>{section.title}</h3>
                  <p className="detail-description">{section.description}</p>
                  <div className="benefits-list">
                    <h4 style={{ color: service.color }}>Key Benefits:</h4>
                    <ul>
                      {section.benefits.map((benefit, bidx) => (
                        <li key={bidx} style={{ color: 'var(--text-light)' }}>
                          <span style={{ color: service.color }}>✓</span> {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Process Tab */}
        {activeTab === 'process' && (
          <div className="tab-content process-content">
            <h2 style={{ color: service.color }} className="section-title">How We Work</h2>
            <div className="process-timeline">
              {service.process.map((proc, idx) => (
                <div key={idx} className="timeline-item">
                  <div className="timeline-marker" style={{ background: service.color }}>
                    {proc.step}
                  </div>
                  <div className="timeline-content">
                    <h4 style={{ color: service.color }}>{proc.title}</h4>
                    <p>{proc.desc}</p>
                  </div>
                  {idx < service.process.length - 1 && (
                    <div className="timeline-connector" style={{ background: service.color }}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="cta-final" style={{ background: service.lightColor, borderTop: `2px solid ${service.color}` }}>
        <div className="content-section">
          <h2 style={{ color: service.color }}>Ready to Transform Your Future?</h2>
          <p>Our expert team is ready to guide you. Contact us today to start your journey.</p>
          <div className="cta-buttons">
            <button className="cta-button" onClick={() => navigate('/contact')}>
              Contact Us
            </button>
            <button
              className="cta-button secondary"
              onClick={() => navigate('/services')}
              style={{ borderColor: service.color, color: service.color }}
            >
              Back to Services
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetails;
