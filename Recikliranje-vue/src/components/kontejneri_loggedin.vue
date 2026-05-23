<template>
  <div
    class="relative min-h-screen w-full overflow-hidden flex flex-col"
    :style="{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }"
  >
    <!-- Dark overlay -->
    <div class="absolute inset-0 bg-black/10 z-0"></div>

    <!-- Title -->
    <div class="relative z-10 flex flex-col items-start ml-10 mt-6">
      <h1
        class="text-7xl md:text-8xl font-bold"
        style="font-family: 'Caveat', cursive; color: #2eaa2e;"
      >
        ReciklirajMe
      </h1>
      <div class="h-1 mt-1 rounded-full" style="background-color: #2eaa2e; width: 100%;"></div>
    </div>

    <!-- Main content: containers image + buttons -->
    <div class="relative z-10 flex flex-row items-center justify-between mt-10 px-10 flex-1">

      <!-- Left: containers image -->
      <div class="flex items-center justify-center" style="width: 55%;">
        <img :src="containersImage" alt="Containers" class="w-full object-contain" />
      </div>

      <!-- Right: buttons -->
      <div class="flex flex-col gap-4 items-stretch" style="width: 35%;">

        <button
          @click="navigate('/Search')"
          class="py-4 rounded-full font-bold text-lg tracking-widest underline
                 transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
          style="background-color: #5aade0; color: #000;"
        >
          PRETRAGA PROIZVODA
        </button>

        <button
          @click="navigate('/Reciklazna_dvorista')"
          class="py-4 rounded-full font-bold text-lg tracking-widest underline
                 transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
          style="background-color: #5aade0; color: #f5a800;"
        >
          RECIKLAŽNA DVORIŠTA
        </button>

        <button
          @click="navigate('/Educirajse')"
          class="py-4 rounded-full font-bold text-lg tracking-widest underline
                 transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
          style="background-color: #5aade0; color: #000;"
        >
          EDUCIRAJ SE
        </button>

        <button
          @click="navigate('/FAQ')"
          class="py-4 rounded-full font-bold text-lg tracking-widest underline
                 transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
          style="background-color: #5aade0; color: #f5a800;"
        >
          FAQ
        </button>

        <button
          @click="navigate('/Lokacija')"
          class="py-4 rounded-full font-bold text-lg tracking-widest underline
                 transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
          style="background-color: #5aade0; color: #000;"
        >
          PROMJENA LOKACIJE
        </button>

        <button
          @click="navigate('/Obavijesti')"
          class="py-4 rounded-full font-bold text-lg tracking-widest underline
                 transition-all duration-200 hover:scale-105 hover:brightness-110 active:scale-95"
          style="background-color: #5aade0; color: #f5a800;"
        >
          OBAVIJESTI
        </button>

      </div>
    </div>
  </div>
</template>

<script setup>
import bgImage from '../assets/pozadina.png'
import containersImage from '../assets/kontejneri.png'

import { useRouter } from 'vue-router'
const router = useRouter()

function navigate(path) {
  router.push(path)
}
</script>
