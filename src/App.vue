<template>
  <router-view></router-view>
</template>
<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
const toast = useToast()
const route = useRoute()
const router = useRouter()
onMounted(async () => {
  await router.isReady()
  const message = route.query.message
  // console.log(message)
  if (message) toast.info(message)
})
</script>
