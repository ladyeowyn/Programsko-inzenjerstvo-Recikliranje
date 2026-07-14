<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");

const login = async () => {
  await authStore.login(email.value, password.value);
  if (!authStore.response.error) {
    router.push("/kontejneri_loggedin");
  }
};

onMounted(() => {
  authStore.clearResponse();
});
</script>

<template>
  <div class="app-background">
    <div class="form-container">
      <header class="global-logo">
        <RouterLink style="text-decoration: none" to="/">
          <h1>ReciklirajMe</h1>
        </RouterLink>
        <div class="logo-underline"></div>
      </header>

      <div class="form-card">
        <h2>Login</h2>

        <form @submit.prevent="login">
          <div class="form-group">
            <label>Email adresa</label>
            <input
              class="form-input"
              v-model="email"
              type="email"
              placeholder="Unesi email..."
            />
          </div>

          <div class="form-group">
            <label>Lozinka</label>
            <input
              class="form-input"
              v-model="password"
              type="password"
              placeholder="Lozinka..."
            />
          </div>

          <button type="submit" class="btn-primary">Prijavi se</button>
        </form>

        <div
          class="password-hints"
          v-if="authStore.response.message.length > 0"
        >
          <span
            :class="authStore.response.error ? 'error-text' : 'hint-text'"
            >{{ authStore.response.message }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.password-hints {
  margin-top: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
}

.error-text {
  color: #a51d1d;
  font-size: 0.85rem;
  font-weight: bold;
  margin-top: 5px;
}

.hint-text {
  color: #414d12;
  font-size: 0.8rem;
  margin: 3px 0;
  font-weight: bold;
}
</style>
