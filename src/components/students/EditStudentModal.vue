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
              <div class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <PencilIcon class="h-6 w-6 text-blue-600" />
              </div>
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                  编辑学生
                </h3>
                <div class="mt-2">
                  <p class="text-sm text-gray-500">
                    修改学生基本信息。
                  </p>
                </div>
              </div>
            </div>

            <!-- 表单 -->
            <div class="mt-6">
              <form @submit.prevent="handleSubmit" class="space-y-4">
                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label for="stuRegisterNumber" class="block text-sm font-medium text-gray-700">
                      学号 <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="stuRegisterNumber"
                      v-model="form.StuRegisterNumber"
                      type="text"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="请输入学号"
                    />
                  </div>

                  <div>
                    <label for="stuName" class="block text-sm font-medium text-gray-700">
                      姓名 <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="stuName"
                      v-model="form.StuName"
                      type="text"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="请输入姓名"
                    />
                  </div>

                  <div>
                    <label for="stuGender" class="block text-sm font-medium text-gray-700">
                      性别 <span class="text-red-500">*</span>
                    </label>
                    <select
                      id="stuGender"
                      v-model="form.StuGender"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">请选择性别</option>
                      <option value="1">男</option>
                      <option value="0">女</option>
                    </select>
                  </div>

                  <div>
                    <label for="stuNation" class="block text-sm font-medium text-gray-700">
                      民族 <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="stuNation"
                      v-model.number="form.StuNation"
                      type="number"
                      required
                      min="1"
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="请输入民族代码"
                    />
                  </div>

                  <div>
                    <label for="stuBirth" class="block text-sm font-medium text-gray-700">
                      出生日期 <span class="text-red-500">*</span>
                    </label>
                    <input
                      id="stuBirth"
                      v-model="form.StuBirth"
                      type="date"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label for="classID" class="block text-sm font-medium text-gray-700">
                      班级 <span class="text-red-500">*</span>
                    </label>
                    <select
                      id="classID"
                      v-model="form.classID"
                      required
                      class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">请选择班级</option>
                      <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                        {{ cls.className }}
                      </option>
                    </select>
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
              class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
              @click="handleSubmit"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">更新中...</span>
              <span v-else>更新学生</span>
            </button>
            <button
              type="button"
              class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
import { ref, reactive, watch, onMounted } from 'vue'
import { PencilIcon } from '@heroicons/vue/24/outline'
import { useStudentStore } from '@/stores/student'
import type { StudentInfo, ClassInfo } from '@/types/student'

interface Props {
  student: StudentInfo
}

const props = defineProps<Props>()
const studentStore = useStudentStore()

// 响应式数据
const isSubmitting = ref(false)
const error = ref('')
const classes = ref<ClassInfo[]>([])

// 表单数据
const form = reactive({
  StuRegisterNumber: '',
  StuName: '',
  StuGender: '1' as '0' | '1',
  StuNation: 1,
  StuBirth: '',
  classID: 0,
})

// 监听props.student的变化，更新表单
watch(() => props.student, (newStudent) => {
  if (newStudent) {
    Object.assign(form, {
      StuRegisterNumber: newStudent.StuRegisterNumber,
      StuName: newStudent.StuName,
      StuGender: newStudent.StuGender,
      StuNation: newStudent.StuNation,
      StuBirth: newStudent.StuBirth,
      classID: newStudent.classID,
    })
  }
}, { immediate: true })

// 方法
const handleSubmit = async () => {
  if (!validateForm()) return

  isSubmitting.value = true
  error.value = ''

  try {
    await studentStore.updateStudent(props.student.id, form)
    emit('success')
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : '更新学生失败'
  } finally {
    isSubmitting.value = false
  }
}

const validateForm = (): boolean => {
  if (!form.StuRegisterNumber.trim()) {
    error.value = '请输入学号'
    return false
  }
  if (!form.StuName.trim()) {
    error.value = '请输入姓名'
    return false
  }
  if (!form.StuGender) {
    error.value = '请选择性别'
    return false
  }
  if (!form.StuBirth) {
    error.value = '请选择出生日期'
    return false
  }
  if (!form.classID) {
    error.value = '请选择班级'
    return false
  }
  return true
}

// 生命周期
onMounted(async () => {
  // 获取班级列表
  await studentStore.fetchClasses()
  classes.value = studentStore.classes
})

const emit = defineEmits<{
  close: []
  success: []
}>()
</script>
