import { initializeApp } from 'firebase/app';
import { getFunctions } from 'firebase/functions';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

// Public web config (same values served at /__/firebase/init.json on hosting).
// The apiKey here is a project identifier, not a secret — security is enforced
// server-side (Cloud Function auth check) and in the Firebase console.
const firebaseConfig = {
    apiKey: "AIzaSyCWamdlTJWU-ntZFetTzVBHoPGrUa5Flpw",
    appId: "1:216991832112:web:68badf5662cae46322b5f5",
    authDomain: "aidnd-interactive-novel.firebaseapp.com",
    messagingSenderId: "216991832112",
    projectId: "aidnd-interactive-novel",
    storageBucket: "aidnd-interactive-novel.firebasestorage.app",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Functions and get a reference to the service
const functions = getFunctions(app, 'us-central1');

// Auth (anonymous sessions for guest mode)
const auth = getAuth(app);

/**
 * Ensure there is a signed-in (anonymous) user before calling Cloud Functions.
 * Requires "Anonymous" sign-in provider to be enabled in the Firebase console.
 * Fails soft: returns null if sign-in is unavailable so callers can decide
 * whether to proceed (the Cloud Function is the real gatekeeper).
 */
const ensureAnonymousAuth = async () => {
    if (auth.currentUser) return auth.currentUser;
    try {
        const cred = await signInAnonymously(auth);
        return cred.user;
    } catch (e) {
        console.warn('[Firebase] Anonymous sign-in unavailable:', e?.code || e?.message);
        return null;
    }
};

export { functions, auth, ensureAnonymousAuth, onAuthStateChanged };
