import { Button } from "@/shared/components/ui/button";
import { Camera } from "lucide-react";

interface ProfileAvatarProps {
  initials: string;
  onChangePhoto?: () => void;
}

export function ProfileAvatar({ initials, onChangePhoto }: ProfileAvatarProps) {
  return (
    <div className="p-6 rounded-xl bg-gradient-to-br from-violet-50/50 to-fuchsia-50/50 dark:from-violet-950/20 dark:to-fuchsia-950/20 border border-violet-100 dark:border-violet-900">
      <div className="flex items-center gap-6">
        <div className="relative group">
          <div className="size-24 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 flex items-center justify-center shadow-lg">
            <span className="text-3xl font-bold text-white">{initials}</span>
          </div>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Profile Picture</h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
            JPG, PNG or GIF. Max size 2MB.
          </p>
          <Button
            size="sm"
            onClick={onChangePhoto}
            className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg"
          >
            <Camera className="size-4 mr-2" />
            Change Photo
          </Button>
        </div>
      </div>
    </div>
  );
}
