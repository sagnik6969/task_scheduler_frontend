<template>
  <div class="flex px-4 py-2 border-2 border-slate-800 rounded-xl bg-slate-100 relative">
    <div
      class="flex-[3] flex items-center cursor-pointer"
      @mouseover="hoveredUser = user.id"
      @mouseout="hoveredUser = null"
    >
      <!-- @click="viewProfile(user)" -->
      <h1 class="text-slate-800 text-lg font-medium">{{ user.name }}</h1>
    </div>
    <div
      v-if="hoveredUser === user.id"
      class="absolute top-full left-0 bg-black opacity-80 border rounded-xl animate-pulsee border-white p-2 text-sm text-white z-10"
    >
      <p>Email: {{ user.email }}</p>
      <p>Last Updated: {{ formatDate(user.updated_at) }}</p>
    </div>
    <div class="flex-1 space-x-1 flex items-center justify-center font-medium text-slate-700">
      <tooltip text="pending tasks">
        <v-icon icon="mdi-circle" class="text-red-600"></v-icon>
      </tooltip>
      <span>{{ user.incomplete_tasks }}</span>
    </div>
    <div class="flex-1 space-x-1 flex items-center justify-center font-medium text-slate-700">
      <tooltip text="completed tasks">
        <v-icon icon="mdi-circle" class="text-green-500"></v-icon>
      </tooltip>
      <span>{{ user.completed_tasks }}</span>
    </div>
    <div class="flex-1 flex items-center justify-center text-slate-700">
      <Tooltip text="View stats">
        <v-icon
          @click="$emit('userSelected')"
          class="px-4 py-4 rounded-full hover:bg-slate-300 duration-200 cursor-pointer"
          icon="mdi-eye"
        ></v-icon>
      </Tooltip>
    </div>
    <!-- <div v-if="isViewingProfile" class="user-profile-container">
      <user-profile
        :userDetails="selectedUser"
        @delete-user="deleteUser"
        @make-admin="makeAdmin"
        @close-user-profile="closeUserProfile"
      />
    </div> -->
  </div>
</template>

<script setup>
import Tooltip from '@/components/ui/Tooltip.vue'
import { ref } from 'vue'
defineProps(['user'])
defineEmits(['userSelected'])
const hoveredUser = ref(null)

const formatDate = (date) => {
  const options = {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }
  const formattedDate = new Date(date).toLocaleDateString('en-GB', options)
  return formattedDate
}
</script>

<style scoped></style>
