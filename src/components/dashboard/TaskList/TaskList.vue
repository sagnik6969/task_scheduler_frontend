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
// import { computed, ref } from 'vue'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
defineProps(['tasks'])

const route = useRoute()

const navLinks = computed(() => [
  { name: 'All Tasks', filter: '', active: route.query.filter == null },
  {
    name: 'Recently Added',
    filter: 'recently_added',
    active: route.query.filter == 'recently_added'
  },
  {
    name: 'Most Important',
    filter: 'most_important',
    active: route.query.filter == 'most_important'
  },
  { name: 'Near Deadline', filter: 'near_deadline', active: route.query.filter == 'near_deadline' }
])
</script>
