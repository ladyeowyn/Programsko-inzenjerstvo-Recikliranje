<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../firebase.js";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const password2 = ref("");
const response = ref({ error: false, message: "" });

const gradovi = ["Rijeka", "Krk", "Opatija"];
const odabraniGrad = ref("");

const register = async () => {
  await authStore.register(email.value, password.value);
  if (!authStore.response.error) {
    router.push("/Login");
  }
};

const provjeraMaila = computed(() => {
  return email.value.match("@");
});

const provjeraPass8 = computed(() => {
  return password.value.length >= 8;
});

const provjeraPassSlova = computed(() => {
  return password.value.match(/[A-Z]/g);
});

const provjeraPassBroja = computed(() => {
  return password.value.match(/\d/);
});

const passMatch = computed(() => {
  return password.value == password2.value;
});

const validacijaBotuna = computed(() => {
  return (
    provjeraMaila.value &&
    provjeraPass8.value &&
    provjeraPassSlova.value &&
    provjeraPassBroja.value &&
    passMatch.value
  );
});

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
        <h2>Registracija</h2>

        <form @submit.prevent="register">
          <div class="form-group">
            <label>Email adresa</label>
            <input
              class="form-input"
              v-model="email"
              type="email"
              placeholder="Unesi email..."
            />
            <span class="error-text" v-if="!provjeraMaila && email.length > 0">
              Neispravan email</span
            >
          </div>

          <div class="form-group">
            <label>Lozinka</label>
            <input
              class="form-input"
              v-model="password"
              type="password"
              placeholder="Lozinka..."
            />

            <div
              class="password-hints"
              v-if="
                (!provjeraPass8 || !provjeraPassSlova || !provjeraPassBroja) &&
                password.length > 0
              "
            >
              <p class="hint-text" v-if="!provjeraPass8">
                - Lozinka mora sadržavati minimalno 8 znakova.
              </p>
              <p class="hint-text" v-if="!provjeraPassSlova">
                - Lozinka mora sadržavati barem jedno veliko slovo.
              </p>
              <p class="hint-text" v-if="!provjeraPassBroja">
                - Lozinka mora sadržavati barem jednu brojku.
              </p>
            </div>
          </div>

          <div class="form-group">
            <label>Potvrdi lozinku</label>
            <input
              class="form-input"
              v-model="password2"
              type="password"
              placeholder="Ponovi lozinku..."
            />
            <span class="error-text" v-if="!passMatch && password2.length > 0">
              Lozinke se moraju poklapati!!
            </span>
          </div>

          <div class="form-group">
            <label>Lokacija</label>
            <div class="location-list">
              <div
                v-for="grad in gradovi"
                :key="grad"
                :class="
                  odabraniGrad == grad
                    ? 'location-item active'
                    : 'location-item'
                "
                @click="odabraniGrad = grad"
              >
                {{ grad }}
              </div>
            </div>
          </div>

          <button
            type="submit"
            class="btn-primary"
            :disabled="!validacijaBotuna"
          >
            Spremi
          </button>
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
.error-text {
  color: #a51d1d;
  font-size: 0.85rem;
  font-weight: bold;
  margin-top: 5px;
}

.password-hints {
  margin-top: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 8px;
}

.hint-text {
  color: #414d12;
  font-size: 0.8rem;
  margin: 3px 0;
  font-weight: bold;
}

.location-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.location-item {
  background-color: #88e088;
  padding: 12px;
  border-radius: 10px;
  cursor: pointer;
  color: #333;
  transition: all 0.2s ease;
  text-align: center;
  font-weight: 500;
}

.location-item.active {
  background-color: #4caf50;
  color: white;
  transform: scale(1.02);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
