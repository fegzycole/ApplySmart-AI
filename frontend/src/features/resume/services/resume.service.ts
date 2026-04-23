import { apiClient } from '@/shared/services/api-client';

/**
 * Resume API Service
 * Makes real API calls to backend endpoints
 */

const ENDPOINTS = {
  RESUMES: '/resumes',
  RESUME_BY_ID: (id: number) => `/resumes/${id}`,
  ANALYZE: (id: number) => `/resumes/${id}/analyze`,
  OPTIMIZE: (id: number) => `/resumes/${id}/optimize`,
  UPLOAD: '/resumes/upload',
};

// Types
export interface Resume {
  id: number;
  name: string;
  lastModified: string;
  score: number;
  status: 'draft' | 'optimized' | 'published';
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

export interface UploadedFile {
  id: number;
  name: string;
  size: number;
  uploadedAt: string;
  url: string;
}

/**
 * Fetch all resumes
 */
export const fetchResumes = async (): Promise<Resume[]> => {
  return apiClient.get<Resume[]>(ENDPOINTS.RESUMES);
};

/**
 * Fetch resume by ID
 */
export const fetchResumeById = async (id: number): Promise<Resume> => {
  return apiClient.get<Resume>(ENDPOINTS.RESUME_BY_ID(id));
};

/**
 * Delete resume
 */
export const deleteResume = async (id: number): Promise<{ success: boolean; deletedId: number }> => {
  return apiClient.delete(ENDPOINTS.RESUME_BY_ID(id));
};

/**
 * Analyze resume with AI
 */
export const analyzeResume = async (
  resumeId: number,
  jobDescription?: string
): Promise<ResumeAnalysis> => {
  return apiClient.post<ResumeAnalysis>(ENDPOINTS.ANALYZE(resumeId), {
    jobDescription,
  });
};

/**
 * Optimize resume for job description
 */
export const optimizeResume = async (
  resumeId: number,
  jobDescription: string
): Promise<ResumeOptimization> => {
  return apiClient.post<ResumeOptimization>(ENDPOINTS.OPTIMIZE(resumeId), {
    jobDescription,
  });
};

/**
 * Upload resume file
 */
export const uploadResumeFile = async (file: File): Promise<UploadedFile> => {
  const formData = new FormData();
  formData.append('file', file);

  // For file uploads, we need to override the content-type header
  const headers = {
    // Let the browser set the boundary for multipart/form-data
    'Content-Type': 'multipart/form-data',
  };

  return apiClient.post<UploadedFile>(ENDPOINTS.UPLOAD, formData);
};

/**
 * Upload and optimize resume file for job description
 * Uses extended timeout (3 minutes) for AI processing
 */
export const uploadAndOptimizeResume = async (
  file: File,
  jobDescription: string,
  template: 'MODERN' | 'PROFESSIONAL' | 'CLASSIC' | 'CREATIVE' = 'MODERN'
): Promise<ResumeOptimization> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('jobDescription', jobDescription);

  // Use 3 minute timeout for AI optimization
  return apiClient.post<ResumeOptimization>(
    `/resumes/optimize-upload?template=${template}`,
    formData,
    180000 // 3 minutes timeout
  );
};

/**
 * Upload built resume PDF
 */
export const uploadBuiltResume = async (
  file: File | Blob,
  name: string
): Promise<Resume> => {
  const formData = new FormData();
  formData.append('file', file, 'resume.pdf');
  formData.append('name', name);

  return apiClient.post<Resume>('/resumes/build', formData);
};
