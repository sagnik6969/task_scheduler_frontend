<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="w-full max-w-xs bg-gray-200 shadow-lg rounded px-8 pt-6 pb-8 mb-4">
      <form @submit.prevent="handleSubmit" class="">
        <div class="mb-4">
          <label class="block text-black text-sm font-bold mb-2" for="username"> Email </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            v-model="email"
            type="text"
            placeholder="Email"
          />
        </div>
        <div class="mb-6">
          <label class="block text-black text-sm font-bold mb-2" for="password"> Password </label>
          <input
            class="shadow appearance-none border w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
            v-model="password"
            type="password"
            placeholder="*******"
          />
        </div>
        <a class="text-blue underline" href="#!">Forgot password?</a>
        <div class="flex items-center mt-2 justify-center">
          <button
            class="bg-black w-full hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
      <div class="mt-10 flex text-black">
        <span class="w-1/2"> Don't have an account? </span>
        <router-link
          class="text-center rounded-md border-2 border-red-600 p-3 text-red-700"
          to="/register"
        >
          Register Now
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
}
</style>

<script setup>
import axios from 'axios'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')

const redirectUrl = route.query.redirect || '/'

const handleSubmit = async () => {
  try {
    await store.dispatch('login', {
      email: email.value,
      password: password.value
    })
    router.replace(redirectUrl)
  } catch {}
}

onMounted(async () => {
  await axios.get('sanctum/csrf-cookie')
})
</script>
