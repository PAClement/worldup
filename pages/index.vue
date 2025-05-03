<template>
  <div class="bg-[url(/assets/img/main_bg.jpg)] h-dvh">
    <div class="bg-black/50 backdrop-invert backdrop-opacity-10 h-dvh">
      <Header :transparent="true"/>
      <div class="flex flex-col justify-between items-center">
        <div>
          <NuxtImg
              src="/assets/img/logo_full.png"
              alt="Logo"
              class="h-72 w-auto mx-auto mt-10"/>
          <h1 class="text-6xl text-center text-accent-100 my-10 font-bebas">Commencer votre <br> <span
              class="text-primary-500">aventure !</span></h1>
        </div>
        <font-awesome :icon="faArrowDown" class="text-4xl text-primary-500 motion-safe:animate-bounce"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'

</script>