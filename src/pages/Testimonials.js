import React from 'react';
import '../styles/Pages.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Smith',
      role: 'CEO, Fortune 500 Company',
      company: 'Global Tech Corp',
      image: '',
      text: 'TechMatch transformed our entire IT infrastructure. Their expertise and dedication were instrumental in our digital transformation journey.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      role: 'CTO, StartUp Innovations',
      company: 'StartUp Innovations',
      image: '',
      text: 'Working with TechMatch was a game-changer. They understood our vision and delivered solutions that exceeded our expectations.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Michael Chen',
      role: 'Enterprise Director',
      company: 'Enterprise Solutions Ltd',
      image: '',
      text: 'The professionalism and technical knowledge of the TechMatch team is unparalleled. Highly recommended for any enterprise-level project.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Emma Wilson',
      role: 'Startup Founder',
      company: 'EdTech Pioneers',
      image: '',
      text: 'TechMatch helped us scale our startup from idea to a fully operational platform. Their consultancy was invaluable.',
      rating: 5,
    },
    {
      id: 5,
      name: 'David Kumar',
      role: 'IT Manager',
      company: 'Financial Services Inc',
      image: '',
      text: 'The team\'s attention to detail and commitment to delivery timelines impressed us. We couldn\'t ask for better partners.',
      rating: 5,
    },
    {
      id: 6,
      name: 'Lisa Anderson',
      role: 'Project Lead',
      company: 'Healthcare Digital',
      image: '',
      text: 'TechMatch brought fresh perspectives to our challenges and delivered innovative solutions. Truly a game-changer!',
      rating: 5,
    },
  ];

  const renderStars = (rating) => {
    return Array.from({ length: rating }).map((_, i) => (
      <span key={i} style={{ color: '#ffa91b', marginRight: '2px' }}>★</span>
    ));
  };

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero-section" style={{ paddingTop: '80px', paddingBottom: '60px' }}>
        <div className="hero-content">
          <h1 className="hero-title">What Our Clients Say</h1>
          <p className="hero-subtitle">
            Hear from businesses we've transformed and partnerships we've strengthened
          </p>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="testimonials-section" style={{ padding: '60px 20px' }}>
        <div className="section-container">
          <div className="testimonials-grid">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-header">
                  {testimonial.image ? (
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="testimonial-avatar"
                    />
                  ) : (
                    <div className="testimonial-avatar placeholder">
                      {testimonial.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="testimonial-info">
                    <h3 className="testimonial-name">{testimonial.name}</h3>
                    <p className="testimonial-role">{testimonial.role}</p>
                    <p className="testimonial-company">{testimonial.company}</p>
                  </div>
                </div>
                <div className="testimonial-rating">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" style={{ textAlign: 'center' }}>
        <h2>Ready to Be Our Next Success Story?</h2>
        <p>Let's discuss how TechMatch can transform your business</p>
        <a href="https://techmatch-schudling.lovable.app" target="_blank" rel="noopener noreferrer" className="cta-button large">
          Start Your Journey Today
        </a>
      </section>
    </div>
  );
};

export default Testimonials;