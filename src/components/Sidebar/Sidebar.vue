<template>
  <div>
    <div
      v-if="!ismobile"
      :class="{ 'w-64': open, 'w-16': !open }"
      class="bg-black text-black h-screen overflow-hidden transition-all duration-300"
    >
      <div class="py-4 flex items-center justify-center">
        <img
          src="https://avatars.githubusercontent.com/u/47273253?v=4"
          alt="profile pic"
          class="rounded-full object-cover border-2 border-white"
          :class="open ? 'w-20 h-20' : 'w-12 h-12'"
        />
      </div>

      <div class="flex justify-end mb-4">
        <button class="focus:outline-none" @click="toggle">
          <span v-if="open" class="material-symbols-outlined text-white"> switch_left </span>
          <span v-if="!open" class="material-symbols-outlined text-white"> switch_right </span>
        </button>
      </div>
      <div
        class="menu flex flex-col gap-2"
        :class="{
          'justify-start': open,
          'justify-center items-start text-white text-sm space-y-2 px-2': !open
        }"
      >
        <router-link
          v-for="link in links"
          :to="link.path"
          class="button flex items-center"
          :key="link.path"
        >
          <span v-if="link.icon" class="text-white mr-4" :class="link.iconClass">{{
            link.iconname
          }}</span>
          <span class="text-sm text-white">{{ link.label }}</span>
        </router-link>
      </div>
    </div>
    <div v-else class="bg-black">
      <div class="flex justify-center items-center p-4">
        <button clss="focus:outline-none" @click="toggle" v-tooltip="'Menu'">
          <span class="material-icons text-white">menu</span>
        </button>
      </div>

      <div class="flex flex-col p-4 gap-10 items-center justify-center" v-if="open">
        <router-link to="/profile" class="button flex items-center">
          <img
            src="https://avatars.githubusercontent.com/u/47273253?v=4"
            alt="profile pic"
            class="object-cover w-10 h-10 rounded-full min-w-10 min-h-10"
          />
        </router-link>
        <router-link
          v-for="link in links"
          :to="link.path"
          class="button flex items-center justify-center"
          :key="link.path"
        >
          <span v-if="link.icon" class="text-white" :class="link.iconClass">{{
            link.iconname
          }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const open = ref(false)
const ismobile = ref(false)
const toggle = () => {
  open.value = !open.value
}
const links = [
  {
    path: '/admin',
    label: 'Admin dashboard',
    icon: true,
    iconClass: 'material-symbols-outlined ',
    iconname: 'dashboard'
  },
  {
    path: '/',
    label: 'Tasks',
    icon: true,
    iconClass: 'material-symbols-outlined ',
    iconname: 'add_task'
  },
  {
    path: '/manage-tasks',
    label: 'Manage',
    icon: true,
    iconClass: 'material-symbols-outlined ',
    iconname: 'sort'
  },
  {
    path: '/settings',
    label: 'Settings',
    icon: true,
    iconClass: 'material-icons ',
    iconname: 'settings'
  },
  { path: '/logout', label: 'Logout', icon: true, iconClass: 'material-icons ', iconname: 'logout' }
]

onMounted(() => {
  if (window.innerWidth < 680) {
    ismobile.value = true
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth < 680) {
      ismobile.value = true
    } else {
      ismobile.value = false
    }
  })
})
onUnmounted(() => {
  window.removeEventListener('resize', () => {
    if (window.innerWidth < 680) {
      ismobile.value = true
    } else {
      ismobile.value = false
    }
  })
})
</script>

<style>
.menu-toggle-wrap .material-icons {
  font-size: 24px;
}
.menu .button {
  padding: 0.5rem 1rem;
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease-in-out;
}
.menu .button:hover {
  cursor: pointer;
  background-color: rgb(233, 45, 59);
}
</style>
