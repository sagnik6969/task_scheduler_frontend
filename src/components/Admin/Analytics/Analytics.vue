<template>
  <div class="w-4/5 md:w-4/5 lg:w-3/5 xl:w-5/5 mx-auto space-y-10">
    <div>
      <bar-chart @initialLoadingCompleted="canDisplayBottomPart = true"></bar-chart>
    </div>
    <div
      v-show="canDisplayBottomPart"
      class="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10"
    >
      <div class="md:w-1/2">
        <user-list
          @userSelected="
            (user) => {
              selectedUser = user
            }
          "
          :users="users"
        ></user-list>
      </div>
      <div class="md:w-1/2">
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

const canDisplayBottomPart = ref(false)
</script>
