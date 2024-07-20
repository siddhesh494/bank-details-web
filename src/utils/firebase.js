// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnO2PwEtPlO7gPCVZrldje1VqXgHDXRHs",
  authDomain: "apna-bank-6847a.firebaseapp.com",
  projectId: "apna-bank-6847a",
  storageBucket: "apna-bank-6847a.appspot.com",
  messagingSenderId: "980381237712",
  appId: "1:980381237712:web:b3fca51f1f20410b81b9d5",
  measurementId: "G-5F800F4ZLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth()