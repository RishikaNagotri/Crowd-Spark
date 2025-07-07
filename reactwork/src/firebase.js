// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // ✅ Needed for login
import { getFirestore } from "firebase/firestore"; // ✅ If you're using Firestore
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCIsGRU5jebZ900Dxma51MCdJSWunD771k",
  authDomain: "crowd-spark.firebaseapp.com",
  projectId: "crowd-spark",
  storageBucket: "crowd-spark.firebasestorage.app",
  messagingSenderId: "475171266009",
  appId: "1:475171266009:web:6270c9eb676bff74490dc8",
  measurementId: "G-XHRE6M4G73"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ These are important for sign-in and DB
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db };
