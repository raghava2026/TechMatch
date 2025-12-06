import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithGoogle, signupWithEmail, setupRecaptcha, sendPhoneOtp, confirmPhoneOtp, sendPhoneOtpForLinking, confirmPhoneOtpForLinking } from '../firebase';
import '../styles/Pages.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [acceptedTOS, setAcceptedTOS] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [linkingFor, setLinkingFor] = useState(null); // 'social' | 'email' | null
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [method, setMethod] = useState('email'); // 'email' or 'phone'
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    setLoading(true);
    try {
      const res = await signInWithGoogle();
      // If Google account already has a phone number, proceed. Otherwise ask to link phone.
      if (res?.user?.phoneNumber) {
        navigate('/dashboard');
      } else {
        // prompt user to add a phone number and link it
        setLinkingFor('social');
        setMethod('phone');
        setError(null);
      }
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    if (!acceptedTOS) {
      setError('You must accept the Terms of Service to sign up');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    try {
      // Create account first
      await signupWithEmail(email, password, displayName, { 
        requireEmailVerification: true, 
        role: 'student', 
        acceptedTOS: true 
      });
      // If user provided a phone number during signup, prompt linking flow, otherwise redirect
      if (phone && phone.trim()) {
        setLinkingFor('email');
        setMethod('phone');
        setError(null);
        setSuccessMessage('Account created. Please verify your phone to complete setup.');
      } else {
        setSuccessMessage('Account created! Redirecting to dashboard...');
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };


  const handleSendOtp = async () => {
    setLoading(true);
    try {
      setupRecaptcha('recaptcha-container');
      let res;
      if (linkingFor) {
        // use linking flow for existing authenticated user
        res = await sendPhoneOtpForLinking(phone, 'recaptcha-container');
      } else {
        res = await sendPhoneOtp(phone, 'recaptcha-container');
      }
      setConfirmationResult(res);
      setError(null);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOtp = async () => {
    setLoading(true);
    try {
      if (!confirmationResult) throw new Error('No OTP request found');
      if (linkingFor) {
        await confirmPhoneOtpForLinking(confirmationResult, otpCode);
      } else {
        await confirmPhoneOtp(confirmationResult, otpCode);
      }
      setSuccessMessage('Phone verified! Redirecting to dashboard...');
      // cleanup linking state
      setLinkingFor(null);
      setTimeout(() => navigate('/dashboard'), 1500);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
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
                <input 
                  required 
                  value={displayName} 
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input 
                  required 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="form-group">
                <label>Password (min 6 characters)</label>
                <input 
                  required 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={6}
                  disabled={loading}
                />
              </div>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <input 
                  type="checkbox" 
                  id="tos-checkbox"
                  checked={acceptedTOS} 
                  onChange={(e) => setAcceptedTOS(e.target.checked)}
                  disabled={loading}
                  style={{ width: 'auto', cursor: 'pointer' }}
                />
                <label htmlFor="tos-checkbox" style={{ margin: 0, cursor: 'pointer', fontSize: '0.9rem' }}>
                  I accept the <Link to="/terms" target="_blank">Terms of Service</Link> and <Link to="/privacy" target="_blank">Privacy Policy</Link>
                </label>
              </div>
              <div className="auth-actions">
                <button 
                  className="submit-button" 
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Create account'}
                </button>
                <Link to="/signin" className="small-text">Already have an account?</Link>
              </div>
            </form>
          )}

          {method === 'phone' && (
            <div className="auth-form">
              <div className="form-group">
                <label>Phone (include country code, e.g., +1234567890)</label>
                <input 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="+1..."
                  disabled={loading || !!confirmationResult}
                />
              </div>
              <div id="recaptcha-container"></div>
              <div className="auth-actions">
                <button 
                  className="submit-button" 
                  onClick={handleSendOtp}
                  disabled={loading || !!confirmationResult}
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
                <Link to="/signin" className="small-text">Use email instead</Link>
              </div>

              {confirmationResult && (
                <>
                  <div className="form-group">
                    <label>Enter OTP sent to your phone</label>
                    <input 
                      value={otpCode} 
                      onChange={(e) => setOtpCode(e.target.value)} 
                      placeholder="000000"
                      disabled={loading}
                    />
                  </div>
                  <div className="auth-actions">
                    <button 
                      className="submit-button" 
                      onClick={handleConfirmOtp}
                      disabled={loading}
                    >
                      {loading ? 'Verifying...' : 'Confirm OTP'}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {error && (
            <div 
              className="error-message" 
              style={{ 
                padding: '0.8rem', 
                marginTop: '1rem', 
                backgroundColor: '#fee', 
                color: '#c33', 
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}
            >
              {error}
            </div>
          )}

          {successMessage && (
            <div 
              className="success-message"
              style={{ 
                padding: '0.8rem', 
                marginTop: '1rem', 
                backgroundColor: '#efe', 
                color: '#3c3', 
                borderRadius: '4px',
                fontSize: '0.9rem'
              }}
            >
              {successMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
