import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithGoogle, signinWithEmail, sendPhoneOtp, setupRecaptcha, confirmPhoneOtp } from '../firebase';
import '../styles/Pages.css';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState(null);
  const [method, setMethod] = useState('email');

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await signinWithEmail(email, password);
      navigate('/');
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  const handleSendOtp = async () => {
    try {
      setupRecaptcha('recaptcha-container');
      const res = await sendPhoneOtp(phone);
      setConfirmationResult(res);
      setError(null);
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  const handleConfirmOtp = async () => {
    try {
      if (!confirmationResult) throw new Error('No OTP request found');
      await confirmPhoneOtp(confirmationResult, otpCode);
      navigate('/');
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-left">
          <h2>Welcome back</h2>
          <p>Sign in to access your dashboard and manage services.</p>

          <div className="auth-cta">
            <button className="google-btn" onClick={handleGoogle} aria-label="Sign in with Google">Continue with Google</button>

            <div className="divider">OR</div>

            <div className="alt-btns">
              <button onClick={() => setMethod('email')}>Sign in with Email</button>
              <button onClick={() => setMethod('phone')}>Sign in with Phone</button>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <h3>Sign in</h3>
          <p className="small-text">Use Google, email or phone to sign in quickly.</p>

          {method === 'email' && (
            <form className="auth-form" onSubmit={handleEmailSignIn}>
              <div className="form-group">
                <label>Email</label>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="auth-actions">
                <button className="submit-button" type="submit">Sign In</button>
                <Link to="/signup" className="small-text">Create account</Link>
              </div>
            </form>
          )}

          {method === 'phone' && (
            <div className="auth-form">
              <div className="form-group">
                <label>Phone (include country code)</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1..." />
              </div>
              <div id="recaptcha-container"></div>
              <div className="auth-actions">
                <button className="submit-button" onClick={handleSendOtp}>Send OTP</button>
                <Link to="/signup" className="small-text">Use email instead</Link>
              </div>

              {confirmationResult && (
                <>
                  <div className="form-group">
                    <label>Enter OTP</label>
                    <input value={otpCode} onChange={(e) => setOtpCode(e.target.value)} />
                  </div>
                  <div className="auth-actions">
                    <button className="submit-button" onClick={handleConfirmOtp}>Confirm OTP</button>
                  </div>
                </>
              )}
            </div>
          )}

          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
