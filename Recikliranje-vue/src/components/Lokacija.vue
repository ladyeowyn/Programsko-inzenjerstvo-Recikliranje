<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "../stores/authStore";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const authStore = useAuthStore();
const router = useRouter();

const grad = ref("");
const gradovi = ref([]);

onMounted(() => {
  authStore.dohvatiGradove();
});

const validacijaBotuna = computed(() => {
  return grad.value.length > 0;
});

const spremiGrad = async () => {
  await authStore.addGrad(grad.value);
  grad.value = "";
};
</script>

<template>
  <div class="app-background">
    <div class="form-card">
      <h2>Admin sekcija - Lokacija</h2>

      <form @submit.prevent="spremiGrad">
        <div class="form-group">
          <label>Grad</label>
          <input
            class="form-input"
            v-model="grad"
            type="text"
            placeholder="Unesi novi grad..."
          />
        </div>

        <button type="submit" class="btn-primary" :disabled="!validacijaBotuna">
          Kreiraj grad
        </button>
      </form>

      <br />
      <h3>Lista gradova</h3>

      <div class="app-table-container">
        <table class="app-table">
          <tbody>
            <tr>
              <th>Grad</th>
              <th>Koordinate</th>
              <th>Akcija</th>
            </tr>
          </tbody>
          <tbody>
            <tr v-for="grad in authStore.gradovi" :key="grad.id">
              <td>{{ grad.grad }}</td>
              <td>{{ grad.lat }} , {{ grad.lon }}</td>
              <td>
                <button
                  class="btn-secondary"
                  @click="authStore.obrisiGrad(grad.id)"
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
