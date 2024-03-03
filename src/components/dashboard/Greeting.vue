<template>
  <div class="greeting border-black border-2 shadow-xl py-8 px-5 rounded-lg">
    <div class="justify-between flex items-start text-center text-black bg-back">
      <div class="flex flex-col items-start justify-start w-full h-20">
        <h1 class="text-5xl font-bold mt-5">Hello {{ $store?.state?.user?.name }}!</h1>
        <div class="flex items-center mt-4">
          <div
            :class="{
              'bg-green-500': $store?.state?.user?.is_admin,
              'bg-red-500': !$store?.state?.user?.is_admin
            }"
            class="w-4 h-4 rounded-full mr-2"
          ></div>
          <p
            class="text-xl"
            :class="{
              'text-green-500': $store?.state?.user?.is_admin,
              'text-red-500': !$store?.state?.user?.is_admin
            }"
          >
            Role: {{ $store?.state?.user?.is_admin ? 'Admin' : 'User' }}
          </p>
        </div>
      </div>
      <img src="@/assets/images/higreeting.png" alt="greetings" class="" />
    </div>
    <p
      class="text-xl text-gray-600 hover:text-blue-500 transition duration-300 transform hover:scale-105 text-start w-3/3 mt-2"
    >
      Motivational Quote For The Day: {{ motivationalQuote }}
    </p>
  </div>
</template>
<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const getMotivationalQuote = async () => {
  try {
    const response = await axios.get(
      'https://api.api-ninjas.com/v1/quotes?category=inspirational',
      { headers: { 'X-Api-Key': 'FUOl6dFdR/g8WDRN9KnxLQ==zI7deRaeJAMGAjv1' } }
    )
    const quotes = response.data[0].quote
    return quotes
  } catch (error) {
    console.error('Error fetching motivational quote:', error)
    return 'Stay motivated!'
  }
}

const motivationalQuote = ref('')
const storedQuote = localStorage.getItem('motivationalQuote')
const storedDate = localStorage.getItem('motivationalQuoteDate')

onMounted(async () => {
  const currentDate = new Date().toISOString().split('T')[0]
  if (storedQuote && storedDate === currentDate) {
    motivationalQuote.value = truncateQuote(storedQuote, 100)
  } else {
    const quote = await getMotivationalQuote()
    motivationalQuote.value = truncateQuote(quote, 30)
    localStorage.setItem('motivationalQuote', quote)
    localStorage.setItem('motivationalQuoteDate', currentDate)
  }
})

const truncateQuote = (quote, maxLength) => {
  return quote.length > maxLength ? `${quote.slice(0, maxLength)}...` : quote
}
</script>

<style scoped>
.greeting {
  background-image: url('/public/img/bgbanner.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  backdrop-filter: blur(10px);
}
</style>
