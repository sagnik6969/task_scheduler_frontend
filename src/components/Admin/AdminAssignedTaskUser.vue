<template>
  <div class="container mx-auto">
    <h1 class="text-2xl font-semibold mb-4">Admin Assigned Tasks</h1>
    <div class="overflow-x-auto" v-if="!loading">
      <table class="table-auto w-full border-collapse">
        <!-- Table headers -->
        <thead>
          <tr class="bg-gray-200">
            <th class="px-4 py-2">Task Title</th>
            <th class="px-4 py-2">Task Description</th>
            <th class="px-4 py-2">Task Status</th>
            <th class="px-4 py-2">Progress</th>
            <th class="px-4 py-2">Deadline</th>
            <th class="px-4 py-2">Completion</th>
          </tr>
        </thead>
        <!-- Table body -->
        <tbody>
          <tr v-for="task in tasks" :key="task.id" class="hover:bg-gray-100">
            <td class="border px-4 py-2">{{ task.task.title }}</td>
            <td class="border px-4 py-2">{{ task.task.description }}</td>
            <td class="border px-4 py-2">
              <span :class="getStatusClass(task.status)">{{ task.status }}</span>
            </td>
            <td class="border px-4 py-2">{{ task.task.progress }}%</td>
            <td class="border px-4 py-2">{{ formatDate(task.task.deadline) }}</td>
            <td class="border px-4 py-2">
              {{ task.task.is_completed ? 'Completed' : 'Not Completed' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Loading spinner -->
    <div v-else class="text-center my-20 text-slate-900">
      <v-progress-circular :size="50" :width="5" color="purple" indeterminate></v-progress-circular>
    </div>
  </div>
</template>

<script>
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
