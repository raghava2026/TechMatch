// src/pages/SignUp.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  signInWithGoogle,
  signupWithEmail,
  setupRecaptcha,
  sendPhoneOtp,
  confirmPhoneOtp,
  sendPhoneOtpForLinking,
  confirmPhoneOtpForLinking,
  saveUserToFirestore,
  getCurrentUser,
  onAuthChange,
} from "../firebase";
import "../styles/Pages.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState("email"); // email | phone
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpCode, setOtpCode] = useState("");
  const [acceptedTOS, setAcceptedTOS] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [linkingFor, setLinkingFor] = useState(null); // if we are linking phone after social sign-in

  const handleGoogle = async () => {
    setLoading(true); setError("");
    try {
      const r = await signInWithGoogle();
      // if user has no phone, optionally prompt to link phone
      if (!r.user.phoneNumber) {
        setLinkingFor("social");
        setMethod("phone");
        setSuccessMessage("Google sign-in successful. Please link your phone number for account recovery.");
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async (e) => {
    e.preventDefault();
    setError(""); setSuccessMessage(""); setLoading(true);
    if (!acceptedTOS) {
      setError("You must accept the Terms of Service.");
      setLoading(false);
      return;
    }
    try {
      await signupWithEmail(email, password, displayName, { requireEmailVerification: true, role: "student", acceptedTOS: true });
      setSuccessMessage("Account created. Please check your email to verify your address.");
      // If phone provided, move to linking flow
      if (phone) {
        setLinkingFor("email");
        setMethod("phone");
        // continue to phone linking
      } else {
          setTimeout(() => navigate("/"), 2000);
      }
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async () => {
    setError(""); setLoading(true);
    try {
      setupRecaptcha("recaptcha-container");
      let res;
      if (linkingFor) {
        res = await sendPhoneOtpForLinking(phone, "recaptcha-container");
      } else {
        res = await sendPhoneOtp(phone, "recaptcha-container");
      }
      setConfirmationResult(res);
      setSuccessMessage("OTP sent — please enter the code.");
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  const handleConfirmOtp = async () => {
    setLoading(true); setError("");
    try {
      if (!confirmationResult) throw new Error("No OTP request found");
      if (linkingFor) {
        await confirmPhoneOtpForLinking(confirmationResult, otpCode);
        setSuccessMessage("Phone linked successfully. Redirecting...");
      } else {
        const res = await confirmPhoneOtp(confirmationResult, otpCode);
        await saveUserToFirestore(res.user);
        setSuccessMessage("Phone verified and account created. Redirecting...");
      }
        setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  // Redirect authenticated users away from sign-up page to home
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
          <h2>Welcome to TechMatch</h2>
          <p>Create your account to get started with our services.</p>

          <div className="auth-cta">
            <button className="google-btn" onClick={handleGoogle} disabled={loading}>
              Continue with Google
            </button>

            <div className="divider">OR</div>

            <div className="alt-btns">
              <button onClick={() => setMethod("email")}>Sign up with Email</button>
              <button onClick={() => setMethod("phone")}>Sign up with Phone</button>
            </div>
          </div>
        </div>

        <div className="auth-right">
          <h3>Create account</h3>
          <p className="small-text">Choose a method to sign up. You can use Google, Email or Phone (OTP).</p>

          {method === "email" && (
            <form className="auth-form" onSubmit={handleEmailSignup}>
              <div className="form-group">
                <label>Full name</label>
                <input required value={displayName} onChange={(e) => setDisplayName(e.target.value)} disabled={loading} />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
              </div>

              <div className="form-group">
                <label>Password (min 6 chars)</label>
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} disabled={loading} />
              </div>

              <div className="form-group">
                <label>Phone (optional)</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91..." disabled={loading} />
              </div>

              <div className="form-group" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <input type="checkbox" id="tos" checked={acceptedTOS} onChange={(e) => setAcceptedTOS(e.target.checked)} disabled={loading} />
                <label htmlFor="tos" style={{ cursor: "pointer" }}>I accept the <Link to="/terms">Terms</Link></label>
              </div>

              <div className="auth-actions">
                <button className="submit-button" type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create account"}
                </button>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <Link to="/password-reset" className="small-text">Forgot password?</Link>
                  <Link to="/signin" className="small-text">Already have an account?</Link>
                </div>
              </div>
            </form>
          )}

          {method === "phone" && (
            <div className="auth-form">
              <div className="form-group">
                <label>Phone (include country code)</label>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91..." disabled={loading || !!confirmationResult} />
              </div>

              <div id="recaptcha-container"></div>

              <div className="auth-actions">
                <button className="submit-button" onClick={handleSendOtp} disabled={loading || !!confirmationResult}>
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </div>

              {confirmationResult && (
                <>
                  <div className="form-group">
                    <label>Enter OTP</label>
                    <input value={otpCode} onChange={(e) => setOtpCode(e.target.value)} placeholder="000000" disabled={loading} />
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
          {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
