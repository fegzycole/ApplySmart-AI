import { apiClient } from '@/shared/services/api-client';
import { API_ENDPOINTS } from '@/shared/constants/api-endpoints';
import type { ResumeTemplate } from "../types/resume-builder.types";

const ENDPOINTS = API_ENDPOINTS.RESUMES;

export type ResumeStatus = 'draft' | 'optimized' | 'published';

export interface Resume {
  id: number;
  name: string;
  lastModified: string;
  score: number;
  status: ResumeStatus;
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
  fileUrl: string;
}

export const fetchResumes = async (): Promise<Resume[]> => {
  return apiClient.get<Resume[]>(ENDPOINTS.LIST);
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
  jobDescription: string
): Promise<ResumeOptimization> => {
  return apiClient.post<ResumeOptimization>(ENDPOINTS.OPTIMIZE(resumeId), {
    jobDescription,
  });
};

export const uploadResumeFile = async (file: File): Promise<Resume> => {
  const formData = new FormData();
  formData.append('file', file);

  return apiClient.post<Resume>(ENDPOINTS.UPLOAD, formData);
};

export const uploadAndOptimizeResume = async (
  file: File,
  jobDescription: string,
  template: ResumeTemplate = 'MODERN'
): Promise<ResumeOptimization> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('jobDescription', jobDescription);

  return apiClient.post<ResumeOptimization>(
    `${ENDPOINTS.OPTIMIZE_UPLOAD}?template=${template}`,
    formData,
    180000
  );
};

export const uploadBuiltResume = async (
  file: File | Blob,
  name: string
): Promise<Resume> => {
  const formData = new FormData();
  formData.append('file', file, 'resume.pdf');
  formData.append('name', name);

  return apiClient.post<Resume>(ENDPOINTS.BUILD, formData);
};
