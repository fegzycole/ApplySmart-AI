import type { DashboardApplicationStatus } from "../../types/dashboard.types";
import { DASHBOARD_STATUS_META } from "../../constants/dashboard.constants";

export function DashboardStatusBadge({ status }: { status: DashboardApplicationStatus }) {
  const config = DASHBOARD_STATUS_META[status];

  return (
    <span className={`inline-flex items-center gap-2 rounded-full border border-zinc-200/50 bg-white px-3 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900/60 ${config.className}`}>
      <div className="relative h-1.5 w-1.5">
        <div className="absolute inset-0 rounded-full bg-current opacity-40 animate-ping" />
        <div className="relative h-full w-full rounded-full bg-current" />
      </div>
      {config.label}
    </span>
  );
}
