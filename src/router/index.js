import { createRouter, createWebHistory } from 'vue-router'

import DashBoard from '@/components/dashboard/DashBoard.vue'
import TaskList from '@/components/dashboard/TaskList/TaskList.vue'
import AdminDashboard from '../components/Admin/AdminDashboard.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import Logout from '@/components/auth/Logout.vue'
import ManageTasks from '@/components/Manangednd/ManageTasks.vue'
import UserProfile from '@/components/Profile/UserProfile.vue'
import Home from '../Home.vue'
export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '',
          name: 'DashBoard',
          component: DashBoard,
          children: [
            {
              path: '',
              name: 'TaskList',
              component: TaskList
            }
          ]
        },
        {
          path: '/admin',
          name: 'Admin',
          component: AdminDashboard
        },
        {
          path: '/settings',
          name: 'Settings',
          component: UserProfile
        },
        { path: '/manage-tasks', name: 'ManageTasks', component: ManageTasks }
      ]
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginForm
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterForm
    }
  ]
})
