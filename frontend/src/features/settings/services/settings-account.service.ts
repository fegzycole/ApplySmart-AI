import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import { apiClient } from "@/shared/services/api-client";
import type { ApiSuccessResponse } from "@/shared/types/api-response.types";
import type { DeleteAccountRequest } from "../types/settings.types";

export const deleteAccount = async (data: DeleteAccountRequest): Promise<ApiSuccessResponse> => {
  return apiClient.delete<ApiSuccessResponse, DeleteAccountRequest>(
    API_ENDPOINTS.SETTINGS.ACCOUNT.DELETE,
    data,
  );
};
