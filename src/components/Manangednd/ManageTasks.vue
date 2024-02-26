<template>
  <div class="flex relative flex-col overflow-scroll">
    <div class="bg-gray-200 w-full py-12 rounded font-bold text-center text-3xl justify-center">
      All tasks
    </div>
    <div class="flex px-10 gap-2 h-1/3 overflow-y-hidden">
      <single-task-card v-for="task in tasks" :key="task.data.task_id" :task="task" class="mt-3" />
    </div>
    <div v-if="tasksLoading" class="text-center my-20 text-slate-900">
      <v-progress-circular :size="50" :width="5" color="purple" indeterminate></v-progress-circular>
    </div>
    <div class="mt-10">
      <KanbanBoard class="flex-grow" />
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
