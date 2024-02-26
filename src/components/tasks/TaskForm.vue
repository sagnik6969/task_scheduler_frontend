<template>
  <form @submit.prevent="handleSubmit">
    <div
      class="top-0 left-0 h-screen w-full flex items-center justify-center bg bg-slate-500 bg-opacity-80 absolute z-10"
    >
      <div
        class="py-3 px-5 flex flex-col max-w-2xl w-10/12 shadow-2xl rounded-lg bg-white relative"
      >
        <button
          type="button"
          @click="$emit('close')"
          class="absolute top-2 right-2 p-1 rounded-full text-slate-600 hover:bg-slate-300 duration-300"
        >
          <v-icon icon="mdi-close"></v-icon>
        </button>
        <input
          class="px-0 text-xl border-none focus:[box-shadow:none]"
          type="text"
          placeholder="Title"
          v-model="title"
          required
        />
        <textarea
          class="px-0 resize-none border-none focus:[box-shadow:none]"
          rows="10"
          placeholder="Add description..."
          v-model="description"
        ></textarea>
        <div
          class="mb-2 text-slate-600 flex sm:items-center justify-between flex-col sm:flex-row space-y-3 sm:space-y-0 items-start"
        >
          <div class="flex flex-col sm:flex-row sm:space-x-2 space-y-3 sm:space-y-0">
            <VueDatePicker
              model-type="yyyy-MM-dd hh:mm:ss"
              placeholder="Set Due Date"
              class="date-picker rounded-md bg-slate-100 flex items-center"
              v-model="date"
            >
              <template #input-icon>
                <v-icon class="text-slate-600 px-5" icon="mdi-calendar-range"></v-icon>
              </template>
            </VueDatePicker>
            <icon-select v-model="priority" icon="mdi-priority-high" :required="true">
              <option hidden selected value="">Select Task Priority</option>
              <option value="normal">Normal</option>
              <option value="important">Important</option>
              <option value="very_important">Very Important</option>
            </icon-select>
          </div>
          <div class="flex space-x-2">
            <icon-button class="bg-slate-900 text-slate-100 hover:bg-slate-950"
              >Add Task</icon-button
            >
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import IconButton from '@/components/ui/IconButton.vue'
import IconSelect from '@/components/ui/IconSelect.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref, watch } from 'vue'
import axios from 'axios'

const emit = defineEmits(['close'])

const date = ref(null)
const title = ref('')
const description = ref('')
const priority = ref('')

watch(priority, (newVal) => {
  console.log(newVal)
})

const handleSubmit = async () => {
  try {
    const res = await axios.post('api/user/tasks', {
      title: title.value,
      description: description.value,
      deadline: date.value,
      priority: priority.value
    })
    emit('close')
  } catch {
    console.log(err)
  }
}
// onMounted(async () => {
//   await axios.get('/sanctum/csrf-cookie')
//   await axios.post('api/login', {
//     email: 'madelynn80@example.net',
//     password: 'password'
//   })
// })
</script>

<style>
.date-picker input {
  @apply font-medium bg-slate-100 focus:[box-shadow:none] hover:bg-slate-200 duration-300 placeholder:text-slate-950 border-none w-40;
}
</style>
