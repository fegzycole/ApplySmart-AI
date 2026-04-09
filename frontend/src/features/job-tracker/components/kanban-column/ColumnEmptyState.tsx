import { KANBAN_COLUMN_STYLES } from "../../constants/job-tracker.constants";

export function ColumnEmptyState() {
  return (
    <div className={KANBAN_COLUMN_STYLES.emptyState}>
      Drop jobs here
    </div>
  );
}
