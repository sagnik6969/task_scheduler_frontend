<template>
  <div class="pt-6 px-8 w-full flex xl:flex-row xl:mt-0 flex-col h-full md:ml-10 mt-12">
    <div class="flex w-1/2 h-full">
      <div class="flex w-full flex-col p-2 gap-2">
        <div
          class="bg-white border-black border-2 p-4 rounded font-semibold text-center text-3xl justify-center"
        >
          Drag and Drop
        </div>
        <div
          class="py-4 duration-300 transition-all sticky top-0 z-10 bg-white flex justify-between"
        >
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
        <div
          v-if="
            store.getters.userTasksLoadingStatus == 'loading' ||
            store.getters.userTasksLoadingStatus == null
          "
          class="text-center text-slate-900"
        >
          <TaskSkeleton />
        </div>
        <div v-else>
          <single-task-card
            v-for="task in filteredTasks"
            :key="task.data.task_id"
            :task="task"
            class="mt-3 first:mt-0"
          />
        </div>
      </div>
    </div>
    <div class="w-1/2">
      <KanbanBoard />
    </div>
  </div>
</template>
<script setup>
import SearchBox from '@/components/ui/SearchBox.vue'
import UserNotificationBar from '@/components/dashboard/right_column/notifications/UserNotificationBar.vue'
import { ref, computed, watch, onMounted, onUpdated } from 'vue'
import KanbanBoard from './KanbanBoard.vue'
import TaskSkeleton from '@/components/ui/Shimmer/TasksSkeleton.vue'
import SingleTaskCard from '@/components/dashboard/TaskList/SingleTaskCard.vue'
import sortByLatestTasks from '@/components/dashboard/TaskList/filter_functions/sortByLatestTasks.js'
import axios from 'axios'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const tasksLoading = ref(true)
const router = useRouter()
const route = useRoute()
const tasks = ref([])
const store = useStore()
const searchText = ref(route.query.search || '')
const showFilter = ref(route.query.filter || 'latest_tasks')
const showCategory = ref(route.query.filter || '')
watch(searchText, (newVal) => {
  router.push({
    query: {
      ...route.query,
      search: newVal
    }
  })
})

onMounted(async () => {
  await store.dispatch('fetchUserTasks')
  await data()
})

const handleDrop = () => {
  const newFilter = showFilter.value === 'latest_tasks' ? 'oldest_tasks' : 'latest_tasks'
  showFilter.value = newFilter
  router.push({ query: { ...route.query, filter: newFilter } })
}

const handleCategoryChange = () => {
  showCategory.value = event.target.value
  router.push({ query: { ...route.query, filter: showCategory.value } })
}

const data = async () => {
  try {
    const res = await axios.get('/api/user/tasks')
    tasks.value = res?.data?.data
  } catch {
    console.error('error getting data')
  }
}
const sortFn = computed(() => {
  if (route.query.filter == 'latest_tasks') return sortByLatestTasks
})
const filteredTasks = computed(() => {
  const searchQuery = searchText.value.toLowerCase()
  let tasksToShow = []
  if (showCategory.value === 'completed_tasks') {
    tasksToShow = store.getters.userTasks.filter((task) => task.data.attributes.is_completed)
  } else if (showCategory.value === 'incompleted_tasks') {
    tasksToShow = store.getters.userTasks.filter((task) => !task.data.attributes.is_completed)
  } else {
    tasksToShow = store.getters.userTasks
  }

  return tasksToShow.toSorted(sortFn.value).filter((task) => {
    const title = task.data.attributes.title.toLowerCase()
    const description = task.data.attributes.description?.toLowerCase() || ''
    return searchQuery === '' || title.includes(searchQuery) || description.includes(searchQuery)
  })
})
</script>
