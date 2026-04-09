import type { LucideIcon } from "lucide-react";

export type JobStatus = "saved" | "applied" | "interview" | "offer" | "rejected";

export interface Job {
  id: number;
  company: string;
  role: string;
  link: string;
  notes: string;
  status: JobStatus;
  date: string;
}

export interface Column {
  id: JobStatus;
  title: string;
  gradient: string;
  icon: LucideIcon;
  accentColor: string;
}
