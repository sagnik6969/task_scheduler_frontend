<template>
  <div class="w-full md:w-4/5 mx-auto bg-white p-5 md:p-10 rounded-lg relative">
    <button
      class="absolute top-0 right-0 mt-2 mr-2 text-red px-3 py-2 rounded-full"
      @click="closeTaskList"
    >
      <svg class="w-6 h-6" viewBox="0 0 20 20" fill="currentColor">
        <path
          fill-rule="evenodd"
          d="M14.348 5.652a.5.5 0 0 1 0 .707L10.707 10l3.64 3.64a.5.5 0 1 1-.708.708L10 10.707l-3.64 3.64a.5.5 0 1 1-.708-.708L9.293 10 5.652 6.36a.5.5 0 1 1 .708-.708L10 9.293l3.64-3.64a.5.5 0 0 1 .708 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>
    <!-- Heading -->
    <div class="flex justify-between items-center mb-3 md:mb-6">
      <h3 class="text-lg md:text-2xl font-bold text-gray-800">Tasks List</h3>
    </div>
    <!-- Filter Menu -->
    <div
      v-show="showFilterMenu"
      class="absolute top-32 right-12 mt-2 mr-3 bg-white shadow-md rounded-lg py-1 z-10"
    >
      <button
        @click="filterTasks('all')"
        class="block w-full px-4 py-2 hover:bg-gray-100 text-center"
      >
        All Tasks
      </button>
      <button
        @click="filterTasks('true')"
        class="block w-full px-4 py-2 hover:bg-gray-100 text-center"
      >
        Completed Tasks
      </button>
      <button
        @click="filterTasks('false')"
        class="block w-full px-4 py-2 hover:bg-gray-100 text-center"
      >
        Incompleted Tasks
      </button>
    </div>
    <!-- Search bar -->
    <div class="mb-3 md:mb-4 relative">
      <input
        type="text"
        placeholder="Search By Tasks Title ..."
        class="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg px-3 md:px-4 py-2 w-full"
        @input="searchTasks"
      />
      <!-- Filter button -->
      <button
        class="absolute bottom-0.6 right-0 hover:opacity-50 text-white px-3 md:px-4 py-2 rounded-lg text-sm md:text-base"
        @click="toggleFilterMenu"
      >
        <img src="../../../assets/images/filter.png" alt="" width="30px" height="40px" />
      </button>
    </div>
    <!-- Task List Container with fixed height and overflow -->
    <div class="task-list-container h-80 md:h-auto overflow-x-auto md:overflow-y-auto">
      <!-- Task List -->
      <div class="min-w-full">
        <!-- Task Table -->
        <table
          class="min-w-full divide-y divide-gray-200"
          :class="{ 'animate-pulse': deletingTask }"
        >
          <!-- Column Headers -->
          <thead class="bg-gray-50" v-if="filteredTasks.length !== 0">
            <tr>
              <th
                scope="col"
                class="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider cursor-pointer"
                @click="sortBy('title')"
              >
                Task Title
                <span class="ml-1">
                  <svg
                    v-if="sortColumn === 'title'"
                    :class="{ 'rotate-180': sortOrder === 'desc' }"
                    class="w-4 h-4 inline transform transition-transform duration-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg v-else class="w-4 h-4 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M7.293 12.293a1 1 0 011.414 0L10 13.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </th>
              <th
                scope="col"
                class="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider cursor-pointer"
                @click="sortBy('deadline')"
              >
                Deadline
                <span class="ml-1">
                  <svg
                    v-if="sortColumn === 'deadline'"
                    :class="{ 'rotate-180': sortOrder === 'desc' }"
                    class="w-4 h-4 inline transform transition-transform duration-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg v-else class="w-4 h-4 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M7.293 12.293a1 1 0 011.414 0L10 13.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </th>

              <th
                scope="col"
                class="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider cursor-pointer"
                @click="sortBy('is_completed')"
              >
                Status
                <span class="ml-1">
                  <svg
                    v-if="sortColumn === 'is_completed'"
                    :class="{ 'rotate-180': sortOrder === 'desc' }"
                    class="w-4 h-4 inline transform transition-transform duration-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg v-else class="w-4 h-4 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M7.293 12.293a1 1 0 011.414 0L10 13.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </th>
              <th
                scope="col"
                class="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider"
              >
                Progress
                <span class="ml-1">
                  <svg
                    v-if="sortColumn === 'progress'"
                    :class="{ 'rotate-180': sortOrder === 'desc' }"
                    class="w-4 h-4 inline transform transition-transform duration-300"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 7.293a1 1 0 011.414 0L10 8.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg v-else class="w-4 h-4 inline" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fill-rule="evenodd"
                      d="M7.293 12.293a1 1 0 011.414 0L10 13.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </span>
              </th>
              <th
                scope="col"
                class="px-3 md:px-6 py-2 md:py-3 text-left text-xs md:text-sm font-semibold text-gray-500 uppercase tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <!-- Task Items -->
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="task in paginatedTasks" :key="task.id" class="hover:bg-gray-50">
              <td class="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap overflow-hidden">
                <div class="truncate" style="max-width: 10rem">{{ task.title }}</div>
              </td>
              <td class="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                {{ formatDate(task.deadline) }}
              </td>
              <td class="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                <span
                  :class="{
                    'text-green-500': task.is_completed,
                    'text-red-500': !task.is_completed
                  }"
                  class="text-xs md:text-sm"
                >
                  {{ task.is_completed ? 'Completed' : 'Pending' }}
                </span>
              </td>
              <td class="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                <div
                  class="relative flex items-center justify-center"
                  style="width: 4rem; height: 4rem"
                >
                  <div
                    class="absolute inset-0 flex items-center justify-center text-gray-800 font-semibold"
                    style="padding: 0.25rem"
                  >
                    {{ task.progress }}%
                  </div>
                  <svg
                    class="absolute top-0 left-0 w-full h-full text-gray-200"
                    viewBox="0 0 36 36"
                  >
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke-width="3.8"
                      stroke="#f3f3f3"
                    ></circle>
                    <circle
                      :stroke-dasharray="`${task.progress * 0.94} 94`"
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke-width="3.8"
                      :stroke="task.is_completed ? '#4CAF50' : '#FF5722'"
                    ></circle>
                  </svg>
                </div>
              </td>
              <td class="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                <button
                  v-if="!task.is_completed"
                  @click="confirmDeleteTask(task)"
                  class="bg-black text-white px-3 md:px-4 py-2 rounded-lg hover:bg-red-600 text-xs md:text-sm"
                >
                  Delete
                </button>
                <span
                  v-else
                  class="relative inline-block bg-black text-white px-3 md:px-4 py-2 rounded-lg cursor-not-allowed opacity-50 text-xs md:text-sm"
                >
                  Delete
                </span>
              </td>
            </tr>
            <tr v-if="filteredTasks.length === 0">
              <td class="px-3 md:px-6 py-4 whitespace-nowrap text-center text-gray-500" colspan="5">
                <!-- <div class="flex-center no-tasks-message">
                  <p>No tasks found.</p>
                </div> -->
                <div class="text-center flex flex-col justify-center items-center">
                  <img src="@/assets/images/No_data.jpg" alt="" width="250px" height="250px" />
                  <p class="text-gray-500 mt-2 mb-2 text-xl font-bold">No tasks found...</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <!-- Pagination controls -->
    <div class="flex justify-center mt-4" v-if="totalPages > 1">
      <button
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
        class="px-3 py-2 mr-3 bg-black text-white rounded-md hover:opacity-50 focus:outline-none"
        @click="changePage(currentPage - 1)"
        :disabled="currentPage === 1"
      >
        <img src="@/assets/images/db-arrow-rev.png" alt="Previous" width="16" height="20px" />
      </button>
      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="{ 'bg-black text-white': currentPage === page, 'ml-2': page !== 1 }"
        class="px-3 py-2 rounded-md hover:opacity-50 focus:outline-none"
      >
        {{ page }}
      </button>
      <button
        :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
        class="px-3 py-2 ml-3 bg-black text-white rounded-md hover:opacity-50 focus:outline-none"
        @click="changePage(currentPage + 1)"
        :disabled="currentPage === totalPages"
      >
        <img src="@/assets/images/db-arrow-fwd.png" alt="Previous" width="16" height="20px" />
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
const toast = useToast()
export default {
  props: {
    alltasks: Array,
    user: Number
  },
  data() {
    return {
      tasks: this.alltasks,
      searchQuery: '',
      currentPage: 1,
      pageSize: 3,
      sortColumn: '',
      sortOrder: 'asc',
      showFilterMenu: false,
      deletingTask: false
    }
  },
  computed: {
    filteredTasks() {
      if (!this.searchQuery.trim()) return this.tasks
      return this.tasks.filter((task) =>
        task.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
    },
    totalPages() {
      return Math.ceil(this.filteredTasks.length / this.pageSize)
    },
    paginatedTasks() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      return this.filteredTasks.slice(startIndex, startIndex + this.pageSize)
    }
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    confirmDeleteTask(task) {
      if (window.confirm(`Are you sure you want to delete the task "${task.title}"?`)) {
        this.deleteTask(task)
      }
    },
    async deleteTask(task) {
      try {
        this.deletingTask = true
        const response = await axios.delete('/api/admin/tasks/' + task.id)
        toast.info(response.data.message)
        const userResponse = await axios.get('/api/admin/users/' + this.user)
        this.tasks = userResponse.data.user.tasks
        this.deletingTask = false
      } catch (error) {
        toast.error(error.response.data.error)
      }
    },
    searchTasks(event) {
      this.searchQuery = event.target.value
    },
    changePage(page) {
      this.currentPage = page
    },
    closeTaskList() {
      this.$emit('task-closed')
    },
    sortBy(column) {
      if (this.sortColumn === column) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
      } else {
        this.sortColumn = column
        this.sortOrder = 'asc'
      }
      if (column === 'progress') {
        this.filteredTasks.sort((a, b) => {
          if (this.sortOrder === 'asc') {
            return a[column] - b[column]
          } else {
            return b[column] - a[column]
          }
        })
      } else {
        this.filteredTasks.sort((a, b) => {
          if (this.sortOrder === 'asc') {
            return a[column] < b[column] ? -1 : 1
          } else {
            return a[column] > b[column] ? -1 : 1
          }
        })
      }
    },
    toggleFilterMenu() {
      this.showFilterMenu = !this.showFilterMenu
    },
    filterTasks(status) {
      if (status === 'all') {
        this.filteredTasks = this.tasks
      } else {
        let task = []
        const completedStatus = status === 'true'
        task = this.tasks.filter((task) => task.is_completed === completedStatus)
        console.log(task)
      }
      this.showFilterMenu = false
    }
  }
}
</script>

<style scoped>
@keyframes pulse {
  50% {
    opacity: 0.3;
  }
}
.animate-pulse {
  animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
