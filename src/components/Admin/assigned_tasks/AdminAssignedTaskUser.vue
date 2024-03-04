<template>
  <div class="w-4/5 md:w-4/5 lg:w-3/5 xl:w-5/5 mx-auto pb-10">
    <div
      class="flex justify-between items-center"
      v-if="tasks.length !== 0 && tasks[0] !== 'loading'"
    >
      <search-box
        v-model="searchQuery"
        placeholder="Search Your Assisned Tasks....."
        class="w-1/2 mt-2"
      ></search-box>
      <div class="flex space-x-1">
        <span class="material-symbols-outlined cursor-pointer mt-3 mr-3" @click="fetchData">
          refresh
        </span>
        <select
          v-model="priorityFilter"
          class="border-none hover:text-black sm:flex font-bold text-slate-500 bg-white rounded-md shadow"
        >
          <option selected value="">All Tasks</option>
          x``
          <option value="Normal">Normal</option>
          <option value="Important">Important</option>
          <option value="Very Important">Very Important</option>
        </select>
      </div>
    </div>
    <table
      class="table-auto w-full border-collapse mt-5"
      v-if="tasks.length !== 0 && tasks[0] !== 'loading'"
    >
      <!-- Table headers -->
      <thead>
        <tr class="bg-gray-200">
          <th class="px-4 py-2">Task Details</th>
          <th class="px-4 py-2">Deadline</th>
          <th class="px-4 py-2">Assigned To</th>
          <th class="px-4 py-2">Status</th>
          <th class="px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <task-row v-for="task in filteredTasks" :key="task.id" :task="task"></task-row>
      </tbody>
    </table>
    <!-- <div class="overflow-x-auto" v-if="tasks.length !== 0 && tasks[0] !== 'loading'">
      
    </div> -->
    <div v-if="tasks.length !== 0 && tasks[0] !== 'loading'" class="flex justify-center mt-4">
      <button @click="prevPage" :disabled="currentPage === 1" class="mr-4">Previous</button>
      <button @click="nextPage" :disabled="currentPage === totalPages" class="ml-4">Next</button>
    </div>
    <div
      v-else-if="tasks[0] !== 'loading'"
      class="text-center flex flex-col justify-center items-center"
    >
      <img src="@/assets/images/not_exist.jpg" alt="" width="250px" height="250px" />
      <p class="text-gray-500 mt-2 mb-2 text-xl font-semibold">No Tasks Assigned...</p>
    </div>
    <div v-else-if="tasks[0] === 'loading'" class="mt-4">
      <!-- Search bar skeleton -->
      <div class="flex items-center justify-between mb-4">
        <div class="h-8 w-2/4 ml-4 bg-gray-100 rounded"></div>
        <div class="flex">
          <div class="h-8 w-10 bg-gray-100 rounded mr-3"></div>
          <div class="h-8 w-40 bg-gray-100 rounded"></div>
        </div>
      </div>
      <!-- User list skeleton -->
      <div
        v-for="index in 3"
        :key="index"
        class="border border-black rounded-lg p-4 mb-4 flex flex-col md:flex-row items-center justify-between font-bold text-gray-800 animate-pulse"
      >
        <div class="flex items-center space-x-4 mb-4 md:mb-0 w-full md:w-3/5">
          <div class="h-6 w-1/2 bg-gray-300 rounded"></div>
          <div class="h-4 w-1/2 bg-gray-300 rounded"></div>
        </div>
        <div class="flex items-center justify-between w-full md:w-1/4">
          <div class="h-6 w-6 bg-gray-300 rounded"></div>
          <div class="h-6 w-6 bg-gray-300 rounded"></div>
          <div class="h-6 w-6 bg-gray-300 rounded"></div>
          <div class="h-6 w-6 bg-gray-300 rounded"></div>
          <div class="h-6 w-6 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
    <div v-else-if="tasks.length === 0" class="text-center py-4">
      <p class="text-gray-500">No tasks assigned.</p>
    </div>
  </div>
</template>

<script setup>
import SearchBox from '@/components/ui/SearchBox.vue'
import axios from 'axios'
import { computed, ref } from 'vue'
import TaskRow from './TaskRow.vue'
const tasks = ref(['loading'])
const searchQuery = ref('')
const priorityFilter = ref('')
const currentPage = ref(1)
const pageSize = 3
const fetchData = async () => {
  try {
    tasks.value = ['loading']
    const response = await axios.get('/api/admin/assign/tasks')
    tasks.value = response.data.data
  } catch (error) {
    console.log(error)
  }
}

const totalPages = computed(() => Math.ceil(tasks.value.length / pageSize))
const startIndex = computed(() => (currentPage.value - 1) * pageSize)
const endIndex = computed(() => startIndex.value + pageSize)
const paginatedTasks = computed(() => tasks.value.slice(startIndex.value, endIndex.value))
function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}
fetchData()

const filteredTasks = computed(() => {
  let filtered = tasks.value
    .filter((task) => {
      const title = task.title.toLowerCase()
      const description = task.description?.toLowerCase() || ''
      return (
        searchQuery.value === '' ||
        title.includes(searchQuery.value.toLocaleLowerCase()) ||
        description.includes(searchQuery.value.toLocaleLowerCase())
      )
    })
    .filter((task) => {
      return priorityFilter.value === '' || task.priority === priorityFilter.value
    })

  const startIndex = (currentPage.value - 1) * pageSize
  let filterResult = filtered.slice(startIndex, startIndex + pageSize)
  return filterResult
})
</script>

<style scoped>
.table {
  border-spacing: 0;
}
.table th,
.table td {
  text-align: left;
}
.table th {
  background-color: #edf2f7;
}
.table td,
.table th {
  border: 1px solid #cbd5e0;
  padding: 0.5rem;
}
</style>
