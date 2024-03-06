<template>
  <div class="">
    <div
      v-if="!loading"
      class="w-full relative md:w-96 bg-green-200 ml-5 mt-10 p-5 border border-gray-300 rounded-lg shadow-md transition duration-300 hover:shadow-lg"
    >
      <button
        @click="$emit('close-efficiency-box')"
        class="absolute top-3 right-3 text-black hover:text-gray-800 hover:bg-white rounded-xl transition duration-300"
      >
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
      <div class="">
        <h1 class="text-2xl text-center font-serif font-semibold text-black opacity-90">
          Task Efficiency Card
        </h1>
        <div class="bg-green-200 shadow-lg h-full rounded-md p-4 pt-4 text-black">
          <div class="flex items-center gap-4 justify-between">
            <div class="">
              <h2 class="text-6xl font-extrabold mr-3 text-black inline-block">
                {{ averageEfficiency }}
              </h2>
              <span class="inline-block font-semibold text-black">
                <p class="text-md">Efficiency</p>
                <p class="text-md">Average</p>
              </span>
            </div>
            <div class="mt-2">
              <img :src="'/img/' + ratingImage + '.png'" alt="Rating" class="w-36 h-full mx-auto" />
            </div>
          </div>

          <div class="flex justify-start items-center mt-3">
            <div class="font-semibold text-xl mr-5 text-black">
              <p class="text-xl">Rating</p>
            </div>
            <div v-for="star in 5" :key="star">
              <v-icon class="text-black-500" v-if="star <= averageEfficiency">mdi-star</v-icon>
              <v-icon class="text-black-500" v-else>mdi-star-outline</v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      style="width: 100vw; height: 100vh"
      class="flex items-center justify-center bg-slate-800"
    >
      <v-progress-circular :size="50" :width="5" color="white" indeterminate></v-progress-circular>
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
const loading = ref(false)
onMounted(fetchEfficiencyData)

watchEffect(async () => {
  await fetchEfficiencyData()
})

async function fetchEfficiencyData() {
  try {
    loading.value = true
    const response = await axios.get('/api/user/efficiency')
    totalTasks.value = response.data.total_tasks
    averageEfficiency.value = Math.min(parseFloat(response.data.average_efficiency).toFixed(2), 5)
    overallEfficiencyRating.value = response.data.overall_efficiency_rating
    setRatingImage(averageEfficiency.value)
    loading.value = false
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
