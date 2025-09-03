<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- 页面标题 -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">学生管理</h1>
        <p class="mt-2 text-sm text-gray-600">管理学生信息和班级数据</p>
      </div>

      <!-- 操作按钮 -->
      <div class="mb-6 flex flex-wrap gap-4">
        <button
          @click="showCreateStudentModal = true"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          添加学生
        </button>
        <button
          @click="showCreateClassModal = true"
          class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusIcon class="h-5 w-5 mr-2" />
          添加班级
        </button>
        <button
          @click="refreshData"
          :disabled="isLoading"
          class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          <ArrowPathIcon class="h-5 w-5 mr-2" :class="{ 'animate-spin': isLoading }" />
          刷新
        </button>
      </div>

      <!-- 搜索和筛选 -->
      <div class="mb-6 bg-white p-4 rounded-lg shadow">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">班级</label>
            <select
              v-model="query.classId"
              @change="handleSearch"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="">全部班级</option>
              <option v-for="cls in classes" :key="cls.id" :value="cls.id">
                {{ cls.className }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">年级</label>
            <input
              v-model="query.grade"
              @input="handleSearch"
              type="text"
              placeholder="输入年级"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">关键词</label>
            <input
              v-model="query.keyword"
              @input="handleSearch"
              type="text"
              placeholder="搜索学生姓名或学号"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div class="flex items-end">
            <button
              @click="clearSearch"
              class="w-full inline-flex justify-center items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              清除筛选
            </button>
          </div>
        </div>
      </div>

      <!-- 学生列表 -->
      <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div v-if="isLoading" class="p-8 text-center">
          <ArrowPathIcon class="h-8 w-8 animate-spin mx-auto text-gray-400" />
          <p class="mt-2 text-sm text-gray-500">加载中...</p>
        </div>

        <div v-else-if="students.length === 0" class="p-8 text-center">
          <UserGroupIcon class="h-12 w-12 mx-auto text-gray-400" />
          <h3 class="mt-2 text-sm font-medium text-gray-900">暂无学生数据</h3>
          <p class="mt-1 text-sm text-gray-500">开始添加您的第一个学生吧</p>
        </div>

        <ul v-else role="list" class="divide-y divide-gray-200">
          <li v-for="student in students" :key="student.id" class="px-6 py-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                    <UserIcon class="h-6 w-6 text-gray-600" />
                  </div>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ student.StuName }}</div>
                  <div class="text-sm text-gray-500">
                    学号: {{ student.StuRegisterNumber }} |
                    性别: {{ student.StuGender === '1' ? '男' : '女' }} |
                    班级: {{ getClassName(student.classID) }}
                  </div>
                </div>
              </div>
              <div class="flex items-center space-x-2">
                <button
                  @click="editStudent(student)"
                  class="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                >
                  编辑
                </button>
                <button
                  @click="confirmDeleteStudent(student)"
                  class="text-red-600 hover:text-red-900 text-sm font-medium"
                >
                  删除
                </button>
              </div>
            </div>
          </li>
        </ul>

        <!-- 分页 -->
        <div v-if="pagination.totalPages > 1" class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="changePage(pagination.page - 1)"
              :disabled="pagination.page <= 1"
              class="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              上一页
            </button>
            <button
              @click="changePage(pagination.page + 1)"
              :disabled="pagination.page >= pagination.totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 disabled:opacity-50"
            >
              下一页
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                显示第 {{ (pagination.page - 1) * pagination.pageSize + 1 }} 到 {{ Math.min(pagination.page * pagination.pageSize, pagination.total) }} 条，
                共 {{ pagination.total }} 条记录
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  @click="changePage((pagination?.page || 1) - 1)"
                  :disabled="(pagination?.page || 1) <= 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronLeftIcon class="h-5 w-5" />
                </button>
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="changePage(page)"
                  :class="[
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                    page === (pagination?.page || 1)
                      ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
                <button
                  @click="changePage(pagination.page + 1)"
                  :disabled="pagination.page >= pagination.totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
                >
                  <ChevronRightIcon class="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加学生模态框 -->
    <CreateStudentModal
      v-if="showCreateStudentModal"
      @close="showCreateStudentModal = false"
      @success="handleStudentCreated"
    />

    <!-- 添加班级模态框 -->
    <CreateClassModal
      v-if="showCreateClassModal"
      @close="showCreateClassModal = false"
      @success="handleClassCreated"
    />

    <!-- 编辑学生模态框 -->
    <EditStudentModal
      v-if="editingStudent"
      :student="editingStudent"
      @close="editingStudent = null"
      @success="handleStudentUpdated"
    />

    <!-- 删除确认模态框 -->
    <DeleteConfirmModal
      v-if="deletingStudent"
      :title="'删除学生'"
      :message="`确定要删除学生 ${deletingStudent.StuName} 吗？此操作不可恢复。`"
      @close="deletingStudent = null"
      @confirm="handleDeleteStudent"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  PlusIcon,
  ArrowPathIcon,
  UserGroupIcon,
  UserIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/vue/24/outline'
