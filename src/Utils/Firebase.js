// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrpygNWDjWQJwfSlC1VhP2tU9dJNwefVw",
  authDomain: "netflix-gpt-ab5b5.firebaseapp.com",
  projectId: "netflix-gpt-ab5b5",
  storageBucket: "netflix-gpt-ab5b5.appspot.com",
  messagingSenderId: "265455118287",
  appId: "1:265455118287:web:b1fbf9de60b68e442a14ba",
  measurementId: "G-B13B1TL71B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();

