import { useRef } from "react";
import { BadgeCheck, Camera, Loader2, ShieldCheck } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { UserAvatar } from "@/shared/components/UserAvatar";

interface ProfileAvatarProps {
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  authProvider: string;
  imageUrl: string | null;
  uploading: boolean;
  onUploadPhoto: (file: File) => void;
}

function getProviderLabel(authProvider: string) {
  switch (authProvider) {
    case "GOOGLE":
      return "Google account";
    case "GITHUB":
      return "GitHub account";
    default:
      return "Email and password";
  }
}

export function ProfileAvatar({
  firstName,
  lastName,
  email,
  emailVerified,
  authProvider,
  imageUrl,
  uploading,
  onUploadPhoto,
}: ProfileAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    onUploadPhoto(selectedFile);
    event.target.value = "";
  };

  return (
    <div className="rounded-[1.5rem] border border-violet-100 bg-gradient-to-br from-violet-50/70 via-white to-cyan-50/70 p-5 dark:border-violet-900/70 dark:from-violet-950/30 dark:via-zinc-900 dark:to-cyan-950/20">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative shrink-0">
          <UserAvatar
            firstName={firstName}
            lastName={lastName}
            imageUrl={imageUrl}
            className="size-24 rounded-full shadow-lg shadow-violet-500/20"
            textClassName="text-3xl"
          />
        </div>
        <div className="min-w-0 space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
              {firstName} {lastName}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">{email}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-950/5 dark:bg-white/[0.05] dark:text-zinc-200 dark:ring-white/10">
              <ShieldCheck className="size-3.5" />
              {getProviderLabel(authProvider)}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/80 px-3 py-1 text-xs font-medium text-zinc-700 ring-1 ring-zinc-950/5 dark:bg-white/[0.05] dark:text-zinc-200 dark:ring-white/10">
              <BadgeCheck className="size-3.5" />
              {emailVerified ? "Email verified" : "Email not verified"}
            </span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            variant="outline"
            disabled={uploading}
            className="rounded-xl border-zinc-200 bg-white/80 text-zinc-700 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-200 dark:hover:bg-zinc-900"
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? <Loader2 className="size-4 animate-spin" /> : <Camera className="size-4" />}
            {uploading ? "Uploading..." : "Update Photo"}
          </Button>
        </div>
      </div>
    </div>
  );
}
