// 学生和班级管理API使用示例
import { StudentService, ClassService } from '@/services/student'
import { useStudentStore } from '@/stores/student'
import type { StudentInfoCreationAttributes, ClassInfoCreationAttributes } from '@/types/student'

// 使用示例
export class StudentApiExample {
  // 获取所有学生
  static async getAllStudents() {
    try {
      const response = await StudentService.getStudents()
      console.log('所有学生:', response.items)
      return response.items
    } catch (error) {
      console.error('获取学生失败:', error)
    }
  }

  // 根据班级获取学生
  static async getStudentsByClass(classId: number) {
    try {
      const response = await StudentService.getStudents({ classId: classId.toString() })
      console.log(`班级 ${classId} 的学生:`, response.items)
      return response.items
    } catch (error) {
      console.error('获取班级学生失败:', error)
    }
  }

  // 搜索学生
  static async searchStudents(keyword: string) {
    try {
      const response = await StudentService.getStudents({ keyword })
      console.log(`搜索 "${keyword}" 的结果:`, response.items)
      return response.items
    } catch (error) {
      console.error('搜索学生失败:', error)
    }
  }

  // 创建单个学生
  static async createStudentExample() {
    const studentData: StudentInfoCreationAttributes = {
      StuRegisterNumber: '2023001',
      StuName: '张三',
      StuGender: '1', // 1: 男, 0: 女
      StuNation: 1, // 民族代码
      StuBirth: '2005-01-01',
      classID: 1, // 班级ID
    }

    try {
      const student = await StudentService.createStudent(studentData)
      console.log('创建学生成功:', student)
      return student
    } catch (error) {
      console.error('创建学生失败:', error)
    }
  }

  // 批量创建学生
  static async batchCreateStudentsExample() {
    const studentsData: StudentInfoCreationAttributes[] = [
      {
        StuRegisterNumber: '2023002',
        StuName: '李四',
        StuGender: '1',
        StuNation: 1,
        StuBirth: '2005-02-01',
        classID: 1,
      },
      {
        StuRegisterNumber: '2023003',
        StuName: '王五',
        StuGender: '0',
        StuNation: 2,
        StuBirth: '2005-03-01',
        classID: 1,
      },
    ]

    try {
      const students = await StudentService.batchCreateStudents(studentsData)
      console.log('批量创建学生成功:', students)
      return students
    } catch (error) {
      console.error('批量创建学生失败:', error)
    }
  }

  // 获取单个学生
  static async getStudentExample(studentId: number) {
    try {
      const student = await StudentService.getStudent(studentId)
      console.log('学生信息:', student)
      return student
    } catch (error) {
      console.error('获取学生失败:', error)
    }
  }

  // 更新学生信息
  static async updateStudentExample(studentId: number) {
    const updateData = {
      StuName: '张三（已更新）',
      StuGender: '1' as const,
    }

    try {
      const student = await StudentService.updateStudent(studentId, updateData)
      console.log('更新学生成功:', student)
      return student
    } catch (error) {
      console.error('更新学生失败:', error)
    }
  }

  // 删除学生
  static async deleteStudentExample(studentId: number) {
    try {
      await StudentService.deleteStudent(studentId)
      console.log('删除学生成功')
    } catch (error) {
      console.error('删除学生失败:', error)
    }
  }
}

// 班级API使用示例
export class ClassApiExample {
  // 获取所有班级
  static async getAllClasses() {
    try {
      const response = await ClassService.getClasses()
      console.log('所有班级:', response.items)
      return response.items
    } catch (error) {
      console.error('获取班级失败:', error)
    }
  }

  // 创建班级
  static async createClassExample() {
    const classData: ClassInfoCreationAttributes = {
      classID: 101,
      className: '计算机科学1班',
      grade: '2023级',
      department: '计算机学院',
    }

    try {
      const newClass = await ClassService.createClass(classData)
      console.log('创建班级成功:', newClass)
      return newClass
    } catch (error) {
      console.error('创建班级失败:', error)
    }
  }

  // 获取单个班级
  static async getClassExample(classId: number) {
    try {
      const classInfo = await ClassService.getClass(classId)
      console.log('班级信息:', classInfo)
      return classInfo
    } catch (error) {
      console.error('获取班级失败:', error)
    }
  }

  // 更新班级信息
  static async updateClassExample(classId: number) {
    const updateData = {
      className: '计算机科学1班（已更新）',
      department: '信息工程学院',
    }

    try {
      const updatedClass = await ClassService.updateClass(classId, updateData)
      console.log('更新班级成功:', updatedClass)
      return updatedClass
    } catch (error) {
      console.error('更新班级失败:', error)
    }
  }

  // 删除班级
  static async deleteClassExample(classId: number) {
    try {
      await ClassService.deleteClass(classId)
      console.log('删除班级成功')
    } catch (error) {
      console.error('删除班级失败:', error)
    }
  }
}

// Pinia Store使用示例
export class StudentStoreExample {
  static async example() {
    const studentStore = useStudentStore()

    // 获取学生列表
    await studentStore.fetchStudents({ page: '1', pageSize: '20' })

    // 获取班级列表
    await studentStore.fetchClasses()

    // 创建学生
    const studentData: StudentInfoCreationAttributes = {
      StuRegisterNumber: '2023004',
      StuName: '赵六',
      StuGender: '1',
      StuNation: 1,
      StuBirth: '2005-04-01',
      classID: 1,
    }
    await studentStore.createStudent(studentData)

    // 更新学生
    await studentStore.updateStudent(1, { StuName: '张三（更新）' })

    // 删除学生
    await studentStore.deleteStudent(1)

    // 获取班级名称
    const className = studentStore.getClassName(1)
    console.log('班级名称:', className)

    // 获取学生信息
    const student = studentStore.getStudentById(1)
    console.log('学生信息:', student)
  }
}
