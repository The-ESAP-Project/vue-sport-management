<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import NotificationContainer from './components/notification/NotificationContainer.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 应用启动时初始化用户认证状态
onMounted(async () => {
  await userStore.initAuth()
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-1">
      <RouterView />
    </main>
    <!-- 通知容器 -->
    <NotificationContainer />
  </div>
</template>
