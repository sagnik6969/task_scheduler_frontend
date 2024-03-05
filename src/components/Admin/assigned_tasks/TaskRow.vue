<template>
  <tr class="hover:bg-gray-100 transition-colors duration-200">
    <!-- Task Details -->
    <Teleport to="body">
      <DIsplaySingleTask
        :task="task"
        @close="displayTaskCardVisible = false"
        v-if="displayTaskCardVisible"
      ></DIsplaySingleTask>
    </Teleport>
    <td class="border px-4 py-2 w-1/4 text-lg font-medium text-slate-800">
      <div class="truncate" style="max-width: 10rem">{{ truncateTitle(task.title) }}</div>
    </td>
    <td class="border px-4 py-2 w-1/4 text-slate-500 font-semibold text-sm text-center">
      {{ formatDate(task.deadline) }}
    </td>
    <td
      class="border px-4 py-2 w-1/4 text-center text-slate-800 font-medium"
      @click="viewProfile(task.user)"
    >
      {{ task.user.name }}
    </td>
    <td class="border px-4 py-2 w-1/4 text-center font-medium">
      <span
        :class="{
          'text-red-600': task.status === 'Pending',
          'text-green-500': task.status === 'Accepted'
        }"
        class="text-green-500"
        >{{ task.status }}</span
      >
    </td>
    <td class="border px-4 py-2 font-medium text-sm w-1/5 text-center">
      <button
        :disabled="task.status === 'Decline' || task.status === 'Pending'"
        :class="
          task.status === 'Decline' || task.status === 'Pending'
            ? 'bg-slate-300 text-white  w-28 py-3 rounded cursor-not-allowed text-xm'
            : 'bg-slate-900 text-white w-28 py-3 rounded hover:opacity-85 duration-200 cursor-pointer text-xm'
        "
        @click="displayTaskCardVisible = true"
      >
        View Task
      </button>
    </td>
    <div v-if="selectedUser" class="user-profile-container">
      <user-profile :userDetails="selectedUser" />
      <!-- @delete-user=""
        @make-admin=""
        @close-user-profile="" -->
    </div>
  </tr>
</template>

<script setup>
defineProps(['task'])
import { ref } from 'vue'
import DIsplaySingleTask from './DIsplaySingleTask.vue'
import UserProfile from '../UserSpecific/UserProfile.vue'

const displayTaskCardVisible = ref(false)
const selectedUser = ref(null)
const isViewingProfile = ref(false)
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
function viewProfile(user) {
  selectedUser.value = user
  console.log(selectedUser.value)
}
function truncateTitle(title) {
  const maxLength = 30
  return title.length > maxLength ? title.substring(0, maxLength) + '...' : title
}
</script>

<style scoped>
/* Pagination Buttons */
.pagination-button {
  cursor: pointer;
  transition: all 0.3s ease;
}

.pagination-button:hover {
  background-color: #4a5568;
}
.user-profile-container {
  position: fixed;
  top: 0%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999; /* Ensure it appears above other content */
  width: 100%;
  height: 100%;
}
</style>
