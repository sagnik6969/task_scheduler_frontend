<template>
  <div>
    <div
      v-for="user in users"
      :key="user.id"
      class="border p-4 mb-4 flex space-x-10 font-bold text-slate-500"
    >
      <p
        class="text-slate-800 px-6 py-4 flex justify-between items-center flex-col lg:flex-row text-center lg:text-left space-y-3 lg:space-y-0 space-x-2"
      >
        {{ user.name }}
      </p>
      <p
        class="text-slate-800 px-6 py-4 flex justify-between items-center flex-col lg:flex-row text-center lg:text-left space-y-3 lg:space-y-0 space-x-2"
      >
        {{ user.created_at }}
      </p>
      <div
        class="text-slate-900 px-6 py-4 flex justify-between items-center flex-col lg:flex-row text-center lg:text-left space-y-3 lg:space-y-0 space-x-5"
      >
        <img
          src="../../assets/images/view_user.png"
          alt="Profile"
          class="h-6 w-6 cursor-pointer"
          @click="viewProfile(user.id)"
        />
        <img
          src="../../assets/images/assign_task.png"
          alt="Assign Task"
          class="h-6 w-6 cursor-pointer"
          @click="assignTask(user.id)"
        />
        <img
          src="../../assets/images/delete.png"
          alt="Delete"
          class="h-6 w-6 cursor-pointer"
          @click="deleteUser(user.id)"
        />
        <img src="../../assets/images/admin.png" alt="Admin" class="h-6 w-6" />
        <img
          src="../../assets/images/view.png"
          alt="View Tasks"
          class="h-6 w-6 cursor-pointer"
          @click="viewTasks(user.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    users: Array
  },
  methods: {
    viewProfile(userId) {
      this.$router.push(`/admin/users/${userId}`)
    },
    async assignTask(userId) {
      try {
        // Implement logic to assign task to user
        const response = await axios.post(`/admin/assign-task/${userId}`)
        alert(response.data.message)
      } catch (error) {
        console.error('Error assigning task:', error)
        alert('Failed to assign task. Please try again.')
      }
    },
    async deleteUser(userId) {
      try {
        const response = await axios.delete(`/admin/users/${userId}`)
        alert(response.data.message)
        // Refresh user list after deletion
        this.$emit('update-users')
      } catch (error) {
        console.error('Error deleting user:', error)
        alert('Failed to delete user. Please try again.')
      }
    },
    viewTasks(userId) {
      // Redirect to user tasks page
      this.$router.push(`/admin/users/${userId}/tasks`)
    }
  }
}
</script>
