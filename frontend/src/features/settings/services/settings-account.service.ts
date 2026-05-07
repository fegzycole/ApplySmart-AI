import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import { apiClient } from "@/shared/services/api-client";
import type { ApiResponse } from "@/features/authentication/types/auth.types";
import type { DeleteAccountRequest } from "../types/settings.types";

export const deleteAccount = async (data: DeleteAccountRequest): Promise<ApiResponse<void>> => {
  return apiClient.delete<ApiResponse<void>, DeleteAccountRequest>(
    API_ENDPOINTS.SETTINGS.ACCOUNT.DELETE,
    data,
  );
};
