// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "property---panga.firebaseapp.com",
  projectId: "property---panga",
  storageBucket: "property---panga.appspot.com",
  messagingSenderId: "548278700677",
  appId: "1:548278700677:web:a3cc5e4d0d32f16da437ec",
  measurementId: "G-TLHXD7TV5W",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
