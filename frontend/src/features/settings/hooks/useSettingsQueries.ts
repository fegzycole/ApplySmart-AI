import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as settingsService from '../services/settings.service';
import type {
  UserProfile,
  PaymentMethod,
  PasswordChange,
} from '../services/settings.service';

/**
 * Query keys for settings
 */
export const SETTINGS_KEYS = {
  all: ['settings'] as const,
  profile: () => [...SETTINGS_KEYS.all, 'profile'] as const,
  plan: () => [...SETTINGS_KEYS.all, 'plan'] as const,
  payment: () => [...SETTINGS_KEYS.all, 'payment'] as const,
  invoices: () => [...SETTINGS_KEYS.all, 'invoices'] as const,
  sessions: () => [...SETTINGS_KEYS.all, 'sessions'] as const,
  notifications: () => [...SETTINGS_KEYS.all, 'notifications'] as const,
};

// ========== Profile ==========

export const useUserProfile = () => {
  return useQuery({
    queryKey: SETTINGS_KEYS.profile(),
    queryFn: settingsService.fetchUserProfile,
  });
};

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updates: Partial<UserProfile>) =>
      settingsService.updateUserProfile(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_KEYS.profile() });
    },
  });
};

// ========== Billing ==========

export const useCurrentPlan = () => {
  return useQuery({
    queryKey: SETTINGS_KEYS.plan(),
    queryFn: settingsService.fetchCurrentPlan,
  });
};

export const usePaymentMethod = () => {
  return useQuery({
    queryKey: SETTINGS_KEYS.payment(),
    queryFn: settingsService.fetchPaymentMethod,
  });
};

export const useInvoices = () => {
  return useQuery({
    queryKey: SETTINGS_KEYS.invoices(),
    queryFn: settingsService.fetchInvoices,
  });
};

export const useUpdatePaymentMethod = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (paymentData: Partial<PaymentMethod>) =>
      settingsService.updatePaymentMethod(paymentData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_KEYS.payment() });
    },
  });
};

export const useCancelSubscription = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: settingsService.cancelSubscription,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_KEYS.plan() });
    },
  });
};

// ========== Security ==========

export const useActiveSessions = () => {
  return useQuery({
    queryKey: SETTINGS_KEYS.sessions(),
    queryFn: settingsService.fetchActiveSessions,
  });
};

export const useRevokeSession = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (deviceName: string) => settingsService.revokeSession(deviceName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_KEYS.sessions() });
    },
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (passwordData: PasswordChange) =>
      settingsService.changePassword(passwordData),
  });
};

export const useEnableTwoFactor = () => {
  return useMutation({
    mutationFn: settingsService.enableTwoFactor,
  });
};

export const useDisableTwoFactor = () => {
  return useMutation({
    mutationFn: settingsService.disableTwoFactor,
  });
};

// ========== Notifications ==========

export const useNotificationSettings = () => {
  return useQuery({
    queryKey: SETTINGS_KEYS.notifications(),
    queryFn: settingsService.fetchNotificationSettings,
  });
};

export const useUpdateNotificationSetting = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ settingId, enabled }: { settingId: string; enabled: boolean }) =>
      settingsService.updateNotificationSetting(settingId, enabled),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SETTINGS_KEYS.notifications() });
    },
  });
};

// ========== Account Management ==========

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: settingsService.deleteAccount,
  });
};

export const useExportData = () => {
  return useMutation({
    mutationFn: settingsService.exportData,
  });
};
