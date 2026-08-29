<script setup>
import { useKontejneriStore } from "../stores/kontejneriStore";
import { useAuthStore } from "../stores/authStore";

import { ref, onMounted } from "vue";

const authStore = useAuthStore();
const kontejneriStore = useKontejneriStore();
const odabraniKontejner = ref(null);

onMounted(() => {
  kontejneriStore.dohvatiKontejnere();
});
</script>

<template>
  <div class="left-section">
    <div class="bins-container">
      <div
        class="bin-item"
        v-for="kontejner in kontejneriStore.kontejneri"
        :key="kontejner.id"
      >
        <button class="unstyled-button" @click="odabraniKontejner = kontejner">
          <img
            v-if="
              authStore.odabraniGrad === `Krk` && kontejner.tip === `STAKLO`
            "
            :src="kontejneriStore.slikeKontejnera[kontejner.slika1]"
          />
          <img v-else :src="kontejneriStore.slikeKontejnera[kontejner.slika]" />
          <div class="bin-label">{{ kontejner.tip }}</div>
        </button>
      </div>
    </div>
    <div v-if="odabraniKontejner" class="kontejner-opis">
      <h2>{{ odabraniKontejner.tip }}</h2>
      <div class="opis-sekcija">
        <h3>Odlagati</h3>
        <p>{{ odabraniKontejner.odlagati }}</p>
      </div>

      <div class="opis-sekcija">
        <h3>Ne odlagati</h3>
        <p>{{ odabraniKontejner.neOdlagati }}</p>
      </div>

      <div class="savjet">
        <strong> Savjet</strong>
        <p>{{ odabraniKontejner.savjet }}</p>
      </div>
    </div>
  </div>
</template>
