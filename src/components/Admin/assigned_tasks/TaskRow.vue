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

    <td
      class="border px-4 py-2 w-full md:w-1/4 lg:w-1/4 xl:w-1/4 text-lg font-medium text-slate-800 relative cursor-pointer"
    >
      <div
        class="truncate"
        style="max-width: 10rem"
        @mouseover="hoveredTitle = task.user"
        @mouseout="hoveredTitle = null"
      >
        {{ truncateTitle(task.title) }}
      </div>
      <div
        v-if="hoveredTitle !== null"
        class="absolute top-full left-0 min-w-max text-left bg-black opacity-80 border rounded-xl animate-pulse border-white p-2 text-sm text-white z-10"
      >
        <p>Title: {{ task.title }}</p>
      </div>
    </td>
    <td
      class="border px-4 py-2 w-full md:w-1/4 lg:w-1/4 xl:w-1/4 text-slate-500 font-semibold text-sm text-center"
    >
      {{ formatDate(task.deadline) }}
    </td>
    <td
      class="border px-4 py-2 w-full md:w-1/4 lg:w-1/4 xl:w-1/4 text-center relative text-slate-800 font-medium cursor-pointer"
      @click="viewProfile(task.user)"
      @mouseover="hoveredUser = task.user"
      @mouseout="hoveredUser = null"
    >
      {{ task.user.name }}
      <div
        v-if="hoveredUser !== null"
        class="absolute top-full left-0 min-w-max text-left bg-black opacity-80 border rounded-xl animate-pulse border-white p-2 text-sm text-white z-10"
      >
        <p>Email: {{ task.user.email }}</p>
        <p>Last Updated: {{ format2Date(task.user.updated_at) }}</p>
      </div>
    </td>

    <td class="border px-4 py-2 w-full md:w-1/4 lg:w-1/4 xl:w-1/4 text-center font-medium">
      <span
        :class="{
          'text-yellow-700': task.status === 'Pending',
          'text-green-500': task.status === 'Accepted',
          'text-red-600': task.status === 'Decline'
        }"
        class="text-green-500"
        >{{ task.status }}</span
      >
    </td>
    <td
      class="border px-4 py-2 font-medium text-sm w-full md:w-1/5 lg:w-1/5 xl:w-1/5 text-center relative"
    >
      <button
        :disabled="task.status === 'Decline' || task.status === 'Pending'"
        :class="
          task.status === 'Decline' || task.status === 'Pending'
            ? 'bg-slate-300 text-white w-full md:w-28 lg:w-28 xl:w-28 py-3 rounded cursor-not-allowed text-xm'
            : 'bg-slate-900 text-white w-full md:w-28 lg:w-28 xl:w-28 py-3 rounded hover:opacity-85 duration-200 cursor-pointer text-xm'
        "
        @click="displayTaskCardVisible = true"
        @mouseover="hoveredButton = task.user"
        @mouseout="hoveredButton = null"
      >
        View Task
      </button>
      <div
        v-if="hoveredButton !== null"
        class="absolute top-full left-0 min-w-max text-left bg-black opacity-80 border rounded-xl animate-pulse border-white p-2 text-sm text-white z-10"
      >
        <p>
          {{
            task.status === 'Pending'
              ? 'Waiting For Acceptance'
              : task.status === 'Decline'
                ? `${task.user.name} declined assigned task`
                : `${task.user.name} accepted assigned task`
          }}
        </p>
      </div>
    </td>
  </tr>
</template>

<script setup>
defineProps(['task'])
import { ref } from 'vue'
import DIsplaySingleTask from './DIsplaySingleTask.vue'

const displayTaskCardVisible = ref(false)
const selectedUser = ref(null)
const hoveredUser = ref(null)
const hoveredTitle = ref(null)
const hoveredButton = ref(null)
function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
function format2Date(date) {
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
  z-index: 9999;
  width: 100%;
  height: 100%;
}
</style>
