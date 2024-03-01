<template>
  <div>
    <div class="w-4/5 md:w-4/5 lg:w-3/5 xl:w-5/5 mx-auto">
      <div v-if="taskListVisible" class="overlay"></div>

      <div v-if="!loading">
        <SearchFilter
          :usersData="users"
          @sort-by-name="sortByName"
          @sort-by-date="sortByDate"
          @search-users="updateUsers"
        />
        <!-- <div
          v-if="isDeleting"
          class="absolute inset-0 bg-black opacity-50 flex items-center justify-center animate-pulse"
        >
          <div class="text-white">Deleting user...</div>
        </div> -->
        <div
          v-for="user in paginatedUsers"
          :key="user.id"
          :class="{ 'bg-gray-200  animate-pulse': isDeleting }"
          class="border border-black rounded-lg p-4 mb-4 flex flex-col md:flex-row items-center justify-between font-bold text-gray-800 transition duration-300 ease-in-out hover:border-purple-500 hover:bg-gray-100"
        >
          <div
            class="flex items-center space-x-4 mb-4 md:mb-0 w-full md:w-3/5 relative cursor-pointer"
            @click="viewProfile(user)"
            @mouseover="hoveredUser = user.id"
            @mouseout="hoveredUser = null"
          >
            <p class="text-lg w-1/2 text-center md:text-left">{{ user.name }}</p>
            <p class="text-sm text-gray-500 w-1/2 text-center md:text-left">
              {{ formatTime(user.created_at) }}
            </p>
            <div
              v-if="hoveredUser === user.id"
              class="absolute top-full left-0 bg-black opacity-80 border rounded-xl animate-pulsee border-white p-2 text-sm text-white z-10"
            >
              <p>Email: {{ user.email }}</p>
              <p>Last Updated: {{ formatDate(user.updated_at) }}</p>
            </div>
          </div>

          <div class="flex items-center justify-between w-full md:w-1/4">
            <img
              src="@/assets/images/view_user.png"
              alt="Profile"
              :title="'View Profile : ' + user.name"
              class="h-6 w-6 cursor-pointer transform transition duration-300 hover:scale-110 tooltip"
              @click="viewProfile(user)"
            />
            <img
              src="@/assets/images/assign_task.png"
              alt="Assign Task"
              :title="'Assign Task To ' + user.name"
              class="h-6 w-6 cursor-pointer transform transition duration-300 hover:scale-110"
              @click="assignTask(user.id)"
            />
            <img
              src="@/assets/images/delete.png"
              alt="Delete"
              :title="'Delete : ' + user.name"
              class="h-6 w-6 cursor-pointer transform transition duration-300 hover:scale-110"
              @click="deleteUser(user)"
            />
            <img
              src="@/assets/images/admin.png"
              alt="Admin"
              :title="'Make ' + user.name + ' Admin'"
              class="h-6 w-6 cursor-pointer transform transition duration-300 hover:scale-110"
              @click="makeAdmin(user)"
            />
            <img
              src="@/assets/images/view.png"
              alt="View Tasks"
              :title="'View All Tasks : ' + user.name"
              class="h-6 w-6 cursor-pointer transform transition duration-300 hover:scale-110"
              @click="openTaskList(user)"
            />
          </div>
        </div>
        <div class="flex justify-center" v-if="totalPages !== 1">
          <button
            v-if="displayedUsers.length !== 0"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
            class="px-4 py-2 bg-black text-white rounded-md hover:opacity-50 focus:outline-none"
            @click="prevPage"
            :disabled="currentPage === 1"
          >
            <img src="@/assets/images/db-arrow-rev.png" alt="Previous" width="16" height="20" />
          </button>
          <span class="mr-5"></span>
          <button
            v-if="displayedUsers.length !== 0"
            :class="{
              'opacity-50 cursor-not-allowed':
                currentPage === totalPages || displayedUsers.length === 0
            }"
            class="px-4 py-2 bg-black text-white rounded-md hover:opacity-50 focus:outline-none ml-2"
            @click="nextPage"
            :disabled="currentPage === totalPages || displayedUsers.length === 0"
          >
            <img src="@/assets/images/db-arrow-fwd.png" alt="Next" width="16" height="20" />
          </button>
          <!-- <span class="mb-10"></span> -->
        </div>
      </div>
      <!-- <div v-if="loading" class="text-center my-20 text-slate-900">
        <v-progress-circular
          :size="50"
          :width="5"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </div> -->
      <div v-if="loading">
        <!-- Search bar skeleton -->
        <div class="flex items-center justify-between mb-4">
          <div class="h-8 w-2/4 ml-4 bg-gray-100 rounded"></div>
          <div class="h-8 w-10 bg-gray-100 rounded"></div>
        </div>
        <!-- User list skeleton -->
        <div
          v-for="index in 3"
          :key="index"
          class="border border-black rounded-lg p-4 mb-4 flex flex-col md:flex-row items-center justify-between font-bold text-gray-800 animate-pulse"
        >
          <div class="flex items-center space-x-4 mb-4 md:mb-0 w-full md:w-3/5">
            <div class="h-6 w-1/2 bg-gray-300 rounded"></div>
            <div class="h-4 w-1/2 bg-gray-300 rounded"></div>
          </div>
          <div class="flex items-center justify-between w-full md:w-1/4">
            <div class="h-6 w-6 bg-gray-300 rounded"></div>
            <div class="h-6 w-6 bg-gray-300 rounded"></div>
            <div class="h-6 w-6 bg-gray-300 rounded"></div>
            <div class="h-6 w-6 bg-gray-300 rounded"></div>
            <div class="h-6 w-6 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>

      <div v-else-if="displayedUsers.length === 0" class="text-center py-4">
        <p class="text-gray-500">No users found.</p>
      </div>
    </div>
    <transition name="fade">
      <div v-if="isViewingProfile" class="user-profile-container">
        <user-profile
          :userDetails="selectedUser"
          @delete-user="deleteUser"
          @make-admin="makeAdmin"
          @close-user-profile="closeUserProfile"
        />
      </div>
    </transition>
    <transition name="fade">
      <div v-if="taskListVisible" class="user-task-list-container">
        <user-task-list
          :alltasks="selectedUserTasks"
          :user="currentUser"
          @close-task-list="closeTaskList"
          @task-closed="closeTaskList"
        />
      </div>
    </transition>
    <div v-if="isTaskFromVisisble !== null" class="user-task-assign-container">
      <task-form :userId="isTaskFromVisisble" @close="isTaskFromVisisble = null"></task-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SearchFilter from './SearchFilter.vue'
import UserProfile from './UserSpecific/UserProfile.vue'
import UserTaskList from './UserSpecific/UserTaskList.vue'
import TaskForm from '../../components/tasks/TaskForm.vue'
import { useToast } from 'vue-toast-notification'
const toast = useToast()
export default {
  props: {
    users: Array
  },
  components: {
    SearchFilter,
    UserProfile,
    UserTaskList,
    TaskForm
  },
  data() {
    return {
      displayedUsers: [],
      loading: true,
      isViewingProfile: false,
      selectedUser: null,
      currentUser: null,
      taskListVisible: false,
      currentPage: 1,
      usersPerPage: 3,
      isTaskFromVisisble: null,
      isDeleting: false,
      hoveredUser: null
    }
  },
  computed: {
    paginatedUsers() {
      const startIndex = (this.currentPage - 1) * this.usersPerPage
      const endIndex = startIndex + this.usersPerPage
      return this.displayedUsers.slice(startIndex, endIndex)
    },
    totalPages() {
      return Math.ceil(this.displayedUsers.length / this.usersPerPage)
    }
  },
  created() {
    // setTimeout(() => {
    //   this.displayedUsers = [...this.users]
    //   this.loading = false
    // }, 2000)
    this.fetchFirstData()
  },
  methods: {
    viewProfile(user) {
      console.log(user)
      this.selectedUser = user
      this.isViewingProfile = true
    },
    formatDate(date) {
      const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      }
      const formattedDate = new Date(date).toLocaleDateString('en-GB', options)
      return formattedDate
    },
    formatTime(time) {
      const currentTime = new Date()
      const timestamp = new Date(time)
      const diff = (currentTime - timestamp) / 1000 // Get the difference in seconds

      if (diff < 60) {
        return `${Math.floor(diff)} seconds ago`
      } else if (diff < 3600) {
        return `${Math.floor(diff / 60)} minutes ago`
      } else if (diff < 86400) {
        return `${Math.floor(diff / 3600)} hours ago`
      } else {
        return `${Math.floor(diff / 86400)} days ago`
      }
    },
    async assignTask(userId) {
      try {
        console.log(userId)
        this.isTaskFromVisisble = userId
        // const response = await axios.post(`/admin/assign-task/${userId}`)
        // alert(response.data.message)
      } catch (error) {
        console.error('Error assigning task:', error)
        alert('Failed to assign task. Please try again.')
      }
    },
    async deleteUser(user) {
      try {
        if (window.confirm(`Are you sure you want to delete ${user.name}"?`)) {
          this.isViewingProfile = false
          this.isDeleting = true
          await axios.delete(`/api/admin/users/${user.id}`)
          toast.info(`${user.name} is deleted successfully`)
          this.fetchData()
        }
      } catch (error) {
        console.error('Error deleting user:', error)
        alert('Failed to delete user. Please try again.')
      }
    },
    async fetchData() {
      try {
        const response = await axios.get('/api/admin/tasks')
        this.displayedUsers = response.data.users
        console.log(this.displayedUsers)
        this.isDeleting = false
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async fetchFirstData() {
      try {
        const response = await axios.get('/api/admin/tasks')
        this.displayedUsers = response.data.users
        console.log(this.displayedUsers)
        this.loading = false
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    async makeAdmin(user) {
      try {
        if (window.confirm(`Are you sure you want to make ${user.name} Admin"?`)) {
          this.isViewingProfile = false
          await axios.patch(`/api/admin/users/${user.id}`)
          toast.info(`${user.name} is now admin .`)
          this.fetchData()
        }
      } catch (error) {
        console.error('Error deleting user:', error)
        alert('Failed to delete user. Please try again.')
      }
    },
    openTaskList(user) {
      try {
        // Fetch tasks for the selected user
        this.selectedUserTasks = user.tasks
        this.currentUser = user.id
        console.log(this.selectedUserTasks)
        this.taskListVisible = true
        // this.isViewingProfile = true
      } catch (error) {
        console.error('Error fetching user tasks:', error)
        alert('Failed to fetch user tasks. Please try again.')
      }
    },
    closeTaskList() {
      this.taskListVisible = false
      this.selectedUserTasks = []
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    sortByName() {
      this.displayedUsers.sort((a, b) => a.name.localeCompare(b.name))
    },
    sortByDate() {
      this.displayedUsers.sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
    },
    updateUsers(filteredUsers) {
      this.displayedUsers = filteredUsers
    },
    closeUserProfile() {
      this.isViewingProfile = false
    },
    toggleUserDetail(userId) {
      this.expandedUserId = this.expandedUserId === userId ? null : userId
    }
  }
}
</script>

<style scoped>
.user-profile-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999; /* Ensure it appears above other content */
  width: 100%;
  height: 100%;
}
.user-task-list-container {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100%;
  /* height: 100%; */
  transform: translate(-50%, -50%);
  z-index: 9999; /* Ensure it appears above other content */
}

.user-task-assign-container {
  position: fixed;
  top: 0%;
  left: 50%;
  width: 100%;
  /* height: 100%; */
  transform: translate(-50%, -50%);
  z-index: 9999; /* Ensure it appears above other content */
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
.tooltip {
  position: relative;
}

.tooltip:hover::before {
  content: attr(title);
  position: absolute;
  bottom: calc(100% + 0.5rem);
  left: 50%;
  transform: translateX(-50%);
  background-color: black;
  color: white;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid black;
  white-space: nowrap;
  z-index: 9999;
  transition: opacity 0.3s ease;
  opacity: 0;
}

.tooltip:hover::before {
  opacity: 1;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.2;
  }
}
.animate-pulse {
  animation: pulse 1.5s infinite;
}
@keyframes pulsee {
  50% {
    opacity: 0.5;
  }
  0%,
  100% {
    opacity: 1;
  }
}
.animate-pulsee {
  animation: pulsee 2s infinite;
}

.fade-enter,
.fade-leave-to {
  transition: opacity 0.5s;
}
</style>
