export type ID = string | number;

export interface PaginationParams {
  page: number;
  pageSize: number;
  search?: string;
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

export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

export interface SelectOption {
  value: string;
  label: string;
}