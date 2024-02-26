<template>
  <div class="sm:flex w-full p-5 md:p-20 gap-5 h-full">
    <div
      class="w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/3 shadow-md border-2 border-black bg-green-200 rounded-lg"
    >
      <div class="flex justify-center items-center mt-5">
        <img
          class="object-cover rounded-full h-48 w-48 min-h-12 min-w-12"
          src="https://avatars.githubusercontent.com/u/47273253?v=4"
          alt="profile pic"
        />
      </div>
      <div class="flex justify-center items-center mt-5">
        <h1 class="text-3xl font-bold">{{ name }}</h1>
      </div>
      <div class="p-5 md:p-14 flex flex-col justify-start">
        <div
          class="flex p-2 border-2 border-black rounded-sm items-center w-full justify-between mb-2"
        >
          <h1 class="text-lg sm:text-2xl font-semibold">My profile</h1>
          <p class="text-sm sm:text-md">
            Last created at:
            <span class="text-xs sm:text-sm block">{{ formatDate(date) }}</span>
          </p>
        </div>
        <div class="flex w-full border-2 border-black items-center p-2 justify-between mb-2">
          <h1 class="text-lg sm:text-2xl font-semibold">Email:</h1>
          <p class="text-sm sm:text-md">{{ Email }}</p>
        </div>
        <div class="flex items-center border-2 border-black w-full p-2 justify-between">
          <h1 class="text-lg sm:text-2xl font-semibold">Email Verified:</h1>
          <p class="text-sm sm:text-md justify-center text-center">
            {{ isverified ? 'Yes' : 'No' }}
          </p>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-2/3">
      <TaskCounter />
      <Statistics />
    </div>
  </div>
</template>

<script setup>
import TaskCounter from '@/components/dashboard/right_column/TaskCounter.vue'
import Statistics from '@/components/dashboard/right_column/statistics/Statistics.vue'
import { useStore } from 'vuex'
const store = useStore()
const name = store.getters.userName
const date = store.getters.User.created_at
const Email = store.getters.User.email
const isverified = store.getters.User.email_verified_at
const formatDate = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  }
  const formattedDate = new Date(dateString).toLocaleString('en-US', options)
  return formattedDate
}
</script>
