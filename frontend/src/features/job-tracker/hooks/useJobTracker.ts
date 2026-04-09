import { useJobs, useUpdateJob, useDeleteJob, useCreateJob } from "./useJobQueries";
import type { JobStatus } from "../types/job.types";

export function useJobTracker() {
  const { data: jobs = [], isLoading } = useJobs();
  const updateMutation = useUpdateJob();
  const deleteMutation = useDeleteJob();
  const createMutation = useCreateJob();

  const handleDrop = (jobId: number, newStatus: JobStatus) => {
    updateMutation.mutate({
      id: jobId,
      updates: { status: newStatus }
    });
  };

  const deleteJob = (jobId: number) => {
    deleteMutation.mutate(jobId);
  };

  const addJob = (newJob: Omit<{ company: string; role: string; link: string; notes: string }, "id" | "status" | "date">) => {
    createMutation.mutate({
      ...newJob,
      status: "saved",
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    });
  };

  return {
    jobs,
    isLoading,
    handleDrop,
    deleteJob,
    addJob
  };
}
