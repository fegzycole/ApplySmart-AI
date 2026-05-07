import type { LucideIcon } from "lucide-react";

export type JobStatus = "SAVED" | "APPLIED" | "INTERVIEW" | "OFFER" | "REJECTED";

export interface Job {
  id: number;
  company: string;
  role: string;
  link: string | null;
  status: JobStatus;
  notes: string | null;
  salary: string | null;
  location: string | null;
  applicationDeadline: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateJobRequest {
  company: string;
  role: string;
  link: string;
  status: JobStatus;
  notes: string;
  salary: string;
  location: string;
  applicationDeadline: string;
}

export interface UpdateJobRequest {
  company?: string;
  role?: string;
  link?: string;
  status?: JobStatus;
  notes?: string;
  salary?: string;
  location?: string;
  applicationDeadline?: string;
}

export interface JobFormData {
  company: string;
  role: string;
  link: string;
  status: JobStatus;
  notes: string;
  salary: string;
  location: string;
  applicationDeadline: string;
}

export type JobFormFieldErrors = Partial<Record<keyof JobFormData, string>>;

export interface JobValidationFeedback {
  fieldErrors: JobFormFieldErrors;
  formErrors: string[];
}

export interface JobSubmitResult {
  success: boolean;
  validation?: JobValidationFeedback;
}

export interface Column {
  id: JobStatus;
  title: string;
  gradient: string;
  icon: LucideIcon;
  accentColor: string;
}
