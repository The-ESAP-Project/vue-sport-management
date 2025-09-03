// 服务统一入口文件
export { default as AuthService } from './auth'
export { StudentService, ClassService } from './student'

// 导出 HTTP 客户端
export { default as api } from './api'

// 导出类型
export type { ApiResponse, ApiError } from './api'
