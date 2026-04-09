import { apiClient } from '@/shared/services/api-client';
import type { Job, JobStatus } from '../types/job.types';

/**
 * Job Tracker API Service
 * Makes real API calls to backend endpoints
 */

const ENDPOINTS = {
  JOBS: '/jobs',
  JOB_BY_ID: (id: number) => `/jobs/${id}`,
  JOBS_BY_STATUS: (status: JobStatus) => `/jobs/status/${status}`,
  SEARCH_JOBS: '/jobs/search',
};

/**
 * Fetch all jobs
 */
export const fetchJobs = async (): Promise<Job[]> => {
  return apiClient.get<Job[]>(ENDPOINTS.JOBS);
};

/**
 * Fetch job by ID
 */
export const fetchJobById = async (id: number): Promise<Job> => {
  return apiClient.get<Job>(ENDPOINTS.JOB_BY_ID(id));
};

/**
 * Create a new job
 */
export const createJob = async (jobData: Omit<Job, 'id'>): Promise<Job> => {
  return apiClient.post<Job, Omit<Job, 'id'>>(ENDPOINTS.JOBS, jobData);
};

/**
 * Update existing job
 */
export const updateJob = async (id: number, updates: Partial<Job>): Promise<Job> => {
  return apiClient.patch<Job, Partial<Job>>(ENDPOINTS.JOB_BY_ID(id), updates);
};

/**
 * Update job status
 */
export const updateJobStatus = async (id: number, status: JobStatus): Promise<Job> => {
  return updateJob(id, { status });
};

/**
 * Delete a job
 */
export const deleteJob = async (id: number): Promise<void> => {
  return apiClient.delete<void>(ENDPOINTS.JOB_BY_ID(id));
};

/**
 * Fetch jobs by status
 */
export const fetchJobsByStatus = async (status: JobStatus): Promise<Job[]> => {
  return apiClient.get<Job[]>(ENDPOINTS.JOBS_BY_STATUS(status));
};

/**
 * Search jobs
 */
export const searchJobs = async (query: string): Promise<Job[]> => {
  return apiClient.get<Job[]>(ENDPOINTS.SEARCH_JOBS, { q: query });
};
