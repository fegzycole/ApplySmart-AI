import type { LucideIcon } from "lucide-react";

export type ApplicationStatus = "interview" | "applied" | "rejected";

export interface Application {
  company: string;
  role: string;
  status: ApplicationStatus;
  date: string;
}

export interface StatCardData {
  title: string;
  value: number;
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
  icon: LucideIcon;
  color: string;
  percentage: number;
}

export interface ConversionMetric {
  label: string;
  value: string;
  gradient: string;
}
