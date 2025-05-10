<script setup lang="ts">
const props = defineProps<{
  value: number;
  shouldReduce?: boolean;
}>();

const maxValue = 10000;
const finalValue = computed(() => props.shouldReduce ? props.value * 100 / maxValue : props.value);
</script>

<template>
  <div class="w-full">
    <UProgress v-model="finalValue" color="warning" size="2xl"/>
    <p class="flex justify-between w-full">
      <span class="flex-1">{{ value }}</span>
      <span>⭢</span>
      <span class="flex-1 text-right">{{ maxValue }}</span>
    </p>
  </div>
</template>

<style scoped>

</style>