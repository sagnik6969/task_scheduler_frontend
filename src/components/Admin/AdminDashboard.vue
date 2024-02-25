<template>
  <div>
    <div class="px-10 py-6 flex xl:flex-row flex-col">
      <!-- <p class="text-lg">Hello {{ currentUser.name }}</p> -->
      <div
        class="left flex-initial h-full overflow-y-scroll [&::-webkit-scrollbar]:hidden px-4 xl:flex-[0.6_0.6_0%]"
      >
        <greeting-vue></greeting-vue>
      </div>
    </div>
    <AdminSectionSelector v-model="selectedOption" @change="fetchData" />

    <AdminContent :selectedOption="selectedOption" :users="users" />
  </div>
</template>

<script>
import axios from 'axios'
import AdminSectionSelector from './AdminSectionSelector.vue'
import AdminContent from './AdminContent.vue'
import GreetingVue from '../dashboard/Greeting.vue'
export default {
  data() {
    return {
      currentUser: {},
      selectedOption: 'users',
      users: []
    }
  },
  created() {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'))
    this.fetchData()
  },
  methods: {
    async fetchData() {
      try {
        if (this.selectedOption === 'users') {
          console.log(11)
          const response = await axios.get('/api/admin/tasks')
          this.users = response.data.users
          console.log(1111)
          console.log(this.users)
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  },
  components: {
    AdminSectionSelector,
    AdminContent,
    GreetingVue
  }
}
</script>
