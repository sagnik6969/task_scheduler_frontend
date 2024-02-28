<template>
  <div class="space-y-3 h-screen overflow-x-scroll [&::-webkit-scrollbar]:hidden">
    <h1 class="text-2xl font-semibold text-slate-900">User List</h1>
    <search-box v-model="filterText" class="mb-3" placeholder="Search users...."></search-box>
    <single-user-card
      v-for="user in filteredUsers"
      :key="user.id"
      :user="user"
      @userSelected="() => $emit('userSelected', user)"
    >
    </single-user-card>
  </div>
</template>
<script setup>
import SingleUserCard from './SingleUserCard.vue'
import SearchBox from '@/components/ui/SearchBox.vue'
import { computed, ref } from 'vue'
const props = defineProps(['users'])
defineEmits(['userSelected'])

const filterText = ref('')

const filteredUsers = computed(() => {
  return props.users.filter((user) => {
    return user.name.toLowerCase().includes(filterText.value.toLowerCase())
  })
})
</script>
