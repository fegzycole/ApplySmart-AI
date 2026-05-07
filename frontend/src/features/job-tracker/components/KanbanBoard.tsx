import { KanbanColumn } from "./KanbanColumn";
import { KANBAN_COLUMNS } from "../constants/job-tracker.constants";
import type { Job, JobStatus } from "../types/job.types";

interface KanbanBoardProps {
  jobs: Job[];
  onDrop: (jobId: number, newStatus: JobStatus) => void;
  onEdit: (job: Job) => void;
  onDelete: (jobId: number) => void;
  emptyMessage: string;
}

export function KanbanBoard({ jobs, onDrop, onEdit, onDelete, emptyMessage }: KanbanBoardProps) {
  return (
    <div className="overflow-x-auto pb-6">
      <div className="flex gap-6 min-w-max">
        {KANBAN_COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            jobs={jobs.filter((job) => job.status === column.id)}
            onDrop={onDrop}
            onEdit={onEdit}
            onDelete={onDelete}
            emptyMessage={emptyMessage || `No jobs in ${column.title}`}
          />
        ))}
      </div>
    </div>
  );
}
