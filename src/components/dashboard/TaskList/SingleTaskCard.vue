<template>
  <div
    draggable="true"
    @dragstart="onDragStart"
    class="rounded-lg border-2 border-black text-slate-900 px-6 py-4 flex justify-between items-center flex-col lg:flex-row text-center lg:text-left space-y-3 lg:space-y-0 space-x-2"
    :class="{
      'opacity-55': task.data.attributes.is_completed
    }"
  >
    <div class="flex-1">
      <h1 class="font-bold text-lg">{{ title }}</h1>
      <p class="text-slate-700 font-medium">{{ task.data.attributes.priority }}</p>
    </div>

    <div class="flex-1 font-medium">
      <Tooltip text="Time left until the deadline">
        <div
          class="bg-green-200 w-fit py-2 px-4 space-x-2 rounded-full"
          :class="{ 'bg-orange-400': remainingTime == '0min' }"
        >
          <v-icon icon="mdi-clock-time-four"></v-icon>
          <span class="font-medium text-slate-600">{{ remainingTime }}</span>
        </div>
      </Tooltip>
    </div>

    <div class="flex-1 flex justify-center">
      <tooltip text="completed" v-if="task.data.attributes.is_completed">
        <div class="px-2 py-1 hover:bg-slate-200 rounded-full duration-200">
          <v-icon icon="mdi-check-all" class="text-slate-700"></v-icon>
        </div>
      </tooltip>
      <tooltip v-else text="Task Progress">
        <!-- <progress-bar class="flex-1" :percentage="task.data.attributes.progress"></progress-bar> -->
        <circular-progress :value="task.data.attributes.progress"></circular-progress>
      </tooltip>
    </div>
    <icon-button class="" @click="taskDetailsIsVisible = true">View</icon-button>
    <teleport to="body" v-if="taskDetailsIsVisible">
      <display-task :task="task" @close="taskDetailsIsVisible = false"></display-task>
    </teleport>
  </div>
</template>

<script setup>
import Tooltip from '@/components/ui/Tooltip.vue'
import CircularProgress from '@/components/ui/CircularProgress.vue'
// import ProgressBar from '@/components/ui/ProgressBar.vue'
import IconButton from '@/components/ui/IconButton.vue'
import DisplayTask from '@/components/tasks/DisplayTask.vue'
import { computed, ref } from 'vue'
const props = defineProps(['task'])

const task = computed(() => props.task)

const title = computed(() => {
  const fullTitle = task.value.data.attributes.title
  if (fullTitle.length <= 14) return fullTitle
  return fullTitle.substring(0, 12) + '...'
})

const remainingTime = computed(() => {
  const mySQLDate = task.value.data.attributes.deadline
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
      Math.round(differenceInMinutes - Math.floor(differenceInHours) * 60) +
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
const taskDetailsIsVisible = ref(false)
const onDragStart = (event) => {
  event.dataTransfer.setData('text/plain', JSON.stringify(props.task))
}
</script>
