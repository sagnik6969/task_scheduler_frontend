<template>
  <div>
    <div v-if="loading" class="w-full h-96 flex items-center justify-center z-50">
      <!-- Skeleton Loader -->
      <bar-skeleton />
    </div>

    <div class="relative" v-else>
      <apexchart
        type="bar"
        :options="chartOptions"
        :series="chartSeries"
        class="responsive-chart"
      ></apexchart>
      <div class="absolute top-0 right-10 flex items-center justify-center text-slate-600">
        <span class="material-symbols-outlined cursor-pointer" @click="refreshData"> refresh </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { computed, ref, watchEffect } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'
import BarSkeleton from '@/components/ui/Shimmer/BarSkeleton.vue'
const toast = useToast()
const store = useStore()

const chartSeries = computed(() => [
  {
    name: 'series-1',
    data: store.getters['analysis/getbarchartStatistics'].data?.series || []
  }
])

const chartLabels = computed(
  () => store.getters['analysis/getbarchartStatistics'].data?.labels || []
)
const loading = computed(() => store.getters['analysis/getbarchartStatistics'].loading || false)

const initialLoadingComplete = computed(
  () => store.getters['analysis/getbarchartStatistics'].initialLoadingComplete || false
)

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
  if (!initialLoadingComplete.value) {
    try {
      await store.dispatch('analysis/fetchbarchartStatistics')
    } catch (error) {
      toast.error('Unable to fetch data')
    }
  }
})
const refreshData = async () => {
  try {
    await store.dispatch('analysis/fetchbarchartStatistics')
  } catch (error) {
    toast.error('Unable to fetch data')
  }
}
</script>

<style scoped>
.responsive-chart {
  width: 100%;
}
</style>
