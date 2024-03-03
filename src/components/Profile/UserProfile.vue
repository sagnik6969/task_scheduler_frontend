<template>
  <div class="">
    <user-notification-bar
      class="extracss top-0 right-0 left-0 py-3 w-full bg-white xl:static xl:mr-0 xl:mt-0 xl:pr-0"
    ></user-notification-bar>
    <div class="sm:flex w-full p-5 md:pl-20 md:pr-6 gap-5 h-3/3">
      <div
        class="shadow-lg border-2 border-gray-300 bg-gradient-to-br from-green-200 to-green-100 rounded-lg p-5 h-auto md:h-2/3 transition duration-300 ease-in-out"
      >
        <div class="flex justify-center items-center mb-4">
          <img
            class="object-cover rounded-full h-24 w-24 min-h-12 min-w-12 border-4 border-white hover:border-green-400"
            :src="'https://avatars.githubusercontent.com/u/47273253?v=4'"
            alt="profile pic"
          />
        </div>
        <div class="flex flex-col justify-start items-center mb-4">
          <h1 class="text-3xl font-bold text-gray-800">
            {{ userDetails ? userDetails.name : name }}
          </h1>
          <div
            class="rounded-full h-6 w-20 flex items-center justify-center mt-2 text-sm font-semibold text-white bg-green-500"
          >
            {{ userDetails.is_admin ? 'Admin' : 'User' }}
          </div>
        </div>
        <div class="pt-3 md:pl-14 pr-14 flex flex-col justify-start">
          <h1 class="text-center mb-5 font-semibold text-2xl text-gray-800">Profile Details</h1>
          <div class="flex flex-col space-y-4">
            <div
              class="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
            >
              <h1 class="text-lg font-semibold mb-1 text-gray-800">Email:</h1>
              <p class="text-base text-gray-600">
                {{ userDetails ? userDetails.email : 'Email' }}
              </p>
            </div>
            <div
              class="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
            >
              <h1 class="text-lg font-semibold mb-1 text-gray-800">Registered:</h1>
              <p class="text-base text-gray-600">
                <span>{{ userDetails ? formatDate(userDetails.created_at) : '' }}</span>
              </p>
            </div>
            <div
              class="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-300"
            >
              <h1 class="text-lg font-semibold mb-1 text-gray-800">Updated At:</h1>
              <p class="text-base text-gray-600">
                {{ userDetails ? formatDate(userDetails.updated_at) : '' }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-2/3">
        <TaskCounter />
        <div class="flex">
          <Statistics class="xl:w-[500px]" />
          <!-- <Efficiency /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserNotificationBar from '@/components/dashboard/right_column/notifications/UserNotificationBar.vue'
import TaskCounter from '@/components/dashboard/right_column/TaskCounter.vue'
import Statistics from '@/components/dashboard/right_column/statistics/Statistics.vue'
import Efficiency from '@/components/dashboard/right_column/Efficiency.vue'
import { useStore } from 'vuex'
const store = useStore()
const name = store.getters.userName
const userDetails = store.getters.User

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  return formattedDate
}
</script>

<style scoped>
.extracss {
  position: sticky;
  z-index: 1;
  padding-right: 2rem;
}
</style>
