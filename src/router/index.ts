import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '../views/personalLibrary/profile/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/login',
      name: 'Login',
      component: () => import ('@/views/iam/login/Login.vue'),
      meta:{
        visible: false
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/personalLibrary/profile/Profile.vue'),
      meta: {
        visible: true
      }
    }
  ]
})

export default router
