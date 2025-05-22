// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC0RUIH6AuVi_f0lKHU9mOBKFXA2KzXgGA",
  authDomain: "dkt-delivery.firebaseapp.com",
  projectId: "dkt-delivery",
  storageBucket: "dkt-delivery.appspot.com",
  messagingSenderId: "1038339270283",
  appId: "1:1038339270283:web:dea08cf8c358ea0241568e",
  measurementId: "G-82LCDF08HW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
