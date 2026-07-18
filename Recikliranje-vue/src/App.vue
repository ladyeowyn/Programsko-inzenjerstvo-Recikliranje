<script setup>
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/authStore";

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const prikaziLogoutGumb = computed(() => {
  const skriveneRute = ["/Login", "/Registracija", "/"];

  return !skriveneRute.includes(route.path) && authStore.user;
});

const logout = async () => {
  await authStore.logout();
  router.push("/Login");
};
</script>

<template>
  <form @submit.prevent="logout" v-if="prikaziLogoutGumb">
    <button type="submit" class="btn-logout">Odjavi se</button>
  </form>
  <RouterView />
</template>

<style scoped>
.btn-logout {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background-color: #dc3545; /* Crvena boja za logout */
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1000; /* Osigurava da je gumb uvijek na vrhu */
}

.btn-logout:hover {
  background-color: #bd2130;
}
</style>
