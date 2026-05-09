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
    <div className="relative">
      {/* Scrollable Container with refined padding */}
      <div className="overflow-x-auto pb-12 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 scrollbar-thin scrollbar-thumb-primary/10 hover:scrollbar-thumb-primary/20">
        <div className="flex gap-8 min-w-max">
          {KANBAN_COLUMNS.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              jobs={jobs.filter((job) => job.status === column.id)}
              onDrop={onDrop}
              onEdit={onEdit}
              onDelete={onDelete}
              emptyMessage={emptyMessage || `No applications in ${column.title}`}
            />
          ))}
        </div>
      </div>

      {/* Subtle bottom fade for long columns */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background to-transparent z-10" />
    </div>
  );
}
