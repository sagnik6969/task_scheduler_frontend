<template>
  <div class="flex h-screen">
    <LeftImg />
    <div class="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
      <div class="max-w-md w-full p-6">
        <h1 class="text-3xl font-semibold mb-6 text-black text-center">Sign in</h1>
        <h1 class="text-sm font-semibold mb-6 text-gray-500 text-center">
          Welcome back to our Task Scheduler Tool
        </h1>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              v-model.trim="email"
              required
              placeholder="Email"
              @blur="validateEmail"
              class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
            />
            <p v-if="emailValidity === 'invalid'" class="text-red-500 text-xs">
              {{ emailValidityMessage }}
            </p>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              v-model="password"
              id="password"
              required
              placeholder="*******"
              @blur="validatePassword"
              class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
            />
            <!-- <p v-if="passwordValidity === 'invalid'" class="text-red-500 text-xs">
              {{ passwordValidityMessage }}
            </p> -->
          </div>

          <div>
            <button
              class="bg-black w-full border-2 border-black transition-all duration-300 hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              data-testid="sign-in-button"
            >
              <v-icon v-if="loading" class="animate-spin" icon="mdi-loading"></v-icon>
              <span v-else>Sign In</span>
            </button>
          </div>
        </form>
        <div class="mt-4 text-sm text-gray-600 text-center">
          <p>
            Don't have an account?
            <router-link class="text-black hover:underline" to="/register"> Sign up </router-link>
          </p>
        </div>
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
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'
import LeftImg from './leftside_img/LeftImg.vue'
const store = useStore()
const router = useRouter()
const route = useRoute()
const toast = useToast()

const email = ref('')
const emailValidity = ref('')
const emailValidityMessage = ref('')
const loading = ref(false)

const password = ref('')
const errorMessages = ref([])
const redirectUrl = route.query.redirect || '/'

const handleSubmit = async () => {
  if (!email.value || !password.value) {
    return errorMessages.value.push('Email and password are required')
  } else {
    try {
      loading.value = true
      await store.dispatch('login', {
        email: email.value,
        password: password.value
      })
      router.replace(redirectUrl)
    } catch (err) {
      toast.error(err || 'Something went wrong')
      // console.log('Login Failed')
    } finally {
      loading.value = false
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
