<template>
  <div
    class="fixed top-0 left-0 h-screen w-full flex items-center justify-center bg bg-slate-900 bg-opacity-80 z-10"
  >
    <div class="py-5 px-10 flex flex-col max-w-2xl w-10/12 shadow-2xl rounded-lg bg-white relative">
      <button
        type="button"
        @click="$emit('close')"
        class="absolute top-2 right-4 p-1 rounded-full text-slate-600 hover:bg-slate-300 duration-300"
      >
        <v-icon icon="mdi-close"></v-icon>
      </button>
      <v-progress-linear
        :active="loading"
        indeterminate
        absolute
        bottom
        color="#C6A969"
      ></v-progress-linear>
      <div class="flex justify-between mt-2">
        <h1 class="mt-3 text-2xl font-medium text-slate-900">
          {{ taskCopy.data.attributes.title }}
        </h1>
        <div
          class="flex space-x-1 items-center font-medium text-slate-500 mt-4 cursor-pointer"
          @mouseover="showHelpText = true"
          @mouseleave="showHelpText = false"
        >
          <v-icon
            icon="mdi-circle"
            :class="
              taskCopy.data.attributes.priority === 'Very Important'
                ? 'text-red-500'
                : taskCopy.data.attributes.priority === 'Important'
                  ? 'text-green-500'
                  : 'text-blue-500'
            "
          ></v-icon>
          <p
            class="text-lg"
            :class="
              taskCopy.data.attributes.priority === 'Very Important'
                ? 'text-red-500'
                : taskCopy.data.attributes.priority === 'Important'
                  ? 'text-green-500'
                  : 'text-blue-500'
            "
          >
            {{ taskCopy.data.attributes.priority }}
          </p>
        </div>
        <div
          v-if="showHelpText"
          class="absolute bg-black opacity-80 p-2 shadow-md rounded text-sm mt-2 right-9 top-20"
        >
          <p class="text-white">Task Priority</p>
          <!-- <p class="text-white">
            Red for Very Important, Green for Important, and Blue for other priorities.
          </p> -->
        </div>
      </div>
      <p class="mt-3 text-slate-500 font-medium">{{ taskCopy.data.attributes.description }}</p>
      <div class="mt-5 flex items-center text-lg space-x-3 text-slate-900 font-medium">
        <label for="task_progress">Progress: {{ taskCopy.data.attributes.progress }}%</label>
        <input
          class="border-none flex-grow appearance-none relative"
          type="range"
          :class="{
            'bg-red-500': taskCopy.data.attributes.progress <= 34,
            'bg-yellow-500':
              taskCopy.data.attributes.progress >= 35 && taskCopy.data.attributes.progress <= 67,
            'bg-green-500': taskCopy.data.attributes.progress >= 68
          }"
          min="0"
          max="100"
          v-model="taskCopy.data.attributes.progress"
          id="task_progress"
          :disabled="loading"
          style="
            height: 7px; /* Make the track thinner */
            outline: none; /* Remove default focus style */
            -webkit-appearance: none;
            border-radius: 20px;
          "
        />
      </div>

      <div class="flex items-center space-x-2 font-medium text-slate-900 mt-5">
        <input
          v-model="taskCopy.data.attributes.is_completed"
          type="checkbox"
          name=""
          id="mark-as-complete"
          :disabled="loading"
          :class="{ 'opacity-50': loading }"
        />
        <label :class="{ 'opacity-75': loading }" for="mark-as-complete">Mark as complete</label>
      </div>
      <div class="mt-3 flex justify-between sm:space-x-2 flex-col sm:flex-row space-y-3 space-x-0">
        <!-- <div class="flex space-x-2"> -->
        <VueDatePicker
          model-type="yyyy-MM-dd hh:mm:ss"
          placeholder="Update Due Date"
          v-model="date"
          :min-date="new Date()"
          :min-time="new Date()"
          class="date-picker rounded-md bg-slate-100 flex items-center !w-fit"
          :class="{ 'opacity-75': loading }"
          :disabled="loading"
        >
          <template #input-icon>
            <v-icon class="text-slate-600 px-5" icon="mdi-calendar-range"></v-icon>
          </template>
        </VueDatePicker>
        <div class="flex space-x-2">
          <select
            class="bg-slate-700 text-slate-100 hover:bg-slate-800 rounded-md shadow"
            v-model="taskCopy.data.attributes.priority"
            icon="mdi-priority-high"
            :disabled="loading"
            data-testid="display-task-select"
          >
            <option
              class="bg-slate-700"
              v-for="(key, value) in priorityOptions"
              :key="key"
              :value="value"
              :hidden="key == 'Modify Priority'"
            >
              {{ key }}
            </option>
          </select>
          <button
            @click="deleteTask"
            class="bg-slate-700 text-slate-100 hover:bg-slate-800 rounded-md shadow px-5 disabled:opacity-75"
            :disabled="loading"
          >
            Delete
          </button>
        </div>

        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import IconSelect from '../ui/IconSelect.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import axios from 'axios'
import { ref } from 'vue'
import { computed, reactive, watch } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'
// import { comma } from 'postcss/lib/list'

const props = defineProps(['task'])
const taskCopy = reactive(JSON.parse(JSON.stringify(props.task)))
// console.log(taskCopy.data.attributes.is_completed)
const toast = useToast()
const store = useStore()
const date = ref(null)
const showHelpText = ref(false)

const loading = ref(false)

watch(date, (newVal) => {
  if (newVal) taskCopy.data.attributes.deadline = newVal
})

const priorityOptions = computed(() => ({
  Normal: taskCopy.data.attributes.priority == 'Normal' ? 'Modify Priority' : 'Normal',
  Important: taskCopy.data.attributes.priority == 'Important' ? 'Modify Priority' : 'Important',
  'Very Important':
    taskCopy.data.attributes.priority == 'Very Important' ? 'Modify Priority' : 'Very Important'
}))

watch(taskCopy, async () => {
  try {
    loading.value = true
    await store.dispatch('updateUserTask', {
      task_id: taskCopy.data.task_id,
      title: taskCopy.data.attributes.title,
      description: taskCopy.data.attributes.description,
      deadline: taskCopy.data.attributes.deadline,
      is_completed: taskCopy.data.attributes.is_completed,
      progress: taskCopy.data.attributes.progress,
      priority: taskCopy.data.attributes.priority
    })

    toast.success('task updated successfully')
  } catch (err) {
    console.log(err)
    toast.error('Something went wrong please try again')
  } finally {
    loading.value = false
  }
})

const deleteTask = async () => {
  try {
    loading.value = true
    await store.dispatch('deleteTask', taskCopy.data.task_id)
    toast.success('Task deleted successfully')
  } catch (error) {
    toast.error(error)
  } finally {
    loading.value = false
  }
}

// console.log(taskCopy.value)
</script>

<style>
.date-picker input {
  @apply font-medium bg-slate-100 focus:[box-shadow:none] hover:bg-slate-200 duration-300 placeholder:text-black border-none w-48;
}
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 25px;
  height: 25px;
  background-color: white;
  border: 3px solid #4f46e5;
  border-radius: 50%;
  cursor: pointer;
  margin-top: 0px;
}
</style>
