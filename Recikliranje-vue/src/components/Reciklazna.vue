<script setup>
import { onMounted, ref, watch } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useMapaStore } from "../stores/mapaStore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const authStore = useAuthStore();
const mapaStore = useMapaStore();

const naziv = ref("");
const lat = ref("");
const lon = ref("");

const prikaziMarkere = () => {
  mapaStore.markeri.forEach((marker) => {
    L.marker([Number(marker.lat), Number(marker.lon)])
      .addTo(map.value)
      .bindPopup(marker.naziv);
  });
};

const novaLokacija = async () => {
  try {
    const aDocmentId = doc(db, "users", authStore.user.uid);
    await updateDoc(aDocmentId, {
      grad: authStore.odabraniGrad,
    });
    alert("Lokacija spremljena");

    await mapaStore.latLon();
  } catch (error) {
    console.error("Greška pri spremanju grada:", error);
  }
};

const map = ref(null);

const mapa = async () => {
  if (!mapaStore.lat || !mapaStore.lon) return;

  if (map.value) {
    map.value.setView([mapaStore.lat, mapaStore.lon], 15);
    return;
  }

  map.value = L.map("map").setView([mapaStore.lat, mapaStore.lon], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map.value);

  L.control.scale({ imperial: true, metric: true }).addTo(map.value);

  dodavanjeMarkera();
};

const dodavanjeMarkera = () => {
  map.value.on("click", (e) => {
    lat.value = e.latlng.lat;
    lon.value = e.latlng.lng;
  });
};

const spremanjeMarkera = async () => {
  try {
    await mapaStore.addReciklaznoDvoriste(
      authStore.odabraniGrad,
      lat.value,
      lon.value,
      naziv.value,
    );
    mapaStore.dohvatiMarkere();

    naziv.value = "";
    lat.value = "";
    lon.value = "";
  } catch (error) {
    alert(`Greška pri spremanju markera: ${error.message}`);
  }
};

watch(
  () => [mapaStore.lat, mapaStore.lon],
  () => {
    mapa();
  },
);

watch(
  () => mapaStore.markeri,
  () => prikaziMarkere(),
  { deep: true },
);

onMounted(() => {
  authStore.dohvatiGrad(authStore.user.uid);
  authStore.dohvatiGradove();
  mapaStore.dohvatiMarkere();
  mapaStore.latLon();
});
</script>

<template>
  <div class="app-background">
    <header class="global-logo">
      <RouterLink style="text-decoration: none" to="/kontejneri_loggedin">
        <h1>ReciklirajMe</h1>
      </RouterLink>
      <div class="logo-underline"></div>
    </header>
    <div class="home-container">
      <div class="left-section">
        <h1>Dodavanje reciklažnih dvorišta</h1>
        <div id="map"></div>
      </div>
      <div class="right-section">
        <form @submit.prevent="novaLokacija">
          <div class="form-group">
            <label>Lokacija</label>
            <div class="location-list">
              <div
                v-for="grad in authStore.gradovi"
                :key="grad.id"
                :class="
                  authStore.odabraniGrad == grad.grad
                    ? 'location-item active'
                    : 'location-item'
                "
                @click="authStore.odabraniGrad = grad.grad"
              >
                {{ grad.grad }}
              </div>
            </div>
          </div>

          <button type="submit" class="btn-secondary">Spremi lokaciju.</button>
        </form>

        <form @submit.prevent="spremanjeMarkera">
          <div class="form-group">
            <label>Odabrani grad</label>
            <input
              class="form-input"
              v-model="authStore.odabraniGrad"
              type="text"
              placeholder="Unesi email..."
            />
          </div>

          <div class="form-group">
            <label>Naziv</label>
            <input
              class="form-input"
              v-model="naziv"
              type="text"
              placeholder="Naziv reciklažnog dvorišta..."
            />
          </div>

          <div class="form-group">
            <label>Dužina</label>
            <input class="form-input" v-model="lat" type="text" />
          </div>

          <div class="form-group">
            <label>Širina</label>
            <input class="form-input" v-model="lon" type="text" />
          </div>

          <button type="submit" class="btn-primary">Spremi</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
#map {
  width: 100%;
  height: 400px;
  margin-top: 100px;
  padding: 20px;
}
</style>
