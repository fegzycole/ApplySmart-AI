import type { DashboardRecentApplication } from "../../types/dashboard.types";
import { DashboardSectionCard } from "./DashboardSectionCard";
import { DashboardStatusBadge } from "./DashboardStatusBadge";

interface RecentApplicationsPanelProps {
  applications: DashboardRecentApplication[];
}

export function RecentApplicationsPanel({ applications }: RecentApplicationsPanelProps) {
  return (
    <DashboardSectionCard
      title="Recent application activity"
      description="Stay close to the roles you touched most recently and spot stale or urgent entries quickly."
    >
      {applications.length === 0 ? (
        <div className="rounded-[1.4rem] border border-dashed border-zinc-300 bg-zinc-50/80 px-5 py-10 text-center text-sm text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400">
          No application activity yet. Add a role to the tracker to start building your pipeline history.
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((application) => (
            <div
              key={application.id}
              className="rounded-[1.35rem] border border-zinc-200/80 bg-zinc-50/75 p-4 dark:border-zinc-800 dark:bg-zinc-900/65"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="truncate text-base font-semibold text-zinc-950 dark:text-zinc-50">
                      {application.role}
                    </h3>
                    <DashboardStatusBadge status={application.status} />
                    {application.stale ? (
                      <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-300">
                        Stale
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {application.company}
                    {application.location ? ` • ${application.location}` : ""}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span className="rounded-full bg-white px-2.5 py-1 ring-1 ring-zinc-950/5 dark:bg-zinc-950 dark:ring-white/10">
                    Added {application.date}
                  </span>
                  <span className="rounded-full bg-white px-2.5 py-1 ring-1 ring-zinc-950/5 dark:bg-zinc-950 dark:ring-white/10">
                    Updated {application.updatedAt}
                  </span>
                  {application.deadline ? (
                    <span className="rounded-full bg-white px-2.5 py-1 ring-1 ring-zinc-950/5 dark:bg-zinc-950 dark:ring-white/10">
                      {application.deadline}
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardSectionCard>
  );
}
