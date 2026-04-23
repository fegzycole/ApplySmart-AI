import {
  Briefcase,
  Edit3,
  FolderOpen,
  LayoutDashboard,
  Mail,
  Settings,
  Target,
} from "lucide-react";

export const APP_NAVIGATION = [
  { name: "Dashboard", href: "/app", icon: LayoutDashboard },
  { name: "Resume Optimizer", href: "/app/resume-optimizer", icon: Target },
  { name: "Resume Builder", href: "/app/resume-builder", icon: Edit3 },
  { name: "My Resumes", href: "/app/resumes", icon: FolderOpen },
  { name: "Cover Letter", href: "/app/cover-letter", icon: Mail },
  { name: "Job Tracker", href: "/app/job-tracker", icon: Briefcase },
  { name: "Settings", href: "/app/settings", icon: Settings },
] as const;

export function isActiveRoute(pathname: string, href: string) {
  return href === "/app" ? pathname === "/app" : pathname.startsWith(href);
}
