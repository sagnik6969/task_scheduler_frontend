<template>
  <div class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-80 z-10">
    <div class="absolute p-3 w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <button
        type="button"
        @click="$emit('close')"
        class="absolute p-2 top-0 right-1 rounded-full text-slate-600 hover:bg-slate-200 duration-300"
      >
        <v-icon icon="mdi-close"></v-icon>
      </button>
      <div class="px-6 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-xl font-semibold">{{ task.title }}</h1>
          <p class="text-md font-medium text-gray-500">
            {{ task.created_at }}
          </p>
        </div>
        <div class="mt-2 text-black text-xl font-medium font-serif">
          {{ task.description }}
        </div>
        <div class="mt-4">
          <div class="flex items-center space-x-2 text-gray-700">
            <svg
              class="h-6 w-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
            <span class="text-lg font-medium cursor-default">
              Assigned to: {{ task.user.name }}
            </span>
          </div>
          <div class="flex items-center mt-2 space-x-2 text-gray-700">
            <svg
              class="h-6 w-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            <span class="text-lg font-medium cursor-default"> Priority: {{ task.priority }} </span>
          </div>
          <div class="flex items-center mt-2 space-x-2 text-gray-700">
            <svg
              class="h-6 w-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 14l9-5-9-5-9 5 9 5z"
              ></path>
            </svg>
            <span class="text-lg font-medium cursor-default">
              Deadline: {{ formatDate(task.deadline) }}
            </span>
          </div>
          <div class="flex items-center mt-2 space-x-2 text-gray-700">
            <svg
              class="h-6 w-6 text-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M22 11.08V12a10 10 0 11-5.93-9.14"
              ></path>
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M22 4L12 14.01l-3-3"
              ></path>
            </svg>
            <span class="text-lg font-medium cursor-default"> Status: {{ task.status }} </span>
          </div>
        </div>
        <div class="mt-4 w-full flex items-center">
          <span class="text-lg font-medium cursor-default">
            Progress: {{ task.progress ?? 0 }}%
          </span>
          <div class="ml-2 flex-1 bg-gray-300 h-2 rounded-lg overflow-hidden">
            <div class="h-full bg-black" :style="{ width: `${task.progress}%` }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

defineEmits(['close'])
const props = defineProps(['task'])

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
const width = computed(() => `${props.task.progress}%`)

// console.log(props.task)
</script>
<style scoped>
.progress-bar {
  width: v-bind('width');
}
</style>
