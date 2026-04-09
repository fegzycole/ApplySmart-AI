import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as jobService from '../services/job-tracker.service';
import type { Job, JobStatus } from '../types/job.types';

/**
 * Query keys for job-tracker
 */
export const JOB_KEYS = {
  all: ['jobs'] as const,
  lists: () => [...JOB_KEYS.all, 'list'] as const,
  list: (filters?: { status?: JobStatus }) => [...JOB_KEYS.lists(), filters] as const,
  details: () => [...JOB_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...JOB_KEYS.details(), id] as const,
  search: (query: string) => [...JOB_KEYS.all, 'search', query] as const,
};

/**
 * Fetch all jobs
 */
export const useJobs = () => {
  return useQuery({
    queryKey: JOB_KEYS.lists(),
    queryFn: jobService.fetchJobs,
  });
};

/**
 * Fetch job by ID
 */
export const useJob = (id: number) => {
  return useQuery({
    queryKey: JOB_KEYS.detail(id),
    queryFn: () => jobService.fetchJobById(id),
    enabled: !!id, // Only fetch if ID is provided
  });
};

/**
 * Fetch jobs by status
 */
export const useJobsByStatus = (status: JobStatus) => {
  return useQuery({
    queryKey: JOB_KEYS.list({ status }),
    queryFn: () => jobService.fetchJobsByStatus(status),
  });
};

/**
 * Search jobs
 */
export const useSearchJobs = (query: string) => {
  return useQuery({
    queryKey: JOB_KEYS.search(query),
    queryFn: () => jobService.searchJobs(query),
    enabled: query.length > 0, // Only search if query is not empty
  });
};

/**
 * Create new job
 */
export const useCreateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: jobService.createJob,
    onSuccess: () => {
      // Invalidate and refetch jobs list
      queryClient.invalidateQueries({ queryKey: JOB_KEYS.lists() });
    },
  });
};

/**
 * Update job
 */
export const useUpdateJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Job> }) =>
      jobService.updateJob(id, updates),
    onSuccess: (_, variables) => {
      // Invalidate specific job and lists
      queryClient.invalidateQueries({ queryKey: JOB_KEYS.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: JOB_KEYS.lists() });
    },
  });
};

/**
 * Update job status
 */
export const useUpdateJobStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: number; status: JobStatus }) =>
      jobService.updateJobStatus(id, status),
    onSuccess: (_, variables) => {
      // Invalidate specific job and lists
      queryClient.invalidateQueries({ queryKey: JOB_KEYS.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: JOB_KEYS.lists() });
    },
  });
};

/**
 * Delete job
 */
export const useDeleteJob = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: jobService.deleteJob,
    onSuccess: (_, deletedId) => {
      // Remove from cache and invalidate lists
      queryClient.removeQueries({ queryKey: JOB_KEYS.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: JOB_KEYS.lists() });
    },
  });
};
