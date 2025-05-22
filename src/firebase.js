// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0RUIH6AuVi_fOlKHU9mOBKFXA2KzXgGA",
  authDomain: "dkt-delivery.firebaseapp.com",
  projectId: "dkt-delivery",
  storageBucket: "dkt-delivery.appspot.com",
  messagingSenderId: "1038339270283",
  appId: "1:1038339270283:web:dea08cf8c358ea0241568e",
  measurementId: "G-82LCD0F8HW"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
