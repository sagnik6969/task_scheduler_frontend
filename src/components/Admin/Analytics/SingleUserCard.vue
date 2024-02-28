<template>
  <div class="flex px-4 py-2 border-2 border-slate-800 rounded-xl bg-slate-100">
    <div class="flex-[3] flex items-center">
      <h1 class="text-slate-800 text-lg font-medium">{{ user.name }}</h1>
    </div>
    <div class="flex-1 space-x-1 flex items-center justify-center font-medium text-slate-700">
      <tooltip text="pending tasks">
        <v-icon icon="mdi-circle" class="text-red-600"></v-icon>
      </tooltip>
      <span>{{ user.incomplete_tasks }}</span>
    </div>
    <div class="flex-1 space-x-1 flex items-center justify-center font-medium text-slate-700">
      <tooltip text="completed tasks">
        <v-icon icon="mdi-circle" class="text-green-500"></v-icon>
      </tooltip>
      <span>{{ user.completed_tasks }}</span>
    </div>
    <div class="flex-1 flex items-center justify-center text-slate-700">
      <Tooltip text="View stats">
        <v-icon
          @click="$emit('userSelected')"
          class="px-4 py-4 rounded-full hover:bg-slate-300 duration-200 cursor-pointer"
          icon="mdi-eye"
        ></v-icon>
      </Tooltip>
    </div>
  </div>
</template>

<script setup>
import Tooltip from '@/components/ui/Tooltip.vue'
defineProps(['user'])
defineEmits(['userSelected'])
</script>
