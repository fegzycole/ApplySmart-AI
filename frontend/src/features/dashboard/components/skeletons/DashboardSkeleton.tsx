import { Skeleton } from "@/shared/components/ui/skeleton";
import { DASHBOARD_PAGE_STYLES } from "../../constants/dashboard.constants";

export function DashboardSkeleton() {
  return (
    <div className={DASHBOARD_PAGE_STYLES.container}>
      <div className={DASHBOARD_PAGE_STYLES.wrapper}>
        {/* Page header */}
        <div className="space-y-3">
          <Skeleton className="h-8 w-48 sm:h-10 sm:w-64" />
          <Skeleton className="h-4 w-64 sm:w-96" />
        </div>

        <div className={DASHBOARD_PAGE_STYLES.bentoGrid}>
          {/* Hero — full width */}
          <div className={DASHBOARD_PAGE_STYLES.heroSection}>
            <Skeleton className="h-64 rounded-[3rem] sm:h-72 sm:rounded-[4.5rem]" />
          </div>

          {/* Main stage — metrics + activity + charts */}
          <div className={DASHBOARD_PAGE_STYLES.mainStage}>
            {/* 4-col metric grid */}
            <div className={DASHBOARD_PAGE_STYLES.metricsGrid}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-4 rounded-[1.6rem] border-2 border-zinc-100/80 bg-white/60 p-5 dark:border-zinc-800/60 dark:bg-zinc-900/40">
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-8 w-8 rounded-xl" />
                  </div>
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-3 w-28" />
                </div>
              ))}
            </div>

            {/* Recent applications panel */}
            <div className="space-y-4 rounded-[3rem] border-2 border-zinc-100/80 bg-white/60 p-6 dark:border-zinc-800/60 dark:bg-zinc-900/40 sm:p-8">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-44" />
                <Skeleton className="h-8 w-20 rounded-full" />
              </div>
              <div className="space-y-3 pt-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
                    <div className="flex-1 space-y-1.5 min-w-0">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                    <Skeleton className="h-6 w-20 shrink-0 rounded-full" />
                  </div>
                ))}
              </div>
            </div>

            {/* Chart row — velocity + outcome */}
            <div className="grid grid-cols-1 gap-8 sm:gap-10 xl:grid-cols-2 xl:gap-12">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-4 rounded-[3rem] border-2 border-zinc-100/80 bg-white/60 p-6 dark:border-zinc-800/60 dark:bg-zinc-900/40 sm:p-8">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-3 w-56" />
                  </div>
                  <Skeleton className="h-48 w-full rounded-2xl" />
                </div>
              ))}
            </div>
          </div>

          {/* Side stage — insights + documents + pipeline */}
          <div className={DASHBOARD_PAGE_STYLES.sideStage}>
            {/* Insights panel — taller */}
            <div className="space-y-4 rounded-[3rem] border-2 border-zinc-100/80 bg-white/60 p-6 dark:border-zinc-800/60 dark:bg-zinc-900/40 sm:p-8">
              <div className="flex items-center justify-between">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-6 w-6 rounded-lg" />
              </div>
              <div className="space-y-3 pt-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4 dark:border-zinc-800 dark:bg-zinc-900/30">
                    <Skeleton className="h-3 w-full mb-2" />
                    <Skeleton className="h-3 w-4/5" />
                  </div>
                ))}
              </div>
            </div>

            {/* Document coverage */}
            <div className="space-y-4 rounded-[3rem] border-2 border-zinc-100/80 bg-white/60 p-6 dark:border-zinc-800/60 dark:bg-zinc-900/40 sm:p-8">
              <div className="space-y-2">
                <Skeleton className="h-5 w-44" />
                <Skeleton className="h-3 w-52" />
              </div>
              <div className="space-y-3 pt-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-8 w-8 shrink-0 rounded-xl" />
                    <div className="flex-1 min-w-0">
                      <Skeleton className="h-3 w-28 mb-1.5" />
                      <Skeleton className="h-2 w-full rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-8 shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Pipeline snapshot */}
            <div className="space-y-4 rounded-[3rem] border-2 border-zinc-100/80 bg-white/60 p-6 dark:border-zinc-800/60 dark:bg-zinc-900/40 sm:p-8">
              <div className="space-y-2">
                <Skeleton className="h-5 w-36" />
                <Skeleton className="h-3 w-48" />
              </div>
              <Skeleton className="h-36 w-36 rounded-full mx-auto" />
              <div className="grid grid-cols-2 gap-2 pt-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <Skeleton className="h-2.5 w-2.5 rounded-full shrink-0" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
