<template>
  <div class="flex md:space-x-4 md:flex-row flex-col justify-center">
    <button
      class="m-3 font-medium border-2 border-slate-900 rounded-2xl px-6 py-2 flex-1 hover:bg-slate-900 hover:text-slate-100 duration-300 flex items-center justify-center space-x-1"
      @click="$router.push('/admin')"
      v-if="isAdmin"
    >
      <span> Admin Dashboard </span>
      <v-icon icon="mdi-arrow-right-thin"></v-icon>
    </button>
    <button
      class="m-3 rounded-2xl px-6 py-2 border-2 border-slate-900 font-medium bg-slate-900 text-slate-100 flex-1 hover:opacity-90 duration-300 flex items-center justify-center space-x-1"
      @click="isTaskFormVisible = true"
    >
      Add Task
      <v-icon icon="mdi-plus"></v-icon>
    </button>
    <Teleport to="body">
      <task-form v-if="isTaskFormVisible" @close="isTaskFormVisible = false"></task-form>
    </Teleport>
  </div>
</template>
<script setup>
import TaskForm from '@/components/tasks/TaskForm.vue'
import { ref } from 'vue'
const isTaskFormVisible = ref(false)

defineProps({
  isAdmin: Boolean
})
</script>
