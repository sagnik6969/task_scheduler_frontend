<template>
  <div class="flex flex-col h-full w-2/5 fixed p-10 mx-10 gap-10">
    <div
      @dragover.prevent
      @drop="onDrop"
      class="flex flex-col h-1/2 items-center border-dashed border-black border-2 bg-green-200"
    >
      <div class="font-semibold text-white text-lg bg-green-500 w-full text-center">
        Mark as Complete
      </div>

      <template v-if="completedTasks.length > 0">
        <img src="/img/completed.png" class="text-center w-96 items-center" alt="Completed" />
      </template>
    </div>

    <div
      @dragover.prevent
      @drop="onDelete"
      class="flex flex-col items-center h-1/2 border-dashed border-black border-2 bg-red-200"
    >
      <div class="font-semibold text-lg text-white bg-red-500 w-full text-center">Delete</div>
      <template v-if="deletedTasks.length > 0">
        <img src="/img/deleted.png" class="object-cover w-80" alt="deleted" />
      </template>
    </div>
  </div>
</template>

<script setup>
import SingleTaskCard from '@/components/dashboard/TaskList/SingleTaskCard.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import { useStore } from 'vuex'

const completedTasks = ref([])
const deletedTasks = ref([])
const store = useStore()
const onDrop = async (event) => {
  event.preventDefault()
  const taskData = JSON.parse(event.dataTransfer.getData('text/plain'))
  if (!completedTasks.value.some((task) => task.data.task_id === taskData.data.task_id)) {
    completedTasks.value.push(taskData)
    await store.dispatch('updateTask', {
      task_id: taskData.data.task_id,
      title: taskData.data.attributes.title,
      description: taskData.data.attributes.description,
      deadline: taskData.data.attributes.deadline,
      is_completed: true,
      progress: taskData.data.attributes.progress,
      priority: taskData.data.attributes.priority
    })
  }
}
const onDelete = async (event) => {
  event.preventDefault()
  const taskData = JSON.parse(event.dataTransfer.getData('text/plain'))
  if (!deletedTasks.value.some((task) => task.data.task_id === taskData.data.task_id)) {
    deletedTasks.value.push(taskData)
    await store.dispatch('deleteTask', taskData.data.task_id)
  }
}
</script>

<style>
.dragArea {
  width: 100%;
}
.progress-bar {
  width: v-bind('width');
}
</style>
