<template>
  <div>
    <div v-if="loading" class="w-full h-96 flex items-center justify-center z-50">
      <div class="loading-pillar"></div>
    </div>
    <apexchart
      v-else
      type="bar"
      :options="chartOptions"
      :series="chartSeries"
      @data-loaded="dataLoaded"
    ></apexchart>
  </div>
</template>

<script setup>
import axios from 'axios'
import { computed, ref, onMounted, defineEmits } from 'vue'

const { emit } = defineEmits(['data-loaded'])

const chartSeries = ref([
  {
    name: 'series-1',
    data: []
  }
])

const chartLabels = ref([])
const loading = ref(false)

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

onMounted(() => {
  fetchData()
})

const fetchData = async () => {
  loading.value = true
  try {
    const res = await axios.get(`/api/admin/analysis/all_user_task_progress_analysis`)
    chartSeries.value[0].data = res.data.series
    chartLabels.value = res.data.labels
  } catch (error) {
    console.error('Error fetching data:', error)
  } finally {
    loading.value = false
    emit('data-loaded') // Emit event to parent component
  }
}
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
