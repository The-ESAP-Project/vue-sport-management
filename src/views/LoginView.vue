<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <!-- 登录框 -->
      <div class="bg-white shadow-xl rounded-2xl border border-gray-100 overflow-hidden">
        <!-- 头部区域 -->
        <div class="px-8 pt-8 pb-6 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div class="text-center">
            <div class="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <ChartBarIcon class="h-10 w-10 text-white" />
            </div>
            <h2 class="mt-4 text-2xl font-bold text-white">
              体测数据管理系统
            </h2>
            <p class="mt-2 text-indigo-100">
              请登录您的账号
            </p>
          </div>
        </div>

        <!-- 表单区域 -->
        <div class="px-8 py-8">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-4">
              <div>
                <label for="username" class="block text-sm font-medium text-gray-700 mb-2">
                  用户名
                </label>
                <input
                  id="username"
                  v-model="form.username"
                  name="username"
                  type="text"
                  required
                  class="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                  placeholder="请输入用户名"
                  :disabled="loading"
                />
              </div>

              <div>
                <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                  密码
                </label>
                <input
                  id="password"
                  v-model="form.password"
                  name="password"
                  type="password"
                  required
                  class="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                  placeholder="请输入密码"
                  :disabled="loading"
                />
              </div>
            </div>

            <!-- 错误提示 -->
            <div v-if="error" class="rounded-lg bg-red-50 border border-red-200 p-4">
              <div class="flex">
                <ExclamationTriangleIcon class="h-5 w-5 text-red-400 flex-shrink-0" />
                <div class="ml-3">
                  <h3 class="text-sm font-medium text-red-800">
                    登录失败
                  </h3>
                  <div class="mt-1 text-sm text-red-700">
                    {{ error }}
                  </div>
                </div>
              </div>
            </div>

            <!-- 登录按钮 -->
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex justify-center items-center rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-[1.02]"
            >
              <span v-if="loading" class="mr-2">
                <ArrowPathIcon class="h-5 w-5 animate-spin" />
              </span>
              {{ loading ? '登录中...' : '登录' }}
            </button>
          </form>
        </div>

        <!-- 底部测试账号信息 -->
        <div class="px-8 pb-8">
          <div class="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <p class="text-center text-sm font-medium text-gray-700 mb-3">测试账号</p>
            <div class="space-y-2 text-xs text-gray-600">
              <div class="flex justify-between items-center py-1">
                <span class="font-medium text-indigo-600">管理员</span>
                <span class="font-mono bg-white px-2 py-1 rounded border">admin / admin123</span>
              </div>
              <div class="flex justify-between items-center py-1">
                <span class="font-medium text-green-600">填报员</span>
                <span class="font-mono bg-white px-2 py-1 rounded border">reporter / reporter123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template><script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ChartBarIcon, ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/vue/24/outline'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const loading = ref(false)
const error = ref('')

const form = reactive({
  username: '',
  password: ''
})

async function handleLogin() {
  if (!form.username || !form.password) {
    error.value = '请填写用户名和密码'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const success = await authStore.login(form.username, form.password)
    if (success) {
      router.push('/dashboard')
    } else {
      error.value = '用户名或密码错误'
    }
  } catch {
    error.value = '登录过程中发生错误，请重试'
  } finally {
    loading.value = false
  }
}
</script>
