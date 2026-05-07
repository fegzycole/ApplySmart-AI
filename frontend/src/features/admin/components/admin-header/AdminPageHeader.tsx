import { Shield } from "lucide-react";
import { WorkspacePageHeader } from "@/shared/components/WorkspacePageHeader";
import { ADMIN_HEADER_CONTENT } from "../../constants/admin.constants";

export function AdminPageHeader() {
  return (
    <WorkspacePageHeader
      className="mb-8"
      badge="Admin Console"
      badgeIcon={Shield}
      title={ADMIN_HEADER_CONTENT.title}
      description={ADMIN_HEADER_CONTENT.description}
    />
  );
}
