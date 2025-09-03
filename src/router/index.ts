import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import LoginView from '@/views/LoginView.vue'
import AppLayout from '@/components/AppLayout.vue'
import DashboardView from '@/views/DashboardView.vue'
import PublishView from '@/views/PublishView.vue'
import ReportView from '@/views/ReportView.vue'
import DisplayView from '@/views/DisplayView.vue'
import ManageView from '@/views/ManageView.vue'
import StudentManageView from '@/views/StudentManageView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true }
    },
    {
      path: '/',
      component: AppLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          redirect: '/dashboard'
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: DashboardView
        },
        {
          path: 'publish',
          name: 'publish',
          component: PublishView,
          meta: { requiresAdmin: true }
        },
        {
          path: 'report',
          name: 'report',
          component: ReportView
        },
        {
          path: 'display',
          name: 'display',
          component: DisplayView,
          meta: { requiresAdmin: true }
        },
        {
          path: 'manage',
          name: 'manage',
          component: ManageView,
          meta: { requiresAdmin: true }
        },
        {
          path: 'students',
          name: 'students',
          component: StudentManageView,
          meta: { requiresAdmin: true }
        }
      ]
    }
  ]
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()

  // 需要登录的页面
  if (to.meta.requiresAuth) {
    if (!userStore.isAuthenticated) {
      next('/login')
      return
    }
  }

  // 需要管理员权限的页面
  if (to.meta.requiresAdmin) {
    if (!userStore.isAdmin) {
      next('/dashboard')
      return
    }
  }

  // 已登录用户访问登录页面，重定向到仪表板
  if (to.meta.requiresGuest && userStore.isAuthenticated) {
    next('/dashboard')
    return
  }

  next()
})

export default router
