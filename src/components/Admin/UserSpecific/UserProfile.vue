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
          <h2 class="text-3xl font-bold">{{ userDetails.name }}</h2>
          <p class="text-gray-800 text-lg font-bold">
            Created at: {{ formatDate(userDetails.created_at) }}
          </p>
          <p class="text-gray-800 text-lg font-bold">
            Updated at: {{ formatDate(userDetails.updated_at) }}
          </p>
        </div>
        <div class="flex items-center">
          <div class="pie-chart w-24 h-24 relative" v-if="userDetails.tasks.length > 0">
            <div
              class="absolute inset-0 bg-red-300 rounded-full transform rotate-180"
              :style="{ width: incompletePercentage + '%' }"
            ></div>
            <div
              class="absolute inset-0 bg-green-300 rounded-full transform rotate-180"
              :style="{ width: completePercentage + '%' }"
            ></div>
          </div>
          <div class="text-center ml-4" v-if="userDetails.tasks.length > 0">
            <div class="text-gray-800 text-lg font-bold mb-1">Task Status:</div>
            <div class="flex items-center">
              <div class="bg-red-500 w-4 h-4 mr-1"></div>
              <p class="text-red-600 font-bold mr-4">{{ crossedDeadlineCount }}</p>
              <div class="bg-green-500 w-4 h-4 mr-1"></div>
              <p class="text-green-600 font-bold">{{ completeTaskCount }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Stars Rating -->
      <div class="flex items-center mb-6" v-if="userDetails.tasks.length > 0">
        <div class="text-gray-800 text-lg font-bold mr-4">Rating:</div>
        <div class="flex items-center">
          <template v-for="star in 5">
            <v-icon v-if="star <= filledStars" :key="'star-filled-' + star"> mdi-star </v-icon>
            <v-icon v-else :key="'star-outline-' + star"> mdi-star-outline </v-icon>
          </template>
        </div>
      </div>

      <div class="text-center" v-if="userDetails.tasks.length == 0">
        <p class="text-gray-800 text-lg font-bold mb-10">No tasks added</p>
      </div>
      <!-- Options -->
      <div class="flex justify-between">
        <button
          @click="makeAdmin"
          class="flex items-center text-blue-500 bg-blue-100 px-4 py-2 rounded-md"
        >
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
            ></path>
          </svg>
          Make Admin
        </button>
        <button
          @click="deleteUser"
          class="flex items-center text-red-500 bg-red-100 px-4 py-2 rounded-md"
        >
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
            ></path>
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
  data() {
    return {
      stars: 0
    }
  },
  computed: {
    incompleteTaskCount() {
      return this.userDetails.tasks.filter((task) => !task.is_completed).length
    },
    completeTaskCount() {
      return this.userDetails.tasks.filter((task) => task.is_completed).length
    },
    crossedDeadlineCount() {
      const now = new Date()
      return this.userDetails.tasks.filter(
        (task) => !task.is_completed && new Date(task.deadline) < now
      ).length
    },
    incompletePercentage() {
      const totalTasks = this.userDetails.tasks.length
      const incompleteTasks = this.incompleteTaskCount
      return (incompleteTasks / totalTasks) * 100
    },
    completePercentage() {
      const totalTasks = this.userDetails.tasks.length
      const completeTasks = this.completeTaskCount
      return (completeTasks / totalTasks) * 100
    },
    filledStars() {
      const completedTaskCount = this.completeTaskCount
      const crossedDeadlineTaskCount = this.crossedDeadlineCount
      const totalTasks = completedTaskCount + crossedDeadlineTaskCount
      const completionRate = totalTasks > 0 ? (completedTaskCount / totalTasks) * 100 : 0

      let rating = 0
      if (completionRate <= 20) {
        rating = 1
      } else if (completionRate <= 40) {
        rating = 2
      } else if (completionRate <= 65) {
        rating = 3
      } else if (completionRate <= 80) {
        rating = 4
      } else {
        rating = 5
      }

      return rating
    }
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
      this.$emit('delete-user', this.userDetails)
    },
    makeAdmin() {
      this.$emit('make-admin', this.userDetails)
    },
    closeUserProfile() {
      this.$emit('close-user-profile')
    },
    setRating(star) {
      this.stars = star
    }
  }
}
</script>

<style scoped>
.pie-chart {
  border-radius: 50%;
  overflow: hidden;
}

.pie-chart > div {
  clip: rect(0, 0, auto, auto);
  border-radius: 50%;
}
</style>
