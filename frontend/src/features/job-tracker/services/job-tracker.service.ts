import { apiClient } from '@/shared/services/api-client';
import { API_ENDPOINTS } from '@/shared/constants/api-endpoints';
import type { CreateJobRequest, Job, JobStatus, UpdateJobRequest } from '../types/job.types';
import { parseCreateJobRequest, parseUpdateJobRequest } from '../utils/job-tracker.validation';

export const fetchJobs = async (): Promise<Job[]> => {
  return apiClient.get<Job[]>(API_ENDPOINTS.JOBS.LIST);
};

export const fetchJobById = async (id: number): Promise<Job> => {
  return apiClient.get<Job>(API_ENDPOINTS.JOBS.GET(id));
};

export const createJob = async (jobData: CreateJobRequest): Promise<Job> => {
  const validatedJobData = parseCreateJobRequest(jobData);
  return apiClient.post<Job, CreateJobRequest>(API_ENDPOINTS.JOBS.CREATE, validatedJobData);
};

export const updateJob = async (id: number, updates: UpdateJobRequest): Promise<Job> => {
  const validatedUpdates = parseUpdateJobRequest(updates);
  return apiClient.patch<Job, UpdateJobRequest>(API_ENDPOINTS.JOBS.UPDATE(id), validatedUpdates);
};

export const updateJobStatus = async (id: number, status: JobStatus): Promise<Job> => {
  return updateJob(id, { status });
};

export const deleteJob = async (id: number): Promise<void> => {
  await apiClient.delete(API_ENDPOINTS.JOBS.DELETE(id));
};
