import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDUYNfWUiBqBBLCQFFt5T5bnjNMDIAE8Kg",
  authDomain: "aquaventure-76cf5.firebaseapp.com",
  projectId: "aquaventure-76cf5",
  storageBucket: "aquaventure-76cf5.firebasestorage.app",
  messagingSenderId: "1092133819448",
  appId: "1:1092133819448:web:3d0baa7138ce2d8e2882cd",
  measurementId: "G-XE3V5074Z8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);