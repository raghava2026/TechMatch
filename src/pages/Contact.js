import React, { useState } from "react";
import "../styles/Pages.css";

// IMPORTANT: n8n Webhook URL must match your workflow path EXACTLY
const N8N_WEBHOOK_URL =
  process.env.REACT_APP_N8N_WEBHOOK ||
  "https://techmatch.app.n8n.cloud/webhook-test/contact-form";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [lastSubmittedEmail, setLastSubmittedEmail] = useState("");

  // fallback email if webhook fails
  const openMailClient = () => {
    const to = "techmatch2k25@gmail.com";
    const subject = encodeURIComponent(
      formData.subject || "Contact from TechMatch Website"
    );
    const bodyLines = [
      `Name: ${formData.name || "(not provided)"}`,
      `Email: ${formData.email || "(not provided)"}`,
      `Phone: ${formData.phone || "(not provided)"}`,
      "",
      "Message:",
      formData.message || "(no message)",
    ];

    const body = encodeURIComponent(bodyLines.join("\n"));

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.subject.trim()) newErrors.subject = "Subject is required";

    if (!formData.message.trim())
      newErrors.message = "Message is required";
    else if (formData.message.length < 10)
      newErrors.message = "Message must be at least 10 characters";

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

    if (!N8N_WEBHOOK_URL.startsWith("https://")) {
      setErrors({
        submit: "Invalid Webhook URL. Please configure REACT_APP_N8N_WEBHOOK.",
      });
      return;
    }

    setIsLoading(true);
    setErrors({});

    // JSON sent to n8n — clean & simple
    const payload = {
      user_name: formData.name,
      user_email: formData.email,
      user_phone: formData.phone || "",
      subject: formData.subject,
      message: formData.message,
      submitted_at: new Date().toISOString(),
      source: "techmatch-website-contact",
    };

    try {
      const response = await fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorText = "";
        try {
          errorText = await response.text();
        } catch {}
        console.error("Webhook error:", errorText);
        throw new Error("Webhook failed");
      }

      // success
      setLastSubmittedEmail(formData.email);
      setSubmitted(true);

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      console.error("n8n error:", err);
      setErrors({
        submit:
          "Failed to send message. Please try again or use email option below.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container contact-page">
      <section className="content-section">
        <h1>Contact Us</h1>
        <p className="section-intro">
          Have questions? Let's connect and explore how we can help transform
          your business.
        </p>

        <div className="contact-grid">
          {/* LEFT Side — Contact Info */}
          <div className="contact-info">
            <h2>Get In Touch</h2>
            <p>Reach out to our team and we'll respond as soon as possible.</p>

            <div className="contact-details">
              <div className="contact-item">
                <div className="contact-icon">📍</div>
                <div className="contact-text">
                  <h4>Address</h4>
                  <p>#227, #228, 4th Floor</p>
                  <p>Skanda Mall, Beside D-MART, Ballari Chowrasta</p>
                  <p>Kurnool - 518003</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon">📧</div>
                <div className="contact-text">
                  <h4>Email</h4>
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
                    <a href="tel:+916303319981">R. Yuvaraj: +91 63033 19981</a>
                  </p>
                  <p>
                    <a href="tel:+918309583137">Shaik Arif Nawaz: +91 83095 83137</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT Side — FORM */}
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            {submitted && (
              <div className="success-message">
                ✓ Thank you! Your message has been received{lastSubmittedEmail ? ` from ${lastSubmittedEmail}` : ""}.
              </div>
            )}

            {errors.submit && (
              <div className="error-message-box">{errors.submit}</div>
            )}

            {errors.submit &&
              errors.submit.includes("Webhook") && (
                <div style={{ marginTop: 12, textAlign: "center" }}>
                  <button
                    type="button"
                    className="submit-button"
                    onClick={openMailClient}
                  >
                    Send via Email
                  </button>
                </div>
              )}

            {/* Name */}
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

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "error" : ""}
                required
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            {/* Phone */}
            <div className="form-group">
              <label htmlFor="phone">Phone (Optional)</label>
              <input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            {/* Subject */}
            <div className="form-group">
              <label htmlFor="subject">Subject *</label>
              <input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={errors.subject ? "error" : ""}
                required
              />
              {errors.subject && (
                <span className="error-message">{errors.subject}</span>
              )}
            </div>

            {/* Message */}
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? "error" : ""}
                placeholder="Tell us about your project..."
                rows={6}
                required
              />
              {errors.message && (
                <span className="error-message">{errors.message}</span>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Message"}
            </button>

            <p className="form-note">
              We respect your privacy. Your information will only be used to
              respond to your inquiry.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;