import { Lock, Smartphone } from "lucide-react";

export const SECURITY_SECTIONS = [
  {
    id: "password",
    title: "Password",
    description: "Rotate your password regularly and avoid reusing it across accounts.",
    icon: Lock,
    eyebrow: "Credential protection",
    gradient: "from-white via-violet-50/80 to-fuchsia-50/70 dark:from-zinc-900 dark:via-violet-950/20 dark:to-fuchsia-950/15",
    border: "border-violet-100/80 dark:border-violet-900/70",
    iconGradient: "from-violet-600 to-fuchsia-500"
  },
  {
    id: "2fa",
    title: "Two-Factor Authentication",
    description: "Use a second verification step to reduce the risk of account takeover.",
    icon: Smartphone,
    eyebrow: "Account hardening",
    gradient: "from-white via-cyan-50/80 to-teal-50/70 dark:from-zinc-900 dark:via-cyan-950/20 dark:to-teal-950/15",
    border: "border-cyan-100/80 dark:border-cyan-900/70",
    iconGradient: "from-cyan-600 to-teal-500"
  }
];
