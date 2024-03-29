<template>
  <div class="flex flex-col md:w-full md:mx-10 mx-4">
    <div class="flex flex-row md:flex-col md:w-1/2 gap-10 md:fixed">
      <div
        @dragover.prevent="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop"
        :class="{ 'border-solid bg-green-300 border-4 border-green-500': isDraggingOverComplete }"
        class="flex flex-col flex-1 md:w-2/3 w-1/2 h-full items-center border-dashed border-black border-2 bg-green-200"
      >
        <div class="font-semibold text-white text-lg bg-green-400 w-full text-center">
          Mark as Complete
        </div>

        <div>
          <img
            src="/img/complete.png"
            class="m-4 opacity-20 text-center w-60 items-center"
            :class="{ 'opacity-100': isDraggingOverComplete }"
            alt="Completed"
          />
          <div v-if="showCompleteMessage" class="bg-white text-center rounded shadow">
            Task marked as completed!
          </div>
        </div>
      </div>

      <div
        @dragover.prevent="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDelete"
        :class="{ 'border-solid border-4 bg-red-300 border-red-500': isDraggingOverDelete }"
        class="flex flex-col flex-1 md:w-2/3 items-center w-1/2 h-full border-dashed border-black border-2 bg-red-200"
      >
        <div class="font-semibold text-lg text-white bg-red-500 w-full text-center">Delete</div>
        <div>
          <img src="/img/delete.png" class="object-cover w-60 m-4 opacity-15" alt="deleted" />
          <div v-if="showDeleteMessage" class="bg-white text-center rounded shadow">
            Task marked as deleted!
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SingleTaskCard from '@/components/dashboard/TaskList/SingleTaskCard.vue'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import ProgressBar from '@/components/ui/ProgressBar.vue'
import { useStore } from 'vuex'
const isDraggingOverComplete = ref(false)
const isDraggingOverDelete = ref(false)
const completedTasks = ref([])
const deletedTasks = ref([])
const showCompleteMessage = ref(false)
const showDeleteMessage = ref(false)
const store = useStore()
const onDrop = async (event) => {
  event.preventDefault()
  isDraggingOverComplete.value = false
  isDraggingOverDelete.value = false
  const taskData = JSON.parse(event.dataTransfer.getData('text/plain'))
  if (!completedTasks.value.some((task) => task.data.task_id === taskData.data.task_id)) {
    completedTasks.value.push(taskData)
    // console.log('reached 67')
    await store.dispatch('updateUserTask', {
      task_id: taskData.data.task_id,
      title: taskData.data.attributes.title,
      description: taskData.data.attributes.description,
      deadline: taskData.data.attributes.deadline,
      is_completed: true,
      progress: taskData.data.attributes.progress,
      priority: taskData.data.attributes.priority
    })
  }
  // console.log('reached 77')
  showCompleteMessage.value = true
  setTimeout(() => {
    showCompleteMessage.value = false
  }, 3000)
}
const onDragOver = (event) => {
  event.preventDefault()
  if (event.currentTarget.classList.contains('bg-green-200')) {
    isDraggingOverComplete.value = true
  } else if (event.currentTarget.classList.contains('bg-red-200')) {
    isDraggingOverDelete.value = true
  }
}
const onDragLeave = (event) => {
  isDraggingOverComplete.value = false
  isDraggingOverDelete.value = false
}
const onDelete = async (event) => {
  event.preventDefault()
  isDraggingOverComplete.value = false
  isDraggingOverDelete.value = false
  const taskData = JSON.parse(event.dataTransfer.getData('text/plain'))
  if (!deletedTasks.value.some((task) => task.data.task_id === taskData.data.task_id)) {
    deletedTasks.value.push(taskData)
    await store.dispatch('deleteTask', taskData.data.task_id)
  }
  showDeleteMessage.value = true
  setTimeout(() => {
    showDeleteMessage.value = false
  }, 3000)
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
