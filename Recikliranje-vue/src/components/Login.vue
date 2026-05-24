<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

// Inicijalizacija routera
const router = useRouter();

// Kontrola prikaza pop-up poruke
const showPopup = ref(false);

// Reaktivno stanje forme za prijavu
const formData = reactive({
  email: "",
  password: "",
});

// Slanje forme za prijavu
const handleLogin = () => {
  console.log("Podaci poslani na server:", formData);

  // Ovdje simuliramo bazu
  const userExistsInDatabase = true;

  if (!userExistsInDatabase) {
    showPopup.value = true;
  } else {
    router.push("/kontejneri_loggedin");
  }
};

// Funkcija za preusmjeravanje na registraciju
const goToRegister = () => {
  showPopup.value = false; // Zatvori pop-up
  router.push("/Registracija");
};

// Funkcija za povratak na početnu stranicu klikom na logo
const goHome = () => {
  router.push("/");
};
</script>

<template>
  <div class="app-background">
    <div class="login-container">
      <header @click="goHome" class="global-logo cursor-pointer">
        <h1>ReciklirajMe</h1>
        <div class="logo-underline"></div>
      </header>

      <div class="login-card">
        <h2>Prijava</h2>

        <form @submit.prevent="handleLogin">
          <div class="input-group">
            <label>Email</label>
            <input v-model="formData.email" type="email" required />
          </div>

          <div class="input-group">
            <label>Lozinka</label>
            <input v-model="formData.password" type="password" required />
          </div>

          <button type="submit" class="submit-btn">Spremi</button>
        </form>
      </div>
    </div>

    <div v-if="showPopup" class="modal-overlay">
      <div class="modal-card">
        <h3>Korisnik nije pronađen</h3>
        <p>
          Izgleda da još nemate račun s ovom email adresom. Želite li se
          registrirati?
        </p>

        <div class="modal-buttons">
          <button @click="goToRegister" class="modal-btn-primary">
            Registracija
          </button>
          <button @click="showPopup = false" class="modal-btn-secondary">
            Zatvori
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  width: 100%;
  max-width: 420px;
  padding: 40px 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.login-card {
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

.submit-btn:hover {
  background-color: #1e8cc7;
}

/* --- STILOVI ZA POP-UP MODAL --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Zatamnjena pozadina iza pop-upa */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
}

.modal-card {
  background-color: white;
  padding: 30px;
  border-radius: 20px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 2px solid #2e7d32;
  font-family: "Segoe UI", sans-serif;
}

.modal-card h3 {
  color: #a51d1d; /* Crvena boja za naslov greške */
  margin-top: 0;
  font-size: 1.5rem;
  margin-bottom: 15px;
}

.modal-card p {
  color: #333;
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 25px;
}

.modal-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.modal-btn-primary {
  width: 100%;
  padding: 12px;
  background-color: #28a7e9; /* Plavi gumb vodi na registraciju */
  color: white;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.modal-btn-primary:hover {
  background-color: #1e8cc7;
}

.modal-btn-secondary {
  width: 100%;
  padding: 12px;
  background-color: #e0e0e0; /* Neutralni gumb samo zatvara pop-up */
  color: #333;
  border: none;
  border-radius: 25px;
  font-weight: bold;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.modal-btn-secondary:hover {
  background-color: #d5d5d5;
}
</style>
