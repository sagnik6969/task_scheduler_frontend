<template>
  <div class="sm:block">
    <h1 v-if="!props.notitle" class="text-2xl font-semibold text-slate-900">Your Statistics</h1>
    <div
      :class="props.notitle ? 'space-x-3' : 'mt-3 space-x-3'"
      v-if="series.every((item) => item === 0) !== 0 && !statLoading"
      class="relative"
    >
      <select
        class=""
        :class="
          props.notitle
            ? 'mt-3  text-black border-gray-200 shadow-2xl rounded-md  focus:[box-shadow:none]'
            : 'bg-black text-white border-none focus:[box-shadow:none] rounded-md shadow font-medium '
        "
        v-model="statistics"
      >
        <option value="completed_vs_pending_tasks" selected>Completed vs Pending Tasks</option>
        <option value="task_distribution_by_progress">Task Distribution by Progress</option>
        <option value="task_distribution_by_priority">Task Distribution by Priority</option>
        <!-- <option value="">Task Distribution by Deadline</option> -->
      </select>
      <select
        :class="
          props.notitle
            ? ' bg-white text-black border-gray-200  shadow-2xl rounded-md  focus:[box-shadow:none]'
            : 'bg-black text-white border-none focus:[box-shadow:none] rounded-md shadow font-medium '
        "
        v-model="timeFilter"
      >
        <option value="last_hour">Last Hour</option>
        <option value="today">Today</option>
        <option value="past_weak">Past Weak</option>
        <option value="past_month">Past Month</option>
        <option value="past_year">Past Year</option>
        <option value="all">All Time</option>
      </select>
      <span
        v-if="props.notitle"
        class="absolute top-5 right-6 items-center text-gray-400 hover:text-black pl-10 animate-pulse material-symbols-outlined cursor-pointer"
        @click="handleRefresh"
      >
        refresh</span
      >
    </div>
    <!-- <div
      v-if="series[0] === 0 && series[1] === 0"
      class="flex items-center justify-center bg-slate-100 mt-5 h-60"
    >
      <p class="text-gray-500">No Tasks Added.</p>
    </div> -->
    <div
      v-if="series.every((item) => item === 0)"
      :style="props.notitle ? 'width: 62vw; height: 60vh' : ''"
      class="text-center flex flex-col justify-center relative items-center"
    >
      <img src="@/assets/images/No_data.jpg" alt="" width="300px" height="300px" />
      <p class="text-gray-500 font-semibold text-xl">No Tasks Added...</p>
      <span
        v-if="props.notitle"
        class="absolute top-10 right-2 items-center text-gray-400 hover:text-black pl-10 animate-pulse material-symbols-outlined cursor-pointer"
        @click="handleRefresh"
      >
        refresh
      </span>
    </div>
    <div
      v-else-if="props.notitle && statLoading"
      class="bg-gray-100 flex items-center justify-center text-2xl text-gray-500 font-semibold loading-animation"
      :style="props.notitle ? 'width: 62vw; height: 60vh' : ''"
    >
      {{ $store.getters.User.name }}'s Profile Loading...
    </div>
    <div
      v-else-if="statLoading"
      class="mt-5 bg-gray-100 flex items-center justify-center text-2xl h-80 text-gray-500 font-semibold loading-animation"
    >
      Loading ...
    </div>
    <apexchart
      v-else-if="!statLoading || graphLoading"
      class="-z-10 relative mt-5 shadow-md rounded-xl border-2 bg-white"
      :class="
        graphLoading ? 'opacity-25 border-black border-6  ' : props.notitle ? '' : 'border-black'
      "
      width="500"
      type="donut"
      :options="options"
      :series="series"
    ></apexchart>
    <div v-else class="w-full mt-5 h-80 overflow-hidden">
      <!-- <v-progress-circular :size="50" :width="5" color="purple" indeterminate></v-progress-circular> -->
      <v-skeleton-loader class="w-full h-40" type="card, card"> </v-skeleton-loader>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'
const props = defineProps(['notitle'])
const emit = defineEmits(['loading'])
const store = useStore()
const toast = useToast()
const taskLoaded = ref(false)
const options = computed(() => ({
  labels: labels.value,
  theme: {
    palette: 'palette7'
  }
}))

const statLoading = ref(false)
const graphLoading = ref(false)

const series = computed(() => store.getters.getUserStatistics?.data?.series || [])
const labels = computed(() => store.getters.getUserStatistics?.data?.labels || [])

const timeFilter = ref('all')
const statistics = ref('completed_vs_pending_tasks')

watchEffect(async () => {
  try {
    if (!taskLoaded.value) {
      statLoading.value = true
      emit('loading')
    }
    graphLoading.value = true
    await store.dispatch('fetchUserStatistics', {
      time_range: timeFilter.value,
      statistics: statistics.value
    })
    // console.log(statistics)
  } catch (error) {
    toast.error('Unable to fetch user statistics')
    console.log(error)
  } finally {
    if (!taskLoaded.value) {
      statLoading.value = false
      taskLoaded.value = true
      emit('loading')
    }
    graphLoading.value = false
  }
})

const handleRefresh = async () => {
  try {
    if (!taskLoaded.value) {
      statLoading.value = true
      emit('loading')
    }
    graphLoading.value = true
    await store.dispatch('fetchUserStatistics', {
      time_range: timeFilter.value,
      statistics: statistics.value
    })
  } catch (error) {
    toast.error('Unable to fetch user statistics')
    console.error(error)
  } finally {
    if (!taskLoaded.value) {
      statLoading.value = false
      taskLoaded.value = true
      emit('loading')
    }
    graphLoading.value = false
  }
}
</script>

<style scoped>
.loading-animation {
  animation: loadingOpacity 0.5s infinite alternate;
}

@keyframes loadingOpacity {
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>
