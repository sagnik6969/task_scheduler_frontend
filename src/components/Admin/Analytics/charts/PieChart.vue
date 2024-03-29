<!-- user-stats.vue -->
<template>
  <div id="user-stats" class="px-4 md:px-0">
    <h1 class="text-2xl font-semibold text-slate-900">{{ user.name }}'s Statistics</h1>
    <div class="mt-3 space-y-3 md:space-y-0 md:flex md:space-x-3" v-if="series.length !== 0">
      <select
        class="w-full md:w-auto border-none focus:[box-shadow:none] bg-black rounded-md shadow font-medium text-white"
        v-model="statistics"
      >
        <option value="completed_vs_pending_tasks" selected>Completed vs Pending Tasks</option>
        <option value="task_distribution_by_progress">Task Distribution by Progress</option>
        <option value="task_distribution_by_priority">Task Distribution by Priority</option>
      </select>
      <select
        class="w-full md:w-auto border-none focus:[box-shadow:none] bg-black rounded-md shadow font-medium text-white"
        v-model="timeFilter"
      >
        <option value="last_hour">Last Hour</option>
        <option value="today">Today</option>
        <option value="past_weak">Past Weak</option>
        <option value="past_month">Past Month</option>
        <option value="past_year">Past Year</option>
        <option value="all">All Time</option>
      </select>
    </div>
    <div
      class="py-10 flex justify-center items-center text-slate-800 text-xl font-medium px-14 text-center h-60 bg-slate-100 mt-5 rounded-lg"
      v-if="user.completed_tasks == 0 && user.incomplete_tasks == 0"
    >
      <p>Looks like the user haven't added any tasks yet !</p>
    </div>
    <div
      v-else-if="series.length === 0"
      class="mt-5 bg-gray-100 flex items-center justify-center text-2xl h-64 mb-10 text-gray-500 font-semibold loading-animation"
    >
      Loading ...
    </div>
    <!-- later will change it to the pie -->
    <apexchart
      v-else
      class="-z-10 relative mt-5 shadow-md rounded-xl border-black border-2 bg-white w-max mb-10"
      :class="{ 'opacity-70': statsLoading }"
      :width="currentDivWidth"
      type="donut"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>

<script setup>
import axios from 'axios'
import { computed, defineProps, ref, watchEffect } from 'vue'
import { useStore } from 'vuex'

const props = defineProps(['user'])
const store = useStore()
const isMobile = computed(() => window.innerWidth <= 768)
const statsLoading = ref(false)
const options = computed(() => ({
  labels: labels.value,
  theme: {
    palette: 'palette7'
  }
}))

const currentDivWidth = computed(() => {
  return document.getElementById('user-stats')?.offsetWidth || 500
})

const statLoading = ref(false)

const timeFilter = ref('all')
const statistics = ref('completed_vs_pending_tasks')
const series = computed(() => store.getters['analysis/getUserStatistics'].series || [])
const labels = computed(() => store.getters['analysis/getUserStatistics'].labels || [])
watchEffect(async () => {
  try {
    statLoading.value = true
    statsLoading.value = true
    await store.dispatch('analysis/fetchUserStatistics', {
      userId: props.user.id,
      timeRange: timeFilter.value,
      statistics: statistics.value
    })
    statLoading.value = false
    statsLoading.value = false
  } catch {
    statLoading.value = false
  } finally {
    statLoading.value = false
  }
})
</script>

<style scoped>
/* Add any additional styles here */
</style>
