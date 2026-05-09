import type { Column } from "../../types/job.types";
import { KANBAN_COLUMN_STYLES } from "../../constants/job-tracker.constants";
import { cn } from "@/shared/lib/utils";

interface ColumnHeaderProps {
  column: Column;
  jobCount: number;
}

export function ColumnHeader({ column, jobCount }: ColumnHeaderProps) {
  const Icon = column.icon;

  return (
    <div className={KANBAN_COLUMN_STYLES.header.wrapper}>
      <div className={KANBAN_COLUMN_STYLES.header.content}>
        <div className={cn(KANBAN_COLUMN_STYLES.header.icon.wrapper, column.accentColor)}>
          <Icon className={KANBAN_COLUMN_STYLES.header.icon.icon} />
        </div>
        <div className={KANBAN_COLUMN_STYLES.header.text.container}>
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-base font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-xl">{column.title}</h3>
            <div className={cn(
              "flex h-7 min-w-7 items-center justify-center px-2 rounded-xl text-sm font-black shadow-sm sm:h-9 sm:min-w-9 sm:px-2.5 sm:rounded-2xl sm:text-base",
              column.accentColor
            )}>
              {jobCount}
            </div>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <div className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <p className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              {jobCount === 1 ? 'Opportunity' : 'Opportunities'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
