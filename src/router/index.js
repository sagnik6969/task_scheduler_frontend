import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '@/components/dashboard/DashBoard.vue'
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: DashBoard
    },
    // {
    //   path: '/login',
    //   name: 'Login'
    // },
    {
      path: '/logout',
      name: 'Logout'
    },
    {
      path: '/settings',
      name: 'Settings'
    },
    { path: '/manage-tasks', name: 'ManageTasks' }
  ]
})
