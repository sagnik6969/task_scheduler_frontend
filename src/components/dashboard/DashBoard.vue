<template>
  <div class="px-10 pt-6 flex xl:flex-row flex-col h-full overflow-scroll">
    <div
      class="left flex-initial xl:h-full xl:overflow-y-scroll [&::-webkit-scrollbar]:hidden px-4 xl:flex-[0.6_0.6_0%]"
    >
      <greeting-vue></greeting-vue>
      <action-bar class="mt-8"></action-bar>
      <div v-if="tasksLoading" class="text-center my-20 text-slate-900">
        <v-progress-circular
          :size="50"
          :width="5"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </div>
      <router-view v-else :tasks="tasks" class="mt-5"></router-view>
    </div>

    <div class="right flex-initial xl:flex-[0.4_0.4_0%] px-4 py-4 xl:py-0">
      <task-counter></task-counter>
      <statistics class="mt-5"></statistics>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import GreetingVue from './Greeting.vue'
import ActionBar from './ActionBar.vue'
import TaskCounter from './right_column/TaskCounter.vue'
import Statistics from './right_column/statistics/Statistics.vue'
const tasks = ref([])
const tasksLoading = ref(true)

onMounted(async () => {
  // await axios.get('/sanctum/csrf-cookie')
  // await axios.post('api/login', {
  //   email: 'madelynn80@example.net',
  //   password: 'password'
  // })

  axios
    .get('/api/user/tasks')
    .then((res) => {
      // console.log(res.data)
      tasks.value = res.data.data
    })
    .finally(() => {
      tasksLoading.value = false
    })
})
</script>
