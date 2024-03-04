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
    <td class="border px-4 py-2 w-1/4 text-center text-slate-800 font-medium">
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
        class="bg-slate-900 text-white px-4 py-2 rounded hover:opacity-85 duration-200"
        @click="displayTaskCardVisible = true"
      >
        View Task
      </button>
    </td>
  </tr>
</template>

<script setup>
defineProps(['task'])
import { ref } from 'vue'
import DIsplaySingleTask from './DIsplaySingleTask.vue'
const displayTaskCardVisible = ref(false)

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
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
</style>
