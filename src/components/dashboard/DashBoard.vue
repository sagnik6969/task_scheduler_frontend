<template>
  <div class="px-10 py-6 flex xl:flex-row flex-col">
    <div class="left flex-1">
      <div
        class="bg-slate-200 py-10 px-5 rounded-lg flex flex-col items-center text-center text-slate-900"
      >
        <h1 class="text-5xl font-bold">Hello Sagnik!</h1>
        <p class="mt-4 text-xl">It's good to see you again.</p>
      </div>
      <task-list class="mt-8"></task-list>
    </div>

    <div class="right flex-1"></div>
  </div>
</template>
<script setup>
import TaskList from './TaskList/TaskList.vue'
</script>
<style scoped>
.left {
  flex: 0.6;
}
.right {
  flex: 0.4;
}
</style>
