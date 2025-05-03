<template>
  <header :class="transparent ? 'bg-transparent':'bg-secondary-500'">
    <DesktopMenu />
    <MobileMenu />
  </header>
</template>

<script setup lang="ts">
import MobileMenu from "@/components/layout/MobileMenu.vue";
import DesktopMenu from "@/components/layout/DesktopMenu.vue";

defineProps<{
  transparent?: boolean;
}>();
</script>