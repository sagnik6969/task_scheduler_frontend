<template>
  <div
    class="pt-6 md:px-8 md:w-full md:flex md:flex-row sm:flex-col flex xl:mt-0 flex-col h-screen ml-10 mt-12"
  >
    <div class="flex sm:w-full md:order-1 lg:w-1/2">
      <div class="flex w-full flex-col p-2 gap-2">
        <div
          class="bg-white images border-black border-2 p-4 rounded font-semibold text-center text-3xl justify-center"
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
              v-model="categoryFilter"
              class="border-none mt-2 sm:flex font-bold text-slate-500 hidden bg-white rounded-md shadow hover:text-black"
            >
              <option selected value="all">All tasks</option>
              <option value="completed_tasks">Completed Task</option>
              <option value="incomplete_tasks">Incompleted Task</option>
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
    <div class="md:w-1/2 sm:w-full sm:order-2">
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
import sortByLatestTasks from '@/components/dashboard/TaskList/sort_functions/sortByLatestTasks.js'
import axios from 'axios'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
const tasksLoading = ref(true)
const router = useRouter()
const route = useRoute()
const tasks = ref([])
const store = useStore()
const categoryFilter = ref(route.query.completed || 'all')
const searchText = ref(route.query.search || '')
watch(searchText, (newVal) => {
  router.push({
    query: {
      ...route.query,
      search: newVal
    }
  })
})
watch(categoryFilter, (newVal) => {
  router.push({
    query: {
      ...route.query,
      completed: newVal
    }
  })
})

onMounted(async () => {
  await store.dispatch('fetchUserTasks')
  await data()
})

const handleDrop = () => {
  const options = ['all', 'completed_tasks', 'incomplete_tasks']
  const index = options.findIndex((x) => x === categoryFilter.value)
  const nextIndex = (index + 1) % 3
  categoryFilter.value = options[nextIndex]
}

const data = async () => {
  try {
    const res = await axios.get('/api/user/tasks')
    tasks.value = res?.data?.data
  } catch {
    console.error('error getting data')
  }
}
const isCompletedInBoolean = {
  incomplete_tasks: 0,
  completed_tasks: 1
}
const sortFn = computed(() => {
  if (route.query.filter == 'latest_tasks') return sortByLatestTasks
})
const filteredTasks = computed(() => {
  const searchQuery = searchText.value.toLowerCase()
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
</script>
<style scoped>
.images {
  background-image: url('/public/img/dnd.png');
  background-size: contain;
  background-repeat: no-repeat;
  backdrop-filter: blur(10px);
}
</style>
