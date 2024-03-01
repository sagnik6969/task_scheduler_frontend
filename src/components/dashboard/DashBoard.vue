<template>
  <div class="px-10 pt-6 flex xl:flex-row xl:mt-0 flex-col h-full md:ml-10 mt-12">
    <div
      class="left flex-initial xl:h-full xl:overflow-y-scroll [&::-webkit-scrollbar]:hidden px-4 xl:flex-[0.6_0.6_0%]"
    >
      <greeting-vue></greeting-vue>
      <action-bar class="mt-8"></action-bar>

      <router-view class="mt-5"></router-view>
    </div>

    <div class="right flex-initial xl:flex-[0.4_0.4_0%] px-4 py-4 xl:py-0">
      <div
        class="fixed top-0 right-0 left-0 z-0 py-3 pr-14 w-full bg-white xl:static xl:mr-0 xl:mt-0 xl:pr-0"
      >
        <user-notification-bar></user-notification-bar>
      </div>
      <task-counter></task-counter>
      <statistics class="mt-5"></statistics>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import GreetingVue from './Greeting.vue'
import ActionBar from './ActionBar.vue'
import UserNotificationBar from './right_column/notifications/UserNotificationBar.vue'

import TaskCounter from './right_column/TaskCounter.vue'
import Statistics from './right_column/statistics/Statistics.vue'
import { useStore } from 'vuex'

const store = useStore()

onMounted(async () => {
  if (store.getters.userTasksLoadingStatus == null) store.dispatch('fetchDashboardData')
})
</script>
