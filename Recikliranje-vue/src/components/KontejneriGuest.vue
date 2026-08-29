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
          <RouterLink to="/Registracija" class="btn-primary nav-btn">
            REGISTRACIJA
          </RouterLink>

          <button class="btn-primary nav-btn" type="submit" disabled>
            <span class="lock-icon">🔒</span> PRETRAGA PROIZVODA
          </button>

          <button class="btn-primary nav-btn" type="submit" disabled>
            <span class="lock-icon">🔒</span> RECIKLAŽNA DVORIŠTA
          </button>

          <button class="btn-primary nav-btn" type="submit" disabled>
            <span class="lock-icon">🔒</span> EDUCIRAJ SE
          </button>

          <RouterLink to="/FAQ" class="btn-primary nav-btn"> FAQ </RouterLink>

          <button class="btn-primary nav-btn" type="submit" disabled>
            <span class="lock-icon">🔒</span> PROMJENA LOKACIJE
          </button>

          <button class="btn-primary nav-btn" type="submit" disabled>
            <span class="lock-icon">🔒</span> OBAVIJESTI
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
