<template>
  <div>
    <div v-if="selectedOption === 'users'">
      <AdminUserList :users="users" @update-users="handleUserDeleted" />
    </div>
    <div v-else-if="selectedOption === 'analytics'">
      <!-- <AdminAnalytics :users="users" /> -->
    </div>
    <div v-else-if="selectedOption === 'assigned_tasks'">
      <!-- <AdminAssignedTaskUser :users="users" /> -->
    </div>
  </div>
</template>

<script>
import AdminUserList from './AdminUserList.vue'

export default {
  props: {
    selectedOption: String,
    users: Array
  },
  components: {
    AdminUserList
  },
  methods: {
    handleUserDeleted() {
      this.$emit('user-deleted')
    }
  }
}
</script>
