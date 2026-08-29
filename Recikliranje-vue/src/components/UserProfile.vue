<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const newPassword = ref("");

const newAuthEmail = ref("");
const newAuthPass = ref("");
const rola = ref("");

const novaLokacija = async () => {
  try {
    const aDocmentId = doc(db, "users", authStore.user.uid);
    await updateDoc(aDocmentId, {
      grad: authStore.odabraniGrad,
    });
    alert("Grad uspješno promijenjen");
  } catch (error) {
    alert("Greška pri spremanju grada:", error);
  }
};

const obrisiKorisnika = async () => {
  const uspješnoObrisano = await authStore.obrisiKorisnika(authStore.user);

  setTimeout(() => (authStore.response.message = ""), 3000);

  if (uspješnoObrisano) {
    router.push("/");
  }
};

const dohvatiRolu = async (uid) => {
  try {
    const aDocmentId = doc(db, "users", authStore.user.uid);
    const docSnapShot = await getDoc(aDocmentId);
    const docData = docSnapShot.data();
    rola.value = docData.uloga;
  } catch (error) {
    alert(`Greška pri dohvaćanju uloge: ${error.message}`);
  }
};

const isAdmin = computed(() => {
  return rola.value === "admin";
});

onMounted(() => {
  email.value = authStore.user.email;
  authStore.dohvatiGrad(authStore.user.uid);
  dohvatiRolu(authStore.user.uid);
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

    <div class="forms-wrapper">
      <div class="form-card">
        <h2>User profile</h2>

        <div class="form-group">
          <label>Email adresa</label>
          <input class="form-input" v-model="email" type="email" disabled />
        </div>

        <form
          @submit.prevent="
            authStore.promijeniLozinku(authStore.user, newPassword)
          "
        >
          <div class="form-group">
            <label>Lozinka</label>
            <input
              class="form-input"
              v-model="newPassword"
              type="password"
              placeholder="Unesi novu lozinku"
            />
            <br />

            <div
              class="password-hints"
              v-if="
                (!authStore.provjeraPass8(newPassword) ||
                  !authStore.provjeraPassSlova(newPassword) ||
                  !authStore.provjeraPassBroja(newPassword)) &&
                newPassword.length > 0
              "
            >
              <p class="hint-text" v-if="!authStore.provjeraPass8(newPassword)">
                - Lozinka mora sadržavati minimalno 8 znakova.
              </p>
              <p
                class="hint-text"
                v-if="!authStore.provjeraPassSlova(newPassword)"
              >
                - Lozinka mora sadržavati barem jedno veliko slovo.
              </p>
              <p
                class="hint-text"
                v-if="!authStore.provjeraPassBroja(newPassword)"
              >
                - Lozinka mora sadržavati barem jednu brojku.
              </p>
            </div>

            <button
              type="submit"
              :disabled="
                newPassword.length === 0 ||
                !authStore.validacijaBotuna(newPassword)
              "
              class="btn-secondary"
            >
              Promijeni lozinku.
            </button>
          </div>
        </form>

        <form @submit.prevent="novaLokacija">
          <div class="form-group">
            <label>Lokacija</label>
            <div class="location-list">
              <div
                v-for="grad in authStore.gradovi"
                :key="grad.id"
                :class="
                  authStore.odabraniGrad == grad.grad
                    ? 'location-item active'
                    : 'location-item'
                "
                @click="authStore.odabraniGrad = grad.grad"
              >
                {{ grad.grad }}
              </div>
            </div>
            <br />
            <button type="submit" class="btn-secondary">
              Spremi lokaciju.
            </button>
          </div>
        </form>
        <br />

        <form @submit.prevent="authStore.obrisiKorisnika" class="form-group">
          <label>Brisanje korisničkog računa</label>
          <button type="submit" class="btn-secondary">
            Obriši korisnički račun
          </button>
        </form>

        <div class="location-item">
          <span :class="authStore.response.error ? 'error-text' : 'hint-text'">
            {{ authStore.response.message }}
          </span>
        </div>
        <br />

        <form
          @submit.prevent="authStore.reauthenticate(newAuthEmail, newAuthPass)"
          v-if="authStore.response.error"
        >
          <div class="form-group">
            <h2>Ponovna autentifikacija</h2>
            <input
              v-model="newAuthEmail"
              type="email"
              placeholder="Email..."
              class="form-input"
            />
            <br />
            <input
              v-model="newAuthPass"
              type="password"
              placeholder="Lozinka..."
              class="form-input"
            />
          </div>
          <button type="submit" class="btn-secondary">
            Ponovno se autentificiraj.
          </button>
        </form>
      </div>

      <div v-if="isAdmin" class="form-card">
        <h2>Admin sekcija</h2>
        <RouterLink style="text-decoration: none" to="/adminPogled">
          <button class="btn-secondary">Users</button>
        </RouterLink>
        <br />
        <br />
        <RouterLink style="text-decoration: none" to="/Lokacija">
          <button class="btn-secondary">Lokacija</button>
        </RouterLink>
        <br />
        <br />
        <RouterLink style="text-decoration: none" to="/Reciklazna">
          <button class="btn-secondary">Reciklažna</button>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
