<template>
  <div class="flex h-screen">
    <LeftImg />
    <div class="w-full bg-gray-100 lg:w-1/2 flex items-center justify-center">
      <div class="max-w-md w-full p-6">
        <header class="text-3xl font-semibold mb-6 text-black text-center">Sign Up</header>
        <h1 class="text-sm font-semibold mb-6 text-gray-500 text-center">
          Join to Our Task Scheduler Tool with all time access and free
        </h1>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">Name</label>
            <input
              v-model.trim="name"
              type="text"
              id="name"
              name="name"
              required
              placeholder="Name"
              @blur="validateName"
              class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
            />
            <p v-if="nameValidity === 'invalid'" class="text-red-500 text-xs">
              {{ nameValidityMessage }}
            </p>
          </div>
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
              id="password"
              v-model="password"
              required
              placeholder="*******"
              @blur="validatePassword"
              class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
            />
            <p v-if="passwordValidity === 'invalid'" class="text-red-500 text-xs">
              {{ passwordValidityMessage }}
            </p>
          </div>
          <div>
            <label for="confirm password" class="block text-sm font-medium text-gray-700"
              >Confirm Password</label
            >
            <input
              type="password"
              id="confirm password"
              v-model="confirmPassword"
              placeholder="*******"
              @blur="validateConfirmPassword"
              class="mt-1 p-2 w-full border rounded-md focus:border-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-colors duration-300"
            />
            <p v-if="confirmPasswordValidity === 'invalid'" class="text-red-500 text-xs">
              {{ confirmPasswordValidityMessage }}
            </p>
          </div>

          <div>
            <button
              class="bg-black w-full border-2 border-black transition-all duration-300 hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              <v-icon v-if="loading" class="animate-spin" icon="mdi-loading"></v-icon>
              <span v-else>Sign up</span>
            </button>
          </div>
        </form>
        <div class="mt-4 text-sm text-gray-600 text-center">
          <p>
            Already have an account?
            <router-link class="text-black hover:underline" to="/login"> Sign in </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted } from 'vue'
import { ref } from 'vue'
import LeftImg from './leftside_img/LeftImg.vue'
// import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toast-notification'
import { useStore } from 'vuex'

const store = useStore()
// const router = useRouter()
// const route = useRoute()

const name = ref(null)
const nameValidity = ref(null)
const nameValidityMessage = ref(null)

const email = ref(null)
const emailValidity = ref(null)
const emailValidityMessage = ref(null)

const password = ref(null)
const passwordValidity = ref(null)
const passwordValidityMessage = ref(null)

const confirmPassword = ref(null)
const confirmPasswordValidity = ref(null)
const confirmPasswordValidityMessage = ref(null)

const errorMessages = ref([])

const loading = ref(false)
// const redirectUrl = route.query.redirect || '/login'
const toast = useToast()

const handleSubmit = async () => {
  if (
    nameValidity.value !== 'valid' ||
    emailValidity.value !== 'valid' ||
    passwordValidity.value !== 'valid' ||
    confirmPasswordValidity.value !== 'valid'
  ) {
    errorMessages.value = ['Please enter the required fields!']
  } else {
    try {
      loading.value = true
      await store.dispatch('register', {
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: confirmPassword.value
      })

      toast.success('Verification email sent. Check your mailbox for more details')
      // router.replace(redirectUrl)
    } catch (err) {
      toast.error(err || 'Something went wrong')
    } finally {
      loading.value = false
    }
  }
}

const validateName = () => {
  if (!name.value) {
    nameValidity.value = 'invalid'
    nameValidityMessage.value = 'Name cannot be empty'
  } else {
    nameValidity.value = 'valid'
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

const validatePassword = () => {
  if (!password.value) {
    passwordValidity.value = 'invalid'
    passwordValidityMessage.value = 'Password cannot be empty'
  } else if (password.value.length < 6) {
    passwordValidity.value = 'invalid'
    passwordValidityMessage.value = 'Password length must be greater than 6'
  } else {
    passwordValidity.value = 'valid'
  }
}

const validateConfirmPassword = () => {
  if (!confirmPassword.value) {
    confirmPasswordValidity.value = 'invalid'
    confirmPasswordValidityMessage.value = 'Confirm Password cannot be empty'
  } else if (confirmPassword.value !== password.value) {
    confirmPasswordValidity.value = 'invalid'
    confirmPasswordValidityMessage.value = 'Input Passwords do not match'
  } else {
    confirmPasswordValidity.value = 'valid'
  }
}

onMounted(async () => {
  await axios.get('sanctum/csrf-cookie')
})
</script>

<style scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-image: none;
}
</style>
