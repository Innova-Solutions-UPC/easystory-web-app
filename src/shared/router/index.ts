import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '../../personalLibrary/profile/Profile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/login',
      name: 'Login',
      component: () => import ('@/iam/login/Login.vue'),
      meta:{
        visible: false
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/personalLibrary/profile/Profile.vue'),
      meta: {
        visible: true
      }
    },
    {
      path: '/create-post',
      name: 'CreatePost',
      component: () => import('@/publishing/views/createNewPost.vue'),
      meta: {
        visible: true
      }
    },
    {
      path: '/update-post',
      name: 'UpdatePost',
      component: () => import('@/publishing/views/updateExistingPost.vue'),
      meta: {
        visible: true
      }
    },
    {
      path: '/personal-posts',
      name: 'Posts',
      component: () => import('@/publishing/views/allCreatedPosts.vue'),
      meta: {
        visible: true
      }
    }
  ]
})

export default router
