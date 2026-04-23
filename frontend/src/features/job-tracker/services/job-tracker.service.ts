import { apiClient } from '@/shared/services/api-client';
import { API_ENDPOINTS } from '@/shared/constants/api-endpoints';
import type { Job, JobStatus } from '../types/job.types';

const ENDPOINTS = API_ENDPOINTS.JOBS;

export const fetchJobs = async (): Promise<Job[]> => {
  return apiClient.get<Job[]>(ENDPOINTS.LIST);
};

export const fetchJobById = async (id: number): Promise<Job> => {
  return apiClient.get<Job>(ENDPOINTS.GET(id));
};

export const createJob = async (jobData: Omit<Job, 'id'>): Promise<Job> => {
  return apiClient.post<Job, Omit<Job, 'id'>>(ENDPOINTS.CREATE, jobData);
};

export const updateJob = async (id: number, updates: Partial<Job>): Promise<Job> => {
  return apiClient.patch<Job, Partial<Job>>(ENDPOINTS.UPDATE(id), updates);
};

export const updateJobStatus = async (id: number, status: JobStatus): Promise<Job> => {
  return updateJob(id, { status });
};

export const deleteJob = async (id: number): Promise<void> => {
  return apiClient.delete<void>(ENDPOINTS.DELETE(id));
};

export const fetchJobsByStatus = async (status: JobStatus): Promise<Job[]> => {
  return apiClient.get<Job[]>(ENDPOINTS.BY_STATUS(status));
};

export const searchJobs = async (query: string): Promise<Job[]> => {
  return apiClient.get<Job[]>(ENDPOINTS.SEARCH, { q: query });
};
