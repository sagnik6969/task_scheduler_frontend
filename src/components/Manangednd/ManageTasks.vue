<template>
  <div class="flex relative flex-col">
    <div class="flex">
      <div v-if="tasksLoading" class="text-center my-20 text-slate-900">
        <v-progress-circular :size="50" :width="5" color="purple"></v-progress-circular>
      </div>
      <div class="flex flex-col w-1/2 px-12 mx-10 gap-2">
        <div
          class="bg-white border-black border-2 p-4 m-3 rounded font-bold text-center text-3xl justify-center"
        >
          All tasks
        </div>
        <single-task-card
          v-for="task in tasks"
          :key="task.data.task_id"
          :task="task"
          class="-z-10"
        />
      </div>
      <div class="">
        <KanbanBoard />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import KanbanBoard from './KanbanBoard.vue'
import SingleTaskCard from '@/components/dashboard/TaskList/SingleTaskCard.vue'
import axios from 'axios'
const tasksLoading = ref(true)
const tasks = ref([])
onMounted(async () => {
  try {
    const res = await axios.get('/api/user/tasks')
    tasks.value = res?.data?.data
  } finally {
    tasksLoading.value = false
  }
})
</script>
