// 学生相关类型定义
import type { PaginatedResponse } from './pagination'
export interface StudentInfo {
  id: number;
  StuRegisterNumber: string;
  StuName: string;
  StuGender: '0' | '1'; // 0: 女, 1: 男
  StuNation: number;
  StuBirth: string;
  classID: number;
  isDeleted?: boolean;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface StudentInfoCreationAttributes {
  StuRegisterNumber: string;
  StuName: string;
  StuGender: '0' | '1';
  StuNation: number;
  StuBirth: string;
  classID: number;
}

export interface StudentQuery {
  classId?: string;
  grade?: string;
  keyword?: string;
  page?: string;
  pageSize?: string;
}

export type StudentListResponse = PaginatedResponse<StudentInfo>

// 班级相关类型定义
export interface ClassInfo {
  id: number;
  classID: number;
  className: string;
  grade?: string;
  department?: string;
  isDeleted?: boolean;
  deletedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ClassInfoCreationAttributes {
  classID: number;
  className: string;
  grade?: string;
  department?: string;
}

export interface ClassQuery {
  grade?: string;
  department?: string;
  page?: string;
  pageSize?: string;
}

export type ClassListResponse = PaginatedResponse<ClassInfo>

// 批量创建学生请求
export interface BatchCreateStudentsRequest {
  students: StudentInfoCreationAttributes[];
}
