import { toast } from "sonner";
import { User } from "lucide-react";
import { SectionCard } from "../shared/SectionCard";
import { ProfileAvatar } from "./ProfileAvatar";
import { ProfileForm } from "./ProfileForm";
import {
  useProfileSettings,
  useUploadProfilePhoto,
  useUpdateProfileSettings,
} from "../../hooks/useSettingsProfile";
import { validateProfileImage } from "../../utils/settings-profile-image";

export function ProfileTab() {
  const profileQuery = useProfileSettings();
  const updateProfileMutation = useUpdateProfileSettings();
  const uploadProfilePhotoMutation = useUploadProfilePhoto();

  const profile = profileQuery.data;

  const handleUploadPhoto = async (file: File) => {
    const validationError = validateProfileImage(file);
    if (validationError) {
      toast.error(validationError);
      return;
    }

    try {
      await uploadProfilePhotoMutation.mutateAsync(file);
      toast.success("Profile photo updated successfully.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update profile photo.");
    }
  };

  return (
    <SectionCard
      icon={User}
      title="Profile Information"
      description="Manage the profile details supported by your account settings"
    >
      {profileQuery.isError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-700 dark:border-red-950 dark:bg-red-950/20 dark:text-red-300">
          We couldn't load your profile right now. Please refresh and try again.
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
        <ProfileAvatar
          firstName={profile?.firstName ?? "Your"}
          lastName={profile?.lastName ?? "Profile"}
          email={profile?.email ?? "Loading profile..."}
          emailVerified={profile?.emailVerified ?? false}
          authProvider={profile?.authProvider ?? "LOCAL"}
          imageUrl={profile?.imageUrl ?? null}
          uploading={uploadProfilePhotoMutation.isPending}
          onUploadPhoto={handleUploadPhoto}
        />
        <ProfileForm
          profile={profile}
          isLoading={profileQuery.isLoading}
          isSaving={updateProfileMutation.isPending}
          onSubmit={async (data) => {
            await updateProfileMutation.mutateAsync(data);
          }}
        />
      </div>
    </SectionCard>
  );
}
