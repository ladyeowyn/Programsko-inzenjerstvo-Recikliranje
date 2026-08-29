<script setup>
import { useAuthStore } from "../stores/authStore";
import { useKontejneriStore } from "../stores/kontejneriStore";

import { ref, computed, onMounted } from "vue";

const authStore = useAuthStore();
const kontejneriStore = useKontejneriStore();

const trazeniPojam = ref("");

const filteredOtpad = computed(() => {
  return authStore.listaOtpada.filter((otpad) =>
    otpad.otpad.toLowerCase().includes(trazeniPojam.value.toLowerCase()),
  );
});

const prikazSlike = (kontejner) => {
  if (
    authStore.odabraniGrad === "Rijeka" ||
    authStore.odabraniGrad === "Opatija"
  ) {
    if (kontejner === "PLASTIKA I LIMENKE")
      return kontejneriStore.slikeKontejnera.zuti;
    else if (kontejner === "MJEŠOVITI KOMUNALNI OTPAD")
      return kontejneriStore.slikeKontejnera.zeleni;
    else if (kontejner === "PAPIR I KARTON")
      return kontejneriStore.slikeKontejnera.plavi;
    else if (kontejner === "STAKLO")
      return kontejneriStore.slikeKontejnera.crveni;
    else if (kontejner === "BIOOTPAD")
      return kontejneriStore.slikeKontejnera.smedji;
  }

  if (authStore.odabraniGrad === "Krk") {
    if (kontejner === "PLASTIKA I LIMENKE")
      return kontejneriStore.slikeKontejnera.zuti;
    else if (kontejner === "MJEŠOVITI KOMUNALNI OTPAD")
      return kontejneriStore.slikeKontejnera.zeleni;
    else if (kontejner === "PAPIR I KARTON")
      return kontejneriStore.slikeKontejnera.plavi;
    else if (kontejner === "STAKLO")
      return kontejneriStore.slikeKontejnera.sivi;
    else if (kontejner === "BIOOTPAD")
      return kontejneriStore.slikeKontejnera.smedji;
  }

  return kontejneriStore.slikeKontejnera.default;
};

onMounted(() => {
  authStore.dohvatiOtpad();
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

    <input
      type="search"
      v-model="trazeniPojam"
      class="search-input"
      placeholder="Pretraži otpad..."
    />
    <br />
    <div v-if="trazeniPojam.length > 0">
      <div class="search" v-for="otpad in filteredOtpad" :key="otpad.id">
        <p>
          Traženi pojam: {{ otpad.otpad }}
          <br />
          Kontejner: {{ otpad.kategorija }}
        </p>
        <img :src="prikazSlike(otpad.kategorija)" alt="Kontejneri" />
      </div>
      <div class="error-text" v-if="trazeniPojam && !filteredOtpad.length">
        <p>Nema pronađenih rezultata</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-input {
  width: 100%;
  max-width: 400px;
  padding: 10px 16px 10px 42px;
  font-size: 14px;
  font-family: inherit;
  color: #2c3e50;
  background-color: #ffffff;

  border: 1px solid #e0e0e0;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
  outline: none;

  background-image: url("../assets/search-icon.svg");
  background-repeat: no-repeat;
  background-position: 14px center;
  background-size: 18px 18px;

  transition: all 0.2s ease;
}

.search-input:hover {
  border-color: #41b883; /* Prepoznatljiva zelena akcentna boja */
}

.search-input:focus {
  background-color: #ffffff;
  border-color: #41b883;
  box-shadow: 0 0 0 3px rgba(65, 184, 131, 0.2); /* Blagi zeleni sjaj pri fokusu */
}

.search-input::placeholder {
  color: #a0aec0;
  font-size: 14px;
}

/* Uklanjanje zadanog križića u preglednicima za čišći izgled */
.search-input::-webkit-search-cancel-button,
.search-input::-webkit-search-decoration {
  -webkit-appearance: none;
}

.search {
  display: flex;
  align-items: center;
  gap: 20px;
  background-color: #72d55c;
  color: #1b4d1e;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 15px;
  font-weight: 500;
  padding: 35px;
  border-radius: 20px;
  width: 100%;
  border: 2px solid #2e7d32;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.search img {
  max-width: 200px; /* Podesi širinu slike po želji */
  height: auto;
}
</style>
