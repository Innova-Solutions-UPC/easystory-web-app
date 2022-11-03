import {createRouter, createWebHistory} from 'vue-router'
import type { NavigationGuardNext, RouteLocationNormalized} from 'vue-router'
import ProfileView from '../../personalLibrary/profile/profile.vue'
import appController from "@/shared/models/Controller";
import {PrimeIcons} from 'primevue/api';
import { translate } from '../plugins/i18n/i18n';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path:'/login',
      name: 'Login',
      component: () => import ('@/iam/views/sign-in.vue'),
      meta:{
        visible: false,
        public: true, // Allow access to even if not logged in
        onlyWhenLoggedOut: true,
      }
    },
    {
      path: '/profile',
      name: translate('router-profile'),
      component: () => import('@/personalLibrary/profile/profile.vue'),
      meta: {
        visible: true,
        icon: 'pi pi-user'
      }
    },
    {
      path: '/create-post',
      name: translate('router-create-post'),
      component: () => import('@/publishing/views/create-new-post.vue'),
      meta: {
        visible: true,
        icon: PrimeIcons.BOOK
      }
    },
    {
      path: '/update-post',
      name: 'Update Post',
      component: () => import('@/publishing/views/update-existing-post.vue'),
      meta: {
        visible: false
      }
    },
    {
      path: '/my-posts',
      name: translate('router-my-posts'),
      component: () => import('@/publishing/views/posts-by-author.vue'),
      meta: {
        visible: true,
        icon: PrimeIcons.DATABASE
      }
    },
    {
      path: '/home',
      name: translate('router-home'),
      component: () => import('@/social/views/home.vue'),
      meta: {
        visible: true,
        icon: PrimeIcons.HOME
      }
    },
    {
      path: '/post-detail',
      name: 'Post detail',
      component: () => import('@/social/views/post-detail.vue'),
      meta:{
        visible: false
      }
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/home'
    }

  ]
})

// https://medium.com/@zitko/structuring-a-vue-project-authentication-87032e5bfe16
// https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

router.beforeEach(
    (
        to: RouteLocationNormalized,
        from: RouteLocationNormalized,
        next: NavigationGuardNext
    ) => {
      // if (to.name !== 'Login' && !isAuthenticated) next({ name: 'Login' })
      // else next();

      const isPublic = to.matched.some((record) => record.meta.public);
      const onlyWhenLoggedOut = to.matched.some(
          (record) => record.meta.onlyWhenLoggedOut
      );

      if (!isPublic && !appController.user.getIsAuthenticated()) {
        return next({
          path: "/login",
          query: { redirect: to.fullPath }, // Store the full path to redirect the user to after login
        });
      }

      // Do not allow user to visit login page or register page if they are logged in
      if (appController.user.getIsAuthenticated() && onlyWhenLoggedOut) {
        return next("/profile");
      } else next();
    }
);

export default router
