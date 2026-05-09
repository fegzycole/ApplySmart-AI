import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion } from "framer-motion";
import { PartyPopper } from "lucide-react";
import {
  JobFormDialog,
  JobTrackerEmptyState,
  JobTrackerErrorState,
  KanbanBoard,
  TrackerHeader,
} from "../components";
import { JobTrackerSkeleton } from "../components/skeletons";
import { useJobTracker } from "../hooks/useJobTracker";
import { MISSION_CONTROL_ANIMATIONS } from "@/shared/constants/animations";

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
      <motion.div 
        variants={MISSION_CONTROL_ANIMATIONS.stagger.container}
        initial="hidden"
        animate="visible"
        className="min-h-screen pb-12 sm:pb-20 bg-[#fafafa] dark:bg-zinc-950"
      >
        <div className="mx-auto max-w-[1800px] px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16 pt-8 sm:pt-12">
          <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
            <TrackerHeader onAddClick={openCreateDialog} />
          </motion.div>

          <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
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
          </motion.div>

          <motion.div 
            variants={MISSION_CONTROL_ANIMATIONS.stagger.item}
            className="flex items-center gap-4 sm:gap-6 px-4"
          >
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[11px] font-bold text-zinc-300 dark:text-zinc-700 uppercase tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">
              <PartyPopper className="size-3.5 sm:size-4" />
              Celebrate Every Step
            </div>
            <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </motion.div>
        </div>
      </motion.div>

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
