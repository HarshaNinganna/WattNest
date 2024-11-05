// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-storage.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "",
  authDomain: "wattnest-cde1f.firebaseapp.com",
  projectId: "wattnest-cde1f",
  storageBucket: "wattnest-cde1f.appspot.com", // Fixed storageBucket URL
  messagingSenderId: "881782206993",
  appId: "1:881782206993:web:5b722fad4d83edb26b37b0",
  measurementId: "G-E8X673ZRVB"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }; // Export Firestore and Auth instances
