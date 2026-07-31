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
    <span v-if="authStore.user" class="usr-info">
      Prijavljen korisnik: <b>{{ authStore.user.email }} </b>
    </span>
    <span class="loc-info">
      Odabrana lokacija: <b>{{ authStore.odabraniGrad }} </b>
    </span>
  </form>
  <RouterView />
</template>

<style scoped>
.btn-logout {
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 8px 16px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  z-index: 1000;
}

.btn-logout:hover {
  background-color: #bd2130;
}

.usr-info {
  position: absolute;
  top: 20px;
  right: 130px;
  padding: 8px 16px;
  background-color: #196040;
  color: white;
  border: none;
  border-radius: 4px;
  z-index: 1000;
}

.loc-info {
  position: absolute;
  top: 20px;
  right: 550px;
  padding: 8px 16px;
  background-color: #191a60;
  color: white;
  border: none;
  border-radius: 4px;
  z-index: 1000;
}
</style>
