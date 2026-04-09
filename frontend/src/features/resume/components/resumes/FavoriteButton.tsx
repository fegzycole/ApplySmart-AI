import { Button } from "@/shared/components/ui/button";
import { Star, StarOff } from "lucide-react";

interface FavoriteButtonProps {
  isFavorite: boolean;
  onToggle: () => void;
  variant?: "default" | "mobile";
}

export function FavoriteButton({ isFavorite, onToggle, variant = "default" }: FavoriteButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="size-8 hover:bg-violet-100 dark:hover:bg-violet-950/30"
      onClick={onToggle}
    >
      {isFavorite ? (
        <Star className="size-4 fill-amber-500 text-amber-500" />
      ) : (
        <StarOff className={`size-4 ${variant === "default" ? "text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-400" : "text-zinc-400"}`} />
      )}
    </Button>
  );
}
