import { Settings } from "lucide-react";
import { WorkspacePageHeader } from "@/shared/components/WorkspacePageHeader";

export function SettingsHeader() {
  return (
    <WorkspacePageHeader
      className="mb-5 sm:mb-6 lg:mb-8"
      badge="Account Settings"
      badgeIcon={Settings}
      title="Settings"
      description="Manage your profile, billing, and account security from one focused workspace."
    />
  );
}
