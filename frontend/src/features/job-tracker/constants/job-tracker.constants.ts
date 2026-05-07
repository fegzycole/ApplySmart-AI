import { BriefcaseBusiness, CheckCircle2, Star, Target, XCircle, Zap } from "lucide-react";
import type { Column } from "../types/job.types";

export const KANBAN_COLUMNS: Column[] = [
  {
    id: "SAVED",
    title: "Saved",
    gradient: "from-slate-400 to-zinc-500",
    icon: Star,
    accentColor: "bg-slate-500"
  },
  {
    id: "APPLIED",
    title: "Applied",
    gradient: "from-amber-400 to-orange-500",
    icon: Zap,
    accentColor: "bg-amber-500"
  },
  {
    id: "INTERVIEW",
    title: "Interview",
    gradient: "from-violet-500 to-fuchsia-600",
    icon: Target,
    accentColor: "bg-violet-500"
  },
  {
    id: "OFFER",
    title: "Offer",
    gradient: "from-emerald-400 to-teal-500",
    icon: CheckCircle2,
    accentColor: "bg-emerald-500"
  },
  {
    id: "REJECTED",
    title: "Rejected",
    gradient: "from-red-400 to-rose-500",
    icon: XCircle,
    accentColor: "bg-red-500"
  }
];

export const JOB_CARD_STYLES = {
  card: {
    base: "group relative overflow-hidden rounded-[1.35rem] border border-white/80 bg-[linear-gradient(155deg,rgba(255,255,255,0.98),rgba(248,250,252,0.94))] shadow-[0_10px_30px_rgba(15,23,42,0.06)] ring-1 ring-zinc-950/5 transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-violet-200/80 hover:shadow-[0_18px_40px_rgba(109,40,217,0.14)] dark:border-zinc-800/80 dark:bg-[linear-gradient(155deg,rgba(24,24,27,0.98),rgba(9,9,11,0.96))] dark:ring-white/5 dark:hover:border-violet-900/80 dark:hover:shadow-[0_18px_40px_rgba(76,29,149,0.28)] cursor-move",
    dragging: "opacity-50 shadow-none"
  },
  ambientGlow: "pointer-events-none absolute -right-10 -top-10 size-24 rounded-full bg-gradient-to-br from-fuchsia-200/60 via-violet-200/40 to-cyan-200/20 blur-2xl transition-opacity duration-200 group-hover:opacity-90 dark:from-fuchsia-500/20 dark:via-violet-500/20 dark:to-cyan-400/10",
  hairline: "pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-zinc-300/90 to-transparent dark:via-zinc-700/80",
  content: "relative space-y-3 p-4",
  header: {
    container: "space-y-1.5",
    role: "line-clamp-2 text-[15px] font-semibold leading-5 tracking-[-0.01em] text-zinc-950 dark:text-zinc-50",
    companyRow: "flex flex-wrap items-center gap-x-2 gap-y-1 text-sm",
    company: "font-medium text-zinc-700 dark:text-zinc-300",
    separator: "text-zinc-300 dark:text-zinc-700",
    location: "text-zinc-500 dark:text-zinc-400"
  },
  notes: "line-clamp-3 rounded-2xl bg-zinc-950/[0.03] px-3 py-2.5 text-sm leading-5 text-zinc-600 dark:bg-white/[0.04] dark:text-zinc-300",
  meta: {
    list: "flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400",
    item: "inline-flex items-center gap-1 rounded-full bg-white/80 px-2 py-1 ring-1 ring-zinc-950/5 dark:bg-white/[0.03] dark:ring-white/8",
    separator: "text-zinc-300 dark:text-zinc-700"
  },
  actions: {
    container: "flex items-center justify-end gap-2 pt-1",
    linkWrapper: "shrink-0",
    viewButton: "h-8 rounded-full border-white/70 bg-zinc-950 px-3 text-xs font-medium text-white shadow-sm hover:bg-zinc-800 hover:text-white dark:border-zinc-700 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 dark:hover:text-zinc-950",
    editButton: "size-8 rounded-full bg-white/70 text-zinc-500 ring-1 ring-zinc-950/5 hover:bg-white hover:text-zinc-900 dark:bg-white/[0.04] dark:text-zinc-400 dark:ring-white/8 dark:hover:bg-white/[0.08] dark:hover:text-zinc-100",
    deleteButton: "size-8 rounded-full bg-white/70 text-zinc-500 ring-1 ring-zinc-950/5 hover:bg-white hover:text-red-600 dark:bg-white/[0.04] dark:text-zinc-400 dark:ring-white/8 dark:hover:bg-white/[0.08] dark:hover:text-red-300",
    icon: "size-3.5"
  }
} as const;

export const KANBAN_COLUMN_STYLES = {
  container: "flex-1 min-w-[280px] max-w-sm flex flex-col",
  header: {
    wrapper: "mb-4 p-3 rounded-xl backdrop-blur-xl shadow-lg border border-white/20",
    content: "flex items-center gap-2",
    icon: {
      wrapper: "size-8 rounded-lg flex items-center justify-center shadow-lg",
      icon: "size-4 text-white"
    },
    text: {
      container: "flex-1",
      title: "font-semibold text-white text-sm",
      count: "text-xs text-white/80"
    }
  },
  dropZone: {
    base: "flex-1 p-4 rounded-xl border-2 border-dashed backdrop-blur-xl transition-all duration-300 space-y-3 min-h-[320px]",
    default: "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30",
    hover: "border-violet-500 bg-violet-50/50 dark:bg-violet-950/20"
  },
  emptyState: "flex h-32 flex-col items-center justify-center text-center text-zinc-400 dark:text-zinc-600 text-sm"
} as const;

export const JOB_FORM_DIALOG_STYLES = {
  content: "max-w-2xl p-4 sm:p-6",
  form: "space-y-5",
  fieldGrid: "grid gap-4 sm:grid-cols-2",
  fullWidthField: "sm:col-span-2",
  fieldWrapper: "space-y-2",
  actions: {
    container: "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
    cancelButton: "flex-1",
    submitButton: "flex-1 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white"
  }
} as const;

export const FORM_FIELD_CONFIG = {
  company: {
    label: "Company Name",
    placeholder: "e.g. Google",
    type: "text" as const
  },
  role: {
    label: "Job Title",
    placeholder: "e.g. Senior Software Engineer",
    type: "text" as const
  },
  link: {
    label: "Job Posting URL",
    placeholder: "https://...",
    type: "url" as const
  },
  location: {
    label: "Location",
    placeholder: "Remote, Hybrid...",
    type: "text" as const
  },
  salary: {
    label: "Compensation",
    placeholder: "$120k - $140k",
    type: "text" as const
  },
  applicationDeadline: {
    label: "Application Deadline",
    placeholder: "",
    type: "datetime-local" as const
  },
  notes: {
    label: "Notes (Optional)",
    placeholder: "Add any notes about this application...",
    type: "textarea" as const,
    rows: 3
  }
} as const;

export const TRACKER_HEADER_CONTENT = {
  badge: "Kanban Board",
  title: "Job Application Tracker",
  description: "Move every application through your pipeline from saved to offer",
  buttonText: "Add New Application"
} as const;

export const JOB_TRACKER_EMPTY_STATE_STYLES = {
  wrapper: "rounded-3xl border border-dashed border-zinc-300 bg-white/85 px-6 py-12 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-900/70",
  iconWrapper: "mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-white shadow-lg",
  icon: "size-7",
  title: "text-xl font-semibold text-zinc-950 dark:text-zinc-50",
  description: "mx-auto mt-2 max-w-xl text-sm text-zinc-600 dark:text-zinc-400",
  button: "mt-6 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-700 hover:to-fuchsia-700",
};

export const JOB_TRACKER_EMPTY_STATE_CONTENT = {
  title: "No applications yet",
  description: "Add your first application to start tracking saved roles, active interviews, offers, and rejections in one place.",
};

export const JOB_TRACKER_ERROR_STATE_STYLES = {
  wrapper: "rounded-3xl border border-red-200 bg-red-50/70 px-6 py-12 text-center dark:border-red-950 dark:bg-red-950/20",
  title: "text-lg font-semibold text-red-900 dark:text-red-200",
  description: "mt-2 text-sm text-red-700 dark:text-red-300",
  button: "mt-6",
};

export const JOB_TRACKER_ERROR_STATE_CONTENT = {
  title: "Job tracker unavailable",
  description: "We couldn't load your applications right now. Try again in a moment.",
};

export const JOB_TRACKER_ICONS = {
  empty: BriefcaseBusiness,
};
