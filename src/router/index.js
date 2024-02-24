import { createRouter, createWebHistory } from 'vue-router'
import DashBoard from '@/components/dashboard/DashBoard.vue'
import TaskList from '@/components/dashboard/TaskList/TaskList.vue'
import AdminDashboard from '../components/Admin/AdminDashboard.vue'
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'DashBoard',
      component: DashBoard,
      children: [
        {
          path: '',
          name: 'TaskList',
          component: TaskList
        },
        {
          path: 'admin',
          name: 'Admin',
          component: AdminDashboard
        }
      ]
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
