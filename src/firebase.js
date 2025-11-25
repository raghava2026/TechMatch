// Firebase helper (modular SDK v9+)
// 1) Create a Firebase project and enable Authentication (Google, Email/Password, Phone)
// 2) Create a Firestore database
// 3) Set the config values below as environment variables in a .env file or replace process.env values directly

import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || '<YOUR_API_KEY>',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || '<YOUR_AUTH_DOMAIN>',
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || '<YOUR_PROJECT_ID>',
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || '<YOUR_STORAGE_BUCKET>',
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || '<YOUR_MESSAGING_SENDER_ID>',
  appId: process.env.REACT_APP_FIREBASE_APP_ID || '<YOUR_APP_ID>'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Sign in with Google popup
export async function signInWithGoogle() {
  const result = await signInWithPopup(auth, googleProvider);
  // Save user to Firestore
  await saveUserToFirestore(result.user);
  return result;
}

// Sign up with email/password
export async function signupWithEmail(email, password) {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await saveUserToFirestore(res.user);
  return res;
}

// Sign in with email/password
export async function signinWithEmail(email, password) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  await saveUserToFirestore(res.user);
  return res;
}

// Phone auth: prepare recaptcha and send OTP
export function setupRecaptcha(containerId = 'recaptcha-container') {
  // On client side, ensure there's a DOM element with this id
  if (typeof window === 'undefined') return null;
  if (window.recaptchaVerifier) return window.recaptchaVerifier;
  window.recaptchaVerifier = new RecaptchaVerifier(
    containerId,
    {
      size: 'invisible',
    },
    auth
  );
  return window.recaptchaVerifier;
}

export async function sendPhoneOtp(phoneNumber) {
  const verifier = setupRecaptcha('recaptcha-container');
  const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
  // confirmationResult.confirm(otp) will sign in the user
  return confirmationResult;
}

export async function confirmPhoneOtp(confirmationResult, code) {
  const res = await confirmationResult.confirm(code);
  await saveUserToFirestore(res.user);
  return res;
}

// Save minimal user info to Firestore under `users/{uid}`
export async function saveUserToFirestore(user) {
  if (!user || !user.uid) return;
  const userRef = doc(db, 'users', user.uid);
  const payload = {
    uid: user.uid,
    email: user.email || null,
    phoneNumber: user.phoneNumber || null,
    displayName: user.displayName || null,
    photoURL: user.photoURL || null,
    providerData: user.providerData || [],
    lastSeen: new Date().toISOString(),
  };
  try {
    await setDoc(userRef, payload, { merge: true });
  } catch (err) {
    console.error('Failed to save user to Firestore', err);
  }
}

// Observe auth state
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

export default app;
