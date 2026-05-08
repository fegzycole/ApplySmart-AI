import { LayoutDashboard } from "lucide-react";
import { WorkspacePageHeader } from "@/shared/components/WorkspacePageHeader";
import { DASHBOARD_HEADER_CONTENT } from "../../constants/dashboard.constants";

export function DashboardPageHeader() {
  return (
    <WorkspacePageHeader
      className="mb-6 lg:mb-8"
      badge="Job Search Command Center"
      badgeIcon={LayoutDashboard}
      title={DASHBOARD_HEADER_CONTENT.title}
      description={DASHBOARD_HEADER_CONTENT.description}
    />
  );
}
