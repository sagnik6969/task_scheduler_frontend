<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="w-full max-w-xs sm:max-w-xs md:max-w-md lg-max-w-lg">
      <form
        @submit.prevent="handleSubmit"
        class="bg-gray-200 border-1 border-black shadow-lg rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label class="block text-black text-sm font-bold mb-2" for="username"> Email </label>
          <input
            class="shadow appearance-none border-2 border-black rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
            v-model.trim="email"
            type="text"
            placeholder="Email"
            required
            @blur="validateEmail"
          />
          <p v-if="emailValidity === 'invalid'" class="text-red-500 text-xs">
            {{ emailValidityMessage }}
          </p>
        </div>
        <div class="mb-4">
          <label class="block text-black text-sm font-bold mb-2" for="password"> Password </label>
          <input
            class="shadow appearance-none border-2 border-black rounded w-full py-2 px-3 text-black mb-3 leading-tight focus:outline-none focus:shadow-outline"
            v-model="password"
            type="password"
            required
            placeholder="*******"
          />
        </div>
        <a class="text-blue-400 hover:text-blue-700 underline" href="#!">Forgot password?</a>
        <span class="block" v-if="errorMessages">
          <span v-for="error in errorMessages" :key="error" class="text-red-500 text-xs">{{
            error
          }}</span>
        </span>
        <div class="flex items-center mt-2 justify-center">
          <button
            class="bg-black w-full border-2 border-black transition-all duration-300 hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
        </div>
      </form>
      <div class="mt-10 justify-center flex text-black">
        <span class=""> Don't have an account? </span>
        <router-link class="ml-2 underline hover:text-blue-700 text-blue-400" to="/register">
          Sign up
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
const emailValidity = ref('')
const emailValidityMessage = ref('')

const password = ref('')
const errorMessages = ref([])
const redirectUrl = route.query.redirect || '/'

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    return errorMessages.value.push('Email and password are required')
  } else {
    try {
      await store.dispatch('login', {
        email: email.value,
        password: password.value
      })
      router.replace(redirectUrl)
    } catch {
      console.log('Login Failed')
    }
  }
}

const validateEmail = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!email.value) {
    emailValidity.value = 'invalid'
    emailValidityMessage.value = 'Email cannot be empty'
  } else if (!emailRegex.test(email.value)) {
    emailValidity.value = 'invalid'
    emailValidityMessage.value = 'Please enter a valid email'
  } else {
    emailValidity.value = 'valid'
  }
}

onMounted(async () => {
  await axios.get('sanctum/csrf-cookie')
})
</script>
