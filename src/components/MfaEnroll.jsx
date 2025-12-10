import React, { useState } from 'react';
import { startMfaEnrollment, completeMfaEnrollment } from '../firebase';

export default function MfaEnroll() {
  const [phone, setPhone] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [code, setCode] = useState('');
  const [status, setStatus] = useState('');

  const handleStart = async () => {
    setStatus('');
    try {
      const res = await startMfaEnrollment(phone, 'recaptcha-container');
      setConfirmationResult(res);
      setStatus('Code sent. Enter verification code.');
    } catch (err) {
      setStatus('Error: ' + (err.message || String(err)));
    }
  };

  const handleComplete = async () => {
    try {
      await completeMfaEnrollment(confirmationResult, code);
      setStatus('MFA enrolled successfully.');
    } catch (err) {
      setStatus('Error: ' + (err.message || String(err)));
    }
  };

  return (
    <div>
      <div id="recaptcha-container" />
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+91..." />
        <button onClick={handleStart}>Send code</button>
      </div>

      {confirmationResult && (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" />
          <button onClick={handleComplete}>Complete enrollment</button>
        </div>
      )}

      {status && <div style={{ marginTop: 8 }}>{status}</div>}
    </div>
  );
}
