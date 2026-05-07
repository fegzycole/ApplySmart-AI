import { JobCard } from "../JobCard";
import type { Job } from "../../types/job.types";
import { KANBAN_COLUMN_STYLES } from "../../constants/job-tracker.constants";
import { ColumnEmptyState } from "./ColumnEmptyState";

interface ColumnDropZoneProps {
  jobs: Job[];
  isOver: boolean;
  onEdit: (job: Job) => void;
  onDelete: (id: number) => void;
  dropRef: React.Ref<HTMLDivElement>;
  emptyMessage: string;
}

export function ColumnDropZone({ jobs, isOver, onEdit, onDelete, dropRef, emptyMessage }: ColumnDropZoneProps) {
  const dropZoneClassName = `${KANBAN_COLUMN_STYLES.dropZone.base} ${
    isOver ? KANBAN_COLUMN_STYLES.dropZone.hover : KANBAN_COLUMN_STYLES.dropZone.default
  }`;

  return (
    <div ref={dropRef} className={dropZoneClassName}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onEdit={onEdit} onDelete={onDelete} />
      ))}
      {jobs.length === 0 && <ColumnEmptyState message={emptyMessage} />}
    </div>
  );
}
