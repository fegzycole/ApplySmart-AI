import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/shared/services/api-client";
import { deleteAccount } from "../services/settings-account.service";
import type { DeleteAccountRequest } from "../types/settings.types";

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteAccountRequest) => deleteAccount(data),
    onSuccess: () => {
      queryClient.clear();
      apiClient.clearAuthToken();
    },
  });
};
