<template>
  <div class="h-screen w-full flex items-center justify-center bg bg-slate-200">
    <div class="py-3 px-5 flex flex-col max-w-2xl w-10/12 shadow-2xl rounded-lg bg-white relative">
      <button
        class="absolute top-2 right-2 p-1 rounded-full text-slate-600 hover:bg-slate-100 duration-300"
      >
        <v-icon icon="mdi-close"></v-icon>
      </button>
      <input
        class="px-0 text-xl border-none focus:[box-shadow:none]"
        type="text"
        placeholder="Title"
      />
      <textarea
        class="px-0 resize-none border-none focus:[box-shadow:none]"
        rows="10"
        placeholder="Add description..."
      ></textarea>
      <div class="mb-2 text-slate-600 flex items-center justify-between">
        <div class="flex space-x-2">
          <VueDatePicker
            placeholder="Set Due Date"
            class="date-picker rounded-md bg-slate-100 flex items-center"
            v-model="date"
          >
            <template #input-icon>
              <v-icon class="text-slate-600 px-5" icon="mdi-calendar-range"></v-icon>
            </template>
          </VueDatePicker>
          <icon-select icon="mdi-priority-high">
            <option hidden selected>Select Task Priority</option>
            <option value="normal">Normal</option>
            <option value="important">Important</option>
            <option value="very_important">Very Important</option>
          </icon-select>
        </div>
        <div class="flex space-x-2">
          <icon-button class="bg-slate-600 text-slate-100 hover:bg-slate-700">Add Task</icon-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import IconButton from '@/components/ui/IconButton.vue'
import IconSelect from '@/components/ui/IconSelect.vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue'

const date = ref(null)
</script>

<style>
.date-picker input {
  @apply font-medium bg-slate-100 focus:[box-shadow:none] hover:bg-slate-200 duration-300 placeholder:text-slate-950 border-none w-40;
}
</style>
