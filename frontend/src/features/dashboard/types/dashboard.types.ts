import type { LucideIcon } from "lucide-react";

export type DashboardApplicationStatus =
  | "saved"
  | "applied"
  | "interview"
  | "offer"
  | "rejected";

export interface DashboardRecentApplication {
  id: number;
  company: string;
  role: string;
  status: DashboardApplicationStatus;
  date: string;
  updatedAt: string;
  location: string | null;
  deadline: string | null;
  stale: boolean;
}

export interface DashboardFunnelStage {
  name: string;
  value: number;
  color: string;
  percentage: number;
}

export interface DashboardSuccessMetric {
  month: string;
  responseRate: number;
  interviewRate: number;
  offerRate: number;
}

export interface DashboardApplicationVelocity {
  week: string;
  fullWeek: string;
  applications: number;
  target: number;
}

export interface DashboardOverview {
  totalApplications: number;
  activeApplications: number;
  savedApplications: number;
  interviews: number;
  offers: number;
  rejections: number;
  uniqueCompanies: number;
  staleApplications: number;
  upcomingDeadlines: number;
  applicationsThisWeek: number;
  applicationsThisMonth: number;
  responseRate: number;
  offerRate: number;
}

export interface DashboardDocumentStats {
  totalResumes: number;
  originalResumes: number;
  optimizedResumes: number;
  builtResumes: number;
  coverLetters: number;
}

export interface DashboardData {
  overview: DashboardOverview;
  documents: DashboardDocumentStats;
  recentApplications: DashboardRecentApplication[];
  funnel: DashboardFunnelStage[];
  successMetrics: DashboardSuccessMetric[];
  applicationVelocity: DashboardApplicationVelocity[];
}

export interface DashboardAction {
  label: string;
  description: string;
  path: string;
  icon: LucideIcon;
}

export interface DashboardMetricCardData {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
}

export interface DashboardInsight {
  id: string;
  label: string;
  value: string;
  description: string;
  tone: "violet" | "cyan" | "emerald" | "amber";
  icon?: LucideIcon;
}
