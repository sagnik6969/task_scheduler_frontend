<template>
  <div class="bg-white">
    <div class="sticky top-0 bg-white z-10">
      <h1 class="text-3xl font-bold text-slate-900">Tasks</h1>
      <div class="py-1 bg-white flex justify-between">
        <search-box
          v-model="searchText"
          placeholder="Search tasks....."
          class="mt-2 font-medium w-1/2"
        ></search-box>
        <div class="gap-4 flex">
          <span
            @click="handleDrop"
            class="mdi mt-4 mdi-sort-ascending focus:[box-shadow:none] cursor-pointer text-slate-900 hover:text-black"
          ></span>
          <select
            class="border-none mt-2 sm:flex font-bold text-slate-500 hidden bg-white rounded-md shadow hover:text-black"
            v-model="categoryFilter"
          >
            <option selected value="all">All Tasks</option>
            <option value="completed_tasks">Completed Tasks</option>
            <option value="incomplete_tasks">Incomplete Tasks</option>
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
      class="text-center text-slate-900"
    >
      <TaskSkeleton />
    </div>
    <div
      v-else-if="$store.getters.userTasks.length == 0"
      class="mt-4 py-10 px-14 flex items-center justify-center text-center bg-slate-100 text-slate-800 text-xl font-medium rounded-lg shadow"
    >
      <p>looks like you haven't added any task yet!</p>
    </div>
    <div v-else-if="filteredTasks.length === 0" class="text-center py-4">
      <p class="text-gray-500">No tasks found.</p>
    </div>
    <div v-else class="mt-0">
      <single-task-card
        v-for="task in filteredTasks"
        :key="task.data.task_id"
        :task="task"
        class="mt-3 first:mt-0"
      ></single-task-card>
    </div>
  </div>
</template>

<script setup>
import SearchBox from '@/components/ui/SearchBox.vue'
import SingleTaskCard from './SingleTaskCard.vue'
import TaskListNav from './TaskListNav.vue'
import TaskSkeleton from '@/components/ui/Shimmer/TasksSkeleton.vue'
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import sortByDeadLine from './sort_functions/sortByDeadline.js'
import sortByPriority from './sort_functions/sortByPriority.js'
import sortByProgress from './sort_functions/sortByProgress.js'
import sortByLatestTasks from './sort_functions/sortByLatestTasks.js'
import { useStore } from 'vuex'

const route = useRoute()
const router = useRouter()
const store = useStore()
const searchText = ref(route.query.search || '')

const categoryFilter = ref(route.query.completed || 'all')
const isAdmin = computed(() => store.getters.User.is_admin)
watch(categoryFilter, (newVal) => {
  router.push({
    query: {
      ...route.query,
      completed: newVal
    }
  })
})

watch(searchText, (newVal) => {
  router.push({
    query: {
      ...route.query,
      search: newVal
    }
  })
})

const navLinks = computed(() => {
  let links = [
    { name: 'All Tasks', sort: '', active: route.query.sort == null || route.query.sort == '' },
    {
      name: 'Most Important',
      sort: 'most_important',
      active: route.query.sort == 'most_important'
    },
    { name: 'Near Deadline', sort: 'near_deadline', active: route.query.sort == 'near_deadline' },
    {
      name: 'Least Progress',
      sort: 'least_progress',
      active: route.query.sort == 'least_progress'
    },
    {
      name: 'Assigned By admin',
      sort: 'assigned_by_admin',
      active: route.query.sort == 'assigned_by_admin'
    }
  ]
  if (isAdmin.value) {
    links = links.filter((link) => link.sort !== 'assigned_by_admin')
  }

  return links
})

const sortFn = computed(() => {
  if (route.query.sort == 'near_deadline') return sortByDeadLine
  else if (route.query.sort == 'most_important') return sortByPriority
  else if (route.query.sort == 'least_progress') return sortByProgress
  else if (route.query.sort == 'latest_tasks') return sortByLatestTasks
  else return undefined
})

const isCompletedInBoolean = {
  incomplete_tasks: 0,
  completed_tasks: 1
}

const filteredTasks = computed(() => {
  const searchQuery = searchText.value.toLowerCase()

  if (route.query.sort == 'assigned_by_admin')
    return store.getters.userTasks.filter((task) => {
      const title = task.data.attributes.title.toLowerCase()
      const description = task.data.attributes.description?.toLowerCase() || ''
      return (
        (title.includes(searchQuery) || description.includes(searchQuery)) &&
        task.data.attributes.admin_id &&
        (categoryFilter.value == 'all' ||
          task.data.attributes.is_completed == isCompletedInBoolean[categoryFilter.value])
      )
    })

  return store.getters.userTasks.toSorted(sortFn.value).filter((task) => {
    const title = task.data.attributes.title.toLowerCase()
    const description = task.data.attributes.description?.toLowerCase() || ''
    return (
      (title.includes(searchQuery) || description.includes(searchQuery)) &&
      (categoryFilter.value == 'all' ||
        task.data.attributes.is_completed == isCompletedInBoolean[categoryFilter.value])
    )
  })
})

const handleDrop = () => {
  const options = ['all', 'completed_tasks', 'incomplete_tasks']
  const index = options.findIndex((x) => x === categoryFilter.value)
  console.log(categoryFilter.value)
  console.log(index)

  const nextIndex = (index + 1) % 3
  categoryFilter.value = options[nextIndex]
}
</script>
