<template>
  <div class="space-y-6">
    <div class="border-b border-gray-200 pb-4">
      <h1 class="text-2xl font-bold text-gray-900">数据展示</h1>
      <p class="mt-1 text-sm text-gray-600">
        查看体测数据统计图表和分析报告
      </p>
    </div>

    <div class="bg-white rounded-lg shadow p-6">
      <div class="text-center py-12">
        <div class="mx-auto h-12 w-12 text-gray-400">
          <ChartBarIcon class="h-12 w-12 text-gray-400" />
        </div>
        <h3 class="mt-2 text-sm font-medium text-gray-900">功能开发中</h3>
        <p class="mt-1 text-sm text-gray-500">数据展示功能正在开发中，敬请期待。</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 数据展示页面骨架
import { ChartBarIcon } from '@heroicons/vue/24/outline';
</script>
