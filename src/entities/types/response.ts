// Base response types
export interface Pagination {
  page: number;
  limit: number;
  size: number;
  order: string
}

export interface BaseResponse<T> {
  data: T;
  pagination?: Pagination;
}

export interface ApiResponse<T> extends BaseResponse<T> {
  code: number;
  status: "success" | "error";
  message: string;
}
