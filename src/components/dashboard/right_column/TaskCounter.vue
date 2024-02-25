<template>
  <div class="flex space-x-4">
    <div
      class="flex-1 bg-slate-200 rounded-lg py-6 px-6 flex-col md:flex-row flex justify-center items-center space-x-3"
    >
      <h1 class="text-6xl font-extrabold text-slate-900">{{ completedTasks }}</h1>
      <div class="font-semibold text-slate-700">
        <p>Tasks</p>
        <p>completed</p>
      </div>
    </div>

    <div
      class="flex-1 bg-slate-200 rounded-lg py-6 px-6 flex-col md:flex-row flex justify-center items-center space-x-3"
    >
      <h1 class="text-6xl font-extrabold text-slate-900">{{ pendingTasks }}</h1>
      <div class="font-semibold text-slate-700">
        <p>Tasks</p>
        <p>in Progress</p>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const completedTasks = ref(0)
const pendingTasks = ref(0)

onMounted(() => {
  axios
    .get(`/api/user/analysis`, {
      params: {
        time_range: 'all',
        statistics: 'completed_vs_pending_tasks'
      }
    })
    .then((res) => {
      // console.log(res.data)
      completedTasks.value = res.data.series[0]
      pendingTasks.value = res.data.series[1]
    })
})
</script>
