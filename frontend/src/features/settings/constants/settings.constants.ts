import { User, Bell, CreditCard, Shield } from "lucide-react";
import {
  type SettingsTab,
  type NotificationSetting,
} from "../types/settings.types";
import { FEATURE_FLAGS } from "@/shared/config/feature-flags";

const ALL_TABS: SettingsTab[] = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "security", label: "Security", icon: Shield },
];

// Filter out billing tab when subscriptions are disabled
export const SETTINGS_TABS: SettingsTab[] = ALL_TABS.filter(
  tab => tab.id !== "billing" || FEATURE_FLAGS.SUBSCRIPTIONS_ENABLED
);

export const NOTIFICATION_SETTINGS: NotificationSetting[] = [
  {
    id: "email-notifications",
    title: "Email Notifications",
    description: "Receive email updates about your applications",
    defaultChecked: true,
    gradient:
      "from-violet-50/50 to-fuchsia-50/50 dark:from-violet-950/20 dark:to-fuchsia-950/20",
    border: "border-violet-100 dark:border-violet-900",
  },
  {
    id: "application-reminders",
    title: "Application Reminders",
    description: "Get reminders to follow up on applications",
    defaultChecked: true,
    gradient:
      "from-cyan-50/50 to-teal-50/50 dark:from-cyan-950/20 dark:to-teal-950/20",
    border: "border-cyan-100 dark:border-cyan-900",
  },
  {
    id: "job-recommendations",
    title: "Job Recommendations",
    description: "Receive AI-powered job recommendations",
    defaultChecked: true,
    gradient:
      "from-fuchsia-50/50 to-pink-50/50 dark:from-fuchsia-950/20 dark:to-pink-950/20",
    border: "border-fuchsia-100 dark:border-fuchsia-900",
  },
  {
    id: "weekly-summary",
    title: "Weekly Summary",
    description: "Get a weekly summary of your job search progress",
    defaultChecked: false,
    gradient:
      "from-amber-50/50 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/20",
    border: "border-amber-100 dark:border-amber-900",
  },
  {
    id: "marketing-emails",
    title: "Marketing Emails",
    description: "Receive tips, articles, and product updates",
    defaultChecked: false,
    gradient:
      "from-slate-50/50 to-zinc-50/50 dark:from-slate-950/20 dark:to-zinc-950/20",
    border: "border-slate-100 dark:border-slate-900",
  },
];

export const PROFILE_FIELDS = [
  { id: "firstName", label: "First Name", defaultValue: "John" },
  { id: "lastName", label: "Last Name", defaultValue: "Doe" },
];

export const TRIGGER_STYLES =
  "flex items-center gap-2 data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-900 data-[state=active]:shadow-lg rounded-lg transition-all duration-300";
