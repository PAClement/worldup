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
    <div class="mb-5 flex flex-col gap-4">
      <h2 class="custom-title text-6xl text-center text-secondary-500">Bienvenue sur <span class="text-primary-500">WorldUp</span>
      </h2>
      <p class="custom-content-body text-center">play.worldup.fr</p>
      <div class="flex justify-center">
        <USeparator class="my-4 w-1/2"/>
      </div>
    </div>
    <div class="grid grid-cols-6 my-10 mb-15">
      <div class="col-span-4 col-start-2">
        <h2 class="custom-content-title text-center">L'aventure vous attends</h2>
        <br />
        <p class="custom-content-body text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
          dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
          nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
          anim id est laborum.
        </p>
      </div>
    </div>
    <div class="grid grid-cols-4 gap-8">
      <div class="col-span-1 col-start-2">
        <NuxtImg
            src="/assets/img/castle.jpg"
            alt="Castle"
            class="h-72 w-auto"/>
      </div>
      <div class="col-span-1 col-start-3">
        <div class="pl-5 gap-4 flex flex-col">
          <h2 class="custom-content-title">Hello world</h2>
          <p class="custom-content-body">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore
            magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
        </div>
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