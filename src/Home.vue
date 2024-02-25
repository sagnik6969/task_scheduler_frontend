<template>
  <div v-if="isLoading" class="h-screen w-full flex items-center justify-center bg-slate-100">
    <v-progress-circular :size="50" :width="5" color="purple" indeterminate></v-progress-circular>
  </div>
  <div v-else class="flex h-screen">
    <Sidebar></Sidebar>
    <router-view class="flex-grow h-full"></router-view>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar/Sidebar.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const isLoading = ref(true)

onMounted(() => {
  store
    .dispatch('tryLogIn')
    .then(() => {
      isLoading.value = false
    })
    .catch(() => {
      router.push('/login')
    })
})
</script>
