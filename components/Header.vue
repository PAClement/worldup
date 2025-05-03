<template>
  <header :class="transparent ? 'bg-transparent':'bg-secondary-500'">
    <DesktopMenu />
    <MobileMenu />
  </header>
</template>

<script setup lang="ts">
import MobileMenu from "@/components/MobileMenu.vue";
import DesktopMenu from "@/components/DesktopMenu.vue";

defineProps<{
  transparent?: boolean;
}>();
</script>