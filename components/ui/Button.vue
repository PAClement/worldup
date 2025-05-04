<script setup lang="ts">
import type {IconDefinition} from "@fortawesome/free-solid-svg-icons";

const {
  text = 'Button',
  type = "button",
  variant = "primary",
  iconPosition = "left",
  marginAuto = false,
} = defineProps<{
  text: string;
  type: "submit" | "button" | "reset";
  variant: keyof typeof variants;
  icon?: IconDefinition;
  iconPosition?: "left" | "right";
  marginAuto?: boolean;
}>();

const variants = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white',
  secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white',
  error: 'bg-error-500 hover:bg-error-600 text-white',
  neutral: 'bg-white hover:bg-white text-black',
} as const;
</script>

<template>
  <UButton :type="type" class="w-fit cursor-pointer" :class="variants[variant] + (marginAuto ? ' m-auto' : '')">
    <font-awesome :icon="icon" v-if="icon && iconPosition === 'left'" />
    {{ text }}
    <font-awesome :icon="icon" v-if="icon && iconPosition === 'right'" />
  </UButton>
</template>

<style scoped>

</style>
