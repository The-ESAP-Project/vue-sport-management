<template>
  <div class="space-y-6">
    <!-- 页面头部 -->
    <div class="border-b border-gray-200 pb-4">
      <h1 class="text-2xl font-bold text-gray-900">仪表板</h1>
      <p class="mt-1 text-sm text-gray-600">
        欢迎使用体测数据管理系统
      </p>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div class="bg-white rounded-lg shadow px-6 py-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <UsersIcon class="h-8 w-8 text-blue-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">总用户数</p>
            <p class="text-2xl font-semibold text-gray-900">1,234</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow px-6 py-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <DocumentTextIcon class="h-8 w-8 text-green-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">收集任务</p>
            <p class="text-2xl font-semibold text-gray-900">56</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow px-6 py-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <ChartBarIcon class="h-8 w-8 text-yellow-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">已填报</p>
            <p class="text-2xl font-semibold text-gray-900">890</p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-lg shadow px-6 py-4">
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <CheckCircleIcon class="h-8 w-8 text-indigo-600" />
          </div>
          <div class="ml-4">
            <p class="text-sm font-medium text-gray-600">完成率</p>
            <p class="text-2xl font-semibold text-gray-900">72%</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 快速操作 -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">快速操作</h2>
      </div>
      <div class="p-6">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <router-link
            v-for="action in quickActions"
            :key="action.name"
            :to="action.to"
            class="relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
          >
            <div>
              <span class="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-lg">
                <component :is="action.icon" class="h-6 w-6" />
              </span>
            </div>
            <div class="mt-4">
              <h3 class="text-lg font-medium text-gray-900">
                {{ action.name }}
              </h3>
              <p class="mt-2 text-sm text-gray-500">
                {{ action.description }}
              </p>
            </div>
            <span
              class="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <ChevronRightIcon class="h-6 w-6" />
            </span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- 最近活动 -->
    <div class="bg-white rounded-lg shadow">
      <div class="px-6 py-4 border-b border-gray-200">
        <h2 class="text-lg font-medium text-gray-900">最近活动</h2>
      </div>
      <div class="p-6">
        <div class="flow-root">
          <ul class="-mb-8">
            <li v-for="(activity, activityIdx) in recentActivities" :key="activity.id">
              <div class="relative pb-8">
                <span
                  v-if="activityIdx !== recentActivities.length - 1"
                  class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
                <div class="relative flex space-x-3">
                  <div>
                    <span class="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                      <component :is="activity.icon" class="h-5 w-5 text-white" />
                    </span>
                  </div>
                  <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                    <div>
                      <p class="text-sm text-gray-500">
                        {{ activity.content }}
                      </p>
                    </div>
                    <div class="text-right text-sm whitespace-nowrap text-gray-500">
                      {{ activity.time }}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import {
  UsersIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CheckCircleIcon,
  PlusCircleIcon,
  ChartPieIcon,
  CogIcon,
  ChevronRightIcon,
  UserIcon
} from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const quickActions = computed(() => {
  if (authStore.isAdmin) {
    return [
      {
        name: '发布收集任务',
        description: '创建新的体测数据收集任务',
        icon: PlusCircleIcon,
        to: '/publish'
      },
      {
        name: '查看数据展示',
        description: '查看体测数据统计和图表',
        icon: ChartPieIcon,
        to: '/display'
      },
      {
        name: '数据管理',
        description: '管理所有体测数据',
        icon: CogIcon,
        to: '/manage'
      }
    ]
  } else {
    return [
      {
        name: '填写体测数据',
        description: '填写您的体测数据',
        icon: DocumentTextIcon,
        to: '/report'
      }
    ]
  }
})

const recentActivities = [
  {
    id: 1,
    content: '新用户张三注册了账号',
    time: '2小时前',
    icon: UserIcon
  },
  {
    id: 2,
    content: '体测任务"2024年春季体测"已发布',
    time: '4小时前',
    icon: PlusCircleIcon
  },
  {
    id: 3,
    content: '李四提交了体测数据',
    time: '6小时前',
    icon: DocumentTextIcon
  },
  {
    id: 4,
    content: '王五查看了数据报告',
    time: '8小时前',
    icon: ChartBarIcon
  }
]
</script>
