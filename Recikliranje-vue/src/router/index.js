import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Registracija from '../components/Registracija.vue'
import KontejneriGuest from '../components/kontejneri_guest.vue'
import HomeScreen from '../components/HomeScreen.vue'
import kontejneri_loggedin from '../components/kontejneri_loggedin.vue'
import Lokacija from '../components/Lokacija.vue'
import Obavijesti from '../components/Obavijesti.vue'
import Reciklazna_dvorista from '../components/Reciklazna_dvorista.vue'
import Search from '../components/Search.vue'

const routes = [
  { path: '/', component: HomeScreen },
  { path: '/login', component: Login },
  { path: '/registracija', component: Registracija },
  { path: '/kontejneri', component: KontejneriGuest },
  { path: '/kontejneri-loggedin', component: kontejneri_loggedin },
  { path: '/lokacija', component: Lokacija },
  { path: '/obavijesti', component: Obavijesti },
  { path: '/reciklazna-dvorista', component: Reciklazna_dvorista },
  { path: '/search', component: Search },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
