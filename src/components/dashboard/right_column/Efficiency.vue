<template>
  <div class="w-full bg-purple-100 ml-5 mt-10 p-3 border-2 border-black">
    <div class="flex justify-start">
      <h1 class="text-2xl font-semibold">Efficiency:</h1>
    </div>
    <div class="mt-4">
      <div class="bg-yellow-200 shadow-lg rounded-md p-4 text-black">
        <div class="flex items-center gap-4">
          <h2 class="text-6xl font-extrabold text-black">
            {{ averageEfficiency }}
          </h2>
          <div class="font-semibold text-black">
            <p>Efficiency</p>
            <p>Average</p>
          </div>
          <div class="mt-4">
            <img :src="'/img/' + ratingImage + '.png'" alt="Rating" class="w-full mx-auto" />
          </div>
        </div>
        <div class="font-semibold text-2xl mt-2 text-black">
          <p>Overall Efficiency</p>
          <p>Rating</p>
        </div>

        <div class="flex justify-between">
          <template v-for="star in 5">
            <v-icon class="" v-if="star <= averageEfficiency" :key="'star-filled-' + star"
              >mdi-star</v-icon
            >
            <v-icon v-else :key="'star-outline-' + star">mdi-star-outline</v-icon>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import axios from 'axios'

const totalTasks = ref(0)
const averageEfficiency = ref(0)
const overallEfficiencyRating = ref('')
const ratingImage = ref(null)

onMounted(fetchEfficiencyData)

watchEffect(async () => {
  await fetchEfficiencyData()
})

async function fetchEfficiencyData() {
  try {
    const response = await axios.get('/api/user/efficiency')
    totalTasks.value = response.data.total_tasks
    averageEfficiency.value = Math.min(parseFloat(response.data.average_efficiency).toFixed(2), 5)
    overallEfficiencyRating.value = response.data.overall_efficiency_rating
    setRatingImage(averageEfficiency.value)
  } catch (error) {
    console.error('Error fetching efficiency data:', error)
  }
}
function setRatingImage(overallEfficiencyRating) {
  if (overallEfficiencyRating >= 4.5) {
    ratingImage.value = 'Excellent'
  } else if (overallEfficiencyRating >= 3.5) {
    ratingImage.value = 'Good'
  } else if (overallEfficiencyRating >= 2.5) {
    ratingImage.value = 'belowavg'
  } else {
    ratingImage.value = 'Bad'
  }
}
</script>

<style scoped></style>
