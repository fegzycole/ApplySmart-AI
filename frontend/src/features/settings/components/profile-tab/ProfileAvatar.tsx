import { useRef } from "react";
import { BadgeCheck, Camera, Loader2, ShieldCheck } from "lucide-react";
import { UserAvatar } from "@/shared/components/UserAvatar";
import { cn } from "@/shared/lib/utils";

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
      return "Google Core";
    case "GITHUB":
      return "GitHub Core";
    default:
      return "Local Auth";
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
    if (!selectedFile) return;
    onUploadPhoto(selectedFile);
    event.target.value = "";
  };

  return (
    <div className="group relative overflow-hidden rounded-[2rem] border-2 border-zinc-100 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900 sm:rounded-[2.5rem] sm:p-8">
      {/* Background Aura */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
      
      <div className="relative z-10 flex flex-col items-center gap-6 text-center sm:gap-8">
        <div className="relative self-center">
          <UserAvatar
            firstName={firstName}
            lastName={lastName}
            imageUrl={imageUrl}
            className="size-28 rounded-[2rem] border-4 border-white shadow-2xl dark:border-zinc-800 sm:size-32 sm:rounded-[2.5rem]"
            textClassName="text-3xl font-black sm:text-4xl"
          />
          <button
            type="button"
            disabled={uploading}
            onClick={() => fileInputRef.current?.click()}
            className="absolute -right-2 -bottom-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-zinc-900 text-white shadow-xl transition-all hover:scale-110 active:scale-95 dark:bg-sky-600 sm:h-12 sm:w-12"
          >
            {uploading ? <Loader2 className="size-4 animate-spin sm:size-5" /> : <Camera className="size-4 sm:size-5" />}
          </button>
        </div>

        <div className="flex min-w-0 w-full flex-col items-center space-y-5 sm:space-y-6">
          <div className="space-y-1">
            <h3 className="break-words text-2xl font-black uppercase leading-none tracking-tighter text-zinc-900 dark:text-zinc-50">
              {firstName} {lastName}
            </h3>
            <p className="max-w-full break-words text-sm font-medium text-zinc-500 dark:text-zinc-400">
              {email}
            </p>
          </div>

          <div className="flex w-full flex-wrap justify-center gap-2 sm:gap-3">
            <div className="inline-flex min-w-0 max-w-full items-center justify-center gap-2 rounded-full border border-zinc-200/50 bg-zinc-900/5 px-3 py-2 dark:border-zinc-700/30 dark:bg-white/5">
              <ShieldCheck className="size-3.5 shrink-0 text-sky-500" />
              <span className="min-w-0 truncate text-[10px] font-black uppercase leading-none tracking-[0.18em] text-zinc-500">
                {getProviderLabel(authProvider)}
              </span>
            </div>
            <div className="inline-flex min-w-0 max-w-full items-center justify-center gap-2 rounded-full border border-zinc-200/50 bg-zinc-900/5 px-3 py-2 dark:border-zinc-700/30 dark:bg-white/5">
              <BadgeCheck className={cn("size-3.5 shrink-0", emailVerified ? "text-emerald-500" : "text-amber-500")} />
              <span className="min-w-0 truncate text-[10px] font-black uppercase leading-none tracking-[0.18em] text-zinc-500">
                {emailVerified ? "Verified" : "Unverified"}
              </span>
            </div>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
}
