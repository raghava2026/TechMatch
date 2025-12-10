// src/components/MfaEnroll.jsx
import React, { useState } from "react";
import { startMfaEnrollment, completeMfaEnrollment } from "../firebase";

export default function MfaEnroll() {
  const [phone, setPhone] = useState("");
  const [verificationId, setVerificationId] = useState(null);
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");

  const handleStart = async () => {
    try {
      const { verificationId } = await startMfaEnrollment(phone, "recaptcha-container");
      setVerificationId(verificationId);
      setStatus("Code sent. Enter verification code.");
    } catch (err) {
      setStatus("Error: " + (err.message || String(err)));
    }
  };

  const handleComplete = async () => {
    try {
      await completeMfaEnrollment(verificationId, code);
      setStatus("MFA enrolled successfully.");
    } catch (err) {
      setStatus("Error: " + (err.message || String(err)));
    }
  };

  return (
    <div>
      <div id="recaptcha-container" />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91..." />
      <button onClick={handleStart}>Send code</button>

      {verificationId && (
        <>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" />
          <button onClick={handleComplete}>Complete enrollment</button>
        </>
      )}

      {status && <div>{status}</div>}
    </div>
  );
}
