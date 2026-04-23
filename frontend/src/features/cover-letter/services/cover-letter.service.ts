import { apiClient } from '@/shared/services/api-client';
import { API_ENDPOINTS } from '@/shared/constants/api-endpoints';

const ENDPOINTS = API_ENDPOINTS.COVER_LETTERS;

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

export const generateCoverLetter = async (
  request: CoverLetterRequest
): Promise<GeneratedCoverLetter> => {
  return apiClient.post<GeneratedCoverLetter, CoverLetterRequest>(
    ENDPOINTS.GENERATE,
    request
  );
};

export const fetchCoverLetters = async (): Promise<CoverLetter[]> => {
  return apiClient.get<CoverLetter[]>(ENDPOINTS.LIST);
};

export const fetchCoverLetterById = async (id: number): Promise<CoverLetter> => {
  return apiClient.get<CoverLetter>(ENDPOINTS.GET(id));
};

export const updateCoverLetter = async (
  id: number,
  updates: Partial<CoverLetter>
): Promise<CoverLetter> => {
  return apiClient.patch<CoverLetter, Partial<CoverLetter>>(
    ENDPOINTS.UPDATE(id),
    updates
  );
};

export const deleteCoverLetter = async (id: number): Promise<{ success: boolean }> => {
  return apiClient.delete(ENDPOINTS.DELETE(id));
};

export const regenerateCoverLetter = async (
  id: number,
  updates: Partial<CoverLetterRequest>
): Promise<GeneratedCoverLetter> => {
  return apiClient.post<GeneratedCoverLetter, Partial<CoverLetterRequest>>(
    ENDPOINTS.REGENERATE(id),
    updates
  );
};
