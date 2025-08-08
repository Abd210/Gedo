// Firebase core and product SDKs we need
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported as analyticsSupported } from 'firebase/analytics';
// If later you want auth / firestore / storage just import here.

// --- Firebase configuration ---
// NOTE: keep these values in env vars for production builds; hard-coded for demo simplicity.
const firebaseConfig = {
  apiKey: 'AIzaSyAmRQ7iriFSeS6N15GWwtcr1MFCsTT7ItI',
  authDomain: 'gedo-b969f.firebaseapp.com',
  projectId: 'gedo-b969f',
  storageBucket: 'gedo-b969f.appspot.com',
  messagingSenderId: '378957228303',
  appId: '1:378957228303:web:54e10990db0f10248f367a',
  measurementId: 'G-MDTDZMQZ0V',
};

// Initialize Firebase App (singleton)
const app = initializeApp(firebaseConfig);

// Initialize Analytics only when supported (avoids errors in unsupported environments)
let analytics = null;
if (typeof window !== 'undefined') {
  analyticsSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
