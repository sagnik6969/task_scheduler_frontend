<template>
  <div class="px-10 py-6 flex xl:flex-row flex-col">
    <div class="left flex-1">
      <greeting-vue></greeting-vue>
      <task-list class="mt-8"></task-list>
    </div>

    <div class="right flex-1"></div>
  </div>
</template>
<script setup>
import GreetingVue from './Greeting.vue'
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
