// firebase.js (improved)
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  linkWithPhoneNumber,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  signOut as firebaseSignOut,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// fallback/default config (useful for local dev when env isn't loaded)
const _defaultFirebaseConfig = {
  apiKey: "AIzaSyBQ8IymMooGIK5vMPeohdLqIw0D94nT2Lw",
  authDomain: "techmacth.firebaseapp.com",
  projectId: "techmacth",
  storageBucket: "techmacth.firebasestorage.app",
  messagingSenderId: "609720201660",
  appId: "1:609720201660:web:a2a22189ddf3a0d11b7bb9",
  measurementId: "G-VT40P7B1DX",
};

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || _defaultFirebaseConfig.apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || _defaultFirebaseConfig.authDomain,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || _defaultFirebaseConfig.projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || _defaultFirebaseConfig.storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || _defaultFirebaseConfig.messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_APP_ID || _defaultFirebaseConfig.appId,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || _defaultFirebaseConfig.measurementId,
};

// Basic runtime validation to help diagnose common misconfiguration errors
if (typeof window !== 'undefined') {
  const required = [
    'apiKey',
    'authDomain',
    'projectId',
    'appId'
  ];
  const missing = required.filter((k) => !firebaseConfig[k]);
  if (missing.length) {
    // eslint-disable-next-line no-console
    console.error(
      '[firebase] Missing Firebase configuration values:',
      missing.join(', '),
      '\nMake sure you have a `.env.local` with REACT_APP_FIREBASE_* variables and restart the dev server.'
    );
  } else {
    // eslint-disable-next-line no-console
    console.debug('[firebase] config loaded for project:', firebaseConfig.projectId);
  }
}

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Analytics only in browser and only if measurementId present
if (typeof window !== 'undefined' && firebaseConfig.measurementId) {
  import('firebase/analytics')
    .then(({ getAnalytics }) => {
      try {
        getAnalytics(app);
        // eslint-disable-next-line no-console
        console.debug('[firebase] analytics initialized');
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('[firebase] analytics init failed', err);
      }
    })
    .catch(() => {
      // optional: analytics package might not be installed in some setups
    });
}

/* ===== Helper: Save user to Firestore ===== */
export async function saveUserToFirestore(user, extra = {}) {
  if (!user || !user.uid) return;
  const userRef = doc(db, "users", user.uid);
  const payload = {
    uid: user.uid,
    email: user.email || null,
    phoneNumber: user.phoneNumber || null,
    displayName: user.displayName || extra.displayName || null,
    photoURL: user.photoURL || null,
    providerData: user.providerData || [],
    role: extra.role || "student",
    acceptedTOS: extra.acceptedTOS || false,
    createdAt: extra.createdAt || new Date().toISOString(),
    lastSeen: new Date().toISOString(),
    ...extra.custom, // allow extension
  };
  try {
    await setDoc(userRef, payload, { merge: true });
  } catch (err) {
    console.error("Failed to save user to Firestore", err);
  }
}

/* ===== Google Sign-in (popup) ===== */
export async function signInWithGoogle(requireEmailVerified = false) {
  const result = await signInWithPopup(auth, googleProvider);
  const u = result.user;

  // Optionally require Google email verified
  if (requireEmailVerified && !u.emailVerified) {
    // you can sign out and show message
    await firebaseSignOut(auth);
    throw new Error("Google account email not verified. Please verify your email at Google.");
  }

  // Save user doc (merge)
  await saveUserToFirestore(u, { displayName: u.displayName });
  return result;
}

/* ===== Email signup (creates user, updates profile, sends verification) ===== */
export async function signupWithEmail(email, password, displayName = "", options = {}) {
  // options: { requireEmailVerification: boolean, role: 'student'|'admin', acceptedTOS: boolean }
  const res = await createUserWithEmailAndPassword(auth, email, password);

  // update profile displayName
  if (displayName) {
    try {
      await updateProfile(res.user, { displayName });
    } catch (err) {
      console.warn("updateProfile failed", err);
    }
  }

  // send email verification optionally
  if (options.requireEmailVerification) {
    try {
      await sendEmailVerification(res.user);
    } catch (err) {
      console.warn("sendEmailVerification failed", err);
    }
  }

  // save to Firestore (store role/consent)
  await saveUserToFirestore(res.user, {
    displayName,
    role: options.role || "student",
    acceptedTOS: !!options.acceptedTOS,
    createdAt: new Date().toISOString(),
  });

  return res;
}

