import { defineStore } from "pinia";
import { useAuthStore } from "../stores/authStore";
import { ref } from "vue";
import {
  doc,
  setDoc,
  collection,
  getDoc,
  deleteDoc,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const useMapaStore = defineStore("mapa", () => {
  const authStore = useAuthStore();

  const markeri = ref([]);
  const lat = ref("");
  const lon = ref("");

  const latLon = () => {
    authStore.gradovi.find((grad) => {
      if (grad.grad === authStore.odabraniGrad) {
        lat.value = grad.lat;
        lon.value = grad.lon;
      }
    });
  };

  const addReciklaznoDvoriste = async (grad, lat, lon, naziv) => {
    try {
      const colRef = collection(db, "reciklaznaDvorista");
      await addDoc(colRef, { grad: grad, lat: lat, lon: lon, naziv: naziv });
      alert("Reciklazno dvoriste uspješno kreirano i spremljeno u bazu.");
      return true;
    } catch (error) {
      alert(`Greška pri kreiranju reciklaznog dvorista: ${error.message}`);
    }
  };

  const dohvatiMarkere = async () => {
    try {
      const aCollectionId = collection(db, "reciklaznaDvorista");
      const colSnapShot = await getDocs(aCollectionId);

      markeri.value = colSnapShot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          grad: data.grad,
          lat: data.lat,
          lon: data.lon,
          naziv: data.naziv,
        };
      });
    } catch (error) {
      alert(`Greška pri dohvaćanju markera: ${error.message}`);
    }
  };

  return {
    authStore,
    markeri,
    lat,
    lon,
    latLon,
    addReciklaznoDvoriste,
    dohvatiMarkere,
  };
});
