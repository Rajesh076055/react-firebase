// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyAqMUvOsBFeSMXru2ik3TAKFBM4NHM1wyo",
  authDomain: "fir-course-a90be.firebaseapp.com",
  projectId: "fir-course-a90be",
  storageBucket: "fir-course-a90be.appspot.com",
  messagingSenderId: "410422118711",
  appId: "1:410422118711:web:e915f5f18b06950ea8b2b2",
  measurementId: "G-CCCE7R9XFD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);