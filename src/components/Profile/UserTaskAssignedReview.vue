<template>
  <div class="task-review-container">
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
    </div>
    <div v-else class="task-details-container">
      <button class="close-button" @click="closeTaskReview">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="close-icon"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div class="priority-indicator">
        <div class="priority-circle"></div>
        <p class="priority-text">{{ taskData.priority }}</p>
      </div>
      <h1 class="task-title">{{ taskData.title }}</h1>
      <p class="task-description">{{ taskData.description }}</p>
      <div class="task-deadline">Deadline: {{ formatDate(taskData.deadline) }}</div>
      <div class="action-buttons">
        <button class="decline-button" @click="declineTask">Decline Task</button>
        <button class="accept-button" @click="acceptTask">Accept Task</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
const toast = useToast()
export default {
  data() {
    return {
      taskData: null,
      loading: true
    }
  },
  created() {
    this.fetchTaskData()
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`
    },
    async fetchTaskData() {
      await axios
        .get('/api/tasks/assign/' + this.$route.params.taskId + this.$route.params.token) // Assuming you have an endpoint to fetch task data
        .then((response) => {
          this.taskData = response.data
        })
        .catch((error) => {
          console.error('Error fetching task data:', error)
          toast.info('ku pagal panti krte ho')
        })
        .finally(() => {
          this.loading = false
        })
    },
    closeModal() {
      this.$router.push('/')
    },
    async declineTask() {
      await axios
        .patch(`/api/tasks/assign/${this.$route.params.taskId}`, { status: 'decline' })
        .then((response) => {
          console.log('Task status updated successfully:', response.data)
          toast.info('bhai admin ko pta chl gya h')
        })
        .catch((error) => {
          console.error('Error updating task status:', error)
          toast.info('erro h bete!!!')
        })
      console.log('Task Declined')
      this.$router.push('/')
    },
    async acceptTask() {
      await axios
        .patch(`/api/tasks/assign/${this.$route.params.taskId}`, { status: 'accpet' })
        .then((response) => {
          console.log('Task status updated successfully:', response.data)
          toast.info('bhai admin ko pta chl gya h')
        })
        .catch((error) => {
          console.error('Error updating task status:', error)
          toast.info('erro h bete!!! console dekh ')
        })
      console.log('Task accepted')
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.task-review-container {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
}

.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.loading-spinner {
  border: 5px solid #ccc;
  border-top: 5px solid #007bff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.task-details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 20px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
}

.close-icon {
  fill: #000;
  width: 20px;
  height: 20px;
}

.priority-indicator {
  display: flex;
  align-items: center;
}

.priority-circle {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #ff0000;
  margin-right: 5px;
}

.priority-text {
  font-size: 18px;
  font-weight: bold;
}

.task-title {
  font-size: 24px;
  margin-top: 10px;
}

.task-description {
  font-size: 16px;
  margin-top: 10px;
}

.task-deadline {
  font-size: 16px;
  margin-top: 10px;
}

.action-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.decline-button,
.accept-button {
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 18px;
  cursor: pointer;
}

.decline-button:hover,
.accept-button:hover {
  background-color: #0056b3;
}
</style>
