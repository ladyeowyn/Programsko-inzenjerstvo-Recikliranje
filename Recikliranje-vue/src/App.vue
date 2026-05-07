<script setup>
import Educirajse from './components/Educirajse.vue';
import FAQ from './components/FAQ.vue';
import HomeScreen from './components/HomeScreen.vue';
import Kontejneri_guest from './components/kontejneri_guest.vue';
import Kontejneri_loggedin from './components/kontejneri_loggedin.vue';
import Login from './components/Login.vue';
import Lokacija from './components/Lokacija.vue';
import Obavijesti from './components/Obavijesti.vue';
import Reciklazna_dvorista from './components/Reciklazna_dvorista.vue';
import Registracija from './components/Registracija.vue';
import Search from './components/Search.vue';
</script>

<template>
  <HomeScreen />
  <Educirajse />
  <FAQ />
  <Kontejneri_guest />
  <Kontejneri_loggedin/>
  <Login/>
  <Lokacija/>
  <Obavijesti/>
  <Reciklazna_dvorista/>
  <Registracija/>
  <Search/>
</template>
