import { apiClient } from '@/shared/services/api-client';
import { API_ENDPOINTS } from '@/shared/constants/api-endpoints';
import { AI_REQUEST_TIMEOUT_MS } from '@/shared/constants/timeouts';
import type { ApiSuccessResponse } from '@/shared/types/api-response.types';
import type { PageResponse } from '@/shared/types/pagination.types';
import type { ToneOption } from '../types/cover-letter.types';

const ENDPOINTS = API_ENDPOINTS.COVER_LETTERS;
export interface CoverLetterPageParams {
  page: number;
  size: number;
  query?: string;
}

export interface CoverLetterRequest {
  company: string;
  position: string;
  jobDescription: string;
  tone: ToneOption;
  highlights?: string;
  resumeId?: number;
}

export interface CoverLetter {
  id: number;
  company: string;
  position: string;
  content: string;
  tone: string;
  wordCount?: number;
  linkedResumeId?: number | null;
  pdfUrl?: string;
  createdAt: string;
  lastModified: string;
}

export interface GenerateCoverLetterFromFilePayload {
  resumeFile?: File | null;
  company: string;
  position: string;
  tone: ToneOption;
  jobDescription: string;
  highlights?: string;
}

export const generateCoverLetter = async (
  request: CoverLetterRequest
): Promise<CoverLetter> => {
  return apiClient.post<CoverLetter, CoverLetterRequest>(
    ENDPOINTS.GENERATE,
    request,
    AI_REQUEST_TIMEOUT_MS
  );
};

export const generateCoverLetterFromFile = async (
  payload: GenerateCoverLetterFromFilePayload
): Promise<CoverLetter> => {
  const formData = new FormData();

  if (payload.resumeFile) {
    formData.append('resume', payload.resumeFile);
  }

  formData.append('jobDescription', payload.jobDescription);
  formData.append('companyName', payload.company);
  formData.append('positionTitle', payload.position);
  formData.append('tone', payload.tone);

  if (payload.highlights?.trim()) {
    formData.append('keyAchievements', payload.highlights.trim());
  }

  return apiClient.post<CoverLetter>(ENDPOINTS.GENERATE_FROM_FILE, formData, AI_REQUEST_TIMEOUT_MS);
};

export const fetchCoverLetters = async (): Promise<CoverLetter[]> => {
  return apiClient.get<CoverLetter[]>(ENDPOINTS.LIST);
};

export const fetchCoverLettersPage = async ({
  page,
  size,
  query,
}: CoverLetterPageParams): Promise<PageResponse<CoverLetter>> => {
  const params: Record<string, string> = {
    page: String(page),
    size: String(size),
  };

  if (query?.trim()) {
    params.query = query.trim();
  }

  return apiClient.get<PageResponse<CoverLetter>>(ENDPOINTS.LIST, params);
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

export const deleteCoverLetter = async (id: number): Promise<ApiSuccessResponse> => {
  return apiClient.delete<ApiSuccessResponse>(ENDPOINTS.DELETE(id));
};

export const regenerateCoverLetter = async (
  id: number,
  updates: Partial<CoverLetterRequest>
): Promise<CoverLetter> => {
  return apiClient.post<CoverLetter, Partial<CoverLetterRequest>>(
    ENDPOINTS.REGENERATE(id),
    updates
  );
};

export const downloadCoverLetterPdf = async (pdfUrl: string): Promise<Blob> => {
  return apiClient.getBlobByUrl(pdfUrl, AI_REQUEST_TIMEOUT_MS);
};
