<template>
  <div class="sm:flex space-x-10 font-bold text-slate-500 hidden">
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
      @click="handleCategoryChange(link.name)"
    >
      {{ link.name }}
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  navLinks: Array
})
import { useRouter } from 'vue-router'

const router = useRouter()
const handleCategoryChange = (value) => {
  let filter = ''
  if (link.name !== 'All Tasks') {
    filter = link.filter
  }
  router.push({ query: { ...$route.query, filter } })
}
</script>
