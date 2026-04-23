import { ReactNode } from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface ItemCardProps {
  label: string;
  onDelete: () => void;
  children: ReactNode;
}

export function ItemCard({ label, onDelete, children }: ItemCardProps) {
  return (
    <div className="p-5 border border-zinc-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900/50 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-zinc-500">{label}</span>
        <Button
          onClick={onDelete}
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
      {children}
    </div>
  );
}
