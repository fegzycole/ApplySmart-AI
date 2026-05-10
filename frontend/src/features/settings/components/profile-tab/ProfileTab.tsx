import { toast } from "sonner";
import { User } from "lucide-react";
import { Skeleton } from "@/shared/components/ui/skeleton";
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

  if (profileQuery.isLoading) {
    return (
      <SectionCard
        icon={User}
        title="Profile Information"
        description="Manage the profile details supported by your account settings"
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,320px)_minmax(0,1fr)]">
          {/* Avatar card skeleton */}
          <div className="rounded-[2rem] border-2 border-zinc-100 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:rounded-[2.5rem] sm:p-8">
            <div className="flex flex-col items-center gap-6 text-center sm:gap-8">
              <Skeleton className="h-28 w-28 rounded-[2rem] sm:h-32 sm:w-32 sm:rounded-[2.5rem]" />
              <div className="flex w-full flex-col items-center gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-6 w-36 mx-auto" />
                  <Skeleton className="h-4 w-44 mx-auto" />
                </div>
                <div className="flex flex-wrap justify-center gap-2">
                  <Skeleton className="h-7 w-24 rounded-full" />
                  <Skeleton className="h-7 w-20 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Form skeleton */}
          <div className="space-y-5">
            <div className="grid gap-4 md:grid-cols-2">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-12 w-full rounded-2xl sm:h-14" />
                </div>
              ))}
            </div>
            <div className="space-y-1.5">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-12 w-full rounded-2xl sm:h-14" />
            </div>
            <div className="pt-8 flex justify-end">
              <Skeleton className="h-16 w-48 rounded-2xl" />
            </div>
          </div>
        </div>
      </SectionCard>
    );
  }

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
