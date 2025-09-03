// 分页相关类型定义

// 分页查询请求参数
export interface PaginatedQueryParams {
  page?: string
  pageSize?: string
  classId?: string
  grade?: string
  keyword?: string
}

// 分页 API 响应接口
export interface PaginatedApiResponse<T = unknown> {
  code: number
  message: string
  data: {
    items: T[]
    total: number
    page: number
    pageSize: number
    totalPages: number
  } | null
}

// 分页信息接口
export interface PaginationInfo {
  page: number
  pageSize: number
  total: number
  totalPages: number
}

// 分页查询参数（数字类型）
export interface PaginationQuery {
  page?: number
  size?: number
}

// 通用分页响应
export interface PaginatedResponse<T> {
  items: T[]
  pagination: PaginationInfo
}
