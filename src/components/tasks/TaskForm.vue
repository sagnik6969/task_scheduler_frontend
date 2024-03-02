<template>
  <form @submit.prevent="handleSubmit">
    <div
      class="top-0 left-0 h-screen w-full flex items-center justify-center bg bg-slate-500 bg-opacity-80 absolute z-10"
    >
      <div
        :class="{
          'opacity-85': loading
        }"
        class="py-3 px-5 flex flex-col max-w-2xl w-10/12 shadow-2xl rounded-lg bg-white relative"
      >
        <v-progress-linear
          :active="loading"
          indeterminate
          absolute
          bottom
          color="#C6A969"
        ></v-progress-linear>

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
          :disabled="loading"
        />
        <textarea
          class="px-0 resize-none border-none focus:[box-shadow:none]"
          rows="10"
          placeholder="Add description..."
          v-model="description"
          :disabled="loading"
        ></textarea>
        <div
          class="mb-2 text-slate-600 flex sm:items-center justify-between flex-col sm:flex-row space-y-3 sm:space-y-0 items-start"
        >
          <div class="flex flex-col sm:flex-row sm:space-x-2 space-y-3 sm:space-y-0">
            <VueDatePicker
              model-type="yyyy-MM-dd hh:mm:ss"
              placeholder="Set Due Date"
              class="date-picker rounded-md bg-slate-100 flex items-center border-2 border-slate-500"
              v-model="date"
              :min-date="new Date()"
              :min-time="new Date()"
              :disabled="loading"
              :required="true"
            >
              <template #input-icon>
                <v-icon class="text-slate-600 px-5" icon="mdi-calendar-range"></v-icon>
              </template>
            </VueDatePicker>
            <select
              data-testid="task-form-select"
              v-model="priority"
              icon="mdi-priority-high"
              :required="true"
              :disabled="loading"
              class="bg-slate-100 hover:bg-slate-200 duration-300 rounded-md border-2"
            >
              <option hidden selected value="">Select Task Priority</option>
              <option value="Normal">Normal</option>
              <option value="Important">Important</option>
              <option value="Very Important">Very Important</option>
            </select>
          </div>
          <div class="flex space-x-2">
            <icon-button
              class="bg-slate-900 text-slate-100 hover:bg-slate-950 hover:text-slate-100"
              :disabled="loading"
            >
              {{ props.admin ? 'Assign Task' : 'Add Task' }}
            </icon-button>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
import IconButton from '@/components/ui/IconButton.vue'
// import IconSelect from '@/components/ui/IconSelect.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'

const emit = defineEmits(['close'])
const props = defineProps(['userId', 'admin'])
const toast = useToast()
const store = useStore()

const loading = ref(false)

const date = ref(null)
const title = ref('')
const description = ref('')
const priority = ref('')

const handleSubmit = async () => {
  loading.value = true
  try {
    const taskData = {
      title: title.value,
      description: description.value,
      deadline: date.value,
      priority: priority.value
    }
    if (props.userId) {
      await store.dispatch('createUserTaskByAdmin', {
        userId: props.userId,
        ...taskData
      })
      toast.success('Notification is sent to user . Check Assigned Task Section For Status')
    } else {
      await store.dispatch('createUserTask', taskData)
      toast.success('Task added successfully')
    }

    emit('close')
  } catch {
    toast.error('Something went wrong')
  } finally {
    loading.value = false
  }
}
</script>

<style>
.date-picker input {
  @apply font-medium bg-slate-100 focus:[box-shadow:none] hover:bg-slate-200 duration-300 placeholder:text-slate-950 border-none w-40;
}
</style>
