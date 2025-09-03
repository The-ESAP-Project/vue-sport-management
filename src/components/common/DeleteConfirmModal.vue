<template>
  <Teleport to="body">
    <div class="fixed inset-0 z-[1000] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex min-h-screen items-center justify-center p-4">
        <!-- 背景遮罩 -->
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-[999]"
          @click="$emit('close')"
        ></div>

        <!-- 模态框容器 -->
        <div class="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto z-[1000]">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationTriangleIcon class="h-6 w-6 text-red-600" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  {{ title }}
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    {{ message }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="handleConfirm"
              :disabled="isDeleting"
            >
              <span v-if="isDeleting">删除中...</span>
              <span v-else>删除</span>
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="$emit('close')"
              :disabled="isDeleting"
            >
              取消
            </button>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ExclamationTriangleIcon } from '@heroicons/vue/24/outline'

interface Props {
  title: string
  message: string
}

defineProps<Props>()

const isDeleting = ref(false)

const handleConfirm = async () => {
  isDeleting.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 500)) // 模拟删除操作
    emit('confirm')
  } finally {
    isDeleting.value = false
  }
}

const emit = defineEmits<{
  close: []
  confirm: []
}>()
</script>
