import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-b498f.firebaseapp.com",
  projectId: "reactchat-b498f",
  storageBucket: "reactchat-b498f.appspot.com",
  messagingSenderId: "674094131142",
  appId: "1:674094131142:web:39c8bafae10c08228db4c7"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();

export const db = getFirestore();

export const storage = getStorage();