import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiq-c6b8f.firebaseapp.com",
  projectId: "interviewiq-c6b8f",
  storageBucket: "interviewiq-c6b8f.firebasestorage.app",
  messagingSenderId: "551725814748",
  appId: "1:551725814748:web:7f4379f0995a316d473519",
  measurementId: "G-L9CCEZNTS9"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export {auth, provider}