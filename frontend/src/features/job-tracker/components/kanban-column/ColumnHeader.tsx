import type { Column } from "../../types/job.types";
import { KANBAN_COLUMN_STYLES } from "../../constants/job-tracker.constants";

interface ColumnHeaderProps {
  column: Column;
  jobCount: number;
}

export function ColumnHeader({ column, jobCount }: ColumnHeaderProps) {
  const Icon = column.icon;

  return (
    <div className={`${KANBAN_COLUMN_STYLES.header.wrapper} bg-gradient-to-r ${column.gradient}`}>
      <div className={KANBAN_COLUMN_STYLES.header.content}>
        <div className={`${KANBAN_COLUMN_STYLES.header.icon.wrapper} ${column.accentColor}`}>
          <Icon className={KANBAN_COLUMN_STYLES.header.icon.icon} />
        </div>
        <div className={KANBAN_COLUMN_STYLES.header.text.container}>
          <h3 className={KANBAN_COLUMN_STYLES.header.text.title}>{column.title}</h3>
          <p className={KANBAN_COLUMN_STYLES.header.text.count}>{jobCount} jobs</p>
        </div>
      </div>
    </div>
  );
}
