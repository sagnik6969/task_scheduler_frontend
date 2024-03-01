<template>
  <div class="flex justify-end items-center space-x-4 pb-4 text-slate-700 text-xl font-medium">
    <tooltip text="view notifications">
      <div
        @click="isNotificationsVisible = !isNotificationsVisible"
        class="p-1 rounded-full duration-300 hover:bg-slate-200 cursor-pointer"
      >
        <v-badge :content="notifications.length">
          <v-icon icon="mdi-bell-outline"></v-icon>
        </v-badge>
        <teleport to="body">
          <notification-container
            :notifications="notifications"
            v-if="isNotificationsVisible"
            class="fixed top-0 right-0 z-10"
          ></notification-container>
        </teleport>
      </div>
    </tooltip>

    <div class="flex space-x-2 items-center">
      <tooltip text="view profile">
        <div
          class="p-1 rounded-full duration-300 hover:bg-slate-200 cursor-pointer"
          @click="$router.push('/settings')"
        >
          <v-icon class="" icon="mdi-account-circle"></v-icon>
        </div>
      </tooltip>
      <p>{{ $store.getters.userName }}</p>
    </div>
  </div>
</template>

<script setup>
import NotificationContainer from './NotificationContainer.vue'
import Tooltip from '@/components/ui/Tooltip.vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { useToast } from 'vue-toast-notification'
const isNotificationsVisible = ref(false)

const toast = useToast()

const notifications = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('/api/user/notifications')
    notifications.value = res?.data?.data
  } catch {
    toast.error('something went wrong ')
  }
})
</script>
