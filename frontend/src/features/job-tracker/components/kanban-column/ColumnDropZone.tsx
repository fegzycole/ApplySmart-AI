import { JobCard } from "../JobCard";
import type { Job } from "../../types/job.types";
import { KANBAN_COLUMN_STYLES } from "../../constants/job-tracker.constants";
import { ColumnEmptyState } from "./ColumnEmptyState";

interface ColumnDropZoneProps {
  jobs: Job[];
  isOver: boolean;
  onDelete: (id: number) => void;
  dropRef: React.Ref<HTMLDivElement>;
}

export function ColumnDropZone({ jobs, isOver, onDelete, dropRef }: ColumnDropZoneProps) {
  const dropZoneClassName = `${KANBAN_COLUMN_STYLES.dropZone.base} ${
    isOver ? KANBAN_COLUMN_STYLES.dropZone.hover : KANBAN_COLUMN_STYLES.dropZone.default
  }`;

  return (
    <div ref={dropRef} className={dropZoneClassName}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onDelete={onDelete} />
      ))}
      {jobs.length === 0 && <ColumnEmptyState />}
    </div>
  );
}
