<template>
  <div class="w-4/5 md:w-4/5 lg:w-3/5 xl:w-5/5 mx-auto space-y-10">
    <div>
      <bar-chart></bar-chart>
    </div>
    <div
      v-show="canDisplayBottomPart"
      class="flex flex-col md:flex-row space-y-10 md:space-y-0 md:space-x-10"
    >
      <div class="md:w-1/2">
        <user-list></user-list>
      </div>
      <div v-if="selectedUser" class="md:w-1/2">
        <pie-chart :user="selectedUser"></pie-chart>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import PieChart from './charts/PieChart.vue'
import BarChart from './charts/BarChart.vue'
import UserList from './UserList.vue'
import { useStore } from 'vuex'

const store = useStore()

if (store.getters['adminUserList/userListStatus'] == null) {
  store.dispatch('adminUserList/fetchUserList')
}

const users = computed(() => store.getters['adminUserList/userList'])
const selectedUser = computed(() => store.getters['analysis/selectedUser'])

const canDisplayBottomPart = computed(
  () => store.getters['analysis/getbarchartStatistics'].initialLoadingComplete || false
)
</script>
