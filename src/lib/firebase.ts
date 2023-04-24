// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBU-nqwagjBtMgO7RVoPTyV17MQXSiiu68",
  authDomain: "raccogli-banane.firebaseapp.com",
  projectId: "raccogli-banane",
  storageBucket: "raccogli-banane.appspot.com",
  messagingSenderId: "251568500565",
  appId: "1:251568500565:web:03fd7f47547cd1a6a449dc",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
