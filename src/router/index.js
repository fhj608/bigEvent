import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/article/manage',
      component: () => import('@/views/layout/LayoutContainer.vue'),
      children: [
        {
          path: '/article/manage',
          component: () => import('@/views/layout/article/ArticleManage.vue')
        },
        {
          path: '/article/channel',
          component: () => import('@/views/layout/article/ArticleChannel.vue')
        },
        {
          path: '/user/avatar',
          component: () => import('@/views/layout/user/UserAvatar.vue')
        },
        {
          path: '/user/password',
          component: () => import('@/views/layout/user/UserPassword.vue')
        },
        {
          path: '/user/profile',
          component: () => import('@/views/layout/user/UserProfile.vue')
        }
      ]
    },
    {
      path: '/login',
      component: () => import('@/views/login/LoginPage.vue')
    }
  ]
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  if (!userStore.token && to.path !== '/login') return '/login'
})

export default router
