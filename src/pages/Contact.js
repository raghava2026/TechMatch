import React, { useState } from 'react';
import '../styles/Pages.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    service: 'general',
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastSubmittedEmail, setLastSubmittedEmail] = useState('');

  const openMailClient = () => {
    // Pre-fill an email in user's mail client as a fallback
    const to = 'techmatch2k25@gmail.com';
    const subject = encodeURIComponent(formData.subject || 'Contact from TechMatch website');
    const bodyLines = [
      `Name: ${formData.name || '(not provided)'}`,
      `Email: ${formData.email || '(not provided)'}`,
      `Phone: ${formData.phone || '(not provided)'}`,
      `Company: ${formData.company || '(not provided)'}`,
      '',
      'Message:',
      formData.message || '(no message)',
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Form is valid - send email via EmailJS
      setIsLoading(true);
      setErrors({});

      // Using Formspree (no additional package required).
      // Set REACT_APP_FORMSPREE_ENDPOINT in .env.local to your Formspree form endpoint (e.g. https://formspree.io/f/xyzabcd)
      const FORMSPREE_ENDPOINT = process.env.REACT_APP_FORMSPREE_ENDPOINT || 'https://formspree.io/f/your_form_id';

      // If endpoint is placeholder or missing, instruct user and provide mailto fallback
      if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT.includes('your_form_id')) {
        setErrors({ submit: 'Contact sending is not configured. Please set REACT_APP_FORMSPREE_ENDPOINT in .env.local to your Formspree endpoint and restart the dev server.' });
        return;
      }

      setIsLoading(true);
      setErrors({});

      try {
        const resp = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone || 'Not provided',
            company: formData.company || 'Not provided',
            subject: formData.subject,
            service: formData.service,
            message: formData.message,
          }),
        });

        if (!resp.ok) throw new Error('Failed to send message');

        setLastSubmittedEmail(formData.email || '');
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', company: '', subject: '', message: '', service: 'general' });
        setTimeout(() => setSubmitted(false), 5000);
      } catch (err) {
        console.error('Formspree error:', err);
        setErrors({ submit: 'Failed to send your message. Please try again later.' });
      } finally {
        setIsLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  const services = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'cloud', label: 'Cloud Consulting' },
    { value: 'digital', label: 'Digital Transformation' },
    { value: 'development', label: 'Custom Development' },
    { value: 'analytics', label: 'Data Analytics' },
    { value: 'security', label: 'Cybersecurity' },
    { value: 'ai', label: 'AI & Machine Learning' },
  ];

  return (
    <div className="page-container contact-page">
      <section className="content-section">
        <h1>Contact Us</h1>
        <p className="section-intro">
          Have questions? Let's connect and explore how we can help transform your business
        </p>

        <div className="contact-grid">
          {/* Contact Info */}
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>Reach out to our team and we'll respond as soon as possible.</p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-text">
                  <h4>Address</h4>
                  <p>123 Tech Street</p>
                  <p>Innovation City, IC 12345</p>
                  <p>United States</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-text">
                  <h4>Email</h4>
                  <p>
                    <a href="mailto:techmatch2k25@gmail.com">techmatch2k25@gmail.com</a>
                  </p>
                  <p>
                    <a href="mailto:techmatch2k25@gmail.com">techmatch2k25@gmail.com</a>
                  </p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📱</div>
                <div className="contact-text">
                  <h4>Phone</h4>
                  <p>
                    <a href="tel:+18008324825">+1 (800) TECH-MATCH</a>
                  </p>
                  <p>Monday - Friday: 9AM - 6PM EST</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">🕐</div>
                <div className="contact-text">
                  <h4>Business Hours</h4>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p>Support available 24/7 for clients</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {submitted && (
              <div className="success-message">
                ✓ Thank you! Your message has been received{lastSubmittedEmail ? ` at ${lastSubmittedEmail}` : ''}. We'll be in touch soon.
              </div>
            )}
            {errors.submit && (
              <div className="error-message-box">
                {errors.submit}
              </div>
            )}
            {errors.submit && errors.submit.includes('not configured') && (
              <div style={{ marginTop: 12, textAlign: 'center' }}>
                <button
                  type="button"
                  className="submit-button"
                  onClick={openMailClient}
                >
                  Send via Email Client
                </button>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone (Optional)</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="company">Company (Optional)</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="service">Service of Interest *</label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                {services.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={errors.subject ? 'error' : ''}
              />
              {errors.subject && <span className="error-message">{errors.subject}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
                placeholder="Tell us about your project or inquiry..."
              />
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>

            <button type="submit" className="submit-button">
              {isLoading ? 'Sending...' : 'Send Message'}
            </button>

            <p className="form-note">
              We respect your privacy. Your information will only be used to respond to your inquiry.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
