import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase";

import LoginView from "../views/LoginView.vue";
import RegistracijaView from "../views/RegistracijaView.vue";
import UserProfileView from "../views/UserProfileView.vue";
import adminPogledView from "../views/adminPogledView.vue";
import KontejneriGuest from "../components/kontejneri_guest.vue";
import HomeScreenView from "../views/HomeScreenView.vue";
import kontejneri_loggedin from "../components/kontejneri_loggedin.vue";
import LokacijaView from "../views/LokacijaView.vue";
import Obavijesti from "../components/Obavijesti.vue";
import Reciklazna_dvorista from "../components/Reciklazna_dvorista.vue";
import SearchView from "../views/SearchView.vue";

const routes = [
  { path: "/", component: HomeScreenView },
  { path: "/Login", component: LoginView },
  {
    path: "/Registracija",
    component: RegistracijaView,
  },
  {
    path: "/UserProfile",
    component: UserProfileView,
    meta: { requiresAuth: true },
  },
  {
    path: "/adminPogled",
    component: adminPogledView,
    meta: { requiresAuth: true },
  },
  {
    path: "/kontejneri_guest",
    component: KontejneriGuest,
  },
  {
    path: "/kontejneri_loggedin",
    component: kontejneri_loggedin,
    meta: { requiresAuth: true },
  },
  { path: "/Lokacija", component: LokacijaView, meta: { requiresAuth: true } },
  { path: "/Obavijesti", component: Obavijesti, meta: { requiresAuth: true } },
  {
    path: "/Reciklazna_dvorista",
    component: Reciklazna_dvorista,
    meta: { requiresAuth: true },
  },
  { path: "/Search", component: SearchView, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard - zaštita ruta
router.beforeEach((to, from) => {
  const requiresAuth = to.meta.requiresAuth;
  const currentUser = auth.currentUser;

  if (requiresAuth && !currentUser) {
    // Ruta zahtjeva prijavu, ali korisnik nije prijavljen
    return "/login";
  } else if (
    (to.path === "/Login" || to.path === "/Registracija") &&
    currentUser
  ) {
    // Korisnik je već prijavljen, ne treba mu login/register stranica
    return "/kontejneri_loggedin";
  } else {
    return;
  }
});

export default router;
