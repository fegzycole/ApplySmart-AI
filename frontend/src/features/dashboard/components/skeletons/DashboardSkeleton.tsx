import { DASHBOARD_PAGE_STYLES } from "../../constants/dashboard.constants";

export function DashboardSkeleton() {
  return (
    <div className={DASHBOARD_PAGE_STYLES.container}>
      <div className={DASHBOARD_PAGE_STYLES.wrapper}>
        <div className="h-56 animate-pulse rounded-[1.75rem] bg-zinc-200/70 dark:bg-zinc-800/70" />
        <div className="h-80 animate-pulse rounded-[2rem] bg-zinc-200/70 dark:bg-zinc-800/70" />
        <div className={DASHBOARD_PAGE_STYLES.metricsGrid}>
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-40 animate-pulse rounded-[1.6rem] bg-zinc-200/70 dark:bg-zinc-800/70"
            />
          ))}
        </div>
        <div className={DASHBOARD_PAGE_STYLES.topPanels}>
          <div className="h-[26rem] animate-pulse rounded-[1.75rem] bg-zinc-200/70 dark:bg-zinc-800/70" />
          <div className="h-[26rem] animate-pulse rounded-[1.75rem] bg-zinc-200/70 dark:bg-zinc-800/70" />
        </div>
        <div className={DASHBOARD_PAGE_STYLES.bottomPanels}>
          <div className="h-[28rem] animate-pulse rounded-[1.75rem] bg-zinc-200/70 dark:bg-zinc-800/70" />
          <div className="h-[28rem] animate-pulse rounded-[1.75rem] bg-zinc-200/70 dark:bg-zinc-800/70" />
        </div>
      </div>
    </div>
  );
}
