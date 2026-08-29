<script setup>
import Kontejneri from "../components/Kontejneri.vue";
</script>

<template>
  <div class="app-background home-page">
    <header class="global-logo">
      <RouterLink style="text-decoration: none" to="/">
        <h1>ReciklirajMe</h1>
      </RouterLink>
      <div class="logo-underline"></div>
    </header>

    <div class="home-container">
      <Kontejneri />

      <div class="right-section">
        <div class="btn-group-vertical home-nav">
          <RouterLink to="/Search" class="btn-primary nav-btn">
            PRETRAGA PROIZVODA
          </RouterLink>

          <RouterLink to="/Reciklazna_dvorista" class="btn-primary nav-btn">
            RECIKLAŽNA DVORIŠTA
          </RouterLink>

          <RouterLink to="/EducirajSe" class="btn-primary nav-btn">
            EDUCIRAJ SE
          </RouterLink>

          <RouterLink to="/FAQ" class="btn-primary nav-btn"> FAQ </RouterLink>

          <RouterLink to="/UserProfile" class="btn-primary nav-btn">
            PROMJENA LOKACIJE
          </RouterLink>

          <RouterLink to="/Obavijesti" class="btn-primary nav-btn">
            OBAVIJESTI
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>
