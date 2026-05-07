<template>
  <div
    class="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center"
    :style="{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }"
  >

    <!-- Optional dark overlay for better text readability -->
    <div class="absolute inset-0 bg-black/10 z-0"></div>

    <!-- Title -->
    <div class="relative z-10 flex flex-col items-center mb-10">
      <h1
        class="text-7xl md:text-8xl font-bold"
        style="font-family: 'Caveat', cursive; color: #2eaa2e;"
      >
        ReciklirajMe
      </h1>
      <div class="h-1 w-full mt-1 rounded-full" style="background-color: #2eaa2e;"></div>
    </div>

    <!-- Buttons -->
    <div class="relative z-10 flex flex-col items-center gap-5">

      <!-- LOGIN -->
      <button
        @click="navigate('login')"
        class="w-52 py-4 rounded-full font-bold text-lg tracking-widest underline
               transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
        style="background-color: #5aade0; color: #000;"
      >
        LOGIN
      </button>

      <!-- REGISTRACIJA -->
      <button
        @click="navigate('registracija')"
        class="w-52 py-4 rounded-full font-bold text-lg tracking-widest underline
               transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
        style="background-color: #5aade0; color: #000;"
      >
        REGISTRACIJA
      </button>

      <!-- KONTEJNERI -->
      <button
        @click="navigate('kontejneri')"
        class="w-52 py-4 rounded-full font-bold text-lg tracking-widest underline
               transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
        style="background-color: #5aade0; color: #000;"
      >
        KONTEJNERI
      </button>

    </div>
  </div>
</template>

<script setup>
import bgImage from '../assets/pozadina.png'

const navigate = (page) => {
  console.log(`Navigating to: ${page}`)
  // Replace with your router logic if needed:
  // router.push(`/${page}`)
}
</script>
