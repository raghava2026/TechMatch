import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithGoogle, signupWithEmail, setupRecaptcha, sendPhoneOtp, confirmPhoneOtp } from '../firebase';
import '../styles/Pages.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [error, setError] = useState(null);
  const [method, setMethod] = useState('email'); // 'email' or 'phone'

  const handleGoogle = async () => {
    try {
      await signInWithGoogle();
      navigate('/');
    } catch (err) {
      setError(err.message || String(err));
    }
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    try {
      await signupWithEmail(email, password);
      // Optionally, you can save the displayName in Firestore later
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
          <h2>Welcome to TechMatch</h2>
          <p>Create your account to get started with our services.</p>

          <div className="auth-cta">
            <button className="google-btn" onClick={handleGoogle} aria-label="Sign up with Google">
              <strong>Continue with Google</strong>
            </button>

            <div className="divider">OR</div>

            <div className="alt-btns">
              <button onClick={() => setMethod('email')}>Sign up with Email</button>
              <button onClick={() => setMethod('phone')}>Sign up with Phone</button>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <h3>Create account</h3>
          <p className="small-text">Choose a method to sign up. You can use Google, Email or Phone (OTP).</p>

          {method === 'email' && (
            <form className="auth-form" onSubmit={handleEmailSignup}>
              <div className="form-group">
                <label>Full name</label>
                <input required value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="auth-actions">
                <button className="submit-button" type="submit">Create account</button>
                <Link to="/signin" className="small-text">Already have an account?</Link>
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
                <Link to="/signin" className="small-text">Use email instead</Link>
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

export default SignUp;
