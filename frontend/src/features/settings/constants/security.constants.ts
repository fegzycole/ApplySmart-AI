import { Lock, Smartphone, Shield } from "lucide-react";

export const PASSWORD_FIELDS = [
  { id: "currentPassword", label: "Current Password" },
  { id: "newPassword", label: "New Password" },
  { id: "confirmPassword", label: "Confirm New Password" }
];

export const SECURITY_SECTIONS = [
  {
    id: "password",
    title: "Change Password",
    icon: Lock,
    gradient: "from-violet-50/50 to-fuchsia-50/50 dark:from-violet-950/20 dark:to-fuchsia-950/20",
    border: "border-violet-100 dark:border-violet-900"
  },
  {
    id: "2fa",
    title: "Two-Factor Authentication",
    description: "Add an extra layer of security to your account",
    icon: Smartphone,
    gradient: "from-cyan-50/50 to-teal-50/50 dark:from-cyan-950/20 dark:to-teal-950/20",
    border: "border-cyan-100 dark:border-cyan-900"
  },
  {
    id: "sessions",
    title: "Active Sessions",
    icon: Shield,
    gradient: "from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/20 dark:to-teal-950/20",
    border: "border-emerald-100 dark:border-emerald-900"
  }
];

export const ACTIVE_SESSIONS = [
  {
    device: "MacBook Pro",
    location: "San Francisco, CA",
    status: "Current session • Last active now",
    isCurrent: true
  }
];
