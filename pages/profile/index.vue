<script setup lang="ts">
import {authClient} from "@/auth-client";
import BackgroundImage from "@/components/ui/BackgroundImage.vue";
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import * as v from 'valibot'
import type {FormSubmitEvent} from '@nuxt/ui'
import Button from "@/components/ui/Button.vue";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

const session = authClient.useSession()

const updateImageSchema = v.object({
  imageUrl: v.pipe(v.string(), v.url(), v.minLength(8, 'Must be an url')),
})
const updatePasswordSchema = v.object({
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters')),
  newPassword: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
})

type UpdateImageSchema = v.InferOutput<typeof updateImageSchema>
type UpdatePasswordSchema = v.InferOutput<typeof updatePasswordSchema>

const newPasswordState = reactive({
  password: '',
  newPassword: ''
})
const imageState = reactive({
  imageUrl: ''
})

const isDeleteAccountModalOpen = ref(false)

const toast = useToast()

async function onImageUpdate(event: FormSubmitEvent<UpdateImageSchema>) {
  const { imageUrl } = event.data;

  const { data, error } = await authClient.updateUser({
    image: imageUrl,
  }, {
    onError: (ctx) => {
      toast.add({ title: 'Erreur', description: 'Une erreur incongrue est survenue.', color: 'error' })
    },
    onSuccess: (ctx) => {
      toast.add({ title: 'Succès', description: 'Votre image a été mis à jour avec succès.', color: 'success' })
    }
  })
}
async function onPasswordUpdate(event: FormSubmitEvent<UpdatePasswordSchema>) {
  const { password, newPassword } = event.data;

  const { data, error } = await authClient.changePassword({
    newPassword,
    currentPassword: password,
    revokeOtherSessions: true,
  }, {
    onError: (ctx) => {
      toast.add({ title: 'Erreur', description: 'Une erreur incongrue est survenue.', color: 'error' })
    },
    onSuccess: (ctx) => {
      toast.add({ title: 'Succès', description: 'Votre mot de passe a été mis à jour avec succès.', color: 'success' })
    }
  })
}
async function onDeleteAccount() {
  const { data, error } = await authClient.deleteUser({
    callbackURL: '/',
  }, {
    onError: (ctx) => {
      toast.add({ title: 'Erreur', description: 'Une erreur incongrue est survenue.', color: 'error' })
    },
    onSuccess: (ctx) => {
      toast.add({ title: 'Au revoir.', description: 'Votre compte a été supprimé avec succès, redirection...', color: 'success', duration: 2000 })
      setTimeout(() => {
        window.location.href = '/auth/login'
      }, 2000)
    }
  })
}
</script>

<template>
  <BackgroundImage image-url="assets/img/bg3.jpg" />
  <Header />

  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-4">User Details</h2>
        <div class="space-y-4">
          <div>
            <p class="font-semibold">Email:</p>
            <p>{{ session?.data?.user?.email }}</p>
          </div>
          <div>
            <p class="font-semibold">Username:</p>
            <p>{{ session?.data?.user?.name }}</p>
          </div>
          <div>
            <p class="font-semibold">Rank:</p>
            <p>Member</p>
          </div>
          {{ JSON.stringify(session) }}
        </div>
      </div>

      <div class="space-y-8">
        <UCard class="p-6">
          <h2 class="text-2xl font-bold mb-4">Modifie ton image de profil</h2>
          <UForm :schema="updateImageSchema" :state="imageState" class="space-y-4" @submit="onImageUpdate">
            <UFormField label="Image Url" name="imageUrl">
              <UInput v-model="imageState.imageUrl" type="url"/>
            </UFormField>

            <Button
              text="Modifier"
              type="submit"
              variant="primary"
            />
          </UForm>
        </UCard>

        <UCard class="p-6">
          <h2 class="text-2xl font-bold mb-4">Modifie ton mot de passe</h2>
          <UForm :schema="updatePasswordSchema" :state="newPasswordState" class="space-y-4" @submit="onPasswordUpdate">
            <UFormField label="Mot de passe actuel" name="password">
              <UInput v-model="newPasswordState.password" type="password"/>
            </UFormField>

            <UFormField label="Nouveau mot de passe" name="newPassword">
              <UInput v-model="newPasswordState.newPassword" type="password"/>
            </UFormField>

            <Button
              text="Modifier"
              type="submit"
              variant="primary"
            />
          </UForm>
        </UCard>

        <UCard class="p-6">
          <h2 class="text-2xl font-bold mb-4">Supprime ton compte</h2>
          <p class="mb-4">Cette action est irréversible !</p>

          <UModal v-model:open="isDeleteAccountModalOpen">
            <Button
              text="Supprimer mon compte"
              type="button"
              variant="error"
              :icon="faTrash"
            />

            <template #content>
              <UCard>
                <p class="text-lg font-semibold mb-4">Êtes-vous sûr de vouloir supprimer votre compte ?</p>

                <div class="flex justify-end gap-2">
                  <Button
                    text="Annuler"
                    type="button"
                    variant="neutral"
                    @click="() => { isDeleteAccountModalOpen = false }"
                  />
                  <Button
                    text="Oui, je veux supprimer mon compte"
                    type="button"
                    variant="error"
                    @click="onDeleteAccount"
                  />
                </div>
              </UCard>
            </template>
          </UModal>
        </UCard>
      </div>
    </div>
  </div>


  <Footer />
</template>

<style scoped>
.container {
  min-height: calc(100vh - 200px);
}
</style>