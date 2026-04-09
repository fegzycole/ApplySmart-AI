import { apiClient } from '@/shared/services/api-client';

/**
 * Settings API Service
 * Makes real API calls to backend endpoints
 */

const ENDPOINTS = {
  // Profile
  PROFILE: '/settings/profile',

  // Billing
  CURRENT_PLAN: '/settings/billing/plan',
  PAYMENT_METHOD: '/settings/billing/payment-method',
  INVOICES: '/settings/billing/invoices',
  CANCEL_SUBSCRIPTION: '/settings/billing/subscription/cancel',

  // Security
  SESSIONS: '/settings/security/sessions',
  REVOKE_SESSION: (deviceName: string) => `/settings/security/sessions/${encodeURIComponent(deviceName)}`,
  CHANGE_PASSWORD: '/settings/security/password',
  TWO_FACTOR_ENABLE: '/settings/security/2fa/enable',
  TWO_FACTOR_DISABLE: '/settings/security/2fa/disable',

  // Notifications
  NOTIFICATIONS: '/settings/notifications',
  NOTIFICATION_SETTING: (settingId: string) => `/settings/notifications/${settingId}`,

  // Account
  DELETE_ACCOUNT: '/settings/account/delete',
  EXPORT_DATA: '/settings/account/export',
};

// Types
export interface UserProfile {
  initials: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
}

export interface BillingPlan {
  name: string;
  price: string;
  renewalDate: string;
  status: string;
}

export interface PaymentMethod {
  cardNumber: string;
  expiryDate: string;
}

export interface Invoice {
  date: string;
  amount: string;
  status: string;
}

export interface Session {
  device: string;
  location: string;
  status: string;
  isCurrent: boolean;
}

export interface PasswordChange {
  currentPassword: string;
  newPassword: string;
}

export interface TwoFactorSetup {
  success: boolean;
  qrCode: string;
  backupCodes: string[];
}

export interface NotificationSetting {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
}

// Profile Services
export const fetchUserProfile = async (): Promise<UserProfile> => {
  return apiClient.get<UserProfile>(ENDPOINTS.PROFILE);
};

export const updateUserProfile = async (updates: Partial<UserProfile>): Promise<UserProfile> => {
  return apiClient.patch<UserProfile, Partial<UserProfile>>(ENDPOINTS.PROFILE, updates);
};

// Billing Services
export const fetchCurrentPlan = async (): Promise<BillingPlan> => {
  return apiClient.get<BillingPlan>(ENDPOINTS.CURRENT_PLAN);
};

export const fetchPaymentMethod = async (): Promise<PaymentMethod> => {
  return apiClient.get<PaymentMethod>(ENDPOINTS.PAYMENT_METHOD);
};

export const fetchInvoices = async (): Promise<Invoice[]> => {
  return apiClient.get<Invoice[]>(ENDPOINTS.INVOICES);
};

export const updatePaymentMethod = async (paymentData: Partial<PaymentMethod>): Promise<PaymentMethod> => {
  return apiClient.patch<PaymentMethod, Partial<PaymentMethod>>(ENDPOINTS.PAYMENT_METHOD, paymentData);
};

export const cancelSubscription = async (): Promise<{ success: boolean; message: string }> => {
  return apiClient.post(ENDPOINTS.CANCEL_SUBSCRIPTION);
};

// Security Services
export const fetchActiveSessions = async (): Promise<Session[]> => {
  return apiClient.get<Session[]>(ENDPOINTS.SESSIONS);
};

export const revokeSession = async (deviceName: string): Promise<{ success: boolean; revokedDevice: string }> => {
  return apiClient.delete(ENDPOINTS.REVOKE_SESSION(deviceName));
};

export const changePassword = async (passwordData: PasswordChange): Promise<{ success: boolean; message: string }> => {
  return apiClient.post(ENDPOINTS.CHANGE_PASSWORD, passwordData);
};

export const enableTwoFactor = async (): Promise<TwoFactorSetup> => {
  return apiClient.post<TwoFactorSetup>(ENDPOINTS.TWO_FACTOR_ENABLE);
};

export const disableTwoFactor = async (): Promise<{ success: boolean; message: string }> => {
  return apiClient.post(ENDPOINTS.TWO_FACTOR_DISABLE);
};

// Notification Services
export const fetchNotificationSettings = async (): Promise<NotificationSetting[]> => {
  return apiClient.get<NotificationSetting[]>(ENDPOINTS.NOTIFICATIONS);
};

export const updateNotificationSetting = async (
  settingId: string,
  enabled: boolean
): Promise<{ settingId: string; enabled: boolean; message: string }> => {
  return apiClient.patch(ENDPOINTS.NOTIFICATION_SETTING(settingId), { enabled });
};

// Account Management
export const deleteAccount = async (): Promise<{ success: boolean; message: string }> => {
  return apiClient.delete(ENDPOINTS.DELETE_ACCOUNT);
};

export const exportData = async (): Promise<{ success: boolean; downloadUrl: string; expiresAt: string }> => {
  return apiClient.post(ENDPOINTS.EXPORT_DATA);
};
