import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
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
    const router = useRouter();
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

    //Back botun
    const backBotun = () => {
      router.go(-1);
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
          };
        });
      } catch (error) {
        alert(`Greška pri dohvaćanju korisnika: ${error.message}`);
      }
    };

    // Dodavanje grada - admin
    const addGrad = async (grad) => {
      try {
        const colRef = collection(db, "lokacija");
        await addDoc(colRef, { grad: grad });
        alert("Grad uspješno kreiran i spremljen u bazu.");
        await dohvatiKorisnike();
      } catch (error) {
        alert(`Greška pri kreiranju lokacije: ${error.message}`);
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

    return {
      user,
      response,
      gradovi,
      router,
      listaKorisnika,
      provjeraPass8,
      provjeraPassSlova,
      provjeraPassBroja,
      validacijaBotuna,
      dohvatiKorisnike,
      obrisiKorisnikaAdmin,
      backBotun,
      dohvatiGradove,
      addGrad,
      obrisiGrad,
    };
  },
  {
    persist: true,
  },
);
