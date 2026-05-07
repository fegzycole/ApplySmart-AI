import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  JobFormDialog,
  JobTrackerEmptyState,
  JobTrackerErrorState,
  KanbanBoard,
  TrackerHeader,
} from "../components";
import { JobTrackerSkeleton } from "../components/skeletons";
import { useJobTracker } from "../hooks/useJobTracker";

export function JobTrackerPage() {
  const {
    jobs,
    totalJobs,
    isLoading,
    isSaving,
    error,
    dialogOpen,
    editingJob,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    submitJob,
    handleDrop,
    deleteJob,
    refetchJobs,
  } = useJobTracker();

  if (isLoading) {
    return <JobTrackerSkeleton />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-violet-50/30 p-4 dark:from-zinc-950 dark:via-zinc-900 dark:to-violet-950/10 lg:p-8">
        <div className="mx-auto max-w-[1800px]">
          <TrackerHeader onAddClick={openCreateDialog} />

          {error ? (
            <JobTrackerErrorState onRetry={() => void refetchJobs()} />
          ) : totalJobs === 0 ? (
            <JobTrackerEmptyState onAddClick={openCreateDialog} />
          ) : (
            <KanbanBoard
              jobs={jobs}
              onDrop={handleDrop}
              onEdit={openEditDialog}
              onDelete={(jobId) => void deleteJob(jobId)}
              emptyMessage=""
            />
          )}

          <div className="mt-8 h-1 w-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 opacity-20" />
        </div>
      </div>

      <JobFormDialog
        open={dialogOpen}
        job={editingJob}
        isPending={isSaving}
        onOpenChange={closeDialog}
        onSubmit={submitJob}
      />
    </DndProvider>
  );
}
