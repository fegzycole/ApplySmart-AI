import { BriefcaseBusiness, FileText, WandSparkles } from "lucide-react";
import { MISSION_CONTROL_ANIMATIONS } from "@/shared/constants/animations";
import type {
  DashboardAction,
  DashboardApplicationStatus,
} from "../types/dashboard.types";

export { MISSION_CONTROL_ANIMATIONS };

export const DASHBOARD_PAGE_STYLES = {
  container: "w-full min-h-screen pb-24 lg:pb-32",
  wrapper: "mx-auto w-full max-w-[1700px] min-w-0 space-y-12 sm:space-y-16 lg:space-y-20",
  bentoGrid: "grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12",
  heroSection: "col-span-12",
  mainStage: "col-span-12 space-y-10 sm:space-y-12 2xl:col-span-8 2xl:space-y-16",
  sideStage: "col-span-12 space-y-10 sm:space-y-12 lg:grid lg:grid-cols-2 lg:gap-10 lg:space-y-0 2xl:col-span-4 2xl:flex 2xl:flex-col 2xl:gap-0 2xl:space-y-16",
  metricsGrid: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 2xl:grid-cols-4",
  activityFeed: "col-span-12 lg:col-span-7",
  trendsPanel: "col-span-12 lg:col-span-5",
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
    className: "bg-muted text-muted-foreground",
  },
  applied: {
    label: "Applied",
    className: "bg-amber-100/50 text-amber-700 dark:bg-amber-900/20 dark:text-amber-300",
  },
  interview: {
    label: "Interview",
    className: "bg-primary/10 text-primary",
  },
  offer: {
    label: "Offer",
    className: "bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/20 dark:text-emerald-300",
  },
  rejected: {
    label: "Rejected",
    className: "bg-rose-100/50 text-rose-700 dark:bg-rose-900/20 dark:text-rose-300",
  },
};

export const DASHBOARD_PIPELINE_COLORS: Record<string, string> = {
  Saved: "var(--color-muted-foreground)",
  Applied: "#f59e0b",
  Interview: "var(--color-primary)",
  Offer: "oklch(0.65 0.18 160)",
};

export const DASHBOARD_DOCUMENT_COLORS = {
  originalResumes: "var(--color-muted-foreground)",
  optimizedResumes: "var(--color-primary)",
  builtResumes: "oklch(0.65 0.18 200)",
  coverLetters: "oklch(0.65 0.18 160)",
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
