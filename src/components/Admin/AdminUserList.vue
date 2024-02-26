<template>
  <div>
    <div class="w-4/5 md:w-4/5 lg:w-3/5 xl:w-5/5 mx-auto">
      <div v-if="!loading">
        <SearchFilter
          :usersData="users"
          @sort-by-name="sortByName"
          @sort-by-date="sortByDate"
          @search-users="updateUsers"
        />
        <div
          v-for="user in displayedUsers"
          :key="user.id"
          class="border rounded-lg p-4 mb-4 flex flex-col md:flex-row items-center justify-between font-bold text-gray-700 hover:shadow-md transition duration-300 ease-in-out"
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
              class="h-6 w-6 cursor-pointer"
              @click="viewProfile(user)"
            />
            <img
              src="@/assets/images/assign_task.png"
              alt="Assign Task"
              class="h-6 w-6 cursor-pointer"
              @click="assignTask(user.id)"
            />
            <img
              src="@/assets/images/delete.png"
              alt="Delete"
              class="h-6 w-6 cursor-pointer"
              @click="deleteUser(user.id)"
            />
            <img src="@/assets/images/admin.png" alt="Admin" class="h-6 w-6" />
            <img
              src="@/assets/images/view.png"
              alt="View Tasks"
              class="h-6 w-6 cursor-pointer"
              @click="viewTasks(user.id)"
            />
          </div>
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
  </div>
</template>

<script>
import axios from 'axios'
import SearchFilter from './SearchFilter.vue'
import UserProfile from './UserSpecific/UserProfile.vue'
export default {
  props: {
    users: Array
  },
  components: {
    SearchFilter,
    UserProfile
  },
  data() {
    return {
      displayedUsers: [],
      loading: true,
      isViewingProfile: false,
      selectedUser: null
    }
  },
  mounted() {},
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
        const response = await axios.delete(`/api/admin/users/${userId}`)
        alert(response.data.message)
        this.$emit('update-users')
      } catch (error) {
        console.error('Error deleting user:', error)
        alert('Failed to delete user. Please try again.')
      }
    },
    viewTasks(userId) {
      this.$router.push(`/admin/users/${userId}/tasks`)
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
</style>
