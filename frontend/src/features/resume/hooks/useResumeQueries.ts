import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as resumeService from '../services/resume.service';
import type { Resume } from '../services/resume.service';

/**
 * Query keys for resume
 */
export const RESUME_KEYS = {
  all: ['resumes'] as const,
  lists: () => [...RESUME_KEYS.all, 'list'] as const,
  details: () => [...RESUME_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...RESUME_KEYS.details(), id] as const,
  analysis: (id: number) => [...RESUME_KEYS.all, 'analysis', id] as const,
};

/**
 * Fetch all resumes
 */
export const useResumes = () => {
  return useQuery({
    queryKey: RESUME_KEYS.lists(),
    queryFn: resumeService.fetchResumes,
  });
};

/**
 * Fetch resume by ID
 */
export const useResume = (id: number) => {
  return useQuery({
    queryKey: RESUME_KEYS.detail(id),
    queryFn: () => resumeService.fetchResumeById(id),
    enabled: !!id,
  });
};

/**
 * Create new resume
 */
export const useCreateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumeService.createResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESUME_KEYS.lists() });
    },
  });
};

/**
 * Update resume
 */
export const useUpdateResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<Resume> }) =>
      resumeService.updateResume(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: RESUME_KEYS.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: RESUME_KEYS.lists() });
    },
  });
};

/**
 * Delete resume
 */
export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumeService.deleteResume,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: RESUME_KEYS.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: RESUME_KEYS.lists() });
    },
  });
};

/**
 * Analyze resume with AI
 */
export const useAnalyzeResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ resumeId, jobDescription }: { resumeId: number; jobDescription?: string }) =>
      resumeService.analyzeResume(resumeId, jobDescription),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: RESUME_KEYS.analysis(variables.resumeId) });
    },
  });
};

/**
 * Optimize resume for job description
 */
export const useOptimizeResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ resumeId, jobDescription }: { resumeId: number; jobDescription: string }) =>
      resumeService.optimizeResume(resumeId, jobDescription),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: RESUME_KEYS.detail(variables.resumeId) });
      queryClient.invalidateQueries({ queryKey: RESUME_KEYS.lists() });
    },
  });
};

/**
 * Upload resume file
 */
export const useUploadResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumeService.uploadResumeFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESUME_KEYS.lists() });
    },
  });
};
