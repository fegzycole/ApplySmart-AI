import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TrackerHeader, AddJobDialog, KanbanBoard } from "../components";
import { JobTrackerSkeleton } from "../components/skeletons";
import { useJobTracker } from "../hooks/useJobTracker";

export function JobTrackerPage() {
  const { jobs, isLoading, handleDrop, deleteJob, addJob } = useJobTracker();
  const [dialogOpen, setDialogOpen] = useState(false);

  if (isLoading) {
    return <JobTrackerSkeleton />;
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="p-4 lg:p-8 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-violet-50/30 dark:from-zinc-950 dark:via-zinc-900 dark:to-violet-950/10">
        <div className="max-w-[1800px] mx-auto">
          <TrackerHeader onAddClick={() => setDialogOpen(true)} />

          <KanbanBoard
            jobs={jobs}
            onDrop={handleDrop}
            onDelete={deleteJob}
          />

          <div className="h-1 w-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 rounded-full mt-8 opacity-20" />
        </div>
      </div>

      <AddJobDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAdd={addJob}
      />
    </DndProvider>
  );
}
