import React, { useMemo, useRef, useState, useEffect } from "react";
import "../styles/Pages.css";

// Allow overriding the webhook via env; fall back to the contact webhook so the form works out-of-the-box.
const BOOKING_WEBHOOK_URL =
  process.env.REACT_APP_BOOKING_WEBHOOK ||
  process.env.REACT_APP_N8N_WEBHOOK ||
  "https://techmatch.app.n8n.cloud/webhook-test/techmatch-schudling";

const Booking = () => {
  const timeoutRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    sessionDuration: "30 minutes",
    preferredDateTime: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastSubmittedEmail, setLastSubmittedEmail] = useState("");

  const isSecureWebhook = useMemo(
    () => BOOKING_WEBHOOK_URL && BOOKING_WEBHOOK_URL.startsWith("https://"),
    []
  );

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.message.trim() || formData.message.length < 10)
      newErrors.message = "Add a brief project summary (10+ characters)";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!isSecureWebhook) {
      setErrors({
        submit:
          "Invalid webhook URL. Please configure REACT_APP_BOOKING_WEBHOOK (https).",
      });
      return;
    }

    setIsLoading(true);
    setErrors({});

    // Only include the requested entities in the webhook request
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || "",
      sessionDuration: formData.sessionDuration,
      preferredDateTime: formData.preferredDateTime,
      message: formData.message,
    };

    try {
      const response = await fetch(BOOKING_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Booking webhook error:", errorText);
        throw new Error("Webhook failed");
      }

      setLastSubmittedEmail(formData.email);
      setSubmitted(true);
      // Reset form to initial values
      setFormData({
        name: "",
        email: "",
        phone: "",
        sessionDuration: "30 minutes",
        preferredDateTime: "",
        message: "",
      });

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("Booking form error:", err);
      setErrors({
        submit:
          "Unable to submit right now. Please try again or reach us via Contact.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="page-container booking-page">
      <section className="booking-hero">
        <div className="booking-hero-copy">
          <p className="eyebrow">Instant Booking</p>
          <h1>Lock in your consultation with TechMatch</h1>
          <p className="hero-lead">
            Choose your focus, share your goals, and our consultants will get
            back with a tailored plan. Fast, secure, and aligned to your
            timeline.
          </p>
          <div className="hero-pills">
            <span>1:1 Discovery Call</span>
            <span>Roadmap & Next Steps</span>
            <span>Security-First</span>
          </div>
        </div>

        <div className="booking-hero-card">
          <div className="card-header">
            <span className="dot green" />
            <span className="dot amber" />
            <span className="dot red" />
          </div>
          <div className="card-body">
            <h3>What you’ll get</h3>
            <ul>
              <li>30–45 min discovery with a senior consultant</li>
              <li>Clear plan on tech stack, risks, and quick wins</li>
              <li>Follow-up summary with budget & timeline guidance</li>
            </ul>
            <a className="cta-button primary" href="#booking-form">
              Book my slot
            </a>
          </div>
        </div>
      </section>

      <section className="content-section booking-section" id="booking-form">
        <div className="booking-grid">
          <div className="booking-info">
            <h2>Tell us what you need</h2>
            <p className="section-intro">
              We blend strategy, engineering, and security to ship outcomes.
              Give us the essentials and we’ll tailor a session for you.
            </p>

            <div className="info-cards">
              <div className="info-card">
                <div className="info-icon">⚡</div>
                <div>
                  <h4>Same-day triage</h4>
                  <p>Fast follow-up with a recommended path forward.</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">🛡️</div>
                <div>
                  <h4>Secure by default</h4>
                  <p>Compliance-aware processes and protected data handling.</p>
                </div>
              </div>
              <div className="info-card">
                <div className="info-icon">🎯</div>
                <div>
                  <h4>Outcome-first</h4>
                  <p>We anchor every suggestion to the business result.</p>
                </div>
              </div>
            </div>
          </div>

          <form className="contact-form booking-form" onSubmit={handleSubmit} noValidate>
            {submitted && (
              <div className="success-message">
                ✓ Booked! We received your request
                {lastSubmittedEmail ? ` from ${lastSubmittedEmail}` : ""}.
              </div>
            )}

            {errors.submit && (
              <div className="error-message-box">{errors.submit}</div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? "error" : ""}
                  required
                />
                {errors.name && (
                  <span className="error-message">{errors.name}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="email">Work Email *</label>
                <input
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? "error" : ""}
                  required
                  type="email"
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 800 832 4825"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="sessionDuration">Session Duration</label>
                <select
                  id="sessionDuration"
                  name="sessionDuration"
                  value={formData.sessionDuration}
                  onChange={handleChange}
                >
                  <option value="30 minutes">30 minutes</option>
                  <option value="45 minutes">45 minutes</option>
                  <option value="60 minutes">60 minutes</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="preferredDateTime">Preferred Date &amp; Time</label>
                <input
                  id="preferredDateTime"
                  name="preferredDateTime"
                  type="datetime-local"
                  value={formData.preferredDateTime}
                  onChange={handleChange}
                  placeholder="dd/mm/yyyy --:-- --"
                />
              </div>
            </div>

            {/* Removed budget and timeline fields per request */}

            <div className="form-group">
              <label htmlFor="message">Tell us about your project or questions *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? "error" : ""}
                placeholder="Goals, questions, context, or anything we should prepare..."
                rows={6}
                required
              />
              {errors.message && (
                <span className="error-message">{errors.message}</span>
              )}
            </div>

            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Booking..." : "Submit Booking"}
            </button>

            <p className="form-note">
              By booking, you consent to be contacted about this request. Your
              details stay private and are only used for this consultation.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Booking;
