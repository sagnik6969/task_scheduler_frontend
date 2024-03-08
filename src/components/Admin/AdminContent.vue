<template>
  <div>
    <div v-if="selectedOption === 'users'">
      <AdminUserList :users="users" @update-users="handleUserDeleted" />
    </div>
    <div v-else-if="selectedOption === 'analytics'">
      <!-- <AdminAnalytics :users="users" /> -->
      <analytics :users="users"></analytics>
    </div>
    <div v-else-if="selectedOption === 'assigned_tasks'">
      <AdminAssignedTaskUser />
    </div>
  </div>
</template>

<script>
import AdminUserList from './users/AdminUserList.vue'
import AdminAssignedTaskUser from './assigned_tasks/AdminAssignedTaskUser.vue'
import Analytics from './Analytics/Analytics.vue'

export default {
  props: {
    selectedOption: String,
    users: Array,
    tasks: Array
  },
  components: {
    AdminUserList,
    AdminAssignedTaskUser,
    Analytics
  },
  methods: {
    handleUserDeleted() {
      this.$emit('user-deleted')
    }
  }
}
</script>
