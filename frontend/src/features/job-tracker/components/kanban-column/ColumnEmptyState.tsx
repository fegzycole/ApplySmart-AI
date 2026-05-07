import { KANBAN_COLUMN_STYLES } from "../../constants/job-tracker.constants";

interface ColumnEmptyStateProps {
  message: string;
}

export function ColumnEmptyState({ message }: ColumnEmptyStateProps) {
  return (
    <div className={KANBAN_COLUMN_STYLES.emptyState}>
      {message}
    </div>
  );
}
