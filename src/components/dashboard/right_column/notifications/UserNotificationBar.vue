<template>
  <div
    class="flex z-20 justify-end items-center space-x-4 pb-4 text-slate-700 text-xl font-medium relative"
  >
    <span class="material-symbols-outlined cursor-pointer"> refresh </span>
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
      <div>
        <button
          @click="showmenu"
          class="flex items-center text-sm pe-1 font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:me-0 dark:text-white"
          type="button"
        >
          <span class="sr-only">Open user menu</span>
          <img
            class="w-8 h-8 me-2 rounded-full"
            src="https://avatars.githubusercontent.com/u/47273253?v=4"
            alt="user photo"
          />
          {{ $store.getters.userName }}
          <svg
            class="w-2.5 h-2.5 ms-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
        <div
          v-if="menu"
          class="absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600"
        >
          <div class="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div class="font-medium">Pro User</div>
            <div class="truncate">{{ $store.getters.User.email }}</div>
          </div>
          <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li v-for="item in userMenuItems" :key="item.to">
              <router-link
                :to="item.to"
                class="flex gap-1 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <span :class="item.iconClass"> {{ item.name }} </span>{{ item.label }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
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
const menu = ref(false)
const toast = useToast()

const showmenu = () => {
  menu.value = !menu.value
}

const notifications = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('/api/user/notifications')
    notifications.value = res?.data?.data
  } catch {
    toast.error('something went wrong ')
  }
})

// Define user menu items
const userMenuItems = [
  { to: '/', label: 'Dashboard', name: 'dashboard', iconClass: 'material-symbols-outlined' },
  { to: '/profile', label: 'Profile', name: 'person', iconClass: 'material-symbols-outlined' },
  { to: '/logout', label: 'Sign Out', name: 'logout', iconClass: 'material-symbols-outlined' }
]
</script>
