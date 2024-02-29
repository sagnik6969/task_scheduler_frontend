<template>
  <div class="bg-white">
    <div class="sticky top-0 bg-white z-10">
      <h1 class="text-3xl font-bold text-slate-900">Tasks</h1>
      <div class="py-1 bg-white flex justify-between">
        <search-box
          v-model="searchText"
          placeholder="Search tasks....."
          class="mt-2 font-medium"
        ></search-box>
        <div class="gap-4 flex">
          <span
            @click="handleDrop"
            class="mdi mt-4 mdi-sort-ascending focus:[box-shadow:none] cursor-pointer text-slate-900 hover:text-black"
          ></span>
          <select
            @change="handleCategoryChange"
            class="border-none mt-2 sm:flex font-bold text-slate-500 hidden bg-white rounded-md shadow hover:text-black"
          >
            <option hidden selected value="">Select Category</option>
            <option value="completed_tasks">Completed Task</option>
            <option value="incompleted_tasks">Incompleted Task</option>
          </select>
        </div>
      </div>
      <div class="flex justify-between pb-4">
        <task-list-nav class="mt-4" :nav-links="navLinks"></task-list-nav>
      </div>
    </div>

    <div
      v-if="
        $store.getters.userTasksLoadingStatus == 'loading' ||
        $store.getters.userTasksLoadingStatus == null
      "
      class="text-center my-20 text-slate-900"
    >
      <v-progress-circular :size="50" :width="5" color="purple" indeterminate></v-progress-circular>
    </div>
    <div
      v-else-if="store.getters.userTasks.length == 0"
      class="mt-4 py-10 px-14 flex items-center justify-center text-center bg-slate-100 text-slate-800 text-xl font-medium rounded-lg shadow"
    >
      <p>looks like you haven't added any task yet!</p>
    </div>
    <div v-else class="mt-0">
      <single-task-card
        v-for="(task, idx) in filteredTasks"
        :key="task.data.task_id"
        :task="task"
        class="mt-3"
        :class="{ 'mt-0': idx == 0 }"
      ></single-task-card>
    </div>
  </div>
</template>

<script setup>
import SearchBox from '@/components/ui/SearchBox.vue'
import SingleTaskCard from './SingleTaskCard.vue'
import TaskListNav from './TaskListNav.vue'

import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import sortByDeadLine from './filter_functions/sortByDeadline.js'
import sortByPriority from './filter_functions/sortByPriority.js'
import sortByProgress from './filter_functions/sortByProgress.js'
import { useStore } from 'vuex'

// const props = defineProps(['tasks'])

const route = useRoute()
const router = useRouter()
const store = useStore()
const searchText = ref(route.query.search || '')
const showFilter = ref(route.query.filter || 'latest_tasks')
const showCategory = ref(route.query.filter || '')

// onMounted(() => {
//   const taskLoadingStatus = store.getters.userTasksLoadingStatus
//   if (taskLoadingStatus == null) store.dispatch('fetchUserTasks')
// })

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
  },
  {
    name: 'Assigned By admin',
    filter: 'assigned_by_admin',
    active: route.query.filter == 'assigned_by_admin'
  }
])
const handleCategoryChange = () => {
  showCategory.value = event.target.value
  if (event.target.value == '') {
    route.query.filter == null
  }
  router.push({ query: { ...route.query, filter: showCategory.value } })
}

const handleDrop = () => {
  const newFilter = showFilter.value === 'latest_tasks' ? 'oldest_tasks' : 'latest_tasks'
  showFilter.value = newFilter
  router.push({ query: { ...route.query, filter: newFilter } })
}

const sortFn = computed(() => {
  if (route.query.filter == 'near_deadline') return sortByDeadLine
  else if (route.query.filter == 'most_important') return sortByPriority
  else if (route.query.filter == 'least_progress') return sortByProgress
  else if (route.query.filter == 'latest_tasks') return sortByLatestTasks
  // else if (route.query.filter == 'assigned_by_admin') return sortByassignedAdmin
  else return undefined
})

const filteredTasks = computed(() => {
  // const searchQuery = searchText.value.toLowerCase()
  // return store.getters.userTasks.toSorted(sortFn.value).filter((task) => {
  //   const title = task.data.attributes.title.toLowerCase()
  //   const description = task.data.attributes.description?.toLowerCase() || ''
  //   return searchQuery === '' || title.includes(searchQuery) || description.includes(searchQuery)
  // })
  const searchQuery = searchText.value.toLowerCase()
  let tasksToShow = []

  if (showCategory.value === 'completed_tasks') {
    tasksToShow = store.getters.userTasks.filter((task) => task.data.attributes.is_completed)
  } else if (showCategory.value === 'incompleted_tasks') {
    tasksToShow = store.getters.userTasks.filter((task) => !task.data.attributes.is_completed)
  }
  // }else if(route.query.filter==='assigned_by_admin'){
  //   tasksToShow =
  // }
  else {
    tasksToShow = store.getters.userTasks
  }

  return tasksToShow.toSorted(sortFn.value).filter((task) => {
    const title = task.data.attributes.title.toLowerCase()
    const description = task.data.attributes.description?.toLowerCase() || ''
    return searchQuery === '' || title.includes(searchQuery) || description.includes(searchQuery)
  })
})

const sortByLatestTasks = (taskA, taskB) => {
  return new Date(taskB.data.attributes.created_at) - new Date(taskA.data.attributes.created_at)
}

const sortByOldestTasks = (taskA, taskB) => {
  return new Date(taskA.data.attributes.created_at) - new Date(taskB.data.attributes.created_at)
}
</script>
<!-- <style scoped>
.stick {
  position: sticky;
  top: 0;
  z-index: 10;
}
</style> -->
