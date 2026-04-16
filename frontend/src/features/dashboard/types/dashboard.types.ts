import type { LucideIcon } from "lucide-react";

export type ApplicationStatus = "saved" | "applied" | "interview" | "offer" | "rejected";

export interface Application {
  id: number;
  company: string;
  role: string;
  status: ApplicationStatus;
  date: string;
}

export interface StatCardData {
  title: string;
  value: string | number;
  trend: {
    value: string;
    isPositive: boolean;
  };
  gradient: {
    from: string;
    to: string;
  };
  shadowColor: string;
}

export interface QuickAction {
  label: string;
  icon: LucideIcon;
  path: string;
  description?: string;
}

export interface FunnelStage {
  name: string;
  value: number;
  color: string;
  percentage: number;
  icon?: LucideIcon;
}

export interface ConversionMetric {
  label: string;
  value: string;
  gradient: string;
}

export interface SuccessMetric {
  month: string;
  responseRate: number;
  interviewRate: number;
  offerRate: number;
}

export interface ApplicationVelocity {
  week: string;
  fullWeek: string;
  applications: number;
  target: number;
}

export interface DashboardData {
  stats: StatCardData[];
  recentApplications: Application[];
  funnel: FunnelStage[];
  metrics: ConversionMetric[];
}
