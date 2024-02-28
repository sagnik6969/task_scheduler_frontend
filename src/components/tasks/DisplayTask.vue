<template>
  <div
    class="top-0 left-0 h-screen w-full flex items-center justify-center bg bg-slate-500 bg-opacity-80 absolute z-10"
  >
    <div class="py-5 px-10 flex flex-col max-w-2xl w-10/12 shadow-2xl rounded-lg bg-white relative">
      <button
        type="button"
        @click="$emit('close')"
        class="absolute top-2 right-2 p-1 rounded-full text-slate-600 hover:bg-slate-300 duration-300"
      >
        <v-icon icon="mdi-close"></v-icon>
      </button>
      <div class="flex space-x-1 items-center font-medium text-slate-500">
        <v-icon icon="mdi-circle" class="text-red-500"></v-icon>
        <p class="text-lg">{{ taskCopy.data.attributes.priority }}</p>
      </div>
      <h1 class="mt-3 text-2xl font-medium text-slate-900">{{ taskCopy.data.attributes.title }}</h1>
      <p class="mt-3 text-slate-500 font-medium">{{ taskCopy.data.attributes.description }}</p>
      <div class="mt-5 flex items-center text-lg space-x-3 text-slate-900 font-medium">
        <label for="task_progress">Progress: {{ taskCopy.data.attributes.progress }}%</label>
        <input
          class="border-none flex-grow"
          type="range"
          min="0"
          max="100"
          v-model="taskCopy.data.attributes.progress"
          id="task_progress"
        />
      </div>
      <div class="mt-5 flex justify-between space-x-2">
        <div class="flex items-center space-x-2 font-medium text-slate-900">
          <input
            v-model="taskCopy.data.attributes.is_completed"
            type="checkbox"
            name=""
            id="mark-as-complete"
          />
          <label for="mark-as-complete">Mark as complete</label>
        </div>
        <div class="flex space-x-2">
          <VueDatePicker
            model-type="yyyy-MM-dd hh:mm:ss"
            placeholder="Update Due Date"
            v-model="date"
            :min-date="new Date()"
            :min-time="new Date()"
            class="date-picker rounded-md bg-slate-100 flex items-center !w-fit"
          >
            <template #input-icon>
              <v-icon class="text-slate-600 px-5" icon="mdi-calendar-range"></v-icon>
            </template>
          </VueDatePicker>
          <icon-select
            class="bg-slate-700 text-slate-100 hover:bg-slate-800"
            v-model="taskCopy.data.attributes.priority"
            icon="mdi-priority-high"
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
          </icon-select>
        </div>
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
console.log(taskCopy.data.attributes.is_completed)
const toast = useToast()
const store = useStore()
const date = ref(null)

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
  console.log(priorityOptions)
  //   console.log(taskCopy)
  // if (props.task == taskCopy) return

  try {
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
  }
})

// console.log(taskCopy.value)
</script>

<style>
.date-picker input {
  @apply font-medium bg-slate-100 focus:[box-shadow:none] hover:bg-slate-200 duration-300 placeholder:text-black border-none w-48;
}
</style>
