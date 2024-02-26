<template>
  <div class="px-10 pt-6 flex xl:flex-row flex-col h-full overflow-scroll">
    <div
      class="left flex-initial xl:h-full xl:overflow-y-scroll [&::-webkit-scrollbar]:hidden px-4 xl:flex-[0.6_0.6_0%]"
    >
      <!-- [&::-webkit-scrollbar]:hidden => to hide the scroll bar -->
      <GreetingVue></GreetingVue>
      <ActionBar class="mt-8" :isAdmin="isAdmin"></ActionBar>
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
      <div class="flex space-x-4">
        <div
          class="flex-1 bg-slate-200 rounded-lg py-6 px-6 flex justify-center items-center space-x-3"
        >
          <h1 class="text-6xl font-extrabold text-slate-900">{{ completedTasks }}</h1>
          <div class="font-semibold text-slate-700">
            <p>Tasks</p>
            <p>completed</p>
          </div>
        </div>

        <div
          class="flex-1 bg-slate-200 rounded-lg py-6 px-6 flex justify-center items-center space-x-3"
        >
          <h1 class="text-6xl font-extrabold text-slate-900">{{ inProgressTasks }}</h1>
          <div class="font-semibold text-slate-700">
            <p>Tasks</p>
            <p>in Progress</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref, computed } from 'vue'
import GreetingVue from './Greeting.vue'
import ActionBar from './ActionBar.vue'
import { useStore } from 'vuex'

const tasks = ref([])
const tasksLoading = ref(true)

const store = useStore()
const completedTasks = ref(0)
const inProgressTasks = ref(0)
onMounted(async () => {
  await axios.get('/sanctum/csrf-cookie')
  // await axios.post('api/login', {
  //   email: 'madelynn80@example.net',
  //   password: 'password'
  // })

  axios
    .get('/api/user/tasks')
    .then((res) => {
      tasks.value = res.data.data
    })
    .finally(() => {
      tasksLoading.value = false
    })
})

// watch(tasksLoading, (newValue) => {
//   if (!newValue) {
//     completedTasks.value = tasks.value.filter((task) => task.attributes.is_completed).length
//     inProgressTasks.value = tasks.value.filter((task) => !task.attributes.is_completed).length
//   }
// })

const isAdmin = computed(() => {
  return store.getters.isAdmin
})
</script>
