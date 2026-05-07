export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  PASSWORD_RESET: '/password-reset',
  OAUTH_CALLBACK: '/auth/oauth2/callback',
  PRICING: '/pricing',
  DASHBOARD: {
    HOME: '/app',
    RESUME_OPTIMIZER: '/app/resume-optimizer',
    RESUME_BUILDER: '/app/resume-builder',
    DOCUMENTS: '/app/documents',
    COVER_LETTER: '/app/cover-letter',
    JOB_TRACKER: '/app/job-tracker',
    ANALYTICS: '/app/analytics',
    SETTINGS: '/app/settings',
  },
  ADMIN: '/admin',
} as const;
