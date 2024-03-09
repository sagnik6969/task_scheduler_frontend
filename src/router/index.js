import { createRouter, createWebHistory } from 'vue-router'

import DashBoard from '@/components/dashboard/DashBoard.vue'
import TaskList from '@/components/dashboard/TaskList/TaskList.vue'
import AdminDashboard from '../components/Admin/AdminDashboard.vue'
import LoginForm from '@/components/auth/LoginForm.vue'
import RegisterForm from '@/components/auth/RegisterForm.vue'
import Logout from '@/components/auth/Logout.vue'
import ManageTasks from '@/components/Manangednd/ManageTasks.vue'
import UserProfile from '@/components/Profile/UserProfile.vue'
import UserTaskAssignedReview from '../components/Profile/UserTaskAssignedReview.vue'
import NotFound from '../components/ui/NotFound.vue'
import Home from '../Home.vue'
import AdminUserList from '@/components/Admin/users/AdminUserList.vue'
import Analytics from '@/components/Admin/Analytics/Analytics.vue'
import AdminAssignedTaskUser from '@/components/Admin/assigned_tasks/AdminAssignedTaskUser.vue'
import UserProfileAdmin from '@/components/Admin/users/UserProfile.vue'

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
          component: AdminDashboard,
          redirect: '/admin/users',
          children: [
            {
              path: 'users',
              name: 'AdminUserList',
              component: AdminUserList,
              children: [
                {
                  path: 'profile/:id',
                  component: UserProfileAdmin,
                  name: 'AdminUserProfile'
                }
              ]
            },
            {
              path: 'analysis',
              name: 'AdminAnalytics',
              component: Analytics
            },
            {
              path: 'assigned_tasks',
              name: 'AdminAssignedTasks',
              component: AdminAssignedTaskUser
            }
          ]
        },
        {
          path: '/profile',
          name: 'Profile',
          component: UserProfile
        },
        { path: '/manage-tasks', name: 'ManageTasks', component: ManageTasks }
      ]
    },
    {
      path: '/tasks/assign/:taskId/:token',
      name: 'View-Assigned-Task',
      component: UserTaskAssignedReview
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
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
