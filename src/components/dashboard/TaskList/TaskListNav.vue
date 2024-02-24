<template>
  <div class="flex space-x-10 font-bold text-slate-500">
    <a
      v-for="link in navLinks"
      :key="link.name"
      :class="{ 'text-slate-900': link.active }"
      class="cursor-pointer hover:text-slate-900 duration-300"
    >
      {{ link.name }}
    </a>
  </div>
</template>

<script setup>
defineProps({
  navLinks: Array
})
</script>
