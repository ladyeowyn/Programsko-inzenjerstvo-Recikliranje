<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Popis gradova za ažuriranje lokacije
const cities = ["Rijeka", "Krk", "Opatija"];

// Podaci o korisniku, dodano default za sada
const user = reactive({
  fullName: "Anja Svećarovski",
  email: "asvecarov@unipu.hr",
  location: "Rijeka",
  memberSince: "Svibanj 2026.",
});

// Reaktivna stanja za uređivanje podataka
const isEditingName = ref(false);
const newFullName = ref(user.fullName);

const isEditingLocation = ref(false);
const selectedLocation = ref(user.location);

// Spremanje novog imena
const handleUpdateName = () => {
  if (newFullName.value.trim() !== "") {
    user.fullName = newFullName.value;
    isEditingName.value = false;
  }
};

// Spremanje nove lokacije
const handleUpdateLocation = () => {
  user.location = selectedLocation.value;
  isEditingLocation.value = false;
};

// Promjena lozinke (simulacija)
const handleChangePassword = () => {
  alert("Preusmjeravanje na formu za promjenu lozinke...");
  // Ovdje ćemo poslati korisnika na /change-password
};

// Odjava iz aplikacije
const handleLogout = () => {
  alert("Odjava uspješna!");
  router.push("/");
};

// Funkcija za povratak na prethodnu stranicu pomoću routera
const goBack = () => {
  router.push("/kontejneri_loggedin");
};
</script>

<template>
  <div class="app-background">
    <div class="profile-container">
      <header @click="goBack" class="global-logo cursor-pointer">
        <h1>ReciklirajMe</h1>
        <div class="logo-underline"></div>
      </header>

      <div class="profile-card">
        <h2>Moj Profil</h2>

        <div class="profile-section">
          <h3>Podaci o računu</h3>

          <div class="info-row">
            <span class="info-label">Ime i prezime:</span>

            <div v-if="!isEditingName" class="display-inline">
              <span class="info-value font-bold">{{ user.fullName }}</span>
              <button @click="isEditingName = true" class="edit-btn">
                Uredi
              </button>
            </div>

            <div v-else class="edit-inline">
              <input v-model="newFullName" type="text" class="inline-input" />
              <button @click="handleUpdateName" class="save-btn-small">
                ✔
              </button>
              <button @click="isEditingName = false" class="cancel-btn-small">
                ✖
              </button>
            </div>
          </div>

          <div class="info-row">
            <span class="info-label">Email:</span>
            <span class="info-value">{{ user.email }}</span>
          </div>

          <div class="info-row">
            <span class="info-label">Lokacija:</span>

            <div v-if="!isEditingLocation" class="display-inline">
              <span class="info-value font-bold">{{ user.location }}</span>
              <button @click="isEditingLocation = true" class="edit-btn">
                Uredi
              </button>
            </div>

            <div v-else class="edit-inline">
              <select v-model="selectedLocation" class="inline-select">
                <option v-for="city in cities" :key="city" :value="city">
                  {{ city }}
                </option>
              </select>
              <button @click="handleUpdateLocation" class="save-btn-small">
                ✔
              </button>
              <button
                @click="isEditingLocation = false"
                class="cancel-btn-small"
              >
                ✖
              </button>
            </div>
          </div>

          <div class="info-row text-muted">
            <span class="info-label">Član od:</span>
            <span class="info-value">{{ user.memberSince }}</span>
          </div>
        </div>

        <div class="profile-actions">
          <button @click="handleChangePassword" class="password-btn">
            Promijeni lozinku
          </button>
          <button @click="handleLogout" class="logout-btn">Odjavi se</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
  width: 100%;
  max-width: 500px;
  padding: 40px 20px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.profile-card {
  background-color: #72d55c;
  padding: 30px;
  border-radius: 20px;
  width: 100%;
  border: 2px solid #2e7d32;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  color: white;
}

h2 {
  margin-top: 0;
  margin-bottom: 25px;
  font-size: 2rem;
  text-align: center;
}

h3 {
  margin-top: 0;
  margin-bottom: 15px;
  font-size: 1.1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 5px;
  font-weight: 600;
}

.profile-section {
  background: rgba(255, 255, 255, 0.15);
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.info-row:last-child {
  margin-bottom: 0;
}

.text-muted {
  opacity: 0.7;
  font-size: 0.9rem;
}

.info-label {
  font-weight: bold;
}

.display-inline {
  display: flex;
  align-items: center;
  gap: 10px;
}

.edit-inline {
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Gumbi i inputi unutar redova */
.edit-btn {
  padding: 3px 10px;
  border-radius: 12px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  font-size: 0.75rem;
  background-color: white;
  color: #2e7d32;
}

.inline-input,
.inline-select {
  padding: 4px 8px;
  border-radius: 6px;
  border: none;
  font-size: 0.9rem;
  color: #333;
  background: white;
}

.inline-input {
  width: 140px;
}

.save-btn-small,
.cancel-btn-small {
  border: none;
  padding: 4px 8px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 0.8rem;
}

.save-btn-small {
  background-color: #28a7e9;
  color: white;
}
.cancel-btn-small {
  background-color: #e0e0e0;
  color: #333;
}

/* Stilovi za statistiku */
.points-badge {
  text-align: center;
  background: white;
  color: #2e7d32;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.points-number {
  font-size: 2rem;
  font-weight: bold;
}
.points-label {
  font-size: 0.85rem;
  text-transform: uppercase;
  font-weight: 500;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 8px;
  font-size: 0.85rem;
  text-align: center;
}

.stat-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 4px;
  border-radius: 8px;
}

/* Donje akcijske sekcije (Gumbi) */
.profile-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 25px;
}

.password-btn,
.logout-btn {
  width: 100%;
  padding: 12px;
  border: none;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s;
}

.password-btn {
  background-color: #28a7e9;
  color: white;
}

.password-btn:hover {
  background-color: #1e8cc7;
}

.logout-btn {
  background-color: #a51d1d;
  color: white;
}

.logout-btn:hover {
  background-color: #841616;
}
</style>
