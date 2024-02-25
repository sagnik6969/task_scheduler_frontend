<template>
  <div class="flex space-x-10 font-bold text-slate-500">
    <router-link
      v-for="link in navLinks"
      :key="link.name"
      class="cursor-pointer hover:text-slate-900 duration-300"
      :class="{
        'text-slate-800': link.active
      }"
      :to="{
        query: {
          ...$route.query,
          filter: link.filter
        }
      }"
    >
      {{ link.name }}
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  navLinks: Array
})
</script>
