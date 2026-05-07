import { useState } from "react";
import { toast } from "sonner";
import {
  useCreateJob,
  useDeleteJob,
  useJobs,
  useUpdateJob,
  useUpdateJobStatus,
} from "./useJobQueries";
import type { Job, JobFormData, JobStatus, JobSubmitResult } from "../types/job.types";
import {
  getJobValidationFeedback,
  parseCreateJobRequest,
  parseUpdateJobRequest,
} from "../utils/job-tracker.validation";

export function useJobTracker() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);

  const jobsQuery = useJobs();
  const createJobMutation = useCreateJob();
  const updateJobMutation = useUpdateJob();
  const updateJobStatusMutation = useUpdateJobStatus();
  const deleteJobMutation = useDeleteJob();

  const allJobs = jobsQuery.data ?? [];
  const jobs = allJobs;

  const openCreateDialog = () => {
    setEditingJob(null);
    setDialogOpen(true);
  };

  const openEditDialog = (job: Job) => {
    setEditingJob(job);
    setDialogOpen(true);
  };

  const closeDialog = (open: boolean) => {
    setDialogOpen(open);
    if (!open) {
      setEditingJob(null);
    }
  };

  const handleDrop = async (jobId: number, newStatus: JobStatus) => {
    const existingJob = allJobs.find((job) => job.id === jobId);
    if (!existingJob || existingJob.status === newStatus) {
      return;
    }

    try {
      await updateJobStatusMutation.mutateAsync({ id: jobId, status: newStatus });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update application status");
    }
  };

  const deleteJob = async (jobId: number) => {
    try {
      await deleteJobMutation.mutateAsync(jobId);
      toast.success("Application deleted");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to delete application");
    }
  };

  const submitJob = async (formData: JobFormData): Promise<JobSubmitResult> => {
    try {
      if (editingJob) {
        await updateJobMutation.mutateAsync({
          id: editingJob.id,
          updates: parseUpdateJobRequest(formData),
        });
        toast.success("Application updated");
      } else {
        await createJobMutation.mutateAsync(parseCreateJobRequest(formData));
        toast.success("Application added");
      }

      closeDialog(false);
      return { success: true };
    } catch (error) {
      const validation = getJobValidationFeedback(error);

      if (validation) {
        return {
          success: false,
          validation,
        };
      }

      toast.error(error instanceof Error ? error.message : "Failed to save application");
      return { success: false };
    }
  };

  return {
    jobs,
    totalJobs: allJobs.length,
    isLoading: jobsQuery.isLoading,
    isSaving:
      createJobMutation.isPending ||
      updateJobMutation.isPending ||
      updateJobStatusMutation.isPending ||
      deleteJobMutation.isPending,
    error: jobsQuery.error,
    dialogOpen,
    editingJob,
    openCreateDialog,
    openEditDialog,
    closeDialog,
    submitJob,
    handleDrop,
    deleteJob,
    refetchJobs: jobsQuery.refetch,
  };
}
