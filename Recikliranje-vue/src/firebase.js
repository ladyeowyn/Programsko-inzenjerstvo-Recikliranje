// Učitavanje potrebnih funkcija
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Firebase konfiguracija
const firebaseConfig = {
  apiKey: "AIzaSyC2y0S02iyxBOXpvu2J4oUuBuscuBzMHYQ",
  authDomain: "reciklirajme-b5feb.firebaseapp.com",
  projectId: "reciklirajme-b5feb",
  storageBucket: "reciklirajme-b5feb.firebasestorage.app",
  messagingSenderId: "984076737971",
  appId: "1:984076737971:web:9e3dee9d5e5dccdb49ffc6",
};
// Firebase inicijalizacija
const app = initializeApp(firebaseConfig);
// Inicijalizacija servisa
const auth = getAuth(app); // auth instanca
const db = getFirestore(app); // database instanca
// Izvoz servisa
export { auth, db };
