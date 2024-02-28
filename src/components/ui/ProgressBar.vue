<template>
  <div class="flex items-center space-x-2 font-medium">
    <span>{{ percentage }}%</span>
    <div class="h-1 w-28 bg-slate-400">
      <div class="progress-bar h-full bg-green-700"></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps(['percentage'])

const width = computed(() => `${props.percentage}%`)
</script>

<style scoped>
.progress-bar {
  width: v-bind('width');
}
</style>
