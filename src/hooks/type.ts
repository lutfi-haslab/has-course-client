export interface AddEntityResponse<T> {
  code: number;
  status: string;
  message: string;
  data: T;
}
