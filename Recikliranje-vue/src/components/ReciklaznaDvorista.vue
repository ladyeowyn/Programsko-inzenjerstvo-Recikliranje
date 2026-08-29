<script setup>
import { onMounted, ref, watch } from "vue";
import { useAuthStore } from "../stores/authStore";
import { useMapaStore } from "../stores/mapaStore";

import L from "leaflet";
import "leaflet/dist/leaflet.css";

const authStore = useAuthStore();
const mapaStore = useMapaStore();

const map = ref(null);

const prikaziMarkere = () => {
  mapaStore.markeri.forEach((marker) => {
    L.marker([Number(marker.lat), Number(marker.lon)])
      .addTo(map.value)
      .bindPopup(marker.naziv);
  });
};

const mapa = async () => {
  if (!mapaStore.lat || !mapaStore.lon) return;

  map.value = L.map("map").setView([mapaStore.lat, mapaStore.lon], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map.value);

  L.control.scale({ imperial: true, metric: true }).addTo(map.value);

  prikaziMarkere();
};

watch(
  () => [mapaStore.lat, mapaStore.lon],
  () => {
    if (!map.value) {
      mapa();
    }
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
    <h1>Reciklažna dvorišta</h1>
    <div id="map"></div>
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
