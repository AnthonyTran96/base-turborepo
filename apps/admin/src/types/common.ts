export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface PaginationOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  // statusCode: number;
  data?: T;
  meta?: PaginationMeta;
  errorCode?: string;
  errors?: Record<string, string[]>;
}
