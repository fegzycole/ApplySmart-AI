import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AUTH_KEYS } from "@/features/authentication/hooks/useAuthQueries";
import type { User } from "@/features/authentication/types/auth.types";
import {
  fetchProfile,
  updateProfile,
  uploadProfilePhoto,
} from "../services/settings.service";
import type { UpdateProfileRequest } from "../types/settings.types";

export const SETTINGS_KEYS = {
  all: ["settings"] as const,
  profile: () => [...SETTINGS_KEYS.all, "profile"] as const,
};

export const useProfileSettings = () => {
  return useQuery({
    queryKey: SETTINGS_KEYS.profile(),
    queryFn: fetchProfile,
  });
};

export const useUpdateProfileSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => updateProfile(data),
    onSuccess: (profile) => {
      queryClient.setQueryData(SETTINGS_KEYS.profile(), profile);
      queryClient.setQueryData(
        AUTH_KEYS.currentUser(),
        (currentUser: User | undefined) =>
          currentUser
            ? {
                ...currentUser,
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                imageUrl: profile.imageUrl,
                emailVerified: profile.emailVerified,
              }
            : currentUser,
      );
    },
  });
};

export const useUploadProfilePhoto = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (file: File) => uploadProfilePhoto(file),
    onSuccess: (profile) => {
      queryClient.setQueryData(SETTINGS_KEYS.profile(), profile);
      queryClient.setQueryData(
        AUTH_KEYS.currentUser(),
        (currentUser: User | undefined) =>
          currentUser
            ? {
                ...currentUser,
                firstName: profile.firstName,
                lastName: profile.lastName,
                email: profile.email,
                imageUrl: profile.imageUrl,
                emailVerified: profile.emailVerified,
              }
            : currentUser,
      );
    },
  });
};
