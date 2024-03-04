<template>
  <div class="w-full md:w-4/5 mx-auto m-15 mt-3 p-5 bg-white rounded-lg shadow-md relative">
    <div class="flex justify-between mb-3 md:mb-4">
      <div class="relative w-full mr-2">
        <input
          type="text"
          placeholder="Check out Your Tasks Here..."
          class="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg px-3 md:px-4 py-2 w-full"
          v-model="searchQuery"
        />
      </div>
      <div class="relative">
        <img
          src="../../assets/images/filter.png"
          alt="Filter"
          width="30"
          height="30"
          @click="toggleFilterOptions"
          class="cursor-pointer mt-1"
        />
        <div
          v-if="showFilterOptions"
          class="absolute top-full right-2 mt-2 bg-transparent shadow-md rounded-lg py-1"
        >
          <div
            @click="
              () => {
                showCompletedTasks = true
                showFilterOptions = false
              }
            "
            class="px-4 py-2 cursor-pointer hover:bg-gray-100"
          >
            Completed Tasks
          </div>
          <div
            @click="
              () => {
                showCompletedTasks = false
                showFilterOptions = false
              }
            "
            class="px-4 py-2 cursor-pointer hover:bg-gray-100"
          >
            Incomplete Tasks
          </div>
        </div>
      </div>
    </div>
    <div class="task-list-container cursor-pointer">
      <div class="min-w-full">
        <div v-if="tasks.length !== 0" class="overflow-hidden border border-gray-200 rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="task in paginatedTasks" :key="task.data.task_id" class="hover:bg-gray-50">
                <td class="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                  {{ truncateTitle(task.data.attributes.title) }}
                </td>
                <td class="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">
                  {{ formatDate(task.data.attributes.created_at) }}
                </td>
              </tr>
              <tr v-if="filteredTasks.length === 0">
                <td
                  class="px-3 md:px-6 py-4 whitespace-nowrap text-center text-gray-500"
                  colspan="2"
                >
                  <div class="flex flex-col items-center justify-evenly no-tasks-message h-64">
                    <img src="../../assets/images/not_found_3.jpg" alt="" />
                    <p>No tasks found.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div
          v-else-if="tasks.length === 0"
          class="h-64 w-full flex items-center justify-center bg-slate-100"
        >
          <v-progress-circular
            :size="50"
            :width="5"
            color="purple"
            indeterminate
          ></v-progress-circular>
        </div>
      </div>
    </div>
    <!-- Pagination -->
    <div
      class="flex justify-center w-full px-4 mt-4"
      v-if="tasks.length !== 0 && filteredTasks.length !== 0 && totalPages !== 1"
    >
      <button
        class="px-3 bg-gray-100 text-white rounded-md hover:bg-gray-500 focus:outline-none mr-2"
        :disabled="currentPage === 1"
        :class="{ 'bg-gray-100': currentPage === 1 }"
        @click="prevPage"
      >
        <img src="@/assets/images/db-arrow-rev.png" alt="Previous" width="16" height="20" />
      </button>
      <div class="flex">
        <button
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          :class="[
            'px-3 py-2 mx-1  text-black rounded-md hover:bg-gray-100 focus:outline-none ',
            { 'border-b-2 border-white ': pageNumber === currentPage }
          ]"
          @click="gotoPage(pageNumber)"
        >
          {{ pageNumber }}
        </button>
      </div>
      <button
        class="px-3 bg-gray-100 text-white rounded-md hover:bg-gray-500 focus:outline-none ml-2"
        :disabled="currentPage === totalPages"
        :class="{ 'bg-gray-100': currentPage === totalPages }"
        @click="nextPage"
      >
        <img src="@/assets/images/db-arrow-fwd.png" alt="Next" width="16" height="20" />
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      tasks: [],
      searchQuery: '',
      showCompletedTasks: false,
      showFilterOptions: false,
      currentPage: 1,
      pageSize: 4
    }
  },
  created() {
    this.fetchTasks()
  },
  computed: {
    filteredTasks() {
      let filtered = this.tasks
      if (!this.showCompletedTasks) {
        filtered = filtered.filter((task) => !task.data.attributes.is_completed)
      }
      if (this.searchQuery.trim()) {
        filtered = filtered.filter((task) =>
          task.data.attributes.title.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      }
      return filtered
    },
    paginatedTasks() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      return this.filteredTasks.slice(startIndex, startIndex + this.pageSize)
    },
    totalPages() {
      return Math.ceil(this.filteredTasks.length / this.pageSize)
    }
  },
  methods: {
    toggleFilterOptions() {
      this.showFilterOptions = !this.showFilterOptions
    },
    toggleFilter(option) {
      this.showCompletedTasks = option === 'completed'
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      const now = new Date()
      const diffTime = Math.abs(now - date)
      const diffSeconds = Math.ceil(diffTime / 1000)
      if (diffSeconds < 60) return `${diffSeconds} sec ago`
      const diffMinutes = Math.ceil(diffSeconds / 60)
      if (diffMinutes < 60) return `${diffMinutes} min ago`
      const diffHours = Math.ceil(diffMinutes / 60)
      if (diffHours < 24) return `${diffHours} hour ago`
      const diffDays = Math.ceil(diffHours / 24)
      if (diffDays < 7) return `${diffDays} day ago`
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    },
    truncateTitle(title) {
      const maxLength = 20 // Define maximum length for title
      return title.length > maxLength ? title.substring(0, maxLength) + '...' : title
    },
    async fetchTasks() {
      try {
        const response = await axios.get('/api/user/tasks')
        this.tasks = response.data.data
      } catch (error) {
        console.error('Error fetching tasks:', error)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    gotoPage(pageNumber) {
      this.currentPage = pageNumber
    }
  }
}
</script>
