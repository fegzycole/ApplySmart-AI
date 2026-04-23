import { LucideIcon, Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  message: string;
  buttonLabel: string;
  onAdd: () => void;
}

export function EmptyState({ icon: Icon, message, buttonLabel, onAdd }: EmptyStateProps) {
  return (
    <div className="text-center py-12 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl">
      <Icon className="size-12 mx-auto text-zinc-300 dark:text-zinc-700 mb-3" />
      <p className="text-zinc-500 dark:text-zinc-400 mb-4">{message}</p>
      <Button onClick={onAdd} variant="outline" className="rounded-lg">
        <Plus className="size-4 mr-2" />
        {buttonLabel}
      </Button>
    </div>
  );
}
