<template>
  <tr>
    <Teleport to="body">
      <DIsplaySingleTask
        :task="task"
        @close="displayTaskCardVisible = false"
        v-if="displayTaskCardVisible"
      ></DIsplaySingleTask>
    </Teleport>
    <td class="border px-4 py-2 w-1/5 text-lg font-medium text-slate-800">
      {{ task.title }}
    </td>
    <td class="border px-4 py-2 w-1/5 text-slate-500 font-semibold text-sm text-center">
      {{ formatDate(task.deadline) }}
    </td>
    <td class="border px-4 py-2 w-1/5 text-center text-slate-800 font-medium">
      {{ task.user.name }}
    </td>
    <td class="border px-4 py-2 w-1/5 text-center font-medium text-green-500">
      <span
        :class="{
          'text-red-600': task.status == 'Pending',
          'text-green-500': task.status == 'Accepted'
        }"
        >{{ task.status }}</span
      >
    </td>
    <!-- <td class="border px-4 py-2 text-slate-500 font-semibold text-sm w-1/5 text-center">
      {{ task.created_at }}
    </td> -->
    <td class="border px-4 py-2 font-medium text-sm w-1/5 text-center">
      <button
        class="bg-slate-900 text-white px-4 py-2 rounded hover:opacity-85 duration-200"
        @click="displayTaskCardVisible = true"
      >
        View Task
      </button>
    </td>
    <!-- <td class="border px-4 py-2">{{ task.description }}</td> -->
    <!-- <td class="border px-4 py-2">{{ task.task.progress }}%</td>
            <td class="border px-4 py-2">{{ formatDate(task.task.deadline) }}</td>
            <td class="border px-4 py-2">
              {{ task.task.is_completed ? 'Completed' : 'Not Completed' }}
            </td> -->
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
</script>
