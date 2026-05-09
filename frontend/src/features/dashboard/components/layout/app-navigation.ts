import {
  Briefcase,
  Edit3,
  FolderOpen,
  LayoutDashboard,
  Mail,
  Target,
} from "lucide-react";

export const APP_NAVIGATION = [
  { name: "Dashboard", shortName: "Home", href: "/app", icon: LayoutDashboard },
  { name: "Resume Optimizer", shortName: "Optimizer", href: "/app/resume-optimizer", icon: Target },
  { name: "Resume Builder", shortName: "Builder", href: "/app/resume-builder", icon: Edit3 },
  { name: "My Documents", shortName: "Docs", href: "/app/documents", icon: FolderOpen },
  { name: "Cover Letter", shortName: "Letter", href: "/app/cover-letter", icon: Mail },
  { name: "Job Tracker", shortName: "Tracker", href: "/app/job-tracker", icon: Briefcase },
] as const;

export function isActiveRoute(pathname: string, href: string) {
  return href === "/app" ? pathname === "/app" : pathname.startsWith(href);
}
