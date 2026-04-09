
export const DASHBOARD_PAGE_STYLES = {
  container: "p-4 sm:p-6 lg:p-8 overflow-x-hidden",
  wrapper: "max-w-7xl mx-auto",
  statsGrid: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 lg:mb-8",
  mainContentGrid: "grid lg:grid-cols-3 gap-4 lg:gap-6 mb-6 items-start",
  velocitySection: "mb-6",
  bottomGrid: "grid lg:grid-cols-3 gap-4 lg:gap-6"
} as const;

export const DASHBOARD_HEADER_STYLES = {
  container: "mb-6 lg:mb-8",
  title: {
    base: "text-3xl sm:text-4xl font-bold mb-2",
    gradient: "bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent"
  },
  description: "text-zinc-600 dark:text-zinc-400 text-sm sm:text-base lg:text-lg"
} as const;

export const DASHBOARD_HEADER_CONTENT = {
  title: "Dashboard",
  description: "Welcome back! Here's your job search overview"
} as const;

export const QUICK_ACTIONS_STYLES = {
  card: "border-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-cyan-600 shadow-2xl shadow-violet-500/50 dark:shadow-violet-900/50",
  title: "text-white text-lg sm:text-xl",
  content: "space-y-3",
  button: "w-full justify-start bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm text-sm",
  icon: "size-4 mr-2"
} as const;

export const QUICK_ACTIONS = {
  ADD_APPLICATION: {
    label: "Add New Application",
    path: "/jobs/new",
    description: "Track a new job application"
  },
  OPTIMIZE_RESUME: {
    label: "Optimize Resume",
    path: "/resumes",
    description: "Improve your resume with AI"
  },
  GENERATE_COVER_LETTER: {
    label: "Generate Cover Letter",
    path: "/cover-letters/generate",
    description: "Create a tailored cover letter"
  }
} as const;


export const RECENT_APPLICATIONS_STYLES = {
  card: "border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300",
  header: {
    wrapper: "pb-4",
    container: "flex flex-col sm:flex-row sm:items-start justify-between gap-3",
    title: "text-lg sm:text-xl",
    description: "text-xs sm:text-sm",
    button: "border-violet-200 dark:border-violet-800 hover:bg-violet-50 dark:hover:bg-violet-950/30 self-start sm:self-center"
  },
  content: "space-y-3",
  item: {
    container: "flex items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border-0 bg-gradient-to-r from-violet-50/50 to-fuchsia-50/50 dark:from-violet-950/20 dark:to-fuchsia-950/20 hover:shadow-lg transition-all duration-300",
    icon: {
      wrapper: "size-10 sm:size-12 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center flex-shrink-0 shadow-lg",
      icon: "size-5 sm:size-6 text-white"
    },
    content: "flex-1 min-w-0",
    company: "font-semibold text-sm sm:text-base text-zinc-900 dark:text-white truncate",
    role: "text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 truncate",
    footer: "flex items-center gap-2 mt-2",
    date: "text-xs text-zinc-500 dark:text-zinc-500"
  },
  status: {
    base: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-white text-xs font-medium shadow-lg",
    interview: "bg-gradient-to-r from-violet-500 to-fuchsia-500",
    applied: "bg-gradient-to-r from-amber-400 to-orange-500",
    rejected: "bg-gradient-to-r from-red-500 to-rose-500",
    icon: "size-3"
  }
} as const;


export const APPLICATION_FUNNEL_STYLES = {
  card: "border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl shadow-xl hover:shadow-2xl transition-all duration-300",
  header: {
    wrapper: "pb-4",
    container: "flex items-start gap-3",
    icon: {
      wrapper: "size-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg flex-shrink-0",
      icon: "size-5 text-white"
    },
    content: "min-w-0",
    title: "text-lg sm:text-xl",
    description: "text-xs sm:text-sm"
  },
  content: "space-y-6 py-2",
  stage: {
    container: "relative",
    connector: "absolute left-[23px] top-[60px] w-0.5 h-6 bg-gradient-to-b from-zinc-300 to-zinc-200 dark:from-zinc-600 dark:to-zinc-700",
    wrapper: "flex items-start gap-3 relative group",
    icon: {
      base: "relative z-10 size-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 flex-shrink-0",
      icon: "size-5 text-white"
    },
    content: "flex-1 min-w-0",
    header: "mb-2",
    title: "font-semibold text-sm text-zinc-900 dark:text-zinc-100 mb-1 truncate",
    valueContainer: "flex items-baseline gap-2",
    value: "text-2xl sm:text-3xl font-bold tabular-nums",
    percentage: "text-xs font-medium text-zinc-500 dark:text-zinc-400",
    progressBar: {
      container: "h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden",
      fill: "h-full rounded-full transition-all duration-500"
    }
  },
  metrics: {
    container: "mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700 grid grid-cols-2 gap-3",
    card: "text-center p-3 rounded-xl",
    value: "text-lg sm:text-xl font-bold bg-clip-text text-transparent",
    label: "text-xs text-zinc-600 dark:text-zinc-400 mt-1"
  }
} as const;




export const FUNNEL_COLOR_MAP = {
  violet: {
    icon: "bg-gradient-to-br from-violet-500 to-fuchsia-500",
    text: "text-violet-600 dark:text-violet-400",
    progress: "bg-gradient-to-r from-violet-500 to-fuchsia-500"
  },
  fuchsia: {
    icon: "bg-gradient-to-br from-fuchsia-500 to-pink-500",
    text: "text-fuchsia-600 dark:text-fuchsia-400",
    progress: "bg-gradient-to-r from-fuchsia-500 to-pink-500"
  },
  cyan: {
    icon: "bg-gradient-to-br from-cyan-500 to-teal-500",
    text: "text-cyan-600 dark:text-cyan-400",
    progress: "bg-gradient-to-r from-cyan-500 to-teal-500"
  },
  teal: {
    icon: "bg-gradient-to-br from-teal-500 to-emerald-500",
    text: "text-teal-600 dark:text-teal-400",
    progress: "bg-gradient-to-r from-teal-500 to-emerald-500"
  },
  emerald: {
    icon: "bg-gradient-to-br from-emerald-500 to-green-500",
    text: "text-emerald-600 dark:text-emerald-400",
    progress: "bg-gradient-to-r from-emerald-500 to-green-500"
  }
} as const;
