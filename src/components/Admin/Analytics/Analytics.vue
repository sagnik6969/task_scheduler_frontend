<template>
  <div class="w-4/5 md:w-4/5 lg:w-3/5 xl:w-5/5 mx-auto space-y-10">
    <div>
      <!-- <h1 class="font-medium text-xl">All task distribution by progress</h1> -->
      <bar-chart></bar-chart>
    </div>
    <div class="flex space-x-10">
      <div class="left flex-1">
        <user-list
          @userSelected="
            (user) => {
              selectedUser = user
            }
          "
          :users="users"
        ></user-list>
      </div>
      <div class="right flex-1">
        <pie-chart :user="selectedUser"></pie-chart>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import PieChart from './charts/PieChart.vue'
import BarChart from './charts/BarChart.vue'
import UserList from './UserList.vue'
const props = defineProps(['users'])
const selectedUser = ref(props.users[0])
</script>
