<template>
  <div class="hidden sm:block">
    <h1 class="text-2xl font-semibold text-slate-900">Your Statistics</h1>
    <div class="mt-3 space-x-3">
      <select
        class="border-none focus:[box-shadow:none] bg-black rounded-md shadow font-medium text-white"
        v-model="statistics"
      >
        <option value="completed_vs_pending_tasks" selected>Completed vs Pending Tasks</option>
        <option value="task_distribution_by_progress">Task Distribution by Progress</option>
        <option value="task_distribution_by_priority">Task Distribution by Priority</option>
        <!-- <option value="">Task Distribution by Deadline</option> -->
      </select>
      <select
        class="border-none focus:[box-shadow:none] bg-black rounded-md shadow font-medium text-white"
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

    <div v-if="statLoading" class="w-full mt-5 h-80 overflow-hidden">
      <!-- <v-progress-circular :size="50" :width="5" color="purple" indeterminate></v-progress-circular> -->
      <v-skeleton-loader class="w-full h-40" type="card, card"> </v-skeleton-loader>
    </div>
    <apexchart
      v-else
      class="-z-10 relative mt-5 shadow-md rounded-xl border-black border-2 bg-white"
      width="500"
      type="donut"
      :options="options"
      :series="series"
    ></apexchart>
  </div>
</template>
<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'

const store = useStore()
const toast = useToast()

const options = computed(() => ({
  labels: labels.value,
  theme: {
    palette: 'palette7'
  }
}))

const statLoading = ref(false)

const series = computed(() => store.getters.getUserStatistics?.data?.series || [])
const labels = computed(() => store.getters.getUserStatistics?.data?.labels || [])

const timeFilter = ref('all')
const statistics = ref('completed_vs_pending_tasks')

watchEffect(async () => {
  try {
    statLoading.value = true
    await store.dispatch('fetchUserStatistics', {
      time_range: timeFilter.value,
      statistics: statistics.value
    })

    statLoading.value = false
  } catch (error) {
    toast.error('Unable to fetch user statistics')
    console.log(error)
  } finally {
    statLoading.value = false
  }
})
</script>
