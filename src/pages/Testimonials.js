import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Pages.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Rohith Reddy',
      role: 'Student',
      company: 'Sri Chaitanya Junior College, Kurnool',
      image: '',
      text: 'With TechMatch guidance I secured admission into an engineering college in Hyderabad. Their counselling helped me pick the right entrance path and prepare effectively.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Sowmya Devi',
      role: 'Student',
      company: 'Narayana Junior College, Anantapur',
      image: '',
      text: 'The coaching and application support from TechMatch were exceptional. I cleared the EAMCET and got into my preferred engineering college in Vijayawada.',
      rating: 5,
    },
    {
      id: 3,
      name: 'Kalyan Kumar',
      role: 'Student',
      company: 'Govt. Junior College, Kurnool',
      image: '',
      text: 'Their personalised attention and mock tests made all the difference. I recommend TechMatch to any student targeting engineering admissions from Andhra Pradesh.',
      rating: 5,
    },
    {
      id: 4,
      name: 'Anitha R',
      role: 'Student',
      company: 'St. John’s Junior College, Nellore',
      image: '',
      text: 'From application paperwork to interview prep, TechMatch supported me end-to-end. I got admission into a top private engineering college.',
      rating: 5,
    },
    {
      id: 5,
      name: 'Siddharth',
      role: 'Student',
      company: 'Sri Venkateswara Junior College, Tirupati',
      image: '',
      text: 'The team helped me discover scholarship opportunities and improve my rank through targeted study plans. Grateful for their mentorship.',
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
        <Link to="/booking" className="cta-button large">
          Start Your Journey Today
        </Link>
      </section>
    </div>
  );
};

export default Testimonials;