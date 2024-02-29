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
      <!-- Filter button -->
      <!-- <button
        class="bg-black hover:opacity-50 text-white px-3 md:px-4 py-2 rounded-lg text-sm md:text-base"
      >
        Filter
      </button> -->
    </div>
    <!-- Search bar -->
    <div class="mb-3 md:mb-4 relative">
      <input
        type="text"
        placeholder="Search By Tasks Title ..."
        class="border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent rounded-lg px-3 md:px-4 py-2 w-full"
        @input="searchTasks"
      />
    </div>
    <!-- Task List Container with fixed height and overflow -->
    <div class="task-list-container h-80 md:h-auto overflow-x-auto md:overflow-y-auto">
      <!-- Task List -->
      <div class="min-w-full">
        <div
          class="md:overflow-scroll sm:overflow-scroll overflow-hidden border border-gray-200 rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <!-- Column Headers -->
            <thead class="bg-gray-50">
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
                <td class="px-3 md:px-6 py-3 md:py-4 whitespace-nowrap">{{ task.title }}</td>
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
                <td
                  class="px-3 md:px-6 py-4 whitespace-nowrap text-center text-gray-500"
                  colspan="5"
                >
                  <div class="flex-center no-tasks-message">
                    <p>No tasks found.</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Pagination controls -->
    <div class="flex justify-center mt-4" v-if="totalPages > 1">
      <button
        v-for="page in totalPages"
        :key="page"
        @click="changePage(page)"
        :class="{ 'bg-black text-white': currentPage === page, 'ml-2': page !== 1 }"
        class="px-3 py-2 rounded-md hover:opacity-50 focus:outline-none"
      >
        {{ page }}
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
      sortOrder: 'asc'
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
      await axios
        .delete('/api/admin/tasks/' + task.id) // Assuming you have an endpoint to fetch task data
        .then(async (response) => {
          toast.info(response.data.message)
          console.log(this.user)
          await axios
            .get('/api/admin/users/' + this.user) // Assuming you have an endpoint to fetch task data
            .then((response) => {
              console.log(response.data)
              this.tasks = response.data.user.tasks
              console.log(this.tasks)
            })
            .catch((response, error) => {
              toast.info(response.data.error)
              console.log(error)
            })
        })
        .catch((response, error) => {
          toast.info(response.data.error)
          console.log(error)
        })
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
      this.filteredTasks.sort((a, b) => {
        let comparison = 0
        if (column === 'deadline') {
          const dateA = new Date(a[column])
          const dateB = new Date(b[column])
          comparison = dateA - dateB
        } else {
          if (a[column] > b[column]) {
            comparison = 1
          } else if (a[column] < b[column]) {
            comparison = -1
          }
        }
        return this.sortOrder === 'asc' ? comparison : -comparison
      })
    }
  }
}
</script>

<style scoped>
.relative:hover .absolute {
  opacity: 1;
}
.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.no-tasks-message {
  padding: 10px;
  background-color: #f3f4f6;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.rotate-180 {
  transform: rotate(180deg);
}
</style>
