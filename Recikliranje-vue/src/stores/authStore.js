import { defineStore } from "pinia";
import { ref, computed } from "vue";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref(null);
    const response = ref({ error: false, message: "" });

    // Praćenje stanja autentifikacije - reagira na svaku promjenu
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        user.value = currentUser;
      } else {
        user.value = null;
      }
    });

    // Registracija novog korisnika
    const register = async (email, password, grad) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        const kreiraniKorisnik = userCredential.user;

        await setDoc(doc(db, "users", kreiraniKorisnik.uid), {
          email: email,
          grad: grad,
          uloga: "korisnik",
          datumRegistracije: new Date().toISOString(),
        });

        response.value.error = false;
        response.value.message =
          "Korisnik uspješno registriran i spremljen u bazu!";
      } catch (error) {
        response.value.error = true;
        response.value.message = "Greška pri registraciji: " + error.message;
      }
    };

    // Prijava postojećeg korisnika
    const login = async (email, password) => {
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

    const novaLozinka = ref("");

    const promijeniLozinku = async () => {
      try {
        await updatePassword(auth.currentUser, novaLozinka.value);

        response.value.error = false;
        response.value.message = "Lozinka uspješno promijenjena!";
      } catch (error) {
        response.value.error = true;
        response.value.message =
          "Greška pri promjeni lozinke: " + error.message;
      }
    };

    // Odjava korisnika
    const logout = async () => {
      await signOut(auth);
    };

    // Brisanje korisnika
    const obrisiKorisnika = async () => {
      try {
        await deleteUser(auth.currentUser);

        response.value.error = false;
        response.value.message = "Korisnik uspješno izbrisan!";
        return true;
      } catch (error) {
        response.value.error = true;
        response.value.message =
          "Greška pri brisanju korisničkog računa: " + error.message;
        return false;
      }
    };

    const reauthenticate = async (email, password) => {
      const credential = EmailAuthProvider.credential(email, password);
      await reauthenticateWithCredential(auth.currentUser, credential);
    };

    // Validacija passworda

    const provjeraPass8 = computed((password) => {
      return (password) => password.length >= 8;
    });

    const provjeraPassSlova = computed((password) => {
      return (password) => password.match(/[A-Z]/g);
    });

    const provjeraPassBroja = computed((password) => {
      return (password) => password.match(/\d/);
    });

    const validacijaBotuna = computed((password) => {
      return (password) => {
        return (
          provjeraPass8.value(password) &&
          provjeraPassSlova.value(password) &&
          provjeraPassBroja.value(password)
        );
      };
    });

    return {
      user,
      response,
      novaLozinka,
      register,
      login,
      clearResponse,
      promijeniLozinku,
      logout,
      obrisiKorisnika,
      reauthenticate,
      provjeraPass8,
      provjeraPassSlova,
      provjeraPassBroja,
      validacijaBotuna,
    };
  },
  {
    persist: true, // omogućuje da Pinia zapamti stanje na F5 ili promjenu URL-a
  },
);
