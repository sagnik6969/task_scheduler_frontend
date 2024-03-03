<template>
  <div class="w-4/5 md:w-4/5 lg:w-3/5 xl:w-5/5 mx-auto pb-10">
    <h1 class="text-2xl font-semibold">Admin Assigned Tasks</h1>
    <div
      class="flex justify-between items-center"
      v-if="tasks.length !== 0 && tasks[0] !== 'loading'"
    >
      <search-box
        v-model="searchQuery"
        placeholder="Search Your Assisned Tasks....."
        class="w-1/2 mt-5"
      ></search-box>
      <div class="flex space-x-1">
        <select
          v-model="priorityFilter"
          class="border-none hover:text-black sm:flex font-bold text-slate-500 bg-white rounded-md shadow"
        >
          <option selected value="">All</option>
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
    <div class="overflow-x-auto" v-if="tasks.length !== 0 && tasks[0] !== 'loading'"></div>
    <div v-else-if="tasks[0] === 'loading'" class="mt-4">
      <!-- Search bar skeleton -->
      <div class="flex items-center justify-between mb-4">
        <div class="h-8 w-2/4 ml-4 bg-gray-100 rounded"></div>
        <div class="h-8 w-40 bg-gray-100 rounded"></div>
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
    <div v-else class="text-center py-4">
      <p class="text-gray-500">No tasks assigned.</p>
    </div>
  </div>
</template>

<script setup>
import SearchBox from '@/components/ui/SearchBox.vue'
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import TaskRow from './TaskRow.vue'
const tasks = ref(['loading'])
const searchQuery = ref('')
const priorityFilter = ref('')

onMounted(async () => {
  await axios
    .get('/api/admin/assign/tasks')
    .then((response) => {
      tasks.value = response.data.data
      // console.log(tasks.value)
    })
    .catch((error) => {
      console.log(error)
    })
  // .finally(() => {
  //   this.loading = false
  // })
})

const filteredTasks = computed(() => {
  return tasks.value
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
      return priorityFilter.value == '' || task.priority == priorityFilter.value
    })
})
</script>

<!-- <script>
// import axios from 'axios'

export default {
  data() {
    return {
      loading: true,
      tasks: [],
      currentPage: 1,
      pageSize: 10,
      sortColumn: 'title',
      sortOrder: 'asc'
    }
  },
  created() {
    // this.fetchData()
  },
  methods: {
    // async fetchData() {
    //   await axios
    //     .get('/api/admin/assign/tasks') // Assuming you have an endpoint to fetch task data
    //     .then((response) => {
    //       this.tasks = response.data
    //       console.log(this.tasks)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    //     .finally(() => {
    //       this.loading = false
    //     })
    // },

    closeTaskList() {
      // Implement close task list logic
    },
    searchTasks() {
      // Implement search tasks logic
    },
    sortBy(column) {
      if (this.sortColumn === column) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortColumn = column
        this.sortOrder = 'asc'
      }
      // Implement sort logic
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      // Implement date formatting logic
    },
    confirmDeleteTask(task) {
      // Implement delete task confirmation logic
    },
    showHoverMessage(task) {
      // Implement logic to show hover message
    },
    hideHoverMessage() {
      // Implement logic to hide hover message
    },
    changePage(page) {
      this.currentPage = page
      // Implement logic to change page
    }
  },
  computed: {
    paginatedTasks() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      return this.tasks.slice(startIndex, startIndex + this.pageSize)
    },
    totalPages() {
      return Math.ceil(this.tasks.length / this.pageSize)
    },
    filteredTasks() {}
  }
}
</script> -->

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
