// src/pages/PasswordReset.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordReset } from "../firebase";
import "../styles/Pages.css";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setStatus("");
    try {
      await sendPasswordReset(email);
      setStatus("Password reset email sent. Check your inbox (and spam).");
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  return (
    <div className="auth-wrapper" style={{ minHeight: '64vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div
        className="auth-card"
        role="region"
        aria-labelledby="password-reset-title"
        style={{ maxWidth: 520,backgroundColor: '#fff', width: '94%', padding: '28px 22px', boxShadow: '0 12px 30px rgba(34, 30, 30, 0.12)', borderRadius: 10 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{ fontSize: 28, lineHeight: 1 }} aria-hidden>
            🔒
          </div>
          <div>
            <h3 id="password-reset-title" style={{ margin: 0 }}>Reset your password</h3>
            <p className="small-text" style={{ margin: '6px 0 0' }}>Enter your email and we'll send a password reset link.</p>
          </div>
        </div>

        <form onSubmit={handleReset} className="auth-form" style={{ marginTop: 8 }}>
          <div className="form-group">
            <label htmlFor="reset-email">Email</label>
            <input
              id="reset-email"
              autoFocus
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '10px 12px', fontSize: 15 }}
            />
          </div>

          <div className="auth-actions">
            <button type="submit" className="submit-button" style={{ width: '100%' }}>Send reset link</button>
          </div>
        </form>

        {status && (
          <div style={{ marginTop: 14 }}>
            <div className="success-message" style={{ padding: 12 }}>{status}</div>
            <div style={{ marginTop: 10 }}>
              <Link to="/signin" className="small-text">Back to sign in</Link>
            </div>
          </div>
        )}

        {error && (
          <div className="error-message" style={{ marginTop: 14, padding: 12 }}>{error}</div>
        )}
      </div>
    </div>
  );
}
