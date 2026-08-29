import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase";

import LoginView from "../views/LoginView.vue";
import RegistracijaView from "../views/RegistracijaView.vue";
import UserProfileView from "../views/UserProfileView.vue";
import adminPogledView from "../views/adminPogledView.vue";
import KontejneriGuestView from "../views/kontejneriGuestView.vue";
import HomeScreenView from "../views/HomeScreenView.vue";
import KontejneriLoggedInView from "../views/KontejneriLoggedIn.vue";
import LokacijaView from "../views/LokacijaView.vue";
import ReciklaznaView from "../views/ReciklaznaView.vue";
import ObavijestiView from "../views/ObavijestiView.vue";
import ReciklaznaDvoristaView from "../views/ReciklaznaDvoristaView.vue";
import SearchView from "../views/SearchView.vue";
import FAQView from "../views/FAQView.vue";
import EducirajSeView from "../views/EducirajSeView.vue";

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
    path: "/KontejneriGuest",
    component: KontejneriGuestView,
  },
  {
    path: "/kontejneri_loggedin",
    component: KontejneriLoggedInView,
    meta: { requiresAuth: true },
  },
  { path: "/Lokacija", component: LokacijaView, meta: { requiresAuth: true } },
  {
    path: "/Reciklazna",
    component: ReciklaznaView,
    meta: { requiresAuth: true },
  },
  {
    path: "/Obavijesti",
    component: ObavijestiView,
    meta: { requiresAuth: true },
  },
  {
    path: "/EducirajSe",
    component: EducirajSeView,
    meta: { requiresAuth: true },
  },
  {
    path: "/Reciklazna_dvorista",
    component: ReciklaznaDvoristaView,
    meta: { requiresAuth: true },
  },
  { path: "/Search", component: SearchView, meta: { requiresAuth: true } },
  { path: "/FAQ", component: FAQView },
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
