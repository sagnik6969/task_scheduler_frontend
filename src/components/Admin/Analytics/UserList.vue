<template>
  <div class="space-y-3 h-screen overflow-x-scroll [&::-webkit-scrollbar]:hidden">
    <h1 class="text-2xl font-semibold text-slate-900">User List</h1>
    <search-box v-model="filterText" class="mb-3 w-3/4" placeholder="Search users...."></search-box>
    <div style="margin-bottom: 1.6rem"></div>
    <single-user-card
      v-for="user in paginatedUsers"
      :key="user.id"
      :user="user"
      @userSelected="() => $emit('userSelected', user)"
    >
    </single-user-card>
    <div class="flex justify-between w-full px-4">
      <button
        class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none"
        :disabled="currentPage === 1"
        @click="prevPage"
      >
        Previous
      </button>
      <button
        class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 focus:outline-none"
        :disabled="currentPage === totalPages"
        @click="nextPage"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
import SingleUserCard from './SingleUserCard.vue'
import SearchBox from '@/components/ui/SearchBox.vue'
import { computed, ref, defineProps } from 'vue'

const props = defineProps({
  users: Array
})

const filterText = ref('')
const currentPage = ref(1)
const usersPerPage = 4

const filteredUsers = computed(() => {
  return props.users.filter((user) => {
    return user.name.toLowerCase().includes(filterText.value.toLowerCase())
  })
})

const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * usersPerPage
  const endIndex = startIndex + usersPerPage
  return filteredUsers.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / usersPerPage))

const prevPage = () => {
  currentPage.value -= 1
}

const nextPage = () => {
  currentPage.value += 1
}
</script>

<style scoped>
/* Your styling for pagination buttons */
</style>
