import { BriefcaseBusiness, FileText, WandSparkles } from "lucide-react";
import type {
  DashboardAction,
  DashboardApplicationStatus,
} from "../types/dashboard.types";

export const DASHBOARD_PAGE_STYLES = {
  container:
    "min-h-screen overflow-x-hidden bg-gradient-to-br from-zinc-50 via-white to-violet-50/30 px-4 py-4 dark:from-zinc-950 dark:via-zinc-900 dark:to-violet-950/10 sm:px-6 sm:py-6 lg:px-8 lg:py-8",
  wrapper: "mx-auto max-w-7xl space-y-6 lg:space-y-8",
  metricsGrid: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
  topPanels: "grid gap-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:gap-6",
  midPanels: "grid gap-4 xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:gap-6",
  bottomPanels: "grid gap-4 xl:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] xl:gap-6",
} as const;

export const DASHBOARD_HEADER_CONTENT = {
  title: "Dashboard",
  description:
    "See your application momentum, document readiness, and the work that needs attention in one focused job-search workspace.",
} as const;

export const DASHBOARD_ACTIONS: DashboardAction[] = [
  {
    label: "Track Application",
    description: "Log a new role in your pipeline.",
    path: "/app/job-tracker",
    icon: BriefcaseBusiness,
  },
  {
    label: "Build Resume",
    description: "Create a polished resume from scratch.",
    path: "/app/resume-builder",
    icon: FileText,
  },
  {
    label: "Optimize Resume",
    description: "Tailor a resume to a job description.",
    path: "/app/resume-optimizer",
    icon: WandSparkles,
  },
];

export const DASHBOARD_STATUS_META: Record<
  DashboardApplicationStatus,
  { label: string; className: string }
> = {
  saved: {
    label: "Saved",
    className:
      "border-zinc-200 bg-zinc-100 text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300",
  },
  applied: {
    label: "Applied",
    className:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300",
  },
  interview: {
    label: "Interview",
    className:
      "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-900 dark:bg-violet-950/40 dark:text-violet-300",
  },
  offer: {
    label: "Offer",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-300",
  },
  rejected: {
    label: "Rejected",
    className:
      "border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900 dark:bg-rose-950/40 dark:text-rose-300",
  },
};

export const DASHBOARD_PIPELINE_COLORS: Record<string, string> = {
  Saved: "#64748b",
  Applied: "#f59e0b",
  Interview: "#8b5cf6",
  Offer: "#10b981",
};

export const DASHBOARD_DOCUMENT_COLORS = {
  originalResumes: "#94a3b8",
  optimizedResumes: "#8b5cf6",
  builtResumes: "#06b6d4",
  coverLetters: "#10b981",
} as const;

export const DASHBOARD_INSIGHT_TONE_STYLES = {
  violet:
    "border-violet-200 bg-violet-50/80 text-violet-800 dark:border-violet-900 dark:bg-violet-950/30 dark:text-violet-200",
  cyan:
    "border-cyan-200 bg-cyan-50/80 text-cyan-800 dark:border-cyan-900 dark:bg-cyan-950/30 dark:text-cyan-200",
  emerald:
    "border-emerald-200 bg-emerald-50/80 text-emerald-800 dark:border-emerald-900 dark:bg-emerald-950/30 dark:text-emerald-200",
  amber:
    "border-amber-200 bg-amber-50/80 text-amber-800 dark:border-amber-900 dark:bg-amber-950/30 dark:text-amber-200",
} as const;
