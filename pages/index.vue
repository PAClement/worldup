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
          <h1 class="text-6xl text-center text-accent-100 my-10 custom-title">Commencer votre <br> <span
              class="text-primary-500">aventure !</span></h1>
        </div>
        <font-awesome :icon="faArrowDown" class="text-4xl text-primary-500 motion-safe:animate-bounce lg:mt-20"/>
      </div>
    </div>
  </div>

  <section class="p-3">
    <div class="flex justify-center w-1/2">
      <NuxtImg
          src="/assets/img/castle.jpg"
          alt="Castle"
          class="h-72 w-auto"/>
      <div class="pl-5">
        <h2>Hello world</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </p>
      </div>
    </div>
  </section>
  <Footer/>
</template>

<script setup lang="ts">
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";

</script>