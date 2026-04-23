import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  invalidateDetailAndList,
  removeDetailAndInvalidateList,
} from '@/shared/lib/query-cache';
import * as jobService from '../services/job-tracker.service';
import type { Job, JobStatus } from '../types/job.types';

export const JOB_KEYS = {
  all: ['jobs'] as const,
  lists: () => [...JOB_KEYS.all, 'list'] as const,
  list: (filters?: { status?: JobStatus }) => [...JOB_KEYS.lists(), filters] as const,
  details: () => [...JOB_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...JOB_KEYS.details(), id] as const,
  search: (query: string) => [...JOB_KEYS.all, 'search', query] as const,
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

export const useJobsByStatus = (status: JobStatus) => {
  return useQuery({
    queryKey: JOB_KEYS.list({ status }),
    queryFn: () => jobService.fetchJobsByStatus(status),
  });
};

export const useSearchJobs = (query: string) => {
  return useQuery({
    queryKey: JOB_KEYS.search(query),
    queryFn: () => jobService.searchJobs(query),
    enabled: query.length > 0,
  });
};

export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: jobService.createJob,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: JOB_KEYS.lists() });
    },
  });
};

export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Job> }) =>
      jobService.updateJob(id, updates),
    onSuccess: (_, variables) => {
      invalidateDetailAndList(
        queryClient,
        JOB_KEYS.detail(variables.id),
        JOB_KEYS.lists()
      );
    },
  });
};

export const useUpdateJobStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: JobStatus }) =>
      jobService.updateJobStatus(id, status),
    onSuccess: (_, variables) => {
      invalidateDetailAndList(
        queryClient,
        JOB_KEYS.detail(variables.id),
        JOB_KEYS.lists()
      );
    },
  });
};

export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: jobService.deleteJob,
    onSuccess: (_, deletedId) => {
      removeDetailAndInvalidateList(
        queryClient,
        JOB_KEYS.detail(deletedId),
        JOB_KEYS.lists()
      );
    },
  });
};
