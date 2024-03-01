<template>
  <div>
    <div v-if="loading" class="w-full h-96 flex items-center justify-center z-50">
      <div class="loading-pillar"></div>
    </div>
    <apexchart v-else type="bar" :options="chartOptions" :series="chartSeries"></apexchart>
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
  }
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
.loading-pillar {
  width: 50px;
  height: 19rem;
  background-color: rgba(128, 128, 128, 0.12);
  animation: movePillar 1s infinite alternate; /* Alternate the animation direction */
}

@keyframes movePillar {
  from {
    transform: translateX(-370px);
  }
  to {
    transform: translateX(370px);
  }
}
</style>
