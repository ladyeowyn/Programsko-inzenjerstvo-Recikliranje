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
const rola = ref("");
const odabraniGrad = ref("");

const addUser = async () => {
  await authStore.addUser(
    email.value,
    password.value,
    odabraniGrad.value,
    rola.value,
  );
};

const validacijaBotuna = computed(() => {
  return (
    email.value.length > 0 &&
    password.value.length > 0 &&
    rola.value.length > 0 &&
    odabraniGrad.value.length > 0
  );
});

onMounted(() => {
  authStore.dohvatiKorisnike();
});
</script>

<template>
  <div class="app-background">
    <div class="form-card">
      <h2>Admin sekcija - Users</h2>

      <form @submit.prevent="addUser">
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

          <div
            class="password-hints"
            v-if="
              (!authStore.provjeraPass8(password) ||
                !authStore.provjeraPassSlova(password) ||
                !authStore.provjeraPassBroja(password)) &&
              password.length > 0
            "
          >
            <p class="hint-text" v-if="!authStore.provjeraPass8(password)">
              - Lozinka mora sadržavati minimalno 8 znakova.
            </p>
            <p class="hint-text" v-if="!authStore.provjeraPassSlova(password)">
              - Lozinka mora sadržavati barem jedno veliko slovo.
            </p>
            <p class="hint-text" v-if="!authStore.provjeraPassBroja(password)">
              - Lozinka mora sadržavati barem jednu brojku.
            </p>
          </div>
        </div>

        <div class="form-group">
          <label>Odaberi lokaciju</label>
          <div class="location-list">
            <select name="lokacija" v-model="odabraniGrad">
              <option v-for="grad in authStore.gradovi">{{ grad.grad }}</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label>Odaberi rolu</label>
          <div class="location-list">
            <select name="rola" v-model="rola">
              <option value="korisnik">korisnik</option>
              <option value="admin">admin</option>
            </select>
          </div>
        </div>

        <button type="submit" class="btn-primary" :disabled="!validacijaBotuna">
          Kreiraj korisnika
        </button>
      </form>

      <br />
      <h3>Lista korisnika</h3>

      <div class="app-table-container">
        <table class="app-table">
          <tbody>
            <tr>
              <th>Email</th>
              <th>Lokacija</th>
              <th>Uloga</th>
              <th>Akcija</th>
            </tr>
          </tbody>
          <tbody>
            <tr v-for="user in authStore.listaKorisnika" :key="user.id">
              <td>{{ user.email }}</td>
              <td>{{ user.grad }}</td>
              <td>{{ user.uloga }}</td>
              <td>
                <button
                  class="btn-secondary"
                  @click="authStore.obrisiKorisnikaAdmin(user.id)"
                >
                  Obriši
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
