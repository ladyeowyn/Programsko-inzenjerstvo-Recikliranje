<script setup>
import { onMounted, ref, watch } from "vue";
import { useAuthStore } from "../stores/authStore";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const authStore = useAuthStore();

const map = ref(null);
const marker = ref(null);
const lat = ref("");
const lon = ref("");

const latLon = () => {
  authStore.gradovi.find((grad) => {
    grad.grad === authStore.odabraniGrad;

    lat.value = grad.lat;
    lon.value = grad.lon;
  });
};

const mapa = async () => {
  if (!lat.value || !lon.value) return;

  map.value = L.map("map").setView([lat.value, lon.value], 15);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map.value);

  L.control.scale({ imperial: true, metric: true }).addTo(map.value);

  marker.value = L.marker([lat.value, lon.value])
    .addTo(map.value)
    .bindPopup("Hello World!")
    .openPopup();
};

watch([lat, lon], () => {
  mapa();
});

onMounted(() => {
  authStore.dohvatiGrad(authStore.user.uid);
  authStore.dohvatiGradove();
  latLon();
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
    <span> Lokacija: {{ authStore.odabraniGrad }}</span>
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
