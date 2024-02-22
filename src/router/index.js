import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home'
    },
    {
      path: '/login',
      name: 'Login'
    },
    {
      path: 'logout',
      name: 'Logout'
    }
  ]
})
