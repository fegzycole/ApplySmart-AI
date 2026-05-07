import { apiClient } from '@/shared/services/api-client';
import { API_ENDPOINTS } from '@/shared/constants/api-endpoints';
import type { PageResponse } from '@/shared/types/pagination.types';
import type { CoverLetter } from '@/features/cover-letter/services/cover-letter.service';
import type { ResumeTemplate } from "../types/resume-builder.types";
import type { ResumeOptimizerCoverLetterOptions } from "../types/resume-optimizer.types";
import type {
  BuildResumeFromDataPayload,
  RenderResumePdfPayload,
} from "../utils/resume-builder-payload";

const ENDPOINTS = API_ENDPOINTS.RESUMES;
const AI_REQUEST_TIMEOUT_MS = 180000;

export type ResumeDocumentKind = 'original' | 'optimized' | 'built';
export type LegacyResumeStatus = 'draft' | 'optimized' | 'published';
export interface ResumePageParams {
  page: number;
  size: number;
  query?: string;
  documentKind?: ResumeDocumentKind;
}

export interface Resume {
  id: number;
  name: string;
  lastModified: string;
  score: number;
  documentKind?: ResumeDocumentKind;
  status?: LegacyResumeStatus;
  fileUrl?: string;
  content?: string;
}

export interface ResumeAnalysis {
  score: number;
  strengths: string[];
  improvements: string[];
  keywords: string[];
  atsCompatibility: number;
}

export interface ResumeOptimization {
  originalScore: number;
  optimizedScore: number;
  changes: string[];
  content: string;
  fileUrl?: string;
  coverLetter?: CoverLetter;
}

interface OptimizeResumePayload {
  jobDescription: string;
  template: ResumeTemplate;
  coverLetter?: ResumeOptimizerCoverLetterOptions;
}

export const fetchResumes = async (): Promise<Resume[]> => {
  return apiClient.get<Resume[]>(ENDPOINTS.LIST);
};

export const fetchResumesPage = async ({
  page,
  size,
  query,
  documentKind,
}: ResumePageParams): Promise<PageResponse<Resume>> => {
  const params: Record<string, string> = {
    page: String(page),
    size: String(size),
  };

  if (query?.trim()) {
    params.query = query.trim();
  }

  if (documentKind) {
    params.documentKind = documentKind;
  }

  return apiClient.get<PageResponse<Resume>>(ENDPOINTS.LIST, params);
};

export const fetchResumeById = async (id: number): Promise<Resume> => {
  return apiClient.get<Resume>(ENDPOINTS.GET(id));
};

export const deleteResume = async (id: number): Promise<{ success: boolean; deletedId: number }> => {
  return apiClient.delete(ENDPOINTS.DELETE(id));
};

export const analyzeResume = async (
  resumeId: number,
  jobDescription?: string
): Promise<ResumeAnalysis> => {
  return apiClient.post<ResumeAnalysis>(ENDPOINTS.ANALYZE(resumeId), {
    jobDescription,
  });
};

export const optimizeResume = async (
  resumeId: number,
  jobDescription: string,
  template: ResumeTemplate = 'MODERN',
  coverLetter?: ResumeOptimizerCoverLetterOptions
): Promise<ResumeOptimization> => {
  return apiClient.post<ResumeOptimization>(ENDPOINTS.OPTIMIZE(resumeId), {
    jobDescription,
    template,
    coverLetter,
  }, AI_REQUEST_TIMEOUT_MS);
};

export const uploadResumeFile = async (file: File): Promise<Resume> => {
  const formData = new FormData();
  formData.append('file', file);

  return apiClient.post<Resume>(ENDPOINTS.UPLOAD, formData);
};

export const uploadAndOptimizeResume = async (
  file: File,
  jobDescription: string,
  template: ResumeTemplate = 'MODERN',
  coverLetter?: ResumeOptimizerCoverLetterOptions
): Promise<ResumeOptimization> => {
  const formData = new FormData();
  formData.append('file', file);
  const request: OptimizeResumePayload = {
    jobDescription,
    template,
    coverLetter,
  };
  formData.append(
    'request',
    new Blob([JSON.stringify(request)], { type: 'application/json' })
  );

  return apiClient.post<ResumeOptimization>(
    ENDPOINTS.OPTIMIZE_UPLOAD,
    formData,
    AI_REQUEST_TIMEOUT_MS
  );
};

export const buildResumeFromData = async (
  payload: BuildResumeFromDataPayload
): Promise<Resume> => {
  return apiClient.post<Resume>(ENDPOINTS.BUILD_FROM_DATA, payload, AI_REQUEST_TIMEOUT_MS);
};

export const renderResumePdf = async (
  payload: RenderResumePdfPayload
): Promise<Blob> => {
  return apiClient.postBlob(ENDPOINTS.BUILD_PDF, payload, AI_REQUEST_TIMEOUT_MS);
};

export const downloadResumeFile = async (
  fileUrl: string
): Promise<Blob> => {
  return apiClient.getBlobByUrl(fileUrl, AI_REQUEST_TIMEOUT_MS);
};
