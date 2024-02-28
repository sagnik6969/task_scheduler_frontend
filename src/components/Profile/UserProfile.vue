<template>
  <div class="sm:flex w-full p-5 md:p-20 gap-5 h-full">
    <div class="shadow-md border-2 border-black bg-green-200 rounded-lg">
      <div class="flex justify-center items-center mt-5">
        <img
          class="object-cover rounded-full h-48 w-48 min-h-12 min-w-12"
          src="https://avatars.githubusercontent.com/u/47273253?v=4"
          alt="profile pic"
        />
      </div>
      <div class="flex justify-center items-center mt-5">
        <h1 class="text-3xl font-bold">{{ userDetails ? userDetails.name : name }}</h1>
      </div>
      <div class="p-5 md:p-14 flex flex-col justify-start">
        <div
          class="flex p-2 border-2 border-black rounded-sm items-center w-full justify-between mb-2"
        >
          <h1 class="text-lg sm:text-2xl font-semibold">My profile</h1>
          <p class="text-sm sm:text-md">
            Last created at:
            <span class="text-xs sm:text-sm block">{{
              userDetails ? formatDate(userDetails.created_at) : formatDate(date)
            }}</span>
          </p>
        </div>
        <div class="flex w-full border-2 border-black items-center p-2 justify-between mb-2">
          <h1 class="text-lg sm:text-2xl font-semibold">Email:</h1>
          <p class="text-sm sm:text-md">{{ userDetails ? userDetails.email : Email }}</p>
        </div>
      </div>
    </div>
    <div class="flex flex-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-2/3">
      <TaskCounter />
      <div class="flex">
        <Statistics class="xl:w-[500px]" />
        <Efficiency />
      </div>
    </div>
  </div>
</template>

<script setup>
import TaskCounter from '@/components/dashboard/right_column/TaskCounter.vue'
import Statistics from '@/components/dashboard/right_column/statistics/Statistics.vue'
import Efficiency from '@/components/dashboard/right_column/Efficiency.vue'
import { useStore } from 'vuex'
const store = useStore()
const name = store.getters.userName
const date = store.getters.User.created_at
const Email = store.getters.User.email
const isverified = store.getters.User.email_verified_at
const formatDate = (dateString) => {
  const currentDate = new Date()
  const date = new Date(dateString)
  const timeDifference = currentDate.getTime() - date.getTime()

  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''} ago`
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''} ago`
  } else if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} ago`
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} ago`
  } else if (minutes > 0) {
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  } else {
    return `${seconds} second${seconds > 1 ? 's' : ''} ago`
  }
}
</script>
