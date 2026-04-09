
export const ADMIN_PAGE_STYLES = {
  container: "min-h-screen bg-zinc-50 dark:bg-zinc-950",
  contentWrapper: "p-4 lg:p-8",
  maxWidth: "max-w-7xl mx-auto"
} as const;

export const ADMIN_HEADER_STYLES = {
  nav: "border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900",
  navWrapper: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  navContent: "flex justify-between items-center h-16",
  leftSection: "flex items-center gap-4",
  logoContainer: "flex items-center gap-2",
  logoIcon: "size-6 text-indigo-600 dark:text-indigo-400",
  logoText: "text-xl font-semibold text-zinc-900 dark:text-white",
  adminBadge: "bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 border-red-200 dark:border-red-900",
  pageHeader: {
    container: "mb-8",
    title: "text-3xl font-bold text-zinc-900 dark:text-white mb-2",
    description: "text-zinc-600 dark:text-zinc-400"
  }
} as const;

export const STATS_GRID_STYLES = {
  grid: "grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8",
  card: "border-zinc-200 dark:border-zinc-800",
  cardHeader: "pb-3",
  cardDescription: "flex items-center gap-2",
  cardTitle: "text-3xl",
  cardContent: "",
  trend: {
    container: "flex items-center gap-1 text-sm text-emerald-600 dark:text-emerald-400",
    icon: "size-4"
  }
} as const;

export const CHARTS_STYLES = {
  grid: "grid lg:grid-cols-2 gap-6 mb-6",
  card: "border-zinc-200 dark:border-zinc-800",
  chartContainer: "h-80",
  tooltipStyle: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid #e4e4e7',
    borderRadius: '8px'
  }
} as const;

export const RECENT_USERS_STYLES = {
  card: "border-zinc-200 dark:border-zinc-800",
  nameCell: "font-medium",
  emailCell: "text-zinc-600 dark:text-zinc-400",
  timeCell: "text-zinc-600 dark:text-zinc-400",
  actionsCell: "text-right",
  planBadge: {
    careerBoost: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900",
    pro: "bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900",
    starter: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900",
    free: "bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800"
  },
  statusBadge: {
    active: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900",
    trial: "bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-900"
  }
} as const;

export const CHART_COLORS = {
  primary: "#6366f1",
  secondary: "#10b981",
  tertiary: "#8b5cf6",
  gridStroke: "#e4e4e7",
  axisStroke: "#71717a"
} as const;







export const ADMIN_HEADER_CONTENT = {
  title: "Admin Dashboard",
  description: "Platform metrics and user analytics",
  adminBadgeText: "Admin",
  backButtonText: "Back to App"
} as const;

export const CHART_TITLES = {
  userGrowth: {
    title: "User Growth",
    description: "Total and premium users over time"
  },
  revenue: {
    title: "Monthly Revenue",
    description: "Revenue trend over the last 6 months"
  },
  subscriptions: {
    title: "Subscription Distribution",
    description: "Users by subscription tier"
  },
  aiUsage: {
    title: "AI Feature Usage",
    description: "Most used AI features this month"
  },
  recentUsers: {
    title: "Recent Users",
    description: "Latest user registrations"
  }
} as const;

export const TABLE_HEADERS = {
  name: "Name",
  email: "Email",
  plan: "Plan",
  status: "Status",
  joined: "Joined",
  actions: "Actions"
} as const;
