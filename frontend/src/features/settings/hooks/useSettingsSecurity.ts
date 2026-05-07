import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AUTH_KEYS } from "@/features/authentication/hooks/useAuthQueries";
import type { User } from "@/features/authentication/types/auth.types";
import {
  changePassword,
  disableTwoFactor,
  enableTwoFactor,
  fetchSecuritySettings,
  setupTwoFactor,
} from "../services/settings-security.service";
import type {
  ChangePasswordRequest,
  EnableTwoFactorRequest,
  SettingsSecurity,
} from "../types/settings.types";

export const SECURITY_SETTINGS_KEYS = {
  all: ["settings", "security"] as const,
  detail: () => [...SECURITY_SETTINGS_KEYS.all, "detail"] as const,
};

export const useSecuritySettings = () => {
  return useQuery({
    queryKey: SECURITY_SETTINGS_KEYS.detail(),
    queryFn: fetchSecuritySettings,
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => changePassword(data),
  });
};

function updateSecurityCache(queryClient: QueryClient, nextState: Partial<SettingsSecurity>) {
  queryClient.setQueryData(
    SECURITY_SETTINGS_KEYS.detail(),
    (current: SettingsSecurity | undefined) =>
      current
        ? {
            ...current,
            ...nextState,
          }
        : current,
  );
}

function updateCurrentUserTwoFactorState(queryClient: QueryClient, twoFactorEnabled: boolean) {
  queryClient.setQueryData(
    AUTH_KEYS.currentUser(),
    (currentUser: User | undefined) =>
      currentUser
        ? {
            ...currentUser,
            twoFactorEnabled,
          }
        : currentUser,
  );
}

export const useSetupTwoFactor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: setupTwoFactor,
    onSuccess: () => {
      updateSecurityCache(queryClient, {
        twoFactorEnabled: false,
        twoFactorSetupPending: true,
      });
    },
  });
};

export const useEnableTwoFactor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: EnableTwoFactorRequest) => enableTwoFactor(data),
    onSuccess: () => {
      updateSecurityCache(queryClient, {
        twoFactorEnabled: true,
        twoFactorSetupPending: false,
      });
      updateCurrentUserTwoFactorState(queryClient, true);
    },
  });
};

export const useDisableTwoFactor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: disableTwoFactor,
    onSuccess: () => {
      updateSecurityCache(queryClient, {
        twoFactorEnabled: false,
        twoFactorSetupPending: false,
      });
      updateCurrentUserTwoFactorState(queryClient, false);
    },
  });
};
