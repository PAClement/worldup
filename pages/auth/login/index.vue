<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import BackgroundImage from "@/components/ui/BackgroundImage.vue";
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import {authClient} from "@/auth-client";
import {faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import Button from "@/components/ui/Button.vue";

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  email: '',
  password: ''
})

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { email, password } = event.data;

  const { data, error } = await authClient.signIn.email({
    email,
    password,
    callbackURL: '/profile',
  }, {
    onError: (ctx) => {
      toast.add({ title: 'Erreur', description: 'Une erreur incongrue est survenue.', color: 'error' })
    },
    onSuccess: (ctx) => {
      window.location.href = '/profile'
    }
  })
}
</script>

<template>
  <BackgroundImage image-url="assets/img/bg2.jpg" />
  <Header />

  <div class="w-fit m-auto py-10 my-20">
    <UCard class="shadow-lg p-4 min-w-[20vw] flex justify-center rounded-none">
      <UForm :schema="schema" :state="state" class="space-y-4 flex flex-col justify-center" @submit="onSubmit">
        <p class="custom-title text-3xl text-center">Se connecter</p>

        <UFormField label="Email" name="email">
          <UInput v-model="state.email" />
        </UFormField>

        <UFormField label="Mot de passe" name="password">
          <UInput v-model="state.password" type="password" />
        </UFormField>

        <Button
          type="submit"
          text="Se connecter"
          variant="primary"
          :icon="faRightToBracket"
          icon-position="right"
          :margin-auto="true"
        />

        <USeparator class="my-4" />

        <NuxtLink to="/auth/register" class="text-center">
          Pas encore de compte ?
        </NuxtLink>
      </UForm>
    </UCard>
  </div>

  <Footer />
</template>

<style scoped>

</style>