import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { DASHBOARD_KEYS } from '@/features/dashboard/hooks/useDashboardQueries';
import { invalidateQueries, removeDetailAndInvalidateList } from '@/shared/lib/query-cache';
import * as jobService from '../services/job-tracker.service';
import type { JobStatus, UpdateJobRequest } from '../types/job.types';

export const JOB_KEYS = {
  all: ['jobs'] as const,
  lists: () => [...JOB_KEYS.all, 'list'] as const,
  details: () => [...JOB_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...JOB_KEYS.details(), id] as const,
};

export const useJobs = () => {
  return useQuery({
    queryKey: JOB_KEYS.lists(),
    queryFn: jobService.fetchJobs,
  });
};

export const useJob = (id: number) => {
  return useQuery({
    queryKey: JOB_KEYS.detail(id),
    queryFn: () => jobService.fetchJobById(id),
    enabled: !!id,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: jobService.createJob,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: DASHBOARD_KEYS.all });
      return invalidateQueries(queryClient, JOB_KEYS.all, DASHBOARD_KEYS.all);
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: UpdateJobRequest }) =>
      jobService.updateJob(id, updates),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: DASHBOARD_KEYS.all });
      return invalidateQueries(queryClient, JOB_KEYS.all, DASHBOARD_KEYS.all);
    },
  });
};

export const useUpdateJobStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: JobStatus }) =>
      jobService.updateJobStatus(id, status),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: DASHBOARD_KEYS.all });
      return invalidateQueries(queryClient, JOB_KEYS.all, DASHBOARD_KEYS.all);
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: jobService.deleteJob,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: DASHBOARD_KEYS.all });
      return Promise.all([
        removeDetailAndInvalidateList(queryClient, JOB_KEYS.detail(deletedId), JOB_KEYS.all),
        queryClient.invalidateQueries({ queryKey: DASHBOARD_KEYS.all }),
      ]);
    },
  });
};
