<script setup lang="ts">
defineProps<{
  imageUrl: string;
}>();
</script>

<template>
  <NuxtImg
    :src="imageUrl"
    alt="Background"
    class="fixed top-0 left-0 w-full h-full object-cover object-center z-[-1] blur scale-110"
  />
</template>

<style scoped>

</style>