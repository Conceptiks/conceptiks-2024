// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3EQ-Ye0WX_gUunwop1z827EI476bBbqo",
  authDomain: "conceptiks2024.firebaseapp.com",
  projectId: "conceptiks2024",
  storageBucket: "conceptiks2024.appspot.com",
  messagingSenderId: "44357788128",
  appId: "1:44357788128:web:fb8614812e3601b3da0b85",
  measurementId: "G-8PF350N8FC",
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
