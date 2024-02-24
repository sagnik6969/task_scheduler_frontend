<template>
  <div class="px-10 py-6 flex xl:flex-row flex-col h-full">
    <div
      class="left flex-initial h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden px-4 xl:flex-[0.6_0.6_0%]"
    >
      <!-- [&::-webkit-scrollbar]:hidden => to hide the scroll bar -->
      <greeting-vue></greeting-vue>
      <!-- <task-list :tasks="tasks" class="mt-8"></task-list> -->
      <router-view :tasks="tasks" class="mt-8"></router-view>
    </div>

    <div class="right flex-initial xl:flex-[0.4_0.4_0%]"></div>
  </div>
</template>
<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import GreetingVue from './Greeting.vue'
import TaskList from './TaskList/TaskList.vue'

const tasks = ref([])

onMounted(async () => {
  // await axios.get('/sanctum/csrf-cookie')
  // await axios.post('api/login', {
  //   email: 'madelynn80@example.net',
  //   password: 'password'
  // })

  axios.get('/api/user/tasks').then((res) => {
    // console.log(res.data)
    tasks.value = res.data.data
  })
})
</script>
<style scoped>
/* .left {
  flex: 0.6;
} */
/* .right {
  flex: 0.4;
} */

/* .left,
.right {
  @apply ;
} */
</style>
