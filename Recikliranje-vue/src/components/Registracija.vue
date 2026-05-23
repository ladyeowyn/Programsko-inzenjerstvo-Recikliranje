<script setup>
import { ref, reactive, computed } from "vue";
import { useRouter } from "vue-router";

// Inicijalizacija routera
const router = useRouter();

// Podaci o gradovima
const cities = ["Rijeka", "Krk", "Opatija"];

// Reaktivno stanje forme
const formData = reactive({
  email: "",
  password: "",
  confirmPassword: "",
  location: "",
});

// --- VALIDACIJA ---

// 1. Email validacija
const emailError = computed(() => {
  return formData.email.includes("@") ? "" : "Email mora sadržavati @";
});

// 2. Lozinka - detaljni uvjeti
const passwordRules = computed(() => {
  return {
    min8: formData.password.length >= 8,
    hasUpper: /[A-Z]/.test(formData.password),
    hasNumber: /\d/.test(formData.password),
  };
});

// Provjera je li lozinka u potpunosti ispravna
const isPasswordValid = computed(() => {
  return (
    passwordRules.value.min8 &&
    passwordRules.value.hasUpper &&
    passwordRules.value.hasNumber
  );
});

// 3. Potvrda lozinke
const confirmError = computed(() => {
  return formData.password === formData.confirmPassword
    ? ""
    : "Lozinke se ne podudaraju";
});

// 4. Ukupna validacija cijele forme
const isFormInvalid = computed(() => {
  return (
    !isPasswordValid.value ||
    emailError.value !== "" ||
    confirmError.value !== "" ||
    formData.location === ""
  );
});

// Slanje forme
const handleRegister = () => {
  if (!isFormInvalid.value) {
    alert("Registracija uspješna!");
    console.log("Podaci spremljeni:", formData);
  }
};

// Funkcija za povratak na početnu stranicu pomoću routera
const goHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="app-background">
    <div class="registration-container">
      <header @click="goHome" class="global-logo">
        <h1>ReciklirajMe</h1>
        <div class="logo-underline"></div>
      </header>

      <div class="registration-card">
        <h2>Registracija</h2>

        <form @submit.prevent="handleRegister">
          <div class="input-group">
            <label>Email adresa</label>
            <input
              v-model="formData.email"
              type="email"
              :class="{
                'input-error': emailError && formData.email.length > 0,
              }"
            />
            <span
              class="error-text"
              v-if="emailError && formData.email.length > 0"
            >
              {{ emailError }}
            </span>
          </div>

          <div class="input-group">
            <label>Lozinka</label>
            <input
              v-model="formData.password"
              type="password"
              :class="{
                'input-error': !isPasswordValid && formData.password.length > 0,
              }"
            />

            <div class="password-hints" v-if="formData.password.length > 0">
              <p v-if="!passwordRules.min8" class="hint-text">
                ● Min. 8 znakova
              </p>
              <p v-if="!passwordRules.hasUpper" class="hint-text">
                ● Barem jedno veliko slovo
              </p>
              <p v-if="!passwordRules.hasNumber" class="hint-text">
                ● Barem jedna brojka
              </p>
            </div>
          </div>

          <div class="input-group">
            <label>Potvrdi lozinku</label>
            <input
              v-model="formData.confirmPassword"
              type="password"
              :class="{
                'input-error':
                  confirmError && formData.confirmPassword.length > 0,
              }"
            />
            <span
              class="error-text"
              v-if="confirmError && formData.confirmPassword.length > 0"
            >
              {{ confirmError }}
            </span>
          </div>

          <div class="input-group">
            <label>Lokacija</label>
            <div class="location-list">
              <div
                v-for="city in cities"
                :key="city"
                :class="[
                  'location-item',
                  { active: formData.location === city },
                ]"
                @click="formData.location = city"
              >
                {{ city }}
              </div>
            </div>
          </div>

          <button type="submit" class="submit-btn" :disabled="isFormInvalid">
            Spremi
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.registration-container {
  width: 100%;
  max-width: 420px;
  padding: 40px 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.registration-card {
  background-color: #72d55c;
  padding: 35px;
  border-radius: 20px;
  width: 100%;
  border: 2px solid #2e7d32;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

h2 {
  color: white;
  margin-top: 0;
  margin-bottom: 25px;
  font-size: 2rem;
}

.input-group {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

label {
  color: white;
  font-weight: bold;
  margin-bottom: 8px;
}

input {
  padding: 12px;
  border-radius: 10px;
  border: 1px solid #5cb85c;
  background-color: #a8e7a8;
  outline: none;
  font-size: 1rem;
}

input:focus {
  border: 1px solid white;
}

.input-error {
  border: 2px solid #a51d1d;
}

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
  color: #6d1414;
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

.submit-btn {
  width: 100%;
  padding: 15px;
  background-color: #28a7e9;
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background-color: #1e8cc7;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #999;
}
</style>
