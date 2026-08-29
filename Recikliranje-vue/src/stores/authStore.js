import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  getAuth,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import {
  doc,
  setDoc,
  collection,
  getDoc,
  deleteDoc,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { auth, db } from "../firebase";

export const useAuthStore = defineStore(
  "auth",
  () => {
    const user = ref(null);
    const response = ref({ error: false, message: "" });
    const gradovi = ref([]);
    const odabraniGrad = ref("");
    const listaOtpada = ref([]);
    const router = useRouter();

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
        response.value.message = "Korisnik prijavljen";
      } catch (error) {
        response.value.error = true;
        response.value.message = "Greška pri prijavi: " + error.message;
      }
    };

    const clearResponse = () => {
      response.value = { error: false, message: "" };
    };

    // Promjena lozinke
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

    const listaKorisnika = ref([]);
    //Lista svih usera - admin
    const dohvatiKorisnike = async () => {
      try {
        const aCollectionId = collection(db, "users");
        const colSnapShot = await getDocs(aCollectionId);

        listaKorisnika.value = colSnapShot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            email: data.email,
            grad: data.grad,
            uloga: data.uloga,
            datumRegistracije: data.datumRegistracije,
          };
        });
      } catch (error) {
        alert(`Greška pri dohvaćanju korisnika: ${error.message}`);
      }
    };

    // Brisanje korisnika - admin
    const obrisiKorisnikaAdmin = async (userId) => {
      try {
        if (!userId) {
          alert("Nije poslan ID korisnika!");
          return false;
        }
        await deleteDoc(doc(db, "users", userId));

        alert("Korisnik uspješno izbrisan iz baze!");
        await dohvatiKorisnike();
        return true;
      } catch (error) {
        alert(`Greška pri brisanju korisničkog računa: ${error.message}`);
        return false;
      }
    };

    // Reautentikacija
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

    // Dodavanje usera - admin
    const addUser = async (email, password, grad, uloga) => {
      const tempApp = initializeApp(auth.app.options, "TempApp");
      const tempAuth = getAuth(tempApp);
      try {
        const userCredential = await createUserWithEmailAndPassword(
          tempAuth,
          email,
          password,
        );
        const kreiraniKorisnik = userCredential.user;

        const docRef = await setDoc(doc(db, "users", kreiraniKorisnik.uid), {
          email: email,
          grad: grad,
          uloga: uloga,
          datumRegistracije: new Date().toISOString(),
        });

        await signOut(tempAuth);
        alert("Korisnik uspješno registriran i spremljen u bazu.");
        await dohvatiKorisnike();
      } catch (error) {
        alert(`Greška pri kreiranju usera: ${error.message}`);
      }
    };

    const backBotun = () => {
      router.go(-1);
    };

    // Dohvati grad usera
    const dohvatiGrad = async (uid) => {
      try {
        const aDocmentId = doc(db, "users", user.value.uid);
        const docSnapShot = await getDoc(aDocmentId);
        const docData = docSnapShot.data();
        odabraniGrad.value = docData.grad;
      } catch (error) {
        console.error("Greška pri dohvaćanju grada:", error);
      }
    };

    //Lista svih gradova - admin
    const dohvatiGradove = async () => {
      try {
        const aCollectionId = collection(db, "lokacija");
        const colSnapShot = await getDocs(aCollectionId);

        gradovi.value = colSnapShot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            grad: data.grad,
            lat: data.lat,
            lon: data.lon,
          };
        });
      } catch (error) {
        alert(`Greška pri dohvaćanju gradova: ${error.message}`);
      }
    };

    // Dodavanje grada - admin
    const addGrad = async (grad) => {
      response.value.error = false;
      try {
        await getCoordinates(grad);
        const colRef = collection(db, "lokacija");
        await addDoc(colRef, { grad: grad, lat: lat.value, lon: lon.value });
        alert("Grad uspješno kreiran i spremljen u bazu.");
        await dohvatiGradove();
        return true;
      } catch (error) {
        alert(`Greška pri kreiranju lokacije: ${error.message}`);
      }
    };

    const lat = ref("");
    const lon = ref("");

    const getCoordinates = async (grad) => {
      response.value.error = false;
      lat.value = "";
      lon.value = "";
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(grad)}&format=jsonv2`,
          {
            headers: {
              "User-Agent": "ReciklirajMe/1.0 (asvecarov@unipu.hr)",
            },
          },
        );
        const data = await res.json();
        if (data.length > 0) {
          lat.value = data[0].lat;
          lon.value = data[0].lon;
        } else {
          alert("Grad nije pronađen.");
        }
      } catch (error) {
        alert(`Failed to fetch data: ${error.message}`);
      }
    };

    // Brisanje lokacije - admin
    const obrisiGrad = async (gradId) => {
      try {
        if (!gradId) {
          alert("Nije poslan ID grada!");
          return false;
        }
        await deleteDoc(doc(db, "lokacija", gradId));

        alert("Grad uspješno izbrisan iz baze!");
        await dohvatiGradove();
        return true;
      } catch (error) {
        alert(`Greška pri brisanju grada s liste: ${error.message}`);
        return false;
      }
    };

    //Lista svih otpada
    const dohvatiOtpad = async () => {
      try {
        const aCollectionId = collection(db, "otpad");
        const colSnapShot = await getDocs(aCollectionId);

        listaOtpada.value = colSnapShot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            kategorija: data.kategorija,
            otpad: data.predmet,
          };
        });
      } catch (error) {
        alert(`Greška pri dohvaćanju otpada: ${error.message}`);
      }
    };

    return {
      user,
      response,
      novaLozinka,
      odabraniGrad,
      gradovi,
      router,
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
      addUser,
      listaKorisnika,
      listaOtpada,
      dohvatiKorisnike,
      obrisiKorisnikaAdmin,
      backBotun,
      dohvatiGrad,
      dohvatiGradove,
      addGrad,
      obrisiGrad,
      dohvatiOtpad,
    };
  },
  {
    persist: true, // omogućuje da Pinia zapamti stanje na F5 ili promjenu URL-a
  },
);
