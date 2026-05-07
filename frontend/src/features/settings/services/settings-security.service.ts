import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import { apiClient } from "@/shared/services/api-client";
import type {
  ChangePasswordRequest,
  EnableTwoFactorRequest,
  SettingsSecurity,
  TwoFactorSetup,
} from "../types/settings.types";

export const fetchSecuritySettings = async (): Promise<SettingsSecurity> => {
  return apiClient.get<SettingsSecurity>(API_ENDPOINTS.SETTINGS.SECURITY.MAIN);
};

export const changePassword = async (data: ChangePasswordRequest): Promise<void> => {
  await apiClient.post(API_ENDPOINTS.SETTINGS.SECURITY.CHANGE_PASSWORD, data);
};

export const setupTwoFactor = async (): Promise<TwoFactorSetup> => {
  return apiClient.post<TwoFactorSetup>(API_ENDPOINTS.SETTINGS.SECURITY.SETUP_2FA);
};

export const enableTwoFactor = async (data: EnableTwoFactorRequest): Promise<void> => {
  await apiClient.post<void, EnableTwoFactorRequest>(API_ENDPOINTS.SETTINGS.SECURITY.ENABLE_2FA, data);
};

export const disableTwoFactor = async (): Promise<void> => {
  await apiClient.post(API_ENDPOINTS.SETTINGS.SECURITY.DISABLE_2FA);
};
