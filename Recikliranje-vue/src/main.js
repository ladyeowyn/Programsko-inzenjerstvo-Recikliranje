import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";
import "./firebase.js";

createApp(App).use(router).mount("#app");
