import { API_ENDPOINTS } from "@/shared/constants/api-endpoints";
import { apiClient } from "@/shared/services/api-client";
import type { SettingsProfile, UpdateProfileRequest } from "../types/settings.types";

export const fetchProfile = async (): Promise<SettingsProfile> => {
  return apiClient.get<SettingsProfile>(API_ENDPOINTS.SETTINGS.PROFILE);
};

export const updateProfile = async (
  data: UpdateProfileRequest,
): Promise<SettingsProfile> => {
  return apiClient.patch<SettingsProfile, UpdateProfileRequest>(
    API_ENDPOINTS.SETTINGS.PROFILE,
    data,
  );
};

export const uploadProfilePhoto = async (file: File): Promise<SettingsProfile> => {
  const formData = new FormData();
  formData.append("file", file);

  return apiClient.post<SettingsProfile, FormData>(
    API_ENDPOINTS.SETTINGS.PROFILE_PHOTO,
    formData,
  );
};
