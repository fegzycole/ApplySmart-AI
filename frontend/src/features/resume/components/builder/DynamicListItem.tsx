import { ReactNode } from "react";
import { Button } from "@/shared/components/ui/button";
import { Trash2 } from "lucide-react";

interface DynamicListItemProps {
  index: number;
  title: string;
  gradient: string;
  border: string;
  canDelete: boolean;
  onDelete: () => void;
  children: ReactNode;
}

export function DynamicListItem({
  index,
  title,
  gradient,
  border,
  canDelete,
  onDelete,
  children
}: DynamicListItemProps) {
  return (
    <div className={`p-6 rounded-xl bg-gradient-to-br ${gradient} border ${border} space-y-4`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`size-8 rounded-lg bg-gradient-to-br ${gradient.replace(/50\/50|950\/20/g, '500')} flex items-center justify-center shadow-lg`}>
            <span className="text-white text-sm font-bold">{index + 1}</span>
          </div>
          <h4 className="font-semibold text-zinc-900 dark:text-white">{title} {index + 1}</h4>
        </div>
        {canDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDelete}
            className="hover:bg-red-100 dark:hover:bg-red-950/30"
          >
            <Trash2 className="size-4 text-red-500" />
          </Button>
        )}
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}
