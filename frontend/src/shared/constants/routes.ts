export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PASSWORD_RESET: '/password-reset',
  PRICING: '/pricing',
  DASHBOARD: {
    HOME: '/app',
    RESUME_OPTIMIZER: '/app/resume-optimizer',
    RESUME_BUILDER: '/app/resume-builder',
    RESUMES: '/app/resumes',
    COVER_LETTER: '/app/cover-letter',
    JOB_TRACKER: '/app/job-tracker',
    ANALYTICS: '/app/analytics',
    SETTINGS: '/app/settings',
  },
  ADMIN: '/admin',
} as const;
