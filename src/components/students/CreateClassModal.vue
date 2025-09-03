<template>
  <Teleport to="body">
    <div class="fixed inset-0 overflow-y-auto" style="z-index: 1000; position: fixed; top: 0; left: 0; right: 0; bottom: 0;" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div class="flex min-h-screen items-center justify-center p-4">
        <!-- 背景遮罩 -->
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          style="z-index: 999; position: fixed; top: 0; left: 0; right: 0; bottom: 0;"
          @click="$emit('close')"
        ></div>

        <!-- 模态框容器 -->
        <div class="relative bg-white rounded-lg shadow-xl max-w-lg w-full mx-auto" style="z-index: 1000; position: relative;">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                <AcademicCapIcon class="h-6 w-6 text-green-600" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  添加班级
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    填写班级基本信息，创建新班级。
                  </p>
                </div>
              </div>
            </div>

            <!-- 表单 -->
            <div class="mt-6">
              <form @submit.prevent="handleSubmit" class="space-y-4">
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label for="classID" class="block text-sm font-medium text-gray-700">
                      班级编号 <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="classID"
                      v-model.number="form.classID"
                      type="number"
                      required
                      min="1"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="请输入班级编号"
                    />
                  </div>

                  <div>
                    <label for="className" class="block text-sm font-medium text-gray-700">
                      班级名称 <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="className"
                      v-model="form.className"
                      type="text"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="请输入班级名称"
                    />
                  </div>

                  <div>
                    <label for="grade" class="block text-sm font-medium text-gray-700">
                      年级
                    </label>
                    <input
                      id="grade"
                      v-model="form.grade"
                      type="text"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="例如：2023级"
                    />
                  </div>

                  <div>
                    <label for="department" class="block text-sm font-medium text-gray-700">
                      院系
                    </label>
                    <input
                      id="department"
                      v-model="form.department"
                      type="text"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      placeholder="请输入院系名称"
                    />
                  </div>
                </div>

                <!-- 错误提示 -->
                <div v-if="error" class="rounded-md bg-red-50 p-4">
                  <div class="text-sm text-red-700">{{ error }}</div>
                </div>
              </form>
            </div>
          </div>

          <!-- 操作按钮 -->
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="handleSubmit"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">创建中...</span>
              <span v-else>创建班级</span>
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              @click="$emit('close')"
              :disabled="isSubmitting"
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
import { ref, reactive } from 'vue'
import { AcademicCapIcon } from '@heroicons/vue/24/outline'
import { useStudentStore } from '@/stores/student'
import type { ClassInfoCreationAttributes } from '@/types/student'

const studentStore = useStudentStore()

// 响应式数据
const isSubmitting = ref(false)
const error = ref('')

// 表单数据
const form = reactive<ClassInfoCreationAttributes>({
  classID: 0,
  className: '',
  grade: '',
  department: '',
})

// 方法
const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  error.value = ''

  try {
    await studentStore.createClass(form)
    emit('success')
    resetForm()
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : '创建班级失败'
  } finally {
    isSubmitting.value = false
  }
}

const validateForm = (): boolean => {
  if (!form.classID || form.classID <= 0) {
    error.value = '请输入有效的班级编号'
    return false
  }
  if (!form.className.trim()) {
    error.value = '请输入班级名称'
    return false
  }
  return true
}

const resetForm = () => {
  Object.assign(form, {
    classID: 0,
    className: '',
    grade: '',
    department: '',
  })
  error.value = ''
}

const emit = defineEmits<{
  close: []
  success: []
}>()
</script>
