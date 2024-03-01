<template>
  <div
    class="fixed top-0 left-0 right-0 h-screen flex items-center justify-center bg bg-slate-500 bg-opacity-80 z-10"
  >
    <div class="py-7 px-10 flex flex-col max-w-2xl w-10/12 shadow-2xl rounded-lg bg-white relative">
      <button
        type="button"
        @click="$emit('close')"
        class="absolute top-2 right-2 p-1 rounded-full text-slate-600 hover:bg-slate-300 duration-300"
      >
        <v-icon icon="mdi-close"></v-icon>
      </button>
      <div class="flex justify-between items-center">
        <h1 class="text-xl font-medium">{{ task.title }}</h1>
        <p class="text-sm font-medium text-slate-500">{{ task.created_at }}</p>
      </div>
      <div class="mt-4 space-y-1">
        <div class="space-x-1 text-slate-700 flex items-center">
          <v-icon class="text-blue-700" icon="mdi-account"></v-icon>
          <span>Assigned to: {{ task.user.name }}</span>
        </div>
        <div class="space-x-1 text-slate-700 flex items-center">
          <v-icon class="text-blue-700" icon="mdi-priority-high"></v-icon>
          <span>Priority: {{ task.priority }}</span>
        </div>
        <div class="space-x-1 text-slate-700 flex items-center">
          <v-icon class="text-blue-700" icon="mdi-calendar-month-outline"></v-icon>
          <span>Deadline: {{ formatDate(task.deadline) }}</span>
        </div>
        <div class="space-x-1 text-slate-700 flex items-center">
          <v-icon class="text-blue-700" icon="mdi-check-circle-outline"></v-icon>
          <span>Status: {{ task.status }}</span>
        </div>
      </div>

      <div
        class="flex space-x-2 items-center mt-4 text-slate-700"
        :class="{
          'opacity-50': task.status == 'Pending'
        }"
      >
        <span>Progress: {{ task.progress ?? 0 }}%</span>
        <div class="bg-blue-300 h-2 rounded-3xl flex-1">
          <div
            :class="`w-[${task.progress ? task.progress : 0}%] bg-blue-700 h-full rounded-3xl`"
          ></div>
        </div>
      </div>
      <div class="mt-2">
        {{ task.description }}
      </div>
    </div>
  </div>
</template>
<script setup>
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

console.log(props.task)
</script>
