<template>
  <div>
    <h1 class="text-3xl font-bold text-slate-900">Tasks</h1>
    <search-box class="mt-2"></search-box>
    <task-list-nav class="mt-4" :nav-links="navLinks"></task-list-nav>
    <div class="mt-4">
      <single-task-card
        v-for="task in tasks"
        :key="task.data.task_id"
        :task="task"
        class="mt-3"
      ></single-task-card>
    </div>
  </div>
</template>
<script setup>
import SearchBox from '@/components/ui/SearchBox.vue'
import SingleTaskCard from './SingleTaskCard.vue'
import TaskListNav from './TaskListNav.vue'
defineProps(['tasks'])

const navLinks = [
  { name: 'All Tasks', active: true },
  { name: 'Recently Added' },
  { name: 'Most Important' },
  { name: 'Near Deadline' }
]
</script>
