import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as coverLetterService from '../services/cover-letter.service';
import type {
  CoverLetterRequest,
  CoverLetter,
} from '../services/cover-letter.service';

export const COVER_LETTER_KEYS = {
  all: ['cover-letters'] as const,
  lists: () => [...COVER_LETTER_KEYS.all, 'list'] as const,
  details: () => [...COVER_LETTER_KEYS.all, 'detail'] as const,
  detail: (id: number) => [...COVER_LETTER_KEYS.details(), id] as const,
};

export const useCoverLetters = () => {
  return useQuery({
    queryKey: COVER_LETTER_KEYS.lists(),
    queryFn: coverLetterService.fetchCoverLetters,
  });
};

export const useCoverLetter = (id: number) => {
  return useQuery({
    queryKey: COVER_LETTER_KEYS.detail(id),
    queryFn: () => coverLetterService.fetchCoverLetterById(id),
    enabled: !!id,
  });
};

export const useGenerateCoverLetter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CoverLetterRequest) =>
      coverLetterService.generateCoverLetter(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COVER_LETTER_KEYS.lists() });
    },
  });
};

export const useUpdateCoverLetter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<CoverLetter> }) =>
      coverLetterService.updateCoverLetter(id, updates),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: COVER_LETTER_KEYS.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: COVER_LETTER_KEYS.lists() });
    },
  });
};

export const useDeleteCoverLetter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: coverLetterService.deleteCoverLetter,
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: COVER_LETTER_KEYS.detail(deletedId) });
      queryClient.invalidateQueries({ queryKey: COVER_LETTER_KEYS.lists() });
    },
  });
};

export const useRegenerateCoverLetter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: Partial<CoverLetterRequest> }) =>
      coverLetterService.regenerateCoverLetter(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: COVER_LETTER_KEYS.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: COVER_LETTER_KEYS.lists() });
    },
  });
};
