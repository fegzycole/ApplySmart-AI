import { Sun } from "lucide-react";
import { KANBAN_COLUMN_STYLES } from "../../constants/job-tracker.constants";

interface ColumnEmptyStateProps {
  message: string;
}

export function ColumnEmptyState({ message }: ColumnEmptyStateProps) {
  return (
    <div className={KANBAN_COLUMN_STYLES.emptyState}>
      <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-zinc-50 dark:bg-zinc-800 text-zinc-200 dark:text-zinc-700 shadow-inner group-hover:scale-110 transition-transform">
        <Sun className="size-10" />
      </div>
      <p className="text-[13px] font-semibold text-zinc-400 dark:text-zinc-500 leading-relaxed px-8">
        {message || "Ready for your next opportunity"}
      </p>
    </div>
  );
}
