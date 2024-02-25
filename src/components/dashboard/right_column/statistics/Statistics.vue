<template>
  <div class="hidden sm:block">
    <h1 class="text-2xl font-semibold text-slate-900">Your Statistics</h1>
    <div class="mt-3 space-x-3">
      <select
        class="border-none focus:[box-shadow:none] bg-slate-200 rounded-md shadow font-medium text-slate-900"
        v-model="statistics"
      >
        <option value="completed_vs_pending_tasks" selected>Completed vs Pending Tasks</option>
        <option value="task_distribution_by_progress">Task Distribution by Progress</option>
        <option value="task_distribution_by_priority">Task Distribution by Priority</option>
        <!-- <option value="">Task Distribution by Deadline</option> -->
      </select>
      <select
        class="border-none focus:[box-shadow:none] bg-slate-200 rounded-md shadow font-medium text-slate-900"
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

    <div v-if="statLoading" class="w-full my-24 flex items-center justify-center">
      <v-progress-circular :size="50" :width="5" color="purple" indeterminate></v-progress-circular>
    </div>
    <apexchart
      v-else
      class="-z-10 relative mt-5"
      width="500"
      type="donut"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>
<script setup>
import axios from 'axios'
import { computed, ref, watchEffect } from 'vue'

const options = computed(() => ({
  labels: labels.value,
  theme: {
    palette: 'palette7'
  }
}))

const statLoading = ref(false)

const series = ref([])
const labels = ref([])

const timeFilter = ref('all')
const statistics = ref('completed_vs_pending_tasks')

watchEffect(() => {
  statLoading.value = true
  axios
    .get(`/api/user/analysis`, {
      params: {
        time_range: timeFilter.value,
        statistics: statistics.value
      }
    })
    .then((res) => {
      console.log(res.data)
      series.value = res.data.series
      labels.value = res.data.labels
    })
    .finally(() => {
      statLoading.value = false
    })
})
</script>
