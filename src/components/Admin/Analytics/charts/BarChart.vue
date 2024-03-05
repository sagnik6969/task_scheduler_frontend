<template>
  <div>
    <div v-if="loading" class="w-full h-96 flex items-center justify-center z-50">
      <!-- Skeleton Loader -->
      <div class="skeleton-chart flex flex-col sm:flex-row items-center justify-center">
        <div class="skeleton-bar bg-gray-300 h-4 w-16 mb-2 sm:mb-0 sm:mr-2"></div>
        <div class="skeleton-bar bg-gray-300 h-8 w-16 mb-2 sm:mb-0 sm:mr-2"></div>
        <div class="skeleton-bar bg-gray-300 h-12 w-16 mb-2 sm:mb-0 sm:mr-2"></div>
        <div class="skeleton-bar bg-gray-300 h-16 w-16 mb-2 sm:mb-0 sm:mr-2"></div>
        <div class="skeleton-bar bg-gray-300 h-20 w-16 mb-2 sm:mb-0 sm:mr-2"></div>
      </div>
    </div>

    <div class="relative" v-else>
      <apexchart
        type="bar"
        :options="chartOptions"
        :series="chartSeries"
        class="responsive-chart"
      ></apexchart>
      <div class="absolute top-0 right-10 flex items-center justify-center text-slate-600">
        <span
          class="material-symbols-outlined cursor-pointer"
          @click="
            async () => {
              try {
                loading = true
                const res = await axios.get(`/api/admin/analysis/all_user_task_progress_analysis`)
                console.log(res)
                chartSeries[0].data = res.data.series
                chartLabels = res.data.labels
                loading = false

                if (!initialLoadingComplete) {
                  initialLoadingComplete = true
                  $emit('initialLoadingCompleted')
                }
              } catch (error) {
                toast.error('Unable to fetch data')
              }
            }
          "
        >
          refresh</span
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { computed, ref, watchEffect } from 'vue'
import { useToast } from 'vue-toast-notification'
const emit = defineEmits(['initialLoadingCompleted'])

const toast = useToast()

const chartSeries = ref([
  {
    name: 'series-1',
    data: []
  }
])

const chartLabels = ref([])
const loading = ref(false)

const initialLoadingComplete = ref(false)

const chartOptions = computed(() => ({
  chart: {
    toolbar: {
      show: true
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '40%',
      borderRadius: 2
    }
  },
  dataLabels: {
    enabled: true
  },
  xaxis: {
    categories: chartLabels.value,
    labels: {
      style: {
        fontSize: '14px',
        fontWeight: 500,
        colors: '#333'
      }
    }
  },
  yaxis: {
    labels: {
      style: {
        fontSize: '14px',
        fontWeight: 500,
        colors: '#333'
      }
    }
  },
  title: {
    text: 'Task Distribution by Progress',
    align: 'left',
    style: {
      fontSize: '20px',
      fontWeight: 600,
      color: '#263238'
    }
  },
  colors: ['#4CAF50'],
  grid: {
    borderColor: '#f1f1f1'
  },
  tooltip: {
    theme: 'dark',
    x: {
      show: false
    }
  },
  responsive: [
    {
      breakpoint: 768,
      options: {
        chart: {
          width: '100%',
          innerHeight: '100%',
          outerHeight: '100%'
        }
      }
    }
  ]
}))

watchEffect(async () => {
  try {
    loading.value = true
    const res = await axios.get(`/api/admin/analysis/all_user_task_progress_analysis`)
    //   console.log(res.data.series)
    chartSeries.value[0].data = res.data.series
    // console.log(series.value)

    chartLabels.value = res.data.labels
    loading.value = false
    if (initialLoadingComplete.value == false) {
      initialLoadingComplete.value = true
      emit('initialLoadingCompleted')
    }
  } catch (error) {
    toast.error('Unable to fetch data')
  }
})
</script>

<style scoped>
.skeleton-chart {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 100%;
}

.skeleton-bar {
  animation: loadingAnimation 1s infinite alternate;
}

@keyframes loadingAnimation {
  from {
    opacity: 0.5;
  }
  to {
    opacity: 1;
  }
}

/* Responsive Layout */
@media (max-width: 768px) {
  .skeleton-chart {
    flex-direction: row;
    justify-content: space-around;
  }
}
.responsive-chart {
  width: 100%;
}
</style>
