<template>
  <div
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
      :class="
        open ? 'justify-start ' : 'justify-center items-start  text-white text-sm space-y-2 px-2'
      "
    >
      <router-link to="/admin" class="button flex items-center">
        <span class="material-symbols-outlined text-white mr-4"> dashboard </span>
        <span class="text-sm text-white">Admin dashboard</span>
      </router-link>

      <router-link to="/" class="button flex items-center">
        <span class="material-symbols-outlined text-white mr-4"> add_task </span>
        <span class="text-sm text-white">Tasks</span>
      </router-link>
      <router-link to="/manage-tasks" class="button flex items-center">
        <span class="material-symbols-outlined text-white mr-4"> sort </span>
        <span class="text-sm text-white">Manage</span>
      </router-link>
      <router-link to="/settings" class="button flex items-center">
        <span class="material-icons text-white mr-4">settings</span>
        <span class="text-sm text-white">settings</span>
      </router-link>
      <router-link to="/logout" class="button flex items-center">
        <span class="material-icons text-white mr-4">logout</span>
        <span class="text-sm text-white">Logout</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const open = ref(false)

const toggle = () => {
  open.value = !open.value
}
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
