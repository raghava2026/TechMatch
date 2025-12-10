// src/firebase.js
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  onAuthStateChanged,
  updateProfile,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  getMultiFactorResolver,
  multiFactor,
  PhoneMultiFactorGenerator,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

/* ---------- default fallback config (replace with your env in prod) ---------- */
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

if (typeof window !== "undefined") {
  const required = ["apiKey", "authDomain", "projectId", "appId"];
  const missing = required.filter((k) => !firebaseConfig[k]);
  if (missing.length) {
    // eslint-disable-next-line no-console
    console.error("[firebase] Missing Firebase configuration values:", missing.join(", "));
  } else {
    // eslint-disable-next-line no-console
    console.debug("[firebase] config loaded for project:", firebaseConfig.projectId);
  }
}

const app = initializeApp(firebaseConfig);

/* ========== AUTH & DB ========== */
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

/* ===== Utility: Save user to Firestore (merge) ===== */
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
    acceptedTOS: !!extra.acceptedTOS,
    createdAt: extra.createdAt || new Date().toISOString(),
    lastSeen: new Date().toISOString(),
    ...(extra.custom || {}),
  };
  try {
    await setDoc(userRef, payload, { merge: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[firebase] saveUserToFirestore failed", err);
  }
}

/* ========== Sign-in / Sign-up helpers ========== */

/* Google popup sign-in */
export async function signInWithGoogle(requireEmailVerified = false) {
  const res = await signInWithPopup(auth, googleProvider);
  const u = res.user;
  if (requireEmailVerified && u.email && !u.emailVerified) {
    await firebaseSignOut(auth);
    throw new Error("Google account email not verified. Please verify your email at Google.");
  }
  await saveUserToFirestore(u, { displayName: u.displayName });
  return res;
}

/* Email signup (creates user, optional email verification) */
export async function signupWithEmail(email, password, displayName = "", options = {}) {
  // options: { requireEmailVerification, role, acceptedTOS }
  const res = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    try {
      await updateProfile(res.user, { displayName });
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("[firebase] updateProfile failed", err);
    }
  }
  if (options.requireEmailVerification) {
    try {
      await sendEmailVerification(res.user);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn("[firebase] sendEmailVerification failed", err);
    }
  }
  await saveUserToFirestore(res.user, {
    displayName,
    role: options.role || "student",
    acceptedTOS: !!options.acceptedTOS,
    createdAt: new Date().toISOString(),
  });
  return res;
}

/* Email sign-in */
export async function signinWithEmail(email, password) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  await saveUserToFirestore(res.user);
  return res;
}

/* Password reset email */
export async function sendPasswordReset(email) {
  return sendPasswordResetEmail(auth, email);
}

/* Sign out */
export async function signOutUser() {
  return firebaseSignOut(auth);
}

/* On auth change */
export function onAuthChange(cb) {
  return onAuthStateChanged(auth, cb);
}

/* Current user */
export function getCurrentUser() {
  return auth.currentUser;
}

/* ========== Phone / OTP flows ========== */
/**
 * setupRecaptcha - creates a RecaptchaVerifier instance (cached)
 * containerId: id of DOM element to render recaptcha (e.g., "recaptcha-container")
 * size: "invisible" | "normal"
 */
