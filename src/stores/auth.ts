import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: string
  username: string
  role: 'admin' | 'reporter'
  name: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isReporter = computed(() => user.value?.role === 'reporter')

  // 模拟登录
  function login(username: string, password: string) {
    return new Promise<boolean>((resolve) => {
      setTimeout(() => {
        // 简单的模拟认证逻辑
        if (username === 'admin' && password === 'admin123') {
          user.value = {
            id: '1',
            username: 'admin',
            role: 'admin',
            name: '管理员'
          }
          resolve(true)
        } else if (username === 'reporter' && password === 'reporter123') {
          user.value = {
            id: '2',
            username: 'reporter',
            role: 'reporter',
            name: '填报员'
          }
          resolve(true)
        } else {
          resolve(false)
        }
      }, 1000) // 模拟网络延迟
    })
  }

  function logout() {
    user.value = null
  }

  return {
    user,
    isAuthenticated,
    isAdmin,
    isReporter,
    login,
    logout
  }
})
