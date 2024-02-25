<template>
  <div class="h-screen w-full flex items-center justify-center bg-slate-100">
    <v-progress-circular :size="50" :width="5" color="purple" indeterminate></v-progress-circular>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
const store = useStore()
const router = useRouter()
store.dispatch('logout').then(() => {
  router.push('/login')
})
</script>
