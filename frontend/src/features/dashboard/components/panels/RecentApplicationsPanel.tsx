import { History, MapPin, Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import type { DashboardRecentApplication } from "../../types/dashboard.types";
import { DashboardSectionCard } from "./DashboardSectionCard";
import { DashboardStatusBadge } from "./DashboardStatusBadge";

interface RecentApplicationsPanelProps {
  applications: DashboardRecentApplication[];
}

export function RecentApplicationsPanel({ applications }: RecentApplicationsPanelProps) {
  return (
    <DashboardSectionCard
      title="Live Trajectory Feed"
      description="Real-time calibration and movement of your career artifacts."
      action={
        <Link
          to="/app/job-tracker"
          title="View all applications"
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-lg transition-colors hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500"
        >
          <History className="size-4" />
        </Link>
      }
    >
      {applications.length === 0 ? (
        <div className="rounded-[3rem] border-2 border-dashed border-zinc-100 bg-zinc-50/50 px-5 py-20 text-center dark:border-zinc-800/50 dark:bg-zinc-900/20">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-xl dark:bg-zinc-800">
            <History className="size-8 text-zinc-300" />
          </div>
          <p className="mt-6 text-[11px] font-black uppercase tracking-[0.3em] text-zinc-400">
            Node Activity Offline
          </p>
        </div>
      ) : (
        <div className="relative space-y-10 before:absolute before:inset-0 before:ml-6 before:h-full before:w-[3px] before:-translate-x-px before:bg-gradient-to-b before:from-sky-500/50 before:via-zinc-100 before:to-transparent dark:before:via-zinc-800 sm:space-y-12">
          {applications.map((application) => (
            <div
              key={application.id}
              className="group relative flex items-start pl-16 transition-all"
            >
              {/* Timeline Connector Dot */}
              <div className="absolute left-0 mt-2.5 flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-white bg-zinc-900 shadow-2xl transition-all duration-700 group-hover:scale-110 group-hover:bg-sky-600 dark:border-zinc-950 dark:bg-zinc-800">
                <div className="h-2 w-2 rounded-full bg-sky-400 shadow-[0_0_12px_rgba(56,189,248,1)] animate-pulse" />
              </div>

              <div className="flex-1 rounded-[2rem] border-2 border-zinc-100 bg-white p-6 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.04)] transition-all duration-700 group-hover:-translate-y-1 group-hover:border-sky-500/20 group-hover:shadow-[0_48px_96px_-16px_rgba(0,0,0,0.08)] dark:border-zinc-800 dark:bg-zinc-900/60 sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between sm:gap-8">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 sm:text-2xl uppercase leading-none">
                        {application.role}
                      </h3>
                      <div className="flex items-center gap-2">
                         <DashboardStatusBadge status={application.status} />
                         {application.stale && (
                           <span className="flex h-7 items-center gap-2 rounded-full bg-amber-50 px-3 text-[10px] font-black uppercase tracking-widest text-amber-600 border border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30">
                             <Clock className="size-3" />
                             Stale
                           </span>
                         )}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                        <span className="text-base font-bold text-zinc-900 dark:text-zinc-300">
                          {application.company}
                        </span>
                      </div>
                      {application.location && (
                        <div className="flex items-center gap-2.5 text-zinc-400">
                          <MapPin className="size-4" />
                          <span className="text-[11px] font-black uppercase tracking-widest leading-none pt-0.5">{application.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-100 sm:border-0 sm:pt-0 sm:flex-col sm:items-end sm:text-right dark:border-zinc-800">
                    <div className="flex flex-col sm:items-end">
                       <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-300 dark:text-zinc-600">Session Timestamp</p>
                       <div className="mt-1 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                         <Calendar className="size-3.5" />
                         {application.updatedAt}
                       </div>
                    </div>
                    <Link
                      to="/app/job-tracker"
                      title={`View ${application.company} in tracker`}
                      className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50 text-zinc-900 shadow-inner transition-all duration-500 hover:bg-zinc-900 hover:text-white hover:scale-110 active:scale-95 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-sky-600"
                    >
                      <ArrowRight className="size-5" />
                    </Link>
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
