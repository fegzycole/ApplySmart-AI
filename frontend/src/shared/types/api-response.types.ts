export interface ApiSuccessResponse<T = void> {
  success: boolean;
  message: string;
  data?: T;
}
