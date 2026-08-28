import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANGwq3PYLOx757zD0Cv3pX1qkgdrJAC_0",
  authDomain: "fun-holidays-ae83e.firebaseapp.com",
  projectId: "fun-holidays-ae83e",
  storageBucket: "fun-holidays-ae83e.firebasestorage.app",
  messagingSenderId: "928299870458",
  appId: "1:928299870458:web:914133a675634945880143",
  measurementId: "G-M4D4J18XP4",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;
