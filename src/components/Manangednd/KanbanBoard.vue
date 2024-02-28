<template>
  <div class="grid grid-row h-[650px] w-2/5 my-10 fixed gap-2">
    <div
      @dragover.prevent
      @drop="onDrop('complete')"
      drop-zone="complete"
      class="drop-zone flex flex-col items-center border-dashed border-black border-2 bg-green-200"
    >
      <div class="font-semibold text-white text-lg bg-green-500 w-full text-center">
        Mark as Complete
      </div>
      <div v-for="task in droppedTasks" :key="task.title" class="dropped-task">
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
      </div>
    </div>
    <div
      @dragover.prevent
      @drop="onDrop('delete')"
      draggable="true"
      class="flex flex-col items-center border-dashed border-black border-2 bg-red-200"
    >
      <div class="font-semibold text-lg text-white bg-red-500 w-full text-center">Delete</div>
      <div
        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
        v-for="task in droppedTasks.filter((t) => t.dropZone === 'delete')"
        :key="task.data.task_id"
      >
        <single-task-card :task="task" />
      </div>
    </div>

    <div
      @dragover.prevent
      @drop="onDrop('progress')"
      draggable="true"
      class="flex flex-col items-center border-dashed border-black border-2 bg-blue-200"
    >
      <div class="font-semibold text-lg text-white bg-blue-500 w-full text-center">In-Progress</div>
      <div
        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
        v-for="task in droppedTasks.filter((t) => t.dropZone === 'progress')"
        :key="task.data.task_id"
      >
        <single-task-card :task="task" />
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import SingleTaskCard from '../dashboard/TaskList/SingleTaskCard.vue'
const droppedTasks = ref([])

const onDrop = (zone) => (event) => {
  event.preventDefault()
  const taskData = JSON.parse(localStorage.getItem('draggedTask'))
  console.log(taskData)
  if (taskData) {
    const zone = event.target.getAttribute('drop-zone')
    droppedTasks.value.push({ ...taskData, dropZone: zone })
    localStorage.removeItem('draggedTask')
  }
}
</script>
<style scoped>
.drop-zone {
  border: 2px dashed #aaa;
  padding: 20px;
  margin-bottom: 20px;
}
.dropped-task {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 10px;
}
</style>
