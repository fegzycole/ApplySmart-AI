import { useDrop } from "react-dnd";
import type { Column, Job, JobStatus } from "../types/job.types";
import { KANBAN_COLUMN_STYLES } from "../constants/job-tracker.constants";
import { ColumnHeader, ColumnDropZone } from "./kanban-column";

interface KanbanColumnProps {
  column: Column;
  jobs: Job[];
  onDrop: (jobId: number, newStatus: JobStatus) => void;
  onDelete: (id: number) => void;
  columns: Column[];
}

export function KanbanColumn({
  column,
  jobs,
  onDrop,
  onDelete,
}: KanbanColumnProps) {
  const [{ isOver }, drop] = useDrop<Job, void, { isOver: boolean }>({
    accept: "JOB",
    drop: (item: Job) => onDrop(item.id, column.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div className={KANBAN_COLUMN_STYLES.container}>
      <ColumnHeader column={column} jobCount={jobs.length} />
      <ColumnDropZone
        jobs={jobs}
        isOver={isOver}
        onDelete={onDelete}
        dropRef={drop as unknown as React.Ref<HTMLDivElement>}
      />
    </div>
  );
}
