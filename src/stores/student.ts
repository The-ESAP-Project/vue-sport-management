import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { StudentService, ClassService } from '@/services/student'
import { useNotification } from '@/composables/useNotification'
import type {
  StudentInfo,
  StudentInfoCreationAttributes,
  StudentQuery,
  StudentListResponse,
  ClassInfo,
  ClassInfoCreationAttributes,
  ClassQuery,
  ClassListResponse,
} from '@/types/student'

export const useStudentStore = defineStore('student', () => {
  // 通知系统
  const { success, error } = useNotification()

  // 状态
  const students = ref<StudentInfo[]>([])
  const classes = ref<ClassInfo[]>([])
  const currentStudent = ref<StudentInfo | null>(null)
  const currentClass = ref<ClassInfo | null>(null)
  const isLoading = ref(false)
  const pagination = ref({
    page: 1,
    pageSize: 20,
    total: 0,
    totalPages: 0,
  })

  // 计算属性
  const studentCount = computed(() => students.value.length)
  const classCount = computed(() => classes.value.length)

  // 获取学生列表
  const fetchStudents = async (query?: StudentQuery) => {
    isLoading.value = true
    try {
      const response: StudentListResponse = await StudentService.getStudents(query)
      students.value = response.items
      pagination.value = response.pagination
      return response
    } catch (err) {
      console.error('Failed to fetch students:', err)
      error('获取学生列表失败', '请稍后重试')
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // 创建单个学生
  const createStudent = async (studentData: StudentInfoCreationAttributes) => {
    try {
      const student = await StudentService.createStudent(studentData)
      students.value.unshift(student) // 添加到列表开头
      success('创建成功', `学生 ${student.StuName} 已创建`)
      return student
    } catch (err) {
      console.error('Failed to create student:', err)
      error('创建学生失败', '请检查输入信息')
      throw err
    }
  }

  // 批量创建学生
  const batchCreateStudents = async (studentsData: StudentInfoCreationAttributes[]) => {
    try {
      const newStudents = await StudentService.batchCreateStudents(studentsData)
      students.value.unshift(...newStudents) // 添加到列表开头
      success('批量创建成功', `成功创建 ${newStudents.length} 个学生`)
      return newStudents
    } catch (err) {
      console.error('Failed to batch create students:', err)
      error('批量创建学生失败', '请检查输入信息')
      throw err
    }
  }

  // 获取单个学生
  const fetchStudent = async (studentId: number) => {
    try {
      const student = await StudentService.getStudent(studentId)
      currentStudent.value = student
      return student
    } catch (err) {
      console.error('Failed to fetch student:', err)
      error('获取学生信息失败', '请稍后重试')
      throw err
    }
  }

  // 更新学生
  const updateStudent = async (studentId: number, studentData: Partial<StudentInfoCreationAttributes>) => {
    try {
      const updatedStudent = await StudentService.updateStudent(studentId, studentData)

      // 更新列表中的学生
      const index = students.value.findIndex(s => s.id === studentId)
      if (index > -1) {
        students.value[index] = updatedStudent
      }

      // 更新当前学生
      if (currentStudent.value?.id === studentId) {
        currentStudent.value = updatedStudent
      }

      success('更新成功', `学生 ${updatedStudent.StuName} 信息已更新`)
      return updatedStudent
    } catch (err) {
      console.error('Failed to update student:', err)
      error('更新学生失败', '请稍后重试')
      throw err
    }
  }

  // 删除学生
  const deleteStudent = async (studentId: number) => {
    try {
      await StudentService.deleteStudent(studentId)

      // 从列表中移除
      const index = students.value.findIndex(s => s.id === studentId)
      if (index > -1) {
        const deletedStudent = students.value.splice(index, 1)[0]
        success('删除成功', `学生 ${deletedStudent?.StuName || '未知'} 已删除`)
      }

      // 清除当前学生
      if (currentStudent.value?.id === studentId) {
        currentStudent.value = null
      }
    } catch (err) {
      console.error('Failed to delete student:', err)
      error('删除学生失败', '请稍后重试')
      throw err
    }
  }

  // 获取班级列表
  const fetchClasses = async (query?: ClassQuery) => {
    isLoading.value = true
    try {
      const response: ClassListResponse = await ClassService.getClasses(query)
      classes.value = response.items
      return response
    } catch (err) {
      console.error('Failed to fetch classes:', err)
      error('获取班级列表失败', '请稍后重试')
      throw err
    } finally {
      isLoading.value = false
    }
  }

  // 创建班级
  const createClass = async (classData: ClassInfoCreationAttributes) => {
    try {
      const newClass = await ClassService.createClass(classData)
      classes.value.unshift(newClass) // 添加到列表开头
      success('创建成功', `班级 ${newClass.className} 已创建`)
      return newClass
    } catch (err) {
      console.error('Failed to create class:', err)
      error('创建班级失败', '请检查输入信息')
      throw err
    }
  }

  // 获取单个班级
  const fetchClass = async (classId: number) => {
    try {
      const classInfo = await ClassService.getClass(classId)
      currentClass.value = classInfo
      return classInfo
    } catch (err) {
      console.error('Failed to fetch class:', err)
      error('获取班级信息失败', '请稍后重试')
      throw err
    }
  }

  // 更新班级
  const updateClass = async (classId: number, classData: Partial<ClassInfoCreationAttributes>) => {
    try {
      const updatedClass = await ClassService.updateClass(classId, classData)

      // 更新列表中的班级
      const index = classes.value.findIndex(c => c.id === classId)
      if (index > -1) {
        classes.value[index] = updatedClass
      }

      // 更新当前班级
      if (currentClass.value?.id === classId) {
        currentClass.value = updatedClass
      }

      success('更新成功', `班级 ${updatedClass.className} 信息已更新`)
      return updatedClass
    } catch (err) {
      console.error('Failed to update class:', err)
      error('更新班级失败', '请稍后重试')
      throw err
    }
  }

  // 删除班级
  const deleteClass = async (classId: number) => {
    try {
      await ClassService.deleteClass(classId)

      // 从列表中移除
      const index = classes.value.findIndex(c => c.id === classId)
      if (index > -1) {
        const deletedClass = classes.value.splice(index, 1)[0]
        success('删除成功', `班级 ${deletedClass?.className || '未知'} 已删除`)
      }

      // 清除当前班级
      if (currentClass.value?.id === classId) {
        currentClass.value = null
      }
    } catch (err) {
      console.error('Failed to delete class:', err)
      error('删除班级失败', '请稍后重试')
      throw err
    }
  }

  // 根据班级ID获取班级名称
  const getClassName = (classId: number): string => {
    const classInfo = classes.value.find(c => c.id === classId)
    return classInfo?.className || `班级${classId}`
  }

  // 根据学生ID获取学生信息
  const getStudentById = (studentId: number): StudentInfo | undefined => {
    return students.value.find(s => s.id === studentId)
  }

  // 清空状态
  const clearState = () => {
    students.value = []
    classes.value = []
    currentStudent.value = null
    currentClass.value = null
    pagination.value = {
      page: 1,
      pageSize: 20,
      total: 0,
      totalPages: 0,
    }
  }

  return {
    // 状态
    students,
    classes,
    currentStudent,
    currentClass,
    isLoading,
    pagination,

    // 计算属性
    studentCount,
    classCount,

    // 学生方法
    fetchStudents,
    createStudent,
    batchCreateStudents,
    fetchStudent,
    updateStudent,
    deleteStudent,

    // 班级方法
    fetchClasses,
    createClass,
    fetchClass,
    updateClass,
    deleteClass,

    // 工具方法
    getClassName,
    getStudentById,
    clearState,
  }
})
