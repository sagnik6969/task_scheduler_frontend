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
        <div
          v-for="user in paginatedUsers"
          :key="user.id"
          class="border border-black rounded-lg p-4 mb-4 flex flex-col md:flex-row items-center justify-between font-bold text-gray-800 transition duration-300 ease-in-out hover:border-purple-500 hover:bg-gray-100"
        >
          <div class="flex items-center space-x-4 mb-4 md:mb-0 w-full md:w-3/5">
            <p class="text-lg w-1/2 text-center md:text-left">{{ user.name }}</p>
            <p class="text-sm text-gray-500 w-1/2 text-center md:text-left">
              {{ formatTime(user.created_at) }}
            </p>
          </div>
          <div class="flex items-center justify-between w-full md:w-1/4">
            <img
              src="@/assets/images/view_user.png"
              alt="Profile"
              class="h-6 w-6 cursor-pointer transform transition duration-300 hover:scale-110"
              @click="viewProfile(user)"
            />
            <img
              src="@/assets/images/assign_task.png"
              alt="Assign Task"
              class="h-6 w-6 cursor-pointer transform transition duration-300 hover:scale-110"
              @click="assignTask(user.id)"
            />
            <img
              src="@/assets/images/delete.png"
              alt="Delete"
              class="h-6 w-6 cursor-pointer transform transition duration-300 hover:scale-110"
              @click="deleteUser(user.id)"
            />
            <img
              src="@/assets/images/admin.png"
              alt="Admin"
              class="h-6 w-6 cursor-pointer transform transition duration-300 hover:scale-110"
              @click="makeAdmin(user.id)"
            />
            <img
              src="@/assets/images/view.png"
              alt="View Tasks"
              class="h-6 w-6 cursor-pointer transform transition duration-300 hover:scale-110"
              @click="openTaskList(user)"
            />
          </div>
        </div>
        <div class="flex justify-center mt-8">
          <button
            v-if="currentPage !== 1"
            class="px-4 py-2 bg-black text-white rounded-md hover:opacity-50 focus:outline-none focus:bg-purple-700"
            @click="prevPage"
          >
            Previous
          </button>
          <button
            v-if="currentPage !== totalPages"
            class="px-4 py-2 bg-black text-white rounded-md hover:opacity-50 focus:outline-none focus:bg-purple-700 ml-2"
            @click="nextPage"
          >
            Next
          </button>
        </div>
      </div>
      <div v-if="loading" class="text-center my-20 text-slate-900">
        <v-progress-circular
          :size="50"
          :width="5"
          color="purple"
          indeterminate
        ></v-progress-circular>
      </div>
      <div v-else-if="displayedUsers.length === 0" class="text-center py-4">
        <p class="text-gray-500">No users found.</p>
      </div>
    </div>
    <div v-if="isViewingProfile" class="user-profile-container">
      <user-profile
        :userDetails="selectedUser"
        @delete-user="deleteUser"
        @make-admin="makeAdmin"
        @close-user-profile="closeUserProfile"
      />
    </div>
    <div v-if="taskListVisible" class="user-task-list-container">
      <user-task-list
        :tasks="selectedUserTasks"
        @close-task-list="closeTaskList"
        @task-closed="closeTaskList"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SearchFilter from './SearchFilter.vue'
import UserProfile from './UserSpecific/UserProfile.vue'
import UserTaskList from './UserSpecific/UserTaskList.vue'
export default {
  props: {
    users: Array
  },
  components: {
    SearchFilter,
    UserProfile,
    UserTaskList
  },
  data() {
    return {
      displayedUsers: [],
      loading: true,
      isViewingProfile: false,
      selectedUser: null,
      taskListVisible: false,
      currentPage: 1,
      usersPerPage: 3
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
    setTimeout(() => {
      this.displayedUsers = [...this.users]
      this.loading = false
    }, 2000)
  },
  methods: {
    viewProfile(user) {
      console.log(user)
      this.selectedUser = user
      this.isViewingProfile = true
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
        const response = await axios.post(`/admin/assign-task/${userId}`)
        alert(response.data.message)
      } catch (error) {
        console.error('Error assigning task:', error)
        alert('Failed to assign task. Please try again.')
      }
    },
    async deleteUser(userId) {
      try {
        this.isViewingProfile = false
        const response = await axios.delete(`/api/admin/users/${userId}`)
        alert(response.data.message)
        this.$emit('update-users')
      } catch (error) {
        console.error('Error deleting user:', error)
        alert('Failed to delete user. Please try again.')
      }
    },
    async makeAdmin(userId) {
      try {
        const response = await axios.patch(`/api/admin/users/${userId}`)
        alert(response.data.message)
        this.$emit('update-users')
      } catch (error) {
        console.error('Error deleting user:', error)
        alert('Failed to delete user. Please try again.')
      }
    },
    openTaskList(user) {
      try {
        // Fetch tasks for the selected user
        this.selectedUserTasks = user.tasks
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

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 999;
}
</style>
