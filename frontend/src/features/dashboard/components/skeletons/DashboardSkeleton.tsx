import { StatCardSkeleton, ChartSkeleton, CardSkeleton } from "@/shared/components/skeletons";
import { DASHBOARD_PAGE_STYLES } from "../../constants/dashboard.constants";

export function DashboardSkeleton() {
  return (
    <div className={DASHBOARD_PAGE_STYLES.wrapper}>
      <div className="mb-8">
        <div className="h-8 w-48 bg-accent animate-pulse rounded-md mb-2" />
        <div className="h-4 w-64 bg-accent animate-pulse rounded-md" />
      </div>

      <div className={DASHBOARD_PAGE_STYLES.statsGrid}>
        {Array.from({ length: 4 }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ))}
      </div>

      <div className={DASHBOARD_PAGE_STYLES.mainContentGrid}>
        <ChartSkeleton />
        <ChartSkeleton />
      </div>

      <div className={DASHBOARD_PAGE_STYLES.velocitySection}>
        <ChartSkeleton />
      </div>

      <div className={DASHBOARD_PAGE_STYLES.bottomGrid}>
        <div className="lg:col-span-2">
          <CardSkeleton />
        </div>
        <div>
          <CardSkeleton />
        </div>
      </div>
    </div>
  );
}
