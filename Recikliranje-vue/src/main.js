import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import "./style.css";
import "./firebase.js";

// Definiramo varijablu koja će pratiti je li aplikacija već montirana
let app;

// Čekamo da Firebase provjeri stanje prijave prije nego što uopće pokrenemo Vue
onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App);

    const pinia = createPinia();
    pinia.use(piniaPluginPersistedstate);

    app.use(pinia);
    app.use(router);

    app.mount("#app");
  }
});
