export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  errors: string[];
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalItems: number;
  currentPage: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface ApiError {
  message: string;
  errors?: string[];
  statusCode?: number;
}