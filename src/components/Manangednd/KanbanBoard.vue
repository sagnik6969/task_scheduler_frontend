<template>
  <div class="grid grid-cols-3 gap-2">
    <div
      class="flex flex-col items-center border-dashed border-black border-2 bg-green-200"
      @drop="onDrop('completedTasks')"
      @dragover.prevent
    >
      <div class="font-semibold text-white text-lg bg-green-500 w-full text-center">
        Mark as Complete
      </div>
      <draggable class="dragArea" v-model="completedTasks" @change="onDragChange('completedTasks')">
        <div
          class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
          v-for="task in completedTasks"
          :key="task.data.task_id"
          draggable="true"
          @dragstart="onDragStart($event, task)"
        >
          {{ task.data.attributes.title }}
        </div>
      </draggable>
    </div>

    <div
      class="flex flex-col items-center border-dashed border-black border-2 bg-red-200"
      @drop="onDrop('deletedTasks')"
      @dragover.prevent
    >
      <div class="font-semibold text-lg text-white bg-red-500 w-full text-center">Delete</div>
      <draggable class="dragArea" v-model="deletedTasks" @change="onDragChange('deletedTasks')">
        <div
          class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
          v-for="task in deletedTasks"
          :key="task.data.task_id"
          draggable="true"
          @dragstart="onDragStart($event, task)"
        >
          {{ task.data.attributes.title }}
        </div>
      </draggable>
    </div>

    <div
      class="flex flex-col items-center border-dashed border-black border-2 bg-blue-200"
      @drop="onDrop('inProgressTasks')"
      @dragover.prevent
    >
      <div class="font-semibold text-lg text-white bg-blue-500 w-full text-center">In-Progress</div>
      <draggable
        class="dragArea"
        v-model="inProgressTasks"
        @change="onDragChange('inProgressTasks')"
      >
        <div
          class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
          v-for="task in inProgressTasks"
          :key="task.data.task_id"
          draggable="true"
          @dragstart="onDragStart($event, task)"
        >
          {{ task.data.attributes.title }}
        </div>
      </draggable>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { VueDraggableNext } from 'vue-draggable-next'

const completedTasks = ref([])
const deletedTasks = ref([])
const inProgressTasks = ref([])
const emits = defineEmits(['taskDropped'])

const onDragChange = (zone) => {}

const onDragStart = (event, draggedTask) => {
  event.dataTransfer.setData(
    'application/json',
    JSON.stringify({ taskId: draggedTask.data.task_id, taskData: draggedTask.data })
  )
}

const onDrop = (zone) => (event) => {
  const data = JSON.parse(event.dataTransfer.getData('application/json'))
  emits('taskDropped', { zone, taskId: data.taskId, taskData: data.taskData })
  console.log(`Task dropped in ${zone}:`, data)
}
</script>

<style>
.dragArea {
  width: 100%;
}
</style>
