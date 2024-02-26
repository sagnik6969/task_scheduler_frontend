<template>
  <div class="w-full h-screen flex items-center justify-center">
    <div class="w-full max-w-xs sm:max-w-xs md:max-w-md lg-max-w-lg">
      <form
        @submit.prevent="handleSubmit"
        class="bg-gray-200 border-1 border-black shadow-lg rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label class="block text-black text-sm font-bold mb-2" for="name"> Name </label>
          <input
            class="shadow appearance-none border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model.trim="name"
            type="text"
            placeholder="Name"
            required
            @blur="validateName"
          />
          <p v-if="nameValidity === 'invalid'" class="text-red-500 text-xs">
            {{ nameValidityMessage }}
          </p>
        </div>
        <div class="mb-4">
          <label class="block text-black text-sm font-bold mb-2" for="email"> Email </label>
          <input
            class="shadow appearance-none border-2 border-black rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            class="shadow appearance-none border-2 border-black w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="password"
            type="password"
            required
            placeholder="*******"
            @blur="validatePassword"
          />
          <p v-if="passwordValidity === 'invalid'" class="text-red-500 text-xs">
            {{ passwordValidityMessage }}
          </p>
        </div>
        <div class="mb-4">
          <label class="block text-black text-sm font-bold mb-2" for="password">
            Confirm Password
          </label>
          <input
            class="shadow appearance-none border-2 border-black w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            v-model="confirmPassword"
            type="password"
            placeholder="*******"
            @blur="validateConfirmPassword"
          />
          <p v-if="confirmPasswordValidity === 'invalid'" class="text-red-500 text-xs">
            {{ confirmPasswordValidityMessage }}
          </p>
        </div>
        <span v-if="errorMessages">
          <span v-for="error in errorMessages" :key="error" class="text-red-500 text-xs">{{
            error
          }}</span>
        </span>
        <div class="flex items-center mt-2 justify-center">
          <button
            class="bg-black w-full border-2 border-black transition-all duration-300 hover:bg-white text-white hover:text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign up
          </button>
        </div>
      </form>
      <div class="mt-10 justify-center flex text-black">
        <span class=""> Already have an account? </span>
        <router-link class="ml-2 underline hover:text-blue-700 text-blue-400" to="/login">
          Sign in
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted } from 'vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const route = useRoute()

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
const redirectUrl = route.query.redirect || '/login'

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
      await store.dispatch('register', {
        name: name.value,
        email: email.value,
        password: password.value
      })
      router.replace(redirectUrl)
    } catch {
      console.log('error')
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
    passwordValidityMessage.value = 'Password must be of length greater than 6'
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
    confirmPasswordValidityMessage.value = 'Passwords do not match'
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
