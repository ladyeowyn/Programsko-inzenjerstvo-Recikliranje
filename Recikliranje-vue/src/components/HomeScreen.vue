<script setup></script>

<template>
  <div class="app-background">
    <header class="global-logo">
      <h1>ReciklirajMe</h1>
      <div class="logo-underline"></div>
    </header>

    <div class="btn-group-vertical">
      <RouterLink style="text-decoration: none" to="/Login">
        <button class="btn-primary">Login</button>
      </RouterLink>

      <RouterLink style="text-decoration: none" to="/Registracija">
        <button class="btn-primary">Registracija</button>
      </RouterLink>

      <RouterLink style="text-decoration: none" to="/kontejneri_guest">
        <button class="btn-primary">Kontejneri</button>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.global-logo {
  pointer-events: none;
}
</style>
