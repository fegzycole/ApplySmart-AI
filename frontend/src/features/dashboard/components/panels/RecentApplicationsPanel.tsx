import { History, MapPin, Calendar, Clock, ArrowRight } from "lucide-react";
import type { DashboardRecentApplication } from "../../types/dashboard.types";
import { DashboardSectionCard } from "./DashboardSectionCard";
import { DashboardStatusBadge } from "./DashboardStatusBadge";

interface RecentApplicationsPanelProps {
  applications: DashboardRecentApplication[];
}

export function RecentApplicationsPanel({ applications }: RecentApplicationsPanelProps) {
  return (
    <DashboardSectionCard
      title="Live Activity Feed"
      description="Real-time pulse of your application pipeline movement."
      action={
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
          <History className="size-4" />
        </div>
      }
    >
      {applications.length === 0 ? (
        <div className="rounded-[2rem] border-2 border-dashed border-border bg-background/50 px-5 py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-card text-muted-foreground/30 shadow-sm">
            <History className="size-6" />
          </div>
          <p className="mt-4 text-sm font-medium text-muted-foreground">
            No application activity tracked yet.
          </p>
        </div>
      ) : (
        <div className="relative space-y-6 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-gradient-to-b before:from-primary/50 before:via-border before:to-transparent sm:space-y-8">
          {applications.map((application) => (
            <div
              key={application.id}
              className="group relative flex items-start pl-12 transition-all"
            >
              {/* Timeline Connector Dot */}
              <div className="absolute left-0 mt-1.5 flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-secondary shadow-sm transition-all group-hover:scale-110 group-hover:border-primary/20">
                <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--color-primary),0.6)]" />
              </div>

              <div className="flex-1 rounded-[1.5rem] border border-border bg-card p-4 shadow-sm transition-all group-hover:border-primary/20 group-hover:shadow-xl group-hover:shadow-primary/5 sm:rounded-[1.75rem] sm:p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                  <div className="space-y-2 sm:space-y-3">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                      <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                        {application.role}
                      </h3>
                      <DashboardStatusBadge status={application.status} />
                      {application.stale && (
                        <span className="flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-400">
                          <Clock className="size-3" />
                          Stale
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-medium text-muted-foreground">
                      <span className="flex items-center gap-1.5 text-foreground">
                        {application.company}
                      </span>
                      {application.location && (
                        <span className="flex items-center gap-1.5 opacity-60">
                          <MapPin className="size-3.5" />
                          {application.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-between gap-2 sm:flex-col sm:items-end sm:text-right">
                    <div className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground/60">
                      <Calendar className="size-3" />
                      Updated {application.updatedAt}
                    </div>
                    <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground">
                      <ArrowRight className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardSectionCard>
  );
}
