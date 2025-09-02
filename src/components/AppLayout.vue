<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <div class="flex-shrink-0 flex items-center">
              <ChartBarIcon class="h-8 w-8 text-indigo-600" />
              <span class="ml-2 text-xl font-semibold text-gray-900">体测数据管理</span>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-700">
              欢迎，{{ userStore.currentUser?.name }}
              <span class="text-xs text-gray-500">({{ roleText }})</span>
            </span>
            <button
              @click="handleLogout"
              class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
            >
              <ArrowRightStartOnRectangleIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>

    <div class="flex">
      <!-- 侧边栏 -->
      <aside class="w-64 bg-white shadow-sm min-h-screen">
        <nav class="mt-8 px-4">
          <div class="space-y-2">
            <router-link
              v-for="item in navigationItems"
              :key="item.name"
              :to="item.to"
              :class="[
                'group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
                $route.path === item.to
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              ]"
            >
              <component
                :is="item.icon"
                :class="[
                  'mr-3 h-5 w-5',
                  $route.path === item.to
                    ? 'text-indigo-500'
                    : 'text-gray-400 group-hover:text-gray-500'
                ]"
              />
              {{ item.name }}
            </router-link>
          </div>
        </nav>
      </aside>

      <!-- 主内容区域 -->
      <main class="flex-1">
        <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import {
  ChartBarIcon,
  ArrowRightStartOnRectangleIcon,
  PlusCircleIcon,
  DocumentTextIcon,
  ChartPieIcon,
  CogIcon,
  HomeIcon
} from '@heroicons/vue/24/outline'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()

const roleText = computed(() => {
  return userStore.currentUser?.role === 'admin' ? '管理员' : '填报员'
})

const navigationItems = computed(() => {
  const baseItems = [
    {
      name: '仪表板',
      to: '/dashboard',
      icon: HomeIcon
    }
  ]

  if (userStore.isAdmin) {
    return [
      ...baseItems,
      {
        name: '发布收集',
        to: '/publish',
        icon: PlusCircleIcon
      },
      {
        name: '数据填报',
        to: '/report',
        icon: DocumentTextIcon
      },
      {
        name: '数据展示',
        to: '/display',
        icon: ChartPieIcon
      },
      {
        name: '数据管理',
        to: '/manage',
        icon: CogIcon
      }
    ]
  } else {
    return [
      ...baseItems,
      {
        name: '数据填报',
        to: '/report',
        icon: DocumentTextIcon
      }
    ]
  }
})

function handleLogout() {
  userStore.logout()
  router.push('/login')
}
</script>
