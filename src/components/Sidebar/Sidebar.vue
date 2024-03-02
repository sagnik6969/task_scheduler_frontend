<template>
  <div>
    <div
      v-if="!ismobile"
      :class="{ 'w-64': open, 'w-16': !open }"
      class="bg-black text-black h-screen overflow-hidden transition-all duration-300 fixed z-50 shadow-md"
    >
      <!-- fixed top-0 start-0 z-50 -->
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
    <div v-else class="fixed bg-black max-h-screen overflow-hidden z-20">
      <div class="flex justify-center items-center p-4">
        <button class="focus:outline-none" @click="toggle">
          <span :class="{ 'rotate-90': open }" class="material-icons text-white">{{
            open ? 'close' : 'menu'
          }}</span>
        </button>
      </div>

      <div class="flex flex-col h-screen sticky p-4 gap-10 justify-start" v-if="open">
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
          class="button flex justify-start"
          :key="link.path"
        >
          <span v-if="link.icon" class="text-white" :class="link.iconClass">{{
            link.iconname
          }}</span>
          <span class="text-sm text-white">{{ link.label }}</span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const open = ref(false)
const ismobile = ref(false)

const toggle = () => {
  open.value = !open.value
}

const isAdmin = computed(() => store.getters.User.is_admin)

const links = [
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
  if (window.innerWidth < 768) {
    ismobile.value = true
  }
  window.addEventListener('resize', () => {
    ismobile.value = window.innerWidth < 768
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', () => {
    ismobile.value = window.innerWidth < 680
  })
})

const adminLink = {
  path: '/admin',
  label: 'Admin dashboard',
  icon: true,
  iconClass: 'material-symbols-outlined',
  iconname: 'dashboard'
}

if (isAdmin.value === 1) {
  links.unshift(adminLink)
}

onMounted(() => {
  if (window.innerWidth < 768) {
    ismobile.value = true
  }
  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
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

<style scoped>
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
.rotate-90 {
  transform: rotate(90deg);
}
</style>
