<script setup lang="ts">
const props = defineProps<{
  playerProfile: any,
  index: number,
}>();

import {type ClassesMapping, classesMapping, jobMapping, type JobsMapping} from "@/lib/imageMapping";
import {capitalize} from "@/lib/utils";
import Progress from "@/components/ui/Progress.vue";
</script>

<template>
  <UCard class="flex flex-col shadow-lg mb-4 [&>div]:w-full">
    <div class="flex justify-around mb-4">
      <div class="flex items-center gap-2">
        <NuxtImg
          :src="`/assets/img/icons/classes/${classesMapping[playerProfile?.class as ClassesMapping]}.png`"
          class="h-12"
        />
        <p class="font-bold text-lg">{{ playerProfile?.class }}</p>
      </div>
      <div class="flex items-center gap-2">
        <NuxtImg
          :src="`/assets/img/icons/coins.png`"
          class="h-12"
        />
        <p class="font-bold text-lg">{{ playerProfile?.balance }} coins</p>
      </div>
      <div class="flex items-center gap-2">
        <NuxtImg
          :src="`/assets/img/icons/level.png`"
          class="h-12"
        />
        <p class="font-bold text-lg">{{ playerProfile?.level }} Levels</p>
      </div>
    </div>
    <div class="flex justify-around mb-4">
      <div class="flex items-center gap-2">
        <NuxtImg
          :src="`/assets/img/icons/class.png`"
          class="h-12"
        />
        <p class="font-bold text-lg">{{ playerProfile?.classPoints }} Class Point</p>
      </div>
      <div class="flex items-center gap-2">
        <NuxtImg
          :src="`/assets/img/icons/skill.png`"
          class="h-12"
        />
        <p class="font-bold text-lg">{{ playerProfile?.skillPoints }} Skill Point</p>
      </div>
    </div>
    <div class="flex justify-center mb-4">
      <Progress :value="playerProfile?.experience" />
    </div>
    <div class="flex justify-evenly">
      <!-- Abilities -->
      <div class="flex items-center gap-2">
        <UTooltip text="Physical" :delay-duration="200">
          <NuxtImg
            :src="`/assets/img/icons/abilities/physical.png`"
            class="h-12"
          />
        </UTooltip>
        <p>{{ JSON.parse(playerProfile?.attributes).strength }}</p>
      </div>
      <div class="flex items-center gap-2">
        <UTooltip text="Dexterity" :delay-duration="200">
          <NuxtImg
            :src="`/assets/img/icons/abilities/dexterity.png`"
            class="h-12"
          />
        </UTooltip>
        <p>{{ JSON.parse(playerProfile?.attributes).dexterity }}</p>
      </div>
      <div class="flex items-center gap-2">
        <UTooltip text="Intelligence" :delay-duration="200">
          <NuxtImg
            :src="`/assets/img/icons/abilities/intellect.png`"
            class="h-12"
          />
        </UTooltip>
        <p>{{ JSON.parse(playerProfile?.attributes).intelligence }}</p>
      </div>
    </div>
  </UCard>

  <!-- Jobs -->
  <div class="grid grid-cols-3 gap-4">
    <template v-for="(playerJob, jobName) of JSON.parse(playerProfile?.professions)" :key="(playerProfile as any).uuid">
      <UCard class="flex flex-col justify-center items-center shadow-lg [&>div]:w-full">
        <div class="flex justify-center items-center gap-2">
          <NuxtImg
            :src="`/assets/img/icons/jobs/${jobMapping[jobName as unknown as JobsMapping]}.png`"
            class="h-12"
          />
          <p class="font-bold">{{ capitalize(jobName as unknown as string) }}</p>
        </div>
        <div class="flex justify-center items-center gap-2 mb-2">
          <NuxtImg
            :src="`/assets/img/icons/level.png`"
            class="h-12"
          />
          <p class="font-bold">Level {{ playerJob?.level }}</p>
        </div>
        <Progress :value="playerProfile?.experience" />
      </UCard>
    </template>
  </div>
</template>

<style scoped>

</style>