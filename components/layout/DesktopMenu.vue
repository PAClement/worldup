<script setup lang="ts">
import {authClient} from "@/auth-client";
import {getUserImage} from "@/lib/user";
import type {DropdownMenuItem} from "@nuxt/ui/components/DropdownMenu.vue";

const classes = {
  default: 'text-sm/6 font-semibold text-accent-100 hover:text-primary-500',
  active: 'custom-underline'
}

const session = authClient.useSession()

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: session.value?.data?.user?.name,
      avatar: {
        src: getUserImage(session.value)
      },
      to: '/profile',
    }
  ],
  [
    {
      label: 'Profile',
      icon: 'material-symbols:person'
    },
  ],
  [
    {
      label: 'Logout',
      icon: 'fa6-solid:arrow-right-from-bracket',
      to: '/auth/logout',
    }
  ]
])

</script>

<template>
  <nav class="mx-auto flex items-center justify-between p-6 lg:px-8" aria-label="Global">
    <div class="hidden lg:flex lg:items-center lg:gap-x-12">
      <NuxtLink to="/">
        <NuxtImg
          src="/assets/img/logo.png"
          alt="Logo"
          class="h-12 w-auto"/>
      </NuxtLink>
      <NuxtLink to="/news" :class="classes.default" :exact-active-class="classes.active">News</NuxtLink>
      <NuxtLink to="/forum" :class="classes.default" :exact-active-class="classes.active">Forum</NuxtLink>
      <NuxtLink to="/map" :class="classes.default" :exact-active-class="classes.active">Map</NuxtLink>
    </div>
    <div class="hidden lg:flex lg:flex-1 lg:justify-end">
      <NuxtLink v-if="!session?.data" to="/auth/login" :class="classes.default" :exact-active-class="classes.active">
        Log in
        <span aria-hidden="true">→</span>
      </NuxtLink>

      <UDropdownMenu
        v-else-if="session?.data && (session?.data?.user?.name !== undefined)"
        :items="items"
        :ui="{
          content: 'w-48'
        }"
      >
        <UAvatar :src="getUserImage(session)" />
      </UDropdownMenu>
    </div>
  </nav>
</template>

<style scoped>

</style>