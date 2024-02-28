<template>
  <div class="grid grid-row h-[650px] w-2/5 my-10 fixed gap-2">
    <div class="flex flex-col items-center border-dashed border-black border-2 bg-green-200">
      <div class="font-semibold text-white text-lg bg-green-500 w-full text-center">
        Mark as Complete
      </div>
      <div
        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
        v-for="task in completedTasks"
        :key="task.data.task_id"
      >
        {{ task.data.attributes.title }}
      </div>
    </div>

    <div class="flex flex-col items-center border-dashed border-black border-2 bg-red-200">
      <div class="font-semibold text-lg text-white bg-red-500 w-full text-center">Delete</div>
      <div
        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
        v-for="task in deletedTasks"
        :key="task.data.task_id"
      >
        {{ task.data.attributes.title }}
      </div>
    </div>

    <div class="flex flex-col items-center border-dashed border-black border-2 bg-blue-200">
      <div class="font-semibold text-lg text-white bg-blue-500 w-full text-center">In-Progress</div>

      <div
        class="list-group-item bg-gray-300 m-1 p-3 rounded-md text-center"
        v-for="task in inProgressTasks"
        :key="task.data.task_id"
      >
        {{ task.data.attributes.title }}
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref, onMounted } from 'vue'

const completedTasks = ref([])
const deletedTasks = ref([])
const inProgressTasks = ref([])
</script>

<style>
.dragArea {
  width: 100%;
}
</style>
