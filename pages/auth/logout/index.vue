<script setup lang="ts">
import {authClient} from "@/auth-client";

await authClient.signOut({
  fetchOptions: {
    onSuccess: () => {
      window.location.href = '/';
    },
  },
});
</script>

<template>

</template>

<style scoped>

</style>