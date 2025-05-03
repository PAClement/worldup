<script setup lang="ts">
import {ref} from 'vue';

const isMenuOpen = ref(false);

const classes = {
  item: '-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50'
}
</script>

<template>
  <!--Trigger Button-->
  <div class="fixed top-5 left-5 lg:hidden">
    <button
      type="button"
      class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
      @click="isMenuOpen = !isMenuOpen"
    >
      <span class="sr-only">Open main menu</span>
      <svg
        class="size-6 transition-transform duration-300 text-accent-100"
        :class="{ 'rotate-90': isMenuOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        aria-hidden="true"
        data-slot="icon"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
      </svg>
    </button>
  </div>

  <div v-if="isMenuOpen" class="lg:hidden" role="dialog" aria-modal="true">
    <div
      class="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 transform transition-transform duration-300 ease-out"
      :class="isMenuOpen ? 'translate-x-0' : 'translate-x-full'"
    >
      <div class="flex items-center justify-between">
        <button
          type="button"
          class="-m-2.5 rounded-md p-2.5 text-gray-700"
          @click="isMenuOpen = false"
        >
          <span class="sr-only">Close menu</span>
          <svg
            class="size-6 transition-transform duration-300"
            :class="{ 'rotate-90': !isMenuOpen }"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
            data-slot="icon"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
      <div class="mt-6 flow-root">
        <div class="-my-6 divide-y divide-gray-500/10">
          <div class="space-y-2 py-6">
            <a href="#" :class="classes.item">
              Features
            </a>
            <a href="#" :class="classes.item">
              Marketplace
            </a>
            <a href="#" :class="classes.item">
              Company
            </a>
          </div>
          <div class="py-6">
            <a href="#" :class="classes.item">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>