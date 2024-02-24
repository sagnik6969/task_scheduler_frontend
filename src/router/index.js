import { createRouter, createWebHistory } from 'vue-router'

import Login from '../components/auth/LoginForm.vue'
import Register from '../components/auth/RegisterForm.vue'
import store from '../store/index'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login,
    meta: { public: true }
  },
  {
    path: '/register',
    component: Register,
    meta: { public: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to) => {
  if (to.meta.requireLogin) {
    if (!store.getters.isLoggedIn) return `/login?redirect=${to.fullPath}`
  }
})
export default router
