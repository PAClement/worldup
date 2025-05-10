<script setup lang="ts">
import {authClient} from "@/auth-client";
import BackgroundImage from "@/components/ui/BackgroundImage.vue";
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import * as v from 'valibot'
import type {FormSubmitEvent} from '@nuxt/ui'
import Button from "@/components/ui/Button.vue";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {generateRandomCode} from "@/lib/utils";
import Profile from "@/components/layout/Profile.vue";
import type { TabsItem } from '@nuxt/ui'

const session = authClient.useSession()

const updateImageSchema = v.object({
  imageUrl: v.pipe(v.string(), v.url(), v.minLength(8, 'Must be an url')),
})
const updateImageFileSchema = v.object({
  image: v.pipe(v.string()),
})
const updatePasswordSchema = v.object({
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters')),
  newPassword: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters'))
})

type UpdateImageSchema = v.InferOutput<typeof updateImageSchema>
type UpdateImageFileSchema = v.InferOutput<typeof updateImageFileSchema>
type UpdatePasswordSchema = v.InferOutput<typeof updatePasswordSchema>

const newPasswordState = reactive({
  password: '',
  newPassword: ''
})
const imageState = reactive({
  imageUrl: ''
})
const imageFileState = reactive({
  image: ''
})

const isDeleteAccountModalOpen = ref(false)

const mcCode = ref('')
const mcUuid = await $fetch('/api/uuid', {
  method: 'GET',
})
const playerRank = await $fetch('/api/rank', {
  method: 'POST',
  body: {
    uuid: mcUuid
  }
})
const playerProfiles = await $fetch('/api/profiles', {
  method: 'POST',
  body: {
    uuid: mcUuid
  }
})

const tabItems = computed(() => {
  const items: TabsItem[] = []

  playerProfiles?.forEach((_, index) => {
    items.push({
      label: `Profile #${index + 1}`,
      icon: 'i-lucide-user',
      slot: `profile_${index}` as const,
    })
  })

  return items
})

const { handleFileInput, files } = useFileStorage({ clearOldFiles: true })

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
async function onImageFileUpdate(event: FormSubmitEvent<UpdateImageFileSchema>) {
  await $fetch('/api/image', {
    method: 'POST',
    body: {
      files: files.value
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
async function onMcAccountLink() {
  const code = generateRandomCode(10);

  const { data, error } = await authClient.updateUser({
    linkCode: code
  }, {
    onError: (ctx) => {
      toast.add({ title: 'Erreur', description: 'Une erreur incongrue est survenue.', color: 'error' })
    },
    onSuccess: (ctx) => {
      toast.add({ title: 'Succès', description: 'Votre code a été généré !', color: 'success' })
      mcCode.value = code
    }
  })
}

const getSlotName = (index: number) => {
  return `profile_${index}`
}
</script>

<template>
  <BackgroundImage image-url="assets/img/bg3.jpg" />
  <Header />

  <div class="container mx-auto px-4 py-8">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-2xl font-bold mb-8">Ma fiche joueur</h2>

        <UAlert
          v-if="!mcUuid"
          title="Attention !"
          description="Vous devez connecter votre compte Minecraft pour voir vos détails."
          color="warning"
        />

        <div v-if="mcUuid">
          <div>
            <div class="space-y-4 flex-1">
              <div v-if="playerProfiles && tabItems">
                <UTabs :items="tabItems" variant="link" class="gap-4 w-full" :ui="{ trigger: 'grow' }">
                  <template #[getSlotName(index)] v-for="(playerProfile, index) of playerProfiles" :key="(playerProfile as any).uuid">
                    <Profile :playerProfile="playerProfile" :index="index" />
                  </template>
                </UTabs>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-8">
        <UCard v-if="mcUuid" class="p-6">
          <div class="flex justify-between w-full">
            <div class="space-y-4 flex-1">
              <h2 class="text-2xl font-bold mb-4">Détail de mon compte</h2>

              <div>
                <p class="font-semibold"><span class="font-bold">Adresse mail:</span> {{ session?.data?.user?.email }}</p>
              </div>
              <div>
                <p class="font-semibold flex items-center gap-1">
                  <span class="font-bold">Compte Minecraft connecté:</span>
                  <span v-if="mcUuid" class="text-green-600">✓</span>
                  <span v-if="!mcUuid" class="text-red-600">x</span>
                </p>
              </div>
            </div>

            <div class="flex flex-col justify-between gap-4">
              <div class="flex gap-2 items-center bg-black/90 py-0.5 px-1 border-rounded-xs">
                <NuxtImg
                  :src="`/assets/img/ranks/${playerRank.primaryGroup}.png`"
                  class="h-6"
                />
                <p class="font-bold text-white">{{ session?.data?.user?.name }}</p>
              </div>
              <div class="h-[300px] w-[150px]">
                <NuxtImg
                  :src="`https://mineskin.eu/armor/body/${mcUuid}/150.png`"
                  class="h-full"
                />
              </div>
            </div>
          </div>
        </UCard>

        <UCard v-else-if="!mcUuid" class="p-6">
          <h2 class="text-2xl font-bold mb-4">Lier mon compte Minecraft</h2>
          <div class="flex justify-around items-center gap-8">
            <UForm :state="{}" class="space-y-4 w-full" @submit="onMcAccountLink">
              <Button
                text="Obtenir le code"
                type="submit"
                variant="primary"
              />
            </UForm>
          </div>
          <div v-if="mcCode" class="mt-2">
            <p>Votre code est: <UKbd>{{ mcCode }}</UKbd></p>
            <p class="mt-1">Vous pouvez executer la commande suivante sur le serveur pour relier votre compte:</p>
            <UKbd>/link {{ mcCode }}</UKbd>
          </div>
        </UCard>

        <UCard class="p-6">
          <h2 class="text-2xl font-bold mb-4">Modifier mon image de profil</h2>
          <div class="flex justify-around items-center gap-8">
            <UForm :schema="updateImageSchema" :state="imageState" class="space-y-4 w-full" @submit="onImageUpdate">
              <UFormField label="Url" name="imageUrl">
                <UInput v-model="imageState.imageUrl" type="url" class="w-full"/>
              </UFormField>

              <Button
                text="Modifier"
                type="submit"
                variant="primary"
              />
            </UForm>

            <USeparator label="OU" orientation="vertical" class="h-48" />

            <UForm :schema="updateImageFileSchema" :state="imageFileState" class="space-y-4 w-full" @submit="onImageFileUpdate">
              <UFormField label="Fichier" name="image">
                <UInput v-model="imageFileState.image" type="file" @input="handleFileInput" class="w-full"/>
              </UFormField>

              <Button
                text="Modifier"
                type="submit"
                variant="primary"
              />
            </UForm>
          </div>
        </UCard>

        <UCard class="p-6">
          <h2 class="text-2xl font-bold mb-4">Modifier mon mot de passe</h2>
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
          <h2 class="text-2xl font-bold mb-4">Supprimer mon compte</h2>
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