<template>
  <div v-if="loading" class="w-full h-40 flex items-center justify-center">
    <v-progress-circular :size="50" :width="5" color="purple" indeterminate></v-progress-circular>
  </div>
  <apexchart v-else type="bar" :options="options" :series="series"></apexchart>
</template>

<script setup>
import axios from 'axios'
import { computed, ref, watchEffect } from 'vue'

const series = ref([
  {
    name: 'series-1',
    data: []
  }
])

const labels = ref([])
const loading = ref(false)

const options = computed(() => ({
  redrawOnParentResize: true,
  redrawOnWindowResize: true,
  title: {
    text: 'Task distribution by progress',
    align: 'left',
    margin: 10,
    offsetX: 0,
    offsetY: 0,
    floating: false,
    style: {
      fontSize: '25px',
      fontWeight: 'bold',
      fontFamily: undefined,
      color: '#263238'
    }
  },
  chart: {
    id: 'vuechart-example'
  },
  xaxis: {
    categories: labels.value
  }
}))

watchEffect(async () => {
  loading.value = true
  const res = await axios.get(`/api/admin/analysis/all_user_task_progress_analysis`)
  //   console.log(res.data.series)
  series.value[0].data = res.data.series
  console.log(series.value)

  labels.value = res.data.labels
  loading.value = false
  //   } catch {

  //   }
})
</script>
