// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB65rtiwXadlTreUQ-ZYDlBwO44XVI0JeA",
  authDomain: "my-little-world-60f5d.firebaseapp.com",
  projectId: "my-little-world-60f5d",
  storageBucket: "my-little-world-60f5d.firebasestorage.app",
  messagingSenderId: "52936439342",
  appId: "1:52936439342:web:0362969930ae7675b851bf",
  measurementId: "G-BBLRF6ETKD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export { app };