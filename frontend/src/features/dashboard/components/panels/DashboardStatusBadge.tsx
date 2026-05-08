import type { DashboardApplicationStatus } from "../../types/dashboard.types";
import { DASHBOARD_STATUS_META } from "../../constants/dashboard.constants";

export function DashboardStatusBadge({ status }: { status: DashboardApplicationStatus }) {
  const config = DASHBOARD_STATUS_META[status];

  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
