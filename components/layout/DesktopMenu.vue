<script setup lang="ts">
const classes = {
  default: 'text-sm/6 font-semibold text-accent-100 hover:text-primary-500',
  active: 'custom-underline'
}
</script>

<template>
  <nav class="mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div class="hidden lg:flex lg:items-center lg:gap-x-12">
      <NuxtLink to="/public">
        <NuxtImg
          src="/assets/img/logo.png"
          alt="Logo"
          class="h-12 w-auto"/>
      </NuxtLink>
      <NuxtLink to="/public" :class="classes.default" :exact-active-class="classes.active">Qui sommes-nous ?</NuxtLink>
      <NuxtLink to="/news" :class="classes.default" :exact-active-class="classes.active">News</NuxtLink>
      <NuxtLink to="/forum" :class="classes.default" :exact-active-class="classes.active">Forum</NuxtLink>
      <NuxtLink to="/public" :class="classes.default" :exact-active-class="classes.active">Map</NuxtLink>
    </div>
    <div class="hidden lg:flex lg:flex-1 lg:justify-end">
      <NuxtLink to="/auth/login" :class="classes.default" :exact-active-class="classes.active">
        Log in
        <span aria-hidden="true">→</span>
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>

</style>