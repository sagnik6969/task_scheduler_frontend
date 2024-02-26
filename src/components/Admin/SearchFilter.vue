<template>
  <div class="relative flex items-center justify-between mb-4">
    <!-- Search Bar -->
    <div class="relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="searchUsers"
        class="border rounded-md py-2 pl-4 pr-10 w-full md:w-96 focus:outline-none focus:border-blue-500"
        placeholder="Search users..."
      />
      <svg
        class="absolute right-3 top-3 h-6 w-6 text-gray-400"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M15 15l5-5-5-5M10 4a6 6 0 100 12 6 6 0 000-12z" />
      </svg>
    </div>

    <!-- Filter Dropdown -->
    <div class="relative" x-data="{ open: false }">
      <button @click="open = !open" class="ml-2 focus:outline-none">
        <img src="@/assets/images/filter.png" alt="Filter" class="h-6 w-6 cursor-pointer" />
      </button>

      <div
        v-if="open"
        x-show="open"
        class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-10"
      >
        <button
          v-for="(option, index) in filterOptions"
          :key="index"
          @click="handleFilter(option)"
          class="block w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:outline-none"
        >
          {{ option }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    usersData: Array
  },
  data() {
    return {
      open: false,
      searchQuery: '',
      filterOptions: ['Sort by Name', 'Sort by Date Created']
    }
  },
  methods: {
    handleFilter(option) {
      // Handle filter selection
      // Emit corresponding event to parent component
      if (option === 'Sort by Name') {
        this.$emit('sort-by-name')
      } else if (option === 'Sort by Date Created') {
        this.$emit('sort-by-date')
      }
      this.open = !this.open
    },
    searchUsers() {
      // Filter users based on search query
      const query = this.searchQuery.toLowerCase().trim()
      const filteredUsers = this.usersData.filter((user) => {
        return user.name.toLowerCase().includes(query)
      })
      this.$emit('search-users', filteredUsers)
    }
  }
}
</script>

<style scoped>
/* Add your custom CSS styles here */
</style>
