import { Star, Zap, Target, CheckCircle2, XCircle } from "lucide-react";
import type { Column } from "../types/job.types";

export const KANBAN_COLUMNS: Column[] = [
  {
    id: "saved",
    title: "Saved",
    gradient: "from-slate-400 to-zinc-500",
    icon: Star,
    accentColor: "bg-slate-500"
  },
  {
    id: "applied",
    title: "Applied",
    gradient: "from-amber-400 to-orange-500",
    icon: Zap,
    accentColor: "bg-amber-500"
  },
  {
    id: "interview",
    title: "Interview",
    gradient: "from-violet-500 to-fuchsia-600",
    icon: Target,
    accentColor: "bg-violet-500"
  },
  {
    id: "offer",
    title: "Offer",
    gradient: "from-emerald-400 to-teal-500",
    icon: CheckCircle2,
    accentColor: "bg-emerald-500"
  },
  {
    id: "rejected",
    title: "Rejected",
    gradient: "from-red-400 to-rose-500",
    icon: XCircle,
    accentColor: "bg-red-500"
  }
];

export const JOB_CARD_STYLES = {
  card: {
    base: "border-0 bg-white dark:bg-zinc-900 shadow-lg hover:shadow-xl transition-all duration-300 cursor-move group relative overflow-hidden",
    dragging: "opacity-50"
  },
  topBar: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500",
  hoverOverlay: "absolute inset-0 bg-gradient-to-r from-violet-500/0 via-fuchsia-500/0 to-cyan-500/0 group-hover:from-violet-500/5 group-hover:via-fuchsia-500/5 group-hover:to-cyan-500/5 transition-all duration-300 pointer-events-none",
  content: "p-4 relative z-10",
  icon: {
    wrapper: "size-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg flex-shrink-0",
    icon: "size-5 text-white"
  },
  header: {
    container: "flex items-start gap-3 mb-3",
    textContainer: "flex-1 min-w-0",
    role: "font-semibold text-zinc-900 dark:text-white mb-1 line-clamp-1 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors",
    company: "text-sm text-zinc-600 dark:text-zinc-400 line-clamp-1"
  },
  notes: "text-xs text-zinc-600 dark:text-zinc-400 mb-3 line-clamp-2 px-3 py-2 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700",
  date: {
    container: "flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-500 mb-3"
  },
  actions: {
    container: "flex items-center gap-2",
    linkWrapper: "flex-1",
    viewButton: "w-full text-xs border-2 border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-950/30",
    deleteButton: "size-8 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/30 opacity-0 group-hover:opacity-100 transition-opacity",
    icon: "size-3 mr-1.5"
  }
} as const;

export const KANBAN_COLUMN_STYLES = {
  container: "flex-1 min-w-[280px] flex flex-col",
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
    base: "flex-1 p-4 rounded-xl border-2 border-dashed backdrop-blur-xl transition-all duration-300 space-y-3 min-h-[400px]",
    default: "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30",
    hover: "border-violet-500 bg-violet-50/50 dark:bg-violet-950/20"
  },
  emptyState: "flex items-center justify-center h-32 text-zinc-400 dark:text-zinc-600 text-sm"
} as const;

export const ADD_JOB_DIALOG_STYLES = {
  content: "max-w-md",
  form: "space-y-4",
  fieldWrapper: "",
  actions: {
    container: "flex gap-2",
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
  notes: {
    label: "Notes (Optional)",
    placeholder: "Add any notes about this application...",
    type: "textarea" as const,
    rows: 3
  }
} as const;

export const TRACKER_HEADER_STYLES = {
  container: "mb-8",
  wrapper: "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6",
  contentSection: "",
  badge: {
    container: "inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs sm:text-sm mb-4",
    icon: "size-4",
    text: "font-medium"
  },
  title: {
    container: "text-3xl sm:text-4xl font-bold mb-2",
    gradient: "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent"
  },
  description: "text-zinc-600 dark:text-zinc-400 text-sm sm:text-base lg:text-lg",
  button: {
    base: "h-auto px-6 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg hover:shadow-xl transition-all duration-300",
    icon: "size-5 mr-2",
    text: "font-semibold"
  }
} as const;

export const TRACKER_HEADER_CONTENT = {
  badge: "Kanban Board",
  title: "Job Application Tracker",
  description: "Visualize your job search pipeline",
  buttonText: "Add New Application"
} as const;
