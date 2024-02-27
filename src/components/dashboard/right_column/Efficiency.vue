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
            <p>Tasks</p>
            <p>completed</p>
          </div>
          <div class="mt-4">
            <img src="../../../assets/images/Excellent.png" alt="Rating" class="w-60 mx-auto" />
          </div>
        </div>
        <div class="font-semibold text-2xl mt-2 text-black">
          <p>Overall Efficiency</p>
          <p>Rating</p>
        </div>

        <div class="flex justify-between">
          <template v-for="star in 5">
            <v-icon
              class="bg-red-50"
              v-if="star <= overallEfficiencyRating"
              :key="'star-filled-' + star"
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
const ratingImage = ref('')

onMounted(fetchEfficiencyData)

watchEffect(async () => {
  await fetchEfficiencyData()
})

async function fetchEfficiencyData() {
  try {
    const response = await axios.get('/api/user/efficiency')
    totalTasks.value = response.data.total_tasks
    averageEfficiency.value = response.data.average_efficiency
    overallEfficiencyRating.value = response.data.overall_efficiency_rating
  } catch (error) {
    console.error('Error fetching efficiency data:', error)
  }
}
function setRatingImage(overallEfficiencyRating) {
  if (overallEfficiencyRating >= 4.5) {
    ratingImage.value = '../../../assets/images/Excellent.png'
  } else if (overallEfficiencyRating >= 3.5) {
    ratingImage.value = '../../../assets/images/Good.png'
  } else if (overallEfficiencyRating >= 2.5) {
    ratingImage.value = '../../../assets/images/Average.png'
  } else {
    ratingImage.value = '../../../assets/images/NeedsImprovement.png'
  }
}
</script>

<style scoped>
/* Add any additional styling here */
</style>
