// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRczmofH9X1AJkuBeCkiT-gOKMzwmPErw",
  authDomain: "todolist-c07ff.firebaseapp.com",
  projectId: "todolist-c07ff",
  storageBucket: "todolist-c07ff.appspot.com",
  messagingSenderId: "209984388395",
  appId: "1:209984388395:web:63de2f34e97bb069f4996e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)