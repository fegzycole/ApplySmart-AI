import type { FormFieldConfig } from "../types/authentication.types";

export const AUTH_PAGE_STYLES = {
  container: "min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-zinc-950 dark:via-violet-950/20 dark:to-zinc-950 flex flex-col relative overflow-hidden",
  contentWrapper: "relative z-10 flex-1 flex items-center justify-center px-4 py-12"
} as const;

export const DECORATIVE_BG_STYLES = {
  wrapper: "absolute inset-0 overflow-hidden pointer-events-none",
  topRight: "absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-400/30 to-fuchsia-600/30 dark:from-violet-600/20 dark:to-fuchsia-800/20 rounded-full blur-3xl",
  bottomLeft: "absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-400/30 to-teal-600/30 dark:from-cyan-600/20 dark:to-teal-800/20 rounded-full blur-3xl"
} as const;

export const AUTH_NAV_STYLES = {
  nav: "relative z-10 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border-b border-violet-200/50 dark:border-violet-800/50",
  wrapper: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  content: "flex justify-between items-center h-16",
  logoContainer: "flex items-center gap-2",
  logoIcon: {
    wrapper: "size-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center",
    icon: "size-5 text-white"
  },
  logoText: "text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent",
  themeToggle: "p-2 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors cursor-pointer"
} as const;

export const AUTH_CARD_STYLES = {
  card: "w-full max-w-md border-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-2xl shadow-2xl shadow-violet-500/20 dark:shadow-violet-900/30",
  header: {
    container: "text-center space-y-2 pb-8",
    icon: {
      wrapper: "size-16 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/50",
      icon: "size-8 text-white"
    },
    title: "text-3xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent",
    description: "text-base"
  }
} as const;

export const FORM_FIELD_STYLES = {
  wrapper: "space-y-2 group",
  label: "text-sm font-medium text-zinc-700 dark:text-zinc-300",
  inputWrapper: "relative",
  input: "h-12 bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl focus:border-violet-500 dark:focus:border-violet-500 focus:ring-4 focus:ring-violet-500/20 transition-all duration-300 pl-4",
  focusGlow: "absolute inset-0 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 opacity-0 group-focus-within:opacity-100 -z-10 blur-xl transition-opacity duration-300"
} as const;

export const FORM_STYLES = {
  form: "space-y-6",
  formCompact: "space-y-5",
  submitButton: "w-full h-12 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/50 dark:shadow-violet-900/50 transform hover:scale-[1.02] transition-all duration-300 cursor-pointer"
} as const;

export const OAUTH_STYLES = {
  wrapper: "mt-8",
  divider: {
    container: "relative",
    line: "absolute inset-0 flex items-center",
    border: "w-full border-t-2 border-zinc-200 dark:border-zinc-800",
    textWrapper: "relative flex justify-center text-sm",
    text: "px-4 bg-white dark:bg-zinc-900 text-zinc-500 font-medium"
  },
  buttons: {
    container: "mt-6 grid grid-cols-2 gap-4",
    button: "h-12 border-2 border-zinc-200 dark:border-zinc-800 hover:border-violet-300 dark:hover:border-violet-700 hover:bg-violet-50 dark:hover:bg-violet-950/30 rounded-xl transition-all duration-300 cursor-pointer",
    icon: "size-5 mr-2"
  }
} as const;

export const TERMS_CHECKBOX_STYLES = {
  wrapper: "flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-violet-50/50 to-fuchsia-50/50 dark:from-violet-950/30 dark:to-fuchsia-950/30 border border-violet-100 dark:border-violet-900",
  checkbox: "mt-0.5 border-2 data-[state=checked]:bg-gradient-to-r data-[state=checked]:from-violet-600 data-[state=checked]:to-fuchsia-600",
  label: "text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed cursor-pointer",
  link: "bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent hover:from-violet-700 hover:to-fuchsia-700 font-semibold"
} as const;

export const LINK_TEXT_STYLES = {
  wrapper: "text-center text-sm text-zinc-600 dark:text-zinc-400 mt-4",
  link: "bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent hover:from-violet-700 hover:to-fuchsia-700 font-semibold"
} as const;

export const LOGIN_FIELDS: FormFieldConfig[] = [
  { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { id: "password", label: "Password", type: "password", placeholder: "Enter your password" }
] as const;

export const SIGNUP_FIELDS: FormFieldConfig[] = [
  { id: "firstName", label: "First Name", type: "text", placeholder: "John" },
  { id: "lastName", label: "Last Name", type: "text", placeholder: "Doe" },
  { id: "email", label: "Email", type: "email", placeholder: "you@example.com" },
  { id: "password", label: "Password", type: "password", placeholder: "Create a strong password" }
] as const;

export const PASSWORD_RESET_FIELDS: FormFieldConfig[] = [
  { id: "email", label: "Email", type: "email", placeholder: "you@example.com" }
] as const;

export const VERIFY_EMAIL_FIELD: FormFieldConfig = {
  id: "code",
  label: "Verification Code",
  type: "text",
  placeholder: "Enter 6-digit code"
} as const;

export const AUTH_CONTENT = {
  login: {
    title: "Welcome back",
    description: "Sign in to your account to continue",
    submitButton: "Sign In",
    footer: "Don't have an account?",
    footerLink: "Sign up",
    footerLinkPath: "/signup"
  },
  signup: {
    title: "Create your account",
    description: "Start your free trial today - no credit card required",
    submitButton: "Create Account",
    footer: "Already have an account?",
    footerLink: "Sign in",
    footerLinkPath: "/login"
  },
  passwordReset: {
    title: "Reset your password",
    description: "Enter your email and we'll send you a reset link",
    submitButton: "Send Reset Link",
    footer: "Remember your password?",
    footerLink: "Sign in",
    footerLinkPath: "/login"
  },
  verifyEmail: {
    title: "Verify your email",
    description: "We've sent a verification code to your email",
    submitButton: "Verify Email",
    resendButton: "Resend Code",
    footer: "Back to",
    footerLink: "Sign in",
    footerLinkPath: "/login"
  },
  oauthCallback: {
    title: "Completing sign in",
    description: "We're finalizing your secure OAuth session."
  },
  oauth: {
    dividerText: "Or continue with"
  }
} as const;

export const GOOGLE_ICON_SVG = (
  <svg className="size-5 mr-2" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

export const GITHUB_ICON_SVG = (
  <svg className="size-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);
