<template>
  <div>
    <h1 class="text-2xl font-semibold text-slate-900">Your Statistics</h1>
    <div class="mt-3 space-x-3">
      <select
        class="border-none focus:[box-shadow:none] bg-slate-200 rounded-md shadow font-medium text-slate-900"
      >
        <option value="" selected>Completed vs Pending Tasks</option>
        <option value="">Task Distribution by Progress</option>
        <option value="">Task Distribution by Priority</option>
        <option value="">Task Distribution by Deadline</option>
      </select>
      <select
        class="border-none focus:[box-shadow:none] bg-slate-200 rounded-md shadow font-medium text-slate-900"
      >
        <option value="">Last Hour</option>
        <option value="">Today</option>
        <option value="">Yesterday</option>
        <option value="">Past Weak</option>
        <option value="">Past Month</option>
        <option value="">Past Year</option>
        <option value="">All Time</option>
      </select>
    </div>
    <apexchart width="500" type="bar" :options="options" :series="series"></apexchart>
  </div>
</template>
<script setup>
import { computed } from 'vue'

// import VueApexCharts from 'vue-apexcharts'
const options = computed(() => ({
  chart: {
    id: 'vuechart-example'
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
  }
}))

const series = [
  {
    name: 'series-1',
    data: [30, 40, 45, 50, 49, 60, 70, 91]
  }
]
</script>
