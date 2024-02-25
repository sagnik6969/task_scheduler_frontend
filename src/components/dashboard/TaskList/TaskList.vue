<template>
  <div>
    <h1 class="text-3xl font-bold text-slate-900">Tasks</h1>
    <search-box v-model="searchText" class="mt-2"></search-box>
    <task-list-nav class="mt-4" :nav-links="navLinks"></task-list-nav>
    <div class="mt-4">
      <single-task-card
        v-for="task in filteredTasks"
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

import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import sortByDeadLine from './filter_functions/sortByDeadline.js'
import sortByPriority from './filter_functions/sortByPriority.js'
import sortByProgress from './filter_functions/sortByProgress.js'
const props = defineProps(['tasks'])

const route = useRoute()
const router = useRouter()
const searchText = ref(route.query.search || '')

watch(searchText, (newVal) => {
  router.push({
    query: {
      ...route.query,
      search: newVal
    }
  })
})

const navLinks = computed(() => [
  { name: 'All Tasks', filter: '', active: route.query.filter == null },
  // {
  //   name: 'Recently Added',
  //   filter: 'recently_added',
  //   active: route.query.filter == 'recently_added'
  // },
  {
    name: 'Most Important',
    filter: 'most_important',
    active: route.query.filter == 'most_important'
  },
  { name: 'Near Deadline', filter: 'near_deadline', active: route.query.filter == 'near_deadline' },
  {
    name: 'Least Progress',
    filter: 'least_progress',
    active: route.query.filter == 'least_progress'
  }
])

const sortFn = computed(() => {
  if (route.query.filter == 'near_deadline') return sortByDeadLine
  else if (route.query.filter == 'most_important') return sortByPriority
  else if (route.query.filter == 'least_progress') return sortByProgress
  else return undefined
})

const filteredTasks = computed(() => {
  // console.log(props.tasks[1].data.attributes.deadline)
  return props.tasks.toSorted(sortFn.value).filter((task) => {
    return (
      searchText.value == '' ||
      task.data.attributes.title.includes(searchText.value) ||
      task.data.attributes.description.includes(searchText.value)
    )
  })
})
</script>