import { useStudentStore } from '@/stores/student'
import type { StudentInfo, StudentQuery } from '@/types/student'

// 组件导入（需要创建这些组件）
import CreateStudentModal from '@/components/students/CreateStudentModal.vue'
import CreateClassModal from '@/components/students/CreateClassModal.vue'
import EditStudentModal from '@/components/students/EditStudentModal.vue'
import DeleteConfirmModal from '@/components/common/DeleteConfirmModal.vue'

const studentStore = useStudentStore()

// 响应式数据
const showCreateStudentModal = ref(false)
const showCreateClassModal = ref(false)
const editingStudent = ref<StudentInfo | null>(null)
const deletingStudent = ref<StudentInfo | null>(null)
const query = ref<StudentQuery>({
  page: '1',
  pageSize: '20',
})

// 计算属性
const students = computed(() => studentStore?.students || [])
const classes = computed(() => studentStore?.classes || [])
const isLoading = computed(() => studentStore?.isLoading || false)
const pagination = computed(() => studentStore?.pagination || {
  page: 1,
  pageSize: 20,
  total: 0,
  totalPages: 0,
})

const visiblePages = computed(() => {
  const current = pagination.value.page
  const total = pagination.value.totalPages
  const pages: number[] = []

  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push(-1) // 表示省略号
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push(-1)
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push(-1)
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push(-1)
      pages.push(total)
    }
  }

  return pages
})

// 方法
const refreshData = async () => {
  await Promise.all([
    studentStore.fetchStudents(query.value),
    studentStore.fetchClasses(),
  ])
}

const handleSearch = async () => {
  query.value.page = '1' // 重置到第一页
  await studentStore.fetchStudents(query.value)
}

const clearSearch = async () => {
  query.value = {
    page: '1',
    pageSize: '20',
  }
  await studentStore.fetchStudents(query.value)
}

const changePage = async (page: number) => {
  if (page < 1 || page > pagination.value.totalPages) return
  query.value.page = page.toString()
  await studentStore.fetchStudents(query.value)
}

const getClassName = (classId: number) => {
  return studentStore?.getClassName?.(classId) || '未知班级'
}

const editStudent = (student: StudentInfo) => {
  editingStudent.value = student
}

const confirmDeleteStudent = (student: StudentInfo) => {
  deletingStudent.value = student
}

const handleStudentCreated = async () => {
  showCreateStudentModal.value = false
  await refreshData()
}

const handleClassCreated = async () => {
  showCreateClassModal.value = false
  await refreshData()
}

const handleStudentUpdated = async () => {
  editingStudent.value = null
  await refreshData()
}

const handleDeleteStudent = async () => {
  if (deletingStudent.value) {
    await studentStore.deleteStudent(deletingStudent.value.id)
    deletingStudent.value = null
  }
}

// 生命周期
onMounted(async () => {
  await refreshData()
})
</script>
