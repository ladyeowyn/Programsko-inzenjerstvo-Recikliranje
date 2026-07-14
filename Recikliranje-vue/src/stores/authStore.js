import { defineStore } from "pinia";
import { ref } from "vue";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase";

export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const response = ref({ error: false, message: "" });

  // Praćenje stanja autentifikacije - reagira na svaku promjenu
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser;
  });

  // Registracija novog korisnika
  const register = async (email, password) => {
    response.value.error = false;
    response.value.message = "";
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      response.value.error = false;
      response.value.message =
        "Korisnik registriran: " + JSON.stringify(userCredential.user);
    } catch (error) {
      response.value.error = true;
      response.value.message = "Greška pri registraciji: " + error.message;
    }
  };

  // Prijava postojećeg korisnika
  const login = async (email, password) => {
    response.value.error = false;
    response.value.message = "";
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      response.value.error = false;
      response.value.message =
        "Korisnik prijavljen: " + JSON.stringify(userCredential.user);
    } catch (error) {
      response.value.error = true;
      response.value.message = "Greška pri prijavi: " + error.message;
    }
  };

  const clearResponse = () => {
    response.value = { error: false, message: "" };
  };

  // Odjava korisnika
  const logout = async () => {
    await signOut(auth);
  };

  return { user, response, register, login, clearResponse, logout };
});
