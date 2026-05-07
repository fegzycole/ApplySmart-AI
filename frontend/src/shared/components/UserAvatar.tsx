import { useEffect, useState } from "react";
import { cn } from "@/shared/lib/utils";
import { getInitials } from "@/shared/utils/user.utils";

interface UserAvatarProps {
  firstName: string;
  lastName: string;
  imageUrl?: string | null;
  alt?: string;
  className?: string;
  imageClassName?: string;
  fallbackClassName?: string;
  textClassName?: string;
}

export function UserAvatar({
  firstName,
  lastName,
  imageUrl,
  alt,
  className,
  imageClassName,
  fallbackClassName,
  textClassName,
}: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setImageError(false);
  }, [imageUrl]);

  const initials = getInitials(firstName, lastName);
  const shouldRenderImage = Boolean(imageUrl) && !imageError;

  return (
    <div className={cn("overflow-hidden", className)}>
      {shouldRenderImage ? (
        <img
          src={imageUrl ?? undefined}
          alt={alt ?? `${firstName} ${lastName}`}
          className={cn("size-full object-cover", imageClassName)}
          onError={() => setImageError(true)}
        />
      ) : (
        <div
          className={cn(
            "flex size-full items-center justify-center bg-gradient-to-br from-violet-500 via-fuchsia-500 to-cyan-500 rounded-full",
            fallbackClassName,
          )}
        >
          <span className={cn("font-bold text-white", textClassName)}>
            {initials}
          </span>
        </div>
      )}
    </div>
  );
}
