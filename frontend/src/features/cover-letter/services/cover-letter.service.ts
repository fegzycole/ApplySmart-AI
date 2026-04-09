import { apiClient } from '@/shared/services/api-client';

/**
 * Cover Letter API Service
 * Makes real API calls to backend endpoints
 */

const ENDPOINTS = {
  GENERATE: '/cover-letters/generate',
  COVER_LETTERS: '/cover-letters',
  COVER_LETTER_BY_ID: (id: number) => `/cover-letters/${id}`,
  REGENERATE: (id: number) => `/cover-letters/${id}/regenerate`,
};

// Types
export interface CoverLetterRequest {
  company: string;
  position: string;
  jobDescription: string;
  tone: 'professional' | 'friendly' | 'confident';
  highlights?: string;
  resumeId?: number;
}

export interface CoverLetter {
  id: number;
  company: string;
  position: string;
  content: string;
  tone: string;
  createdAt: string;
  lastModified: string;
}

export interface GeneratedCoverLetter {
  id: number;
  content: string;
  company: string;
  position: string;
  tone: string;
  createdAt: string;
}

/**
 * Generate a new cover letter
 */
export const generateCoverLetter = async (
  request: CoverLetterRequest
): Promise<GeneratedCoverLetter> => {
  return apiClient.post<GeneratedCoverLetter, CoverLetterRequest>(
    ENDPOINTS.GENERATE,
    request
  );
};

/**
 * Fetch all cover letters
 */
export const fetchCoverLetters = async (): Promise<CoverLetter[]> => {
  return apiClient.get<CoverLetter[]>(ENDPOINTS.COVER_LETTERS);
};

/**
 * Fetch cover letter by ID
 */
export const fetchCoverLetterById = async (id: number): Promise<CoverLetter> => {
  return apiClient.get<CoverLetter>(ENDPOINTS.COVER_LETTER_BY_ID(id));
};

/**
 * Update cover letter
 */
export const updateCoverLetter = async (
  id: number,
  updates: Partial<CoverLetter>
): Promise<CoverLetter> => {
  return apiClient.patch<CoverLetter, Partial<CoverLetter>>(
    ENDPOINTS.COVER_LETTER_BY_ID(id),
    updates
  );
};

/**
 * Delete cover letter
 */
export const deleteCoverLetter = async (id: number): Promise<{ success: boolean }> => {
  return apiClient.delete(ENDPOINTS.COVER_LETTER_BY_ID(id));
};

/**
 * Regenerate cover letter with different tone or content
 */
export const regenerateCoverLetter = async (
  id: number,
  updates: Partial<CoverLetterRequest>
): Promise<GeneratedCoverLetter> => {
  return apiClient.post<GeneratedCoverLetter, Partial<CoverLetterRequest>>(
    ENDPOINTS.REGENERATE(id),
    updates
  );
};
