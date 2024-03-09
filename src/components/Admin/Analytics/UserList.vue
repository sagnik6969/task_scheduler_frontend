<template>
  <div class="space-y-3 extras overflow-x-scroll [&::-webkit-scrollbar]:hidden mb-10">
    <h1 class="text-2xl font-semibold text-slate-900">User List</h1>
    <search-box v-model="filterText" class="mb-3 w-3/4" placeholder="Search users...."></search-box>
    <div style="margin-bottom: 1.6rem"></div>
    <single-user-card
      v-for="user in paginatedUsers"
      @click="selectUser(user)"
      :key="user.id"
      :user="user"
    >
    </single-user-card>
    <div
      class="flex justify-center w-full px-4"
      v-if="filteredUsers.length !== 0 && totalPages !== 1"
    >
      <button
        class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-600 focus:outline-none mr-2"
        :disabled="currentPage === 1"
        :class="{ 'bg-gray-600': currentPage === 1 }"
        @click="prevPage"
      >
        <img src="@/assets/images/db-arrow-rev.png" alt="Previous" width="16" height="20" />
      </button>
      <div class="flex">
        <button
          v-for="pageNumber in totalPageButtons"
          :key="pageNumber"
          :class="[
            'px-3 py-2 mx-1 bg-white text-black rounded-md hover:bg-gray-500 focus:outline-none border-b',
            { 'border-b-2 border-black ': pageNumber === currentPage }
          ]"
          @click="gotoPage(pageNumber)"
        >
          {{ pageNumber }}
        </button>
      </div>
      <button
        class="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-600 focus:outline-none ml-2"
        :disabled="currentPage === totalPages"
        :class="{ 'bg-gray-600': currentPage === totalPages }"
        @click="nextPage"
      >
        <img src="@/assets/images/db-arrow-fwd.png" alt="Next" width="16" height="20" />
      </button>
    </div>
    <div
      v-else-if="totalPages !== 1"
      class="text-center flex flex-col justify-center items-center w-4/6 pb-10"
    >
      <img src="@/assets/images/not_exist.jpg" class="justif" alt="" width="180px" height="180px" />
      <p class="text-gray-500 mt-2 mb-2 text-xl font-bold">No user found...</p>
    </div>
  </div>
</template>

<script setup>
import SingleUserCard from './SingleUserCard.vue'
import SearchBox from '@/components/ui/SearchBox.vue'
import { computed, ref, defineProps } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const filterText = ref('')
const currentPage = ref(1)
const usersPerPage = 4

const filteredUsers = computed(() => {
  return store.getters['adminUserList/userList'].filter((user) => {
    return user.name.toLowerCase().includes(filterText.value.toLowerCase())
  })
})

const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * usersPerPage
  const endIndex = startIndex + usersPerPage
  return filteredUsers.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => Math.ceil(filteredUsers.value.length / usersPerPage))

const totalPageButtons = computed(() => {
  return Array.from({ length: totalPages.value }, (_, index) => index + 1)
})

const prevPage = () => {
  currentPage.value -= 1
}

const nextPage = () => {
  currentPage.value += 1
}

const gotoPage = (pageNumber) => {
  currentPage.value = pageNumber
}
const selectUser = (user) => {
  store.dispatch('adminUserList/selectUser', user)
}
</script>

<style scoped>
@media screen and (max-width: 763px) {
  .extras {
    /* height: 0; */
  }
}
</style>
