import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  invalidateDetailAndList,
  removeDetailAndInvalidateList,
} from '@/shared/lib/query-cache';
import * as resumeService from '../services/resume.service';

export const RESUME_KEYS = {
  all: ['resumes'] as const,
  lists: () => [...RESUME_KEYS.all, 'list'] as const,
  details: () => [...RESUME_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...RESUME_KEYS.details(), id] as const,
  analysis: (id: number) => [...RESUME_KEYS.all, 'analysis', id] as const,
};

export const useResumes = () => {
  return useQuery({
    queryKey: RESUME_KEYS.lists(),
    queryFn: resumeService.fetchResumes,
  });
};

export const useResume = (id: number) => {
  return useQuery({
    queryKey: RESUME_KEYS.detail(id),
    queryFn: () => resumeService.fetchResumeById(id),
    enabled: !!id,
  });
};

export const useDeleteResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumeService.deleteResume,
    onSuccess: (_, deletedId) => {
      removeDetailAndInvalidateList(
        queryClient,
        RESUME_KEYS.detail(deletedId),
        RESUME_KEYS.lists()
      );
    },
  });
};

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

export const useOptimizeResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ resumeId, jobDescription }: { resumeId: number; jobDescription: string }) =>
      resumeService.optimizeResume(resumeId, jobDescription),
    onSuccess: (_, variables) => {
      invalidateDetailAndList(
        queryClient,
        RESUME_KEYS.detail(variables.resumeId),
        RESUME_KEYS.lists()
      );
    },
  });
};

export const useUploadResume = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: resumeService.uploadResumeFile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: RESUME_KEYS.lists() });
    },
  });
};
