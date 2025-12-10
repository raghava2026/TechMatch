// src/pages/SignIn.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithGoogle,
  signinWithEmail,
  sendPhoneOtp,
  setupRecaptcha,
  confirmPhoneOtp,
  getResolver,
  saveUserToFirestore,
  getCurrentUser,
  onAuthChange,
} from "../firebase";
import "../styles/Pages.css";

const SignIn = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("email"); // 'email' | 'phone'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpCode, setOtpCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const goHome = () => navigate("/");

  const handleGoogle = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithGoogle();
      goHome();
    } catch (err) {
      // handle MFA resolver if required (rare for Google)
      const resolver = getResolver(err);
      if (resolver) {
        setError("This account requires multi-factor verification. Please sign-in via phone.");
      } else {
        setError(err.message || String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await signinWithEmail(email, password);
      // optionally require verified email before accessing dashboard:
      if (res.user && !res.user.emailVerified) {
        // you may redirect them to a "verify email" page or inform them
        setError("Please verify your email address. A verification mail was sent when you signed up.");
        setLoading(false);
        return;
      }
      goHome();
    } catch (err) {
      // handle multi-factor errors
      const resolver = getResolver(err);
      if (resolver) {
        setError("Multi-factor required. Please sign in using phone to complete verification.");
      } else {
        setError(err.message || String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      setupRecaptcha("recaptcha-container");
      const res = await sendPhoneOtp(phone, "recaptcha-container");
      setConfirmationResult(res);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOtp = async () => {
    if (!confirmationResult) {
      setError("Please request OTP first");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await confirmPhoneOtp(confirmationResult, otpCode);
      // After success, user is signed in. Persist user data if needed
      await saveUserToFirestore(res.user);
      goHome();
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  // If already signed-in, redirect away from auth page to home
  React.useEffect(() => {
    const u = getCurrentUser();
    if (u) {
      navigate('/');
      return;
    }
    const unsub = onAuthChange((user) => {
      if (user) navigate('/');
    });
    return () => unsub && unsub();
  }, [navigate]);

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-left">
          <h2>Welcome back</h2>
          <p>Sign in to access your dashboard and manage services.</p>

          <div className="auth-cta">
            <button className="google-btn" onClick={handleGoogle} disabled={loading}>
              Continue with Google
            </button>

            <div className="divider">OR</div>

            <div className="alt-btns">
              <button onClick={() => setMethod("email")}>Sign in with Email</button>
              <button onClick={() => setMethod("phone")}>Sign in with Phone</button>
            </div>
            <div style={{ marginTop: 12 }}>
              <Link to="/password-reset" className="small-text">Forgot password?</Link>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <h3>Sign in</h3>
          <p className="small-text">Use Google, email or phone to sign in quickly.</p>

          {method === "email" && (
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
                <button className="submit-button" type="submit" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
                </button>
                <Link to="/password-reset" className="small-text">Forgot password?</Link>
              </div>
            </form>
          )}

          {method === "phone" && (
            <div className="auth-form">
              <div className="form-group">
                <label>Phone (include country code)</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91..." />
              </div>

              <div id="recaptcha-container"></div>

              <div className="auth-actions">
                <button className="submit-button" onClick={handleSendOtp} disabled={loading || confirmationResult}>
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </div>

              {confirmationResult && (
                <>
                  <div className="form-group">
                    <label>Enter OTP</label>
                    <input value={otpCode} onChange={(e) => setOtpCode(e.target.value)} />
                  </div>
                  <div className="auth-actions">
                    <button className="submit-button" onClick={handleConfirmOtp} disabled={loading}>
                      {loading ? "Verifying..." : "Confirm OTP"}
                    </button>
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
