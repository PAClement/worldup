<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '@nuxt/ui'
import BackgroundImage from "@/components/ui/BackgroundImage.vue";
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import Button from "@/components/ui/Button.vue";
import {faRightToBracket} from "@fortawesome/free-solid-svg-icons";
import {authClient} from "@/auth-client";

const schema = v.object({
  username: v.pipe(v.string(), v.minLength(3, 'Must be at least 3 characters')),
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters')),
  repeatpassword: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters')),
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  username: '',
  email: '',
  password: '',
  repeatpassword: '',
})

const hasBeenCreated = ref(false)

const toast = useToast()
async function onSubmit(event: FormSubmitEvent<Schema>) {
  const { username, email, password, repeatpassword } = event.data;

  if (password !== repeatpassword) {
    toast.add({ title: 'Error', description: 'Les mots de passes ne correspondent pas.', color: 'error' })
    return
  }

  const { data, error } = await authClient.signUp.email({
    email,
    password,
    name: username,
    callbackURL: '/profile',
  }, {
    onError: (ctx) => {
      toast.add({ title: 'Erreur', description: 'Une erreur incongrue est survenue.', color: 'error' })
    },
    onSuccess: (ctx) => {
      toast.add({
        title: 'Encore une étape !',
        description: 'Votre compte a été créé avec succès. Veuillez vérifier votre email pour l\'activer.',
        color: 'warning',
        duration: Infinity
      })

      window.location.href = '/profile'
    }
  })
}
</script>

<template>
  <BackgroundImage image-url="assets/img/bg2.jpg" />
  <Header />

  <div class="w-fit m-auto py-10 my-20">
    <UCard class="shadow-lg p-4 w-[20vw] flex justify-center rounded-none">
      <UForm :schema="schema" :state="state" class="space-y-4 flex flex-col justify-center w-full" @submit="onSubmit">
        <p class="custom-title text-3xl text-center">Créer un compte</p>

        <UFormField label="Nom d'utilisateur" name="username">
          <UInput v-model="state.username" class="w-full" />
        </UFormField>

        <UFormField label="Email" name="email">
          <UInput v-model="state.email" class="w-full" />
        </UFormField>

        <UFormField label="Mot de passe" name="password">
          <UInput v-model="state.password" type="password" class="w-full" />
        </UFormField>

        <UFormField label="Répéter le mot de passe" name="repeatpassword">
          <UInput v-model="state.repeatpassword" type="password" class="w-full" />
        </UFormField>

        <Button
          type="submit"
          text="Créer un compte"
          variant="primary"
          :icon="faRightToBracket"
          icon-position="right"
          :margin-auto="true"
        />

        <USeparator class="my-4" />

        <NuxtLink to="/auth/login" class="text-center">
          Se connecter
        </NuxtLink>
      </UForm>
    </UCard>
  </div>

  <Footer />
</template>

<style scoped>

</style>