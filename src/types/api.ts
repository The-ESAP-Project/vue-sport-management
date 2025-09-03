// API 响应基础结构
export interface ApiResponse<T = unknown> {
  code: number
  message: string
  data: T
  timestamp: string
}

// API 错误响应结构
export interface ApiErrorResponse<T = unknown> {
  code: number
  message: string
  data?: T
  timestamp: string
}

// 导出分页相关类型（从 pagination.ts 导入）
export type { PaginationQuery, PaginationInfo, PaginatedResponse } from './pagination'
