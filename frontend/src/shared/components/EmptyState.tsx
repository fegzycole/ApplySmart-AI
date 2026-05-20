import { cn } from "@/shared/lib/utils";

interface EmptyStateProps {
  message: string;
  height?: string;
}

export function EmptyState({ message, height = "h-32" }: EmptyStateProps) {
  return (
    <div className={cn("flex items-center justify-center text-zinc-500", height)}>
      {message}
    </div>
  );
}