let _recaptchaVerifier = null;
export function setupRecaptcha(containerId = "recaptcha-container", size = "invisible") {
  if (typeof window === "undefined") return null;
  if (_recaptchaVerifier) return _recaptchaVerifier;

  try {
    // allow disabling app verification for local dev: set REACT_APP_FIREBASE_DISABLE_APP_VERIFICATION_FOR_TESTING=true
    _recaptchaVerifier = new RecaptchaVerifier(containerId, { size }, auth);
    // optional render
    if (_recaptchaVerifier.render) {
      _recaptchaVerifier.render().catch(() => {});
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("[firebase] setupRecaptcha failed", err);
    throw err;
  }
  return _recaptchaVerifier;
}

/* Send OTP to phone for sign-in (returns confirmationResult) */
export async function sendPhoneOtp(phoneNumber, containerId = "recaptcha-container") {
  const verifier = setupRecaptcha(containerId);
  if (!verifier) throw new Error("Recaptcha not initialized");
  const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
  return confirmationResult;
}

/* Confirm phone OTP after sendPhoneOtp (confirmationResult.confirm(code)) */
export async function confirmPhoneOtp(confirmationResult, code) {
  if (!confirmationResult) throw new Error("No confirmation result provided");
  const res = await confirmationResult.confirm(code);
  await saveUserToFirestore(res.user, { displayName: res.user.displayName || null });
  return res;
}

/* Link phone number to existing signed-in user (linking flow) */
export async function sendPhoneOtpForLinking(phoneNumber, containerId = "recaptcha-container") {
  const verifier = setupRecaptcha(containerId);
  if (!verifier) throw new Error("Recaptcha not initialized");
  if (!auth.currentUser) throw new Error("No authenticated user to link phone to");
  const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
  // Note: with modular SDK, linkWithPhoneNumber isn't exposed same as older SDK; we do confirmation then link via credential below
  return confirmationResult; // caller should call confirm and then link if necessary
}

/* Confirm & link phone to current user */
export async function confirmPhoneOtpForLinking(confirmationResult, code) {
  if (!confirmationResult) throw new Error("No confirmation result");
  const phoneAuthCredential = PhoneAuthProvider.credential(confirmationResult.verificationId || confirmationResult._verificationId, code);
  // sign-in result of confirmationResult.confirm will be a user credential (if used signInWithPhoneNumber)
  // To link: auth.currentUser.linkWithCredential(credential) — but modular SDK requires re-import; we will attempt generic approach:
  if (!auth.currentUser) {
    // If no currentUser, just confirm (sign-in)
    const res = await confirmationResult.confirm(code);
    await saveUserToFirestore(res.user);
    return res;
  }

  // Link credential to current user
  try {
    const credential = PhoneAuthProvider.credential(confirmationResult.verificationId || confirmationResult._verificationId, code);
    const linked = await auth.currentUser.linkWithCredential(credential);
    await saveUserToFirestore(linked.user);
    return linked;
  } catch (err) {
    // Fallback: if linking fails, try confirming (which signs in)
    // eslint-disable-next-line no-console
    console.warn("[firebase] linking phone failed, trying confirm instead", err);
    const res = await confirmationResult.confirm(code);
    await saveUserToFirestore(res.user);
    return res;
  }
}

/* ========== MFA (Multi-factor) flows ============
  - startMfaEnrollment: returns an object with verificationId and renders Recaptcha on container
  - completeMfaEnrollment: provide verificationCode to finish enrollment
  - checkIfUserHasMfa: helper to detect existing enrolled second factors
*/
export async function startMfaEnrollment(phoneNumber, displayName = "Phone", recaptchaContainerId = "recaptcha-container") {
  if (!auth.currentUser) throw new Error("User must be signed-in to enroll MFA");
  const verifier = setupRecaptcha(recaptchaContainerId, "invisible");
  const mfaUser = multiFactor(auth.currentUser);
  const session = await mfaUser.getSession(); // serverSession
  // Use PhoneAuthProvider to send verification
  const phoneOpts = { phoneNumber, session };
  // In modular SDK there's no one-call verify with session, we use PhoneAuthProvider and recaptcha:
  // create verificationId using verifyPhoneNumber helper on provider with verifier (browser)
  const verificationId = await PhoneAuthProvider.verifyPhoneNumber(auth, phoneOpts, verifier);
  // Caller must prompt user for code and then call completeMfaEnrollment with code + displayName
  return { verificationId };
}

export async function completeMfaEnrollment(verificationId, verificationCode, displayName = "Phone") {
  if (!auth.currentUser) throw new Error("User must be signed-in to complete MFA enrollment");
  const cred = PhoneAuthProvider.credential(verificationId, verificationCode);
  const multiFactorAssertion = PhoneMultiFactorGenerator.assertion(cred);
  const mfaUser = multiFactor(auth.currentUser);
  await mfaUser.enroll(multiFactorAssertion, displayName);
  // update Firestore user record to indicate MFA enabled
  await saveUserToFirestore(auth.currentUser, { custom: { mfaEnrolled: true } });
  return true;
}

/* detect if current user has any enrolled second factors */
export function checkIfUserHasMfa() {
  const u = auth.currentUser;
  if (!u) return false;
  // firebase User has multiFactor property listing enrolledFactors
  try {
    const mf = u.multiFactor;
    if (mf && mf.enrolledFactors && mf.enrolledFactors.length) return true;
  } catch (e) {
    // ignore
  }
  return false;
}

/* ========== Helper for handling 'resolver' when sign-in requires MFA ======
  If sign-in throws a MultiFactorError, you can call getMultiFactorResolver(error)
  Then prompt the user to choose a second factor and verify accordingly.
*/
export function getResolver(err) {
  try {
    return getMultiFactorResolver(auth, err);
  } catch (e) {
    return null;
  }
}

export default app;
