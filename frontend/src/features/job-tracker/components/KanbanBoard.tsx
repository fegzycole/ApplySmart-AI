import { KanbanColumn } from "./KanbanColumn";
import { KANBAN_COLUMNS } from "../constants/job-tracker.constants";
import type { Job, JobStatus } from "../types/job.types";

interface KanbanBoardProps {
  jobs: Job[];
  onDrop: (jobId: number, newStatus: JobStatus) => void;
  onDelete: (jobId: number) => void;
}

export function KanbanBoard({ jobs, onDrop, onDelete }: KanbanBoardProps) {
  return (
    <div className="overflow-x-auto pb-6">
      <div className="flex gap-6 min-w-max">
        {KANBAN_COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            column={column}
            jobs={jobs.filter((job) => job.status === column.id)}
            onDrop={onDrop}
            onDelete={onDelete}
            columns={KANBAN_COLUMNS}
          />
        ))}
      </div>
    </div>
  );
}
