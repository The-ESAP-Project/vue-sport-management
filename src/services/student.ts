// 学生和班级管理服务
import api from './api'
import type { ApiResponse } from './api'
import type {
  StudentInfo,
  StudentInfoCreationAttributes,
  StudentQuery,
  StudentListResponse,
  ClassInfo,
  ClassInfoCreationAttributes,
  ClassQuery,
  ClassListResponse,
  BatchCreateStudentsRequest,
} from '@/types/student'

export class StudentService {
  /**
   * 获取学生列表
   */
  static async getStudents(query?: StudentQuery): Promise<StudentListResponse> {
    const params = new URLSearchParams()

    if (query?.classId) params.append('classId', query.classId.toString())
    if (query?.grade) params.append('grade', query.grade)
    if (query?.keyword) params.append('keyword', query.keyword)
    if (query?.page) params.append('page', query.page.toString())
    if (query?.pageSize) params.append('pageSize', query.pageSize.toString())

    const queryString = params.toString()
    const url = `/v1/students${queryString ? `?${queryString}` : ''}`

    const response = await api.get(url)

    // 解析API响应
    const { data: items, pagination } = response.data

    return {
      items: items || [],
      pagination: {
        page: pagination?.page || 1,
        pageSize: pagination?.pageSize || 20,
        total: pagination?.total || 0,
        totalPages: pagination?.totalPages || 0,
      }
    }
  }

  /**
   * 创建单个学生
   */
  static async createStudent(student: StudentInfoCreationAttributes): Promise<StudentInfo> {
    const response = await api.post<ApiResponse<StudentInfo>>('/v1/students', student)
    return response.data.data
  }

  /**
   * 批量创建学生
   */
  static async batchCreateStudents(students: StudentInfoCreationAttributes[]): Promise<StudentInfo[]> {
    const request: BatchCreateStudentsRequest = { students }
    const response = await api.post<ApiResponse<StudentInfo[]>>('/v1/students/batch', request)
    return response.data.data
  }

  /**
   * 获取单个学生信息
   */
  static async getStudent(studentId: number): Promise<StudentInfo> {
    const response = await api.get<ApiResponse<StudentInfo>>(`/v1/students/${studentId}`)
    return response.data.data
  }

  /**
   * 更新学生信息
   */
  static async updateStudent(studentId: number, student: Partial<StudentInfoCreationAttributes>): Promise<StudentInfo> {
    const response = await api.put<ApiResponse<StudentInfo>>(`/v1/students/${studentId}`, student)
    return response.data.data
  }

  /**
   * 删除学生（软删）
   */
  static async deleteStudent(studentId: number): Promise<void> {
    await api.delete(`/v1/students/${studentId}`)
  }
}

export class ClassService {
  /**
   * 获取班级列表
   */
  static async getClasses(query?: ClassQuery): Promise<ClassListResponse> {
    const params = new URLSearchParams()

    if (query?.grade) params.append('grade', query.grade)
    if (query?.department) params.append('department', query.department)
    if (query?.page) params.append('page', query.page.toString())
    if (query?.pageSize) params.append('pageSize', query.pageSize.toString())

    const queryString = params.toString()
    const url = `/v1/classes${queryString ? `?${queryString}` : ''}`

    const response = await api.get(url)

    // 解析API响应 - classes API返回的是数组，没有分页信息
    const items = response.data.data || []

    return {
      items,
      pagination: {
        page: 1,
        pageSize: items.length,
        total: items.length,
        totalPages: 1,
      }
    }
  }

  /**
   * 创建班级
   */
  static async createClass(classInfo: ClassInfoCreationAttributes): Promise<ClassInfo> {
    const response = await api.post<ApiResponse<ClassInfo>>('/v1/classes', classInfo)
    return response.data.data
  }

  /**
   * 获取单个班级信息
   */
  static async getClass(classId: number): Promise<ClassInfo> {
    const response = await api.get<ApiResponse<ClassInfo>>(`/v1/classes/${classId}`)
    return response.data.data
  }

  /**
   * 更新班级信息
   */
  static async updateClass(classId: number, classInfo: Partial<ClassInfoCreationAttributes>): Promise<ClassInfo> {
    const response = await api.put<ApiResponse<ClassInfo>>(`/v1/classes/${classId}`, classInfo)
    return response.data.data
  }

  /**
   * 删除班级（软删）
   */
  static async deleteClass(classId: number): Promise<void> {
    await api.delete(`/v1/classes/${classId}`)
  }
}

export default {
  StudentService,
  ClassService,
}
