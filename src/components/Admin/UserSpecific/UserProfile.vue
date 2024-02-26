<template>
  <div
    class="flex justify-center items-center h-full fixed top-0 left-0 w-full bg-gray-900 bg-opacity-50 z-50"
  >
    <div class="bg-white p-10 rounded-lg shadow-md relative w-3/3">
      <button
        @click="closeUserProfile"
        class="absolute top-5 right-5 text-gray-600 hover:text-gray-800"
      >
        <svg
          class="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
      <!-- User Information -->
      <div class="flex justify-between mb-6">
        <div>
          <h2 class="text-2xl font-bold">{{ userDetails.name }}</h2>
          <p class="text-gray-600">Created at: {{ formatDate(userDetails.created_at) }}</p>
          <p class="text-gray-600">Updated at: {{ formatDate(userDetails.updated_at) }}</p>
        </div>
        <div>
          <div class="pie-chart w-24 h-24 relative">
            <div
              class="absolute inset-0 bg-brown-300 rounded-full transform rotate-180"
              :style="{ width: 80 + '%' }"
            ></div>
            <div
              class="absolute inset-0 bg-green-300 rounded-full transform rotate-180"
              :style="{ width: 20 + '%' }"
            ></div>
          </div>
          <div class="text-center mt-2">
            <p class="text-brown-600 text-sm font-bold">Incomplete Tasks</p>
            <p class="text-green-600 text-sm font-bold">Complete Tasks</p>
            <p :class="[efficiencyClass]">{{ efficiency }}</p>
          </div>
        </div>
      </div>

      <!-- Options -->
      <div class="flex justify-between">
        <button @click="makeAdmin" class="flex items-center text-blue-500">
          <svg
            class="h-6 w-6 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          Make Admin
        </button>
        <button @click="deleteUser" class="flex items-center text-red-500">
          <svg
            class="h-6 w-6 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          Delete User
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    userDetails: Object
  },
  methods: {
    formatDate(timestamp) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }
      return new Date(timestamp).toLocaleDateString(undefined, options)
    },
    deleteUser() {
      // Emit event to delete user
      this.$emit('delete-user', this.userDetails.id)
    },
    makeAdmin() {
      // Emit event to make user admin
      this.$emit('make-admin', this.userDetails.id)
    },
    closeUserProfile() {
      // Emit event to close user profile
      this.$emit('close-user-profile')
    }
  },
  computed: {
    getIncompleteTaskPercentage() {
      const totalTasks = this.userDetails.tasks.length
      const incompleteTasks = this.userDetails.tasks.filter((task) => !task.is_completed).length
      return (incompleteTasks / totalTasks) * 100
    },
    getCompleteTaskPercentage() {
      const totalTasks = this.userDetails.tasks.length
      const completeTasks = this.userDetails.tasks.filter((task) => task.is_completed).length
      return (completeTasks / totalTasks) * 100
    },
    efficiency() {
      const incompletePercentage = this.getIncompleteTaskPercentage
      const completePercentage = this.getCompleteTaskPercentage
      return completePercentage > incompletePercentage ? 'Good' : 'Poor'
    },
    efficiencyClass() {
      return this.efficiency === 'Good' ? 'text-green-600' : 'text-red-600'
    }
  }
}
</script>

<style scoped>
/* Add your custom CSS styles here */
.pie-chart {
  border-radius: 50%;
  overflow: hidden;
}

.pie-chart > div {
  clip: rect(0, 0, auto, auto);
  border-radius: 50%;
}

.bg-brown-300 {
  --tw-bg-opacity: 1;
  background-color: rgba(146, 64, 14, var(--tw-bg-opacity));
}

.bg-green-300 {
  --tw-bg-opacity: 1;
  background-color: rgba(16, 185, 129, var(--tw-bg-opacity));
}
</style>
