<template>
  <div class="bg-white shadow-2xl rounded-md top-9 right-72 max-w-96 py-4">
    <div class="px-10 py-5 text-slate-900 font-medium" v-if="notifications.length == 0">
      <p>No unread notifications!!</p>
    </div>
    <div v-else>
      <div
        v-for="notification in notifications"
        :key="notification.id"
        class="hover:bg-slate-100 duration-200 px-6 py-2 cursor-pointer"
      >
        <p class="text-slate-900 font-medium">{{ notification.data.text }}</p>
        <p class="text-sm text-slate-500">{{ notification.created_at }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted } from 'vue'
import { useToast } from 'vue-toast-notification'

const toast = useToast()

defineProps(['notifications'])
onMounted(() => {
  axios.post('/api/user/notifications/mark_as_read').catch(() => {
    toast.error('something went wrong')
  })
})
</script>
