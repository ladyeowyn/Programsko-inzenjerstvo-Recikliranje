import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

import zutiKontejner from "../assets/zutiKontejner.png";
import crveniKontejner from "../assets/crveniKontejner.png";
import plaviKontejner from "../assets/plaviKontejner.png";
import smedjiKontejner from "../assets/smedjiKontejner.png";
import zeleniKontejner from "../assets/zeleniKontejner.png";
import siviKontejner from "../assets/siviKontejner.png";
import defaultKontejner from "../assets/defaultKontejner.svg";

export const useKontejneriStore = defineStore("kontejner", () => {
  const slikeKontejnera = {
    zuti: zutiKontejner,
    crveni: crveniKontejner,
    plavi: plaviKontejner,
    smedji: smedjiKontejner,
    zeleni: zeleniKontejner,
    sivi: siviKontejner,
    default: defaultKontejner,
  };

  const kontejneri = ref([]);

  //Lista svih kontejnera
  const dohvatiKontejnere = async () => {
    try {
      const aCollectionId = collection(db, "kontejneri");
      const colSnapShot = await getDocs(aCollectionId);

      kontejneri.value = colSnapShot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          tip: data.tip,
          odlagati: data.odlagati,
          neOdlagati: data.neOdlagati,
          savjet: data.savjet,
          slika: data.slika,
        };
      });
    } catch (error) {
      alert(`Greška pri dohvaćanju kontejnera: ${error.message}`);
    }
  };

  return {
    slikeKontejnera,
    kontejneri,
    dohvatiKontejnere,
  };
});
