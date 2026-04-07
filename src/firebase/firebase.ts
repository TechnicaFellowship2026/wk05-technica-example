// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// WARNING: REMEMBER THAT IT'S BAD PRACTICE TO STRAIGHT UP PUT IN THE APIKEY INFO
// AND EVERYTHING ELSE HERE!! IT IS BETTER TO HAVE A .ENV FILE (THAT YOU MAKE SURE IS IGNORED
// IN .gitignore) AND TO USE THAT INSTEAD.
// See this link for more info:
// https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://vite.dev/guide/env-and-mode&ved=2ahUKEwiOnJe2xNaQAxXWM1kFHdqxLe4QFnoECAcQAQ&usg=AOvVaw2D48h7RZRZJapSlpAzMGla
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);


