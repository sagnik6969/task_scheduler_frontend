<template>
  <div
    class="rounded-lg bg-sky-200 text-slate-900 px-6 py-4 flex justify-between items-center flex-col lg:flex-row text-center lg:text-left space-y-3 lg:space-y-0 space-x-2"
  >
    <div class="flex-1">
      <h1 class="font-bold text-lg">{{ title }}</h1>
      <p class="text-slate-700 font-medium">{{ task.data.attributes.priority }}</p>
    </div>
    <div class="flex-1 space-x-1 font-medium">
      <v-icon icon="mdi-clock-time-four"></v-icon>
      <span class="font-medium text-slate-600">{{ remainingTime }}</span>
    </div>
    <progress-bar class="flex-1" :percentage="task.data.attributes.progress"></progress-bar>
    <icon-button class="bg-slate-900 text-slate-100 hover:bg-slate-950">View</icon-button>
  </div>
</template>
<script setup>
import ProgressBar from '@/components/ui/ProgressBar.vue'
import IconButton from '@/components/ui/IconButton.vue'
import { computed } from 'vue'
const { task } = defineProps(['task'])

const title = computed(() => {
  const fullTitle = task.data.attributes.title
  if (fullTitle.length <= 14) return fullTitle
  return fullTitle.substring(0, 12) + '...'
})

const remainingTime = computed(() => {
  const mySQLDate = task.data.attributes.deadline
  const deadline = new Date(Date.parse(mySQLDate.replace(/-/g, '/')))
  const today = new Date()

  const differenceInMinutes = (deadline.getTime() - today.getTime()) / (1000 * 60)

  if (differenceInMinutes < 0) return '0min'

  if (differenceInMinutes < 60) return Math.round(differenceInMinutes) + 'min'

  const differenceInHours = differenceInMinutes / 60

  if (differenceInHours < 24)
    return (
      Math.floor(differenceInHours) +
      'h ' +
      (differenceInMinutes - Math.floor(differenceInHours) * 60) +
      'min'
    )

  const differenceInDays = differenceInHours / 24

  return (
    Math.floor(differenceInDays) +
    'd ' +
    Math.floor(differenceInHours - Math.floor(differenceInDays) * 24) +
    'h'
  )
})
</script>