/* ===== Email signin ===== */
export async function signinWithEmail(email, password) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  await saveUserToFirestore(res.user); // update lastSeen etc
  return res;
}

/* ===== Phone auth (OTP) ===== */
let _recaptchaVerifier = null;

export function setupRecaptcha(containerId = "recaptcha-container", size = "invisible") {
  if (typeof window === "undefined") return null;
  if (_recaptchaVerifier) {
    return _recaptchaVerifier;
  }
  try {
    // Ensure `auth.settings` exists to avoid SDK internals reading undefined
    // (some environments or SDK versions may not create this object until used)
    if (!auth.settings) {
      // create a minimal settings object that Firebase internals may expect
      // eslint-disable-next-line no-underscore-dangle
      try {
        // Some SDK builds expose a _delegate that holds settings; be conservative
        auth.settings = {};
      } catch (e) {
        // If auth is frozen/immutable, continue — Recaptcha may still work
      }
    }

    // Optional: allow disabling app verification in local dev for test flows
    // Set REACT_APP_FIREBASE_DISABLE_APP_VERIFICATION_FOR_TESTING=true in .env.local
    if (process.env.REACT_APP_FIREBASE_DISABLE_APP_VERIFICATION_FOR_TESTING === 'true') {
      try {
        if (auth.settings) auth.settings.appVerificationDisabledForTesting = true;
      } catch (e) {
        // ignore if not writable
      }
    }

    _recaptchaVerifier = new RecaptchaVerifier(
      containerId,
      { size },
      auth
    );
    // render is optional (verifier will be available)
    _recaptchaVerifier.render?.().catch(() => {});
  } catch (err) {
    // Provide clearer error context to the caller
    // eslint-disable-next-line no-console
    console.error('[firebase] setupRecaptcha failed', err);
    throw err;
  }
  return _recaptchaVerifier;
}

export async function sendPhoneOtp(phoneNumber, containerId = "recaptcha-container") {
  const verifier = setupRecaptcha(containerId);
  if (!verifier) throw new Error("Recaptcha not initialized");
  const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
  return confirmationResult; // caller must call confirmationResult.confirm(code)
}

export async function confirmPhoneOtp(confirmationResult, code) {
  if (!confirmationResult) throw new Error("No confirmation result");
  const res = await confirmationResult.confirm(code);
  // Save minimal data to Firestore
  await saveUserToFirestore(res.user, { displayName: res.user.displayName || null });
  return res;
}

/* ===== Link phone number to existing signed-in user (OTP) ===== */
export async function sendPhoneOtpForLinking(phoneNumber, containerId = "recaptcha-container") {
  const verifier = setupRecaptcha(containerId);
  if (!verifier) throw new Error("Recaptcha not initialized");
  if (!auth.currentUser) throw new Error("No authenticated user to link phone to");
  // linkWithPhoneNumber returns a ConfirmationResult similar to signInWithPhoneNumber
  const confirmationResult = await linkWithPhoneNumber(auth.currentUser, phoneNumber, verifier);
  return confirmationResult; // caller must call confirmationResult.confirm(code) to complete linking
}

export async function confirmPhoneOtpForLinking(confirmationResult, code) {
  if (!confirmationResult) throw new Error("No confirmation result");
  // This will complete linking the phone number to the existing user
  const res = await confirmationResult.confirm(code);
  // update Firestore record for the linked user
  await saveUserToFirestore(res.user, { displayName: res.user.displayName || null });
  return res;
}

/* ===== Sign-out and helpers ===== */
export async function signOutUser() {
  return firebaseSignOut(auth);
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

export function getCurrentUser() {
  return auth.currentUser;
}

export default app;
