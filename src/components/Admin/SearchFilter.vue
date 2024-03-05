<template>
  <div class="relative flex items-center justify-between mb-4">
    <!-- Search Bar -->
    <div class="relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="searchUsers"
        class="border rounded-md py-2 pl-4 pr-10 w-full md:w-96 focus:outline-none focus:border-blue-500 transition duration-300 ease-in-out hover:border-blue-400"
        placeholder="Search users..."
        @mouseover="showHelpText = true"
        @mouseleave="showHelpText = false"
      />
      <!-- <img
        src="../../assets/images/search.png"
        alt="search_icon"
        class="absolute right-3 top-3 h-6 w-6 text-gray-400"
      /> -->
      <div
        class="absolute top-0 bottom-0 right-0 flex w-10 items-center justify-center text-slate-600 text-xl"
      >
        <v-icon icon="mdi-magnify"></v-icon>
      </div>
    </div>

    <!-- Filter Dropdown -->
    <div class="relative" x-data="{ open: false }">
      <span class="material-symbols-outlined cursor-pointer" @click="refreshEmit"> refresh</span>
      <button @click="open = !open" class="ml-2 focus:outline-none">
        <img src="@/assets/images/filter.png" alt="Filter" class="ml-3 h-6 w-6 cursor-pointer" />
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
      showHelpText: false,
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
    },
    refreshEmit() {
      // console.log(111)
      this.$emit('refresh-users')
    }
  }
}
</script>

<style scoped>
/* Add your custom CSS styles here */
/* Style for filter dropdown */
.absolute.right-0::before {
  content: '';
  position: absolute;
  top: -10px;
  right: 12px;
  border-style: solid;
  border-width: 0 8px 8px 8px;
  border-color: transparent transparent white transparent;
}

/* Style for filter dropdown button */
.relative button::after {
  content: '';
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  border: solid black;
  border-width: 0 1px 1px 0;
  padding: 3px;
  transition: transform 0.3s ease;
}

.relative button.open::after {
  transform: translateY(-50%) rotate(-135deg);
}
</style>
