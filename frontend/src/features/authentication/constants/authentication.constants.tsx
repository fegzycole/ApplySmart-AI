import type { FormFieldConfig } from "../types/authentication.types";

export const AUTH_PAGE_STYLES = {
  container: "min-h-screen bg-transparent flex flex-col relative overflow-hidden antialiased",
  contentWrapper: "relative z-40 flex-1 flex items-center justify-center px-6 py-24"
} as const;

export const DECORATIVE_BG_STYLES = {
  wrapper: "absolute inset-0 overflow-hidden pointer-events-none z-10",
  topRight: "absolute -top-[10%] -right-[10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[120px]",
  bottomLeft: "absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[100px]"
} as const;

export const AUTH_NAV_STYLES = {
  nav: "fixed top-8 left-0 right-0 z-50 px-6 pointer-events-none",
  wrapper: "max-w-fit mx-auto pointer-events-auto",
  content: "flex items-center gap-6 bg-card/60 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-full px-8 py-4",
  logoContainer: "flex items-center gap-2",
  logoIcon: {
    wrapper: "size-8 rounded-full bg-primary flex items-center justify-center",
    icon: "size-5 text-primary-foreground"
  },
  logoText: "text-xl font-bold tracking-tight text-foreground",
  themeToggle: "p-2 rounded-full hover:bg-foreground/5 transition-colors cursor-pointer"
} as const;

export const AUTH_CARD_STYLES = {
  card: "w-full max-w-xl border border-white/10 bg-card/40 backdrop-blur-3xl shadow-[0_32px_64px_-15px_rgba(0,0,0,0.2)] rounded-[3.5rem] p-4 lg:p-8",
  header: {
    container: "text-center space-y-4 pb-12",
    icon: {
      wrapper: "size-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500",
      icon: "size-10 text-primary"
    },
    title: "text-5xl font-bold tracking-tight text-foreground",
    description: "text-lg text-muted-foreground leading-relaxed"
  }
} as const;

export const FORM_FIELD_STYLES = {
  wrapper: "space-y-3 group",
  label: "text-sm font-semibold uppercase tracking-widest text-muted-foreground/60 ml-1",
  inputWrapper: "relative",
  input: "h-14 bg-foreground/5 border-2 border-transparent rounded-2xl px-5 text-base transition-all duration-300 focus:bg-transparent focus:border-primary focus:ring-8 focus:ring-primary/10 outline-none",
  focusGlow: "absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-focus-within:opacity-100 -z-10 blur-xl transition-opacity duration-300"
} as const;

export const FORM_STYLES = {
  form: "space-y-8",
  formCompact: "space-y-6",
  submitButton: "w-full h-16 bg-primary text-primary-foreground text-lg font-bold rounded-2xl shadow-xl shadow-primary/20 hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 cursor-pointer"
} as const;

export const OAUTH_STYLES = {
  wrapper: "mt-12",
  divider: {
    container: "relative",
    line: "absolute inset-0 flex items-center",
    border: "w-full border-t border-foreground/10",
    textWrapper: "relative flex justify-center text-xs font-bold uppercase tracking-widest",
    text: "px-6 bg-transparent text-muted-foreground/40"
  },
  buttons: {
    container: "mt-8 grid grid-cols-2 gap-4",
    button: "h-14 bg-foreground/5 border-2 border-transparent hover:border-foreground/10 hover:bg-foreground/10 rounded-2xl font-semibold transition-all duration-300 cursor-pointer",
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

export const TWO_FACTOR_LOGIN_FIELD: FormFieldConfig = {
  id: "code",
  label: "Security Code",
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
  loginTwoFactor: {
    title: "Verify your sign-in",
    description: "Enter the current 6-digit code from your authenticator app to finish signing in.",
    submitButton: "Verify and Sign In",
    backButton: "Back to Sign In"
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
