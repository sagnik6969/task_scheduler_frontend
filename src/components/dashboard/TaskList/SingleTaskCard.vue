<template>
  <div
    class="rounded-lg bg-sky-200 text-slate-900 px-6 py-4 flex justify-between items-center flex-col lg:flex-row text-center space-y-3 lg:space-y-0 space-x-2"
  >
    <div>
      <h1 class="font-bold text-lg">Learning Vue</h1>
      <p class="text-slate-700 font-medium">I want to learn vue and .....</p>
    </div>
    <div class="space-x-1 font-medium">
      <v-icon icon="mdi-clock-time-four"></v-icon>
      <span>6h 30min</span>
    </div>
    <progress-bar :percentage="70"></progress-bar>
    <icon-button class="bg-slate-900 text-slate-100 hover:bg-slate-950">View</icon-button>
  </div>
</template>
<script setup>
import ProgressBar from '@/components/ui/ProgressBar.vue'
import IconButton from '@/components/ui/IconButton.vue'
</script>
