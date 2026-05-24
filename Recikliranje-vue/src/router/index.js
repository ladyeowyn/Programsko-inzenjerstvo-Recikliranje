import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegistracijaView from "../views/RegistracijaView.vue";
import UserProfileView from "../views/UserProfileView.vue";
import KontejneriGuest from "../components/kontejneri_guest.vue";
import HomeScreen from "../components/HomeScreen.vue";
import kontejneri_loggedin from "../components/kontejneri_loggedin.vue";
import Lokacija from "../components/Lokacija.vue";
import Obavijesti from "../components/Obavijesti.vue";
import Reciklazna_dvorista from "../components/Reciklazna_dvorista.vue";
import Search from "../components/Search.vue";

const routes = [
  { path: "/", component: HomeScreen },
  { path: "/Login", component: LoginView },
  { path: "/Registracija", component: RegistracijaView },
  { path: "/UserProfile", component: UserProfileView },
  { path: "/kontejneri_guest", component: KontejneriGuest },
  { path: "/kontejneri_loggedin", component: kontejneri_loggedin },
  { path: "/Lokacija", component: Lokacija },
  { path: "/Obavijesti", component: Obavijesti },
  { path: "/Reciklazna_dvorista", component: Reciklazna_dvorista },
  { path: "/Search", component: Search },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
