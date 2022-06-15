// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAiRUoVD-IivWOE8sX8bW-yazGogpK8vjY",
  authDomain: "todo-f0e2e.firebaseapp.com",
  projectId: "todo-f0e2e",
  storageBucket: "todo-f0e2e.appspot.com",
  messagingSenderId: "345400076117",
  appId: "1:345400076117:web:6920f0819a6f14ec3631dc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)