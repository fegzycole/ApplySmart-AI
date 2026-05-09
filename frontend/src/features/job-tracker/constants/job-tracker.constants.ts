import { 
  Star, 
  Search, 
  XCircle, 
  Coffee, 
  Trophy,
  Compass
} from "lucide-react";
import type { Column } from "../types/job.types";

export const KANBAN_COLUMNS: Column[] = [
  {
    id: "SAVED",
    title: "Wishlist",
    gradient: "from-sky-400/20 via-blue-500/10 to-transparent",
    icon: Star,
    accentColor: "text-sky-600 bg-sky-100"
  },
  {
    id: "APPLIED",
    title: "Applied",
    gradient: "from-orange-400/20 via-amber-500/10 to-transparent",
    icon: Search,
    accentColor: "text-orange-600 bg-orange-100"
  },
  {
    id: "INTERVIEW",
    title: "Interviews",
    gradient: "from-indigo-400/20 via-violet-500/10 to-transparent",
    icon: Coffee,
    accentColor: "text-indigo-600 bg-indigo-100"
  },
  {
    id: "OFFER",
    title: "Offers",
    gradient: "from-emerald-400/20 via-teal-500/10 to-transparent",
    icon: Trophy,
    accentColor: "text-emerald-600 bg-emerald-100"
  },
  {
    id: "REJECTED",
    title: "Next Time",
    gradient: "from-zinc-400/20 via-slate-500/10 to-transparent",
    icon: XCircle,
    accentColor: "text-slate-600 bg-slate-100"
  }
];

export const ARTIFACT_STYLES = {
  card: {
    wrapper: "group relative overflow-hidden rounded-[2rem] border-2 border-white/40 bg-white/40 shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] cursor-grab active:cursor-grabbing dark:bg-zinc-900/40 dark:border-zinc-800/40 sm:rounded-[2.5rem]",
    dragging: "opacity-40 scale-95 rotate-2 shadow-none",
    aura: "absolute inset-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-700 blur-[80px] -z-10",
    grain: "absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay",
  },
  hero: {
    role: "text-[22px] font-black tracking-tighter leading-[0.9] text-zinc-900 dark:text-zinc-50 group-hover:tracking-tight transition-all duration-500 sm:text-[26px] sm:leading-[0.85]",
    seal: "flex h-12 w-12 items-center justify-center rounded-full text-lg font-black shadow-inner border border-white/20 dark:border-zinc-700/30",
  },
  controlBar: "flex items-center gap-2 rounded-2xl bg-white/60 p-2 backdrop-blur-md border border-white/40 dark:bg-zinc-800/60 dark:border-zinc-700/40 shadow-sm",
  actionDeck: "absolute bottom-0 left-0 right-0 p-4 translate-y-0 sm:translate-y-full sm:group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1] bg-gradient-to-t from-white/80 to-transparent dark:from-zinc-900/80",
} as const;

export const JOB_CARD_STYLES = {
  card: {
    base: "group relative overflow-hidden rounded-[2.5rem] border-2 border-white/60 bg-white/70 p-1 backdrop-blur-xl transition-all duration-300 hover:border-sky-200 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] cursor-move dark:bg-zinc-900/50 dark:border-zinc-800/50 dark:hover:border-sky-900/50",
    dragging: "opacity-40 scale-95 rotate-2 shadow-none"
  },
  ambientGlow: "pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-sky-100/50 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 dark:bg-sky-900/20",
  content: "relative space-y-4 p-7",
  header: {
    container: "space-y-1.5",
    role: "line-clamp-2 text-[17px] font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-snug group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors",
    companyRow: "flex flex-wrap items-center gap-x-2.5 gap-y-1 text-sm font-medium",
    company: "text-zinc-600 dark:text-zinc-400",
    separator: "text-zinc-300 dark:text-zinc-700",
    location: "text-zinc-400 dark:text-zinc-500"
  },
  notes: "line-clamp-2 rounded-2xl bg-zinc-50 px-4 py-3.5 text-[13px] leading-relaxed text-zinc-500 italic border-l-4 border-zinc-100 dark:bg-zinc-800/30 dark:border-zinc-700 dark:text-zinc-400",
  meta: {
    list: "flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold tracking-tight text-zinc-500 dark:text-zinc-400",
    item: "inline-flex items-center gap-1.5 rounded-xl bg-white/80 px-3 py-1.5 border border-zinc-100 dark:bg-zinc-800/50 dark:border-zinc-700 shadow-sm",
    separator: "text-zinc-200"
  },
  actions: {
    container: "flex items-center justify-end gap-3 pt-3",
    linkWrapper: "inline-flex",
    viewButton: "h-11 rounded-2xl bg-sky-50 px-5 text-xs font-bold tracking-tight text-sky-700 hover:bg-sky-100 hover:text-sky-800 transition-all active:scale-95 dark:bg-sky-900/20 dark:text-sky-300 dark:hover:bg-sky-900/40",
    editButton: "size-11 rounded-2xl bg-zinc-50 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 transition-all active:scale-90 dark:bg-zinc-800/40 dark:hover:bg-zinc-800",
    deleteButton: "size-11 rounded-2xl bg-zinc-50 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 transition-all active:scale-90 dark:bg-zinc-800/40 dark:hover:bg-rose-950/20",
    icon: "size-4.5"
  }
} as const;

export const KANBAN_COLUMN_STYLES = {
  container: "flex-1 min-w-[300px] max-w-md flex flex-col group/column sm:min-w-[340px]",
  header: {
    wrapper: "mb-5 p-4 rounded-[1.75rem] bg-white shadow-xl shadow-zinc-200/40 border border-zinc-100 transition-all group-hover/column:shadow-2xl group-hover/column:shadow-zinc-200/60 dark:bg-zinc-900 dark:border-zinc-800 dark:shadow-none sm:mb-8 sm:p-5 sm:rounded-[2.5rem]",
    content: "flex items-center gap-5",
    icon: {
      wrapper: "relative flex h-11 w-11 shrink-0 items-center justify-center rounded-[1rem] shadow-sm sm:h-14 sm:w-14 sm:rounded-[1.25rem]",
      icon: "size-5 sm:size-7"
    },
    text: {
      container: "flex-1 min-w-0",
      title: "text-xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100",
      count: "text-[13px] font-bold text-zinc-400 dark:text-zinc-500"
    }
  },
  dropZone: {
    base: "flex-1 p-4 rounded-[2rem] border-2 border-dashed transition-all duration-500 space-y-4 min-h-[400px] sm:p-5 sm:rounded-[3rem] sm:space-y-5 sm:min-h-[450px]",
    default: "border-zinc-100 bg-zinc-50/30 dark:border-zinc-800 dark:bg-zinc-900/10",
    hover: "border-sky-300 bg-sky-50/50 scale-[1.02] dark:border-sky-800 dark:bg-sky-950/10"
  },
  emptyState: "flex h-56 flex-col items-center justify-center text-center space-y-4"
} as const;

export const JOB_FORM_DIALOG_STYLES = {
  content: "p-0 border-0 bg-white dark:bg-zinc-950 shadow-2xl shadow-zinc-900/20 overflow-y-auto top-auto bottom-0 left-0 right-0 translate-x-0 translate-y-0 max-h-[92dvh] w-full max-w-full rounded-t-[2rem] rounded-b-none sm:top-1/2 sm:bottom-auto sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-2xl sm:max-h-[90dvh] sm:rounded-[3rem] lg:rounded-[3.5rem]",
  header: "p-5 pb-0 sm:p-8 sm:pb-0 lg:p-10 lg:pb-0",
  form: "p-5 pt-5 space-y-5 sm:p-8 sm:pt-6 sm:space-y-7 lg:p-10 lg:pt-8 lg:space-y-8",
  fieldGrid: "grid gap-4 sm:grid-cols-2 sm:gap-6",
  fullWidthField: "sm:col-span-2",
  actions: {
    container: "flex flex-col-reverse gap-3 sm:flex-row sm:justify-end p-5 pt-0 sm:p-8 sm:pt-0 lg:p-10 lg:pt-0",
    cancelButton: "h-12 px-6 rounded-xl border-2 font-bold tracking-tight hover:bg-zinc-50 dark:hover:bg-zinc-900 sm:h-14 sm:px-8 sm:rounded-2xl",
    submitButton: "h-12 px-8 rounded-xl bg-zinc-900 text-white font-bold tracking-tight shadow-xl shadow-zinc-900/20 hover:scale-105 active:scale-95 dark:bg-sky-600 dark:text-white dark:shadow-sky-900/20 sm:h-14 sm:px-10 sm:rounded-2xl"
  }
} as const;

export const FORM_FIELD_CONFIG = {
  company: {
    label: "Company",
    placeholder: "e.g. Stripe",
    type: "text" as const,
  },
  role: {
    label: "Role",
    placeholder: "e.g. Product Designer",
    type: "text" as const,
  },
  location: {
    label: "Location",
    placeholder: "e.g. Remote, Lagos, London",
    type: "text" as const,
  },
  salary: {
    label: "Salary",
    placeholder: "e.g. $120k - $140k",
    type: "text" as const,
  },
  link: {
    label: "Job URL",
    placeholder: "https://company.com/jobs/role",
    type: "url" as const,
  },
  applicationDeadline: {
    label: "Application Deadline",
    placeholder: "",
    type: "date" as const,
  },
  notes: {
    label: "Notes",
    placeholder: "Add interview notes, referrals, follow-ups, or anything worth tracking.",
    type: "textarea" as const,
    rows: 5,
  },
} as const;

export const TRACKER_HEADER_CONTENT = {
  badge: "Progress Pipeline",
  title: "Career Trajectory",
  description: "Orchestrate your professional growth through a high-precision pipeline. Track every opportunity and <span class='text-zinc-900 dark:text-zinc-100 font-bold'>calibrate your momentum</span> toward mission success.",
  buttonText: "Add New Opportunity"
} as const;

export const JOB_TRACKER_EMPTY_STATE_STYLES = {
  wrapper: "rounded-[2rem] p-8 text-center bg-white border border-zinc-100 shadow-2xl shadow-zinc-200/50 relative overflow-hidden group dark:bg-zinc-900 dark:border-zinc-800 dark:shadow-none sm:rounded-[3rem] sm:p-16 lg:rounded-[4rem] lg:p-24",
  iconWrapper: "relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[2rem] bg-amber-50 text-amber-600 shadow-sm group-hover:scale-110 transition-transform duration-700 dark:bg-amber-900/20 dark:text-amber-400 sm:mb-10 sm:h-28 sm:w-28 sm:rounded-[2.5rem] lg:mb-12 lg:h-32 lg:w-32 lg:rounded-[3rem]",
  icon: "size-10 sm:size-14 lg:size-16",
  title: "text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl lg:text-5xl",
  description: "mx-auto mt-4 max-w-2xl text-base font-medium text-zinc-500 leading-relaxed dark:text-zinc-400 sm:mt-6 sm:text-lg lg:mt-8 lg:text-xl",
  button: "mt-8 h-12 px-8 rounded-2xl bg-zinc-900 text-white font-bold tracking-tight shadow-2xl shadow-zinc-900/20 hover:scale-105 active:scale-95 transition-all dark:bg-sky-600 dark:shadow-sky-900/20 sm:mt-10 sm:h-14 sm:px-10 sm:rounded-3xl lg:mt-12 lg:h-16 lg:px-12",
};

export const JOB_TRACKER_EMPTY_STATE_CONTENT = {
  title: "A clean slate for your dreams",
  description: "Every great career starts with a single step. Add your first opportunity and let's turn it into your next job.",
};

export const JOB_TRACKER_ERROR_STATE_STYLES = {
  wrapper: "rounded-[2rem] p-8 text-center border-2 border-rose-100 bg-rose-50/30 dark:border-rose-900/20 dark:bg-rose-950/10 sm:rounded-[3rem] sm:p-16 lg:rounded-[3.5rem] lg:p-24",
  title: "text-2xl font-extrabold tracking-tight text-rose-900 dark:text-rose-200 sm:text-3xl",
  description: "mt-3 text-base font-medium text-rose-700/70 dark:text-rose-300/60 sm:mt-6 sm:text-xl",
  button: "mt-8 h-12 rounded-2xl border-2 border-rose-200 font-bold tracking-tight text-rose-700 hover:bg-rose-50 transition-all dark:border-rose-800 dark:text-rose-300 sm:mt-12 sm:h-14",
};

export const JOB_TRACKER_ERROR_STATE_CONTENT = {
  title: "Job tracker unavailable",
  description: "We couldn't load your applications right now. Try again in a moment.",
} as const;

export const JOB_TRACKER_ICONS = {
  empty: Compass,
};
