import {
  StatCard,
  SuccessMetricsChart,
  ApplicationFunnel,
  ApplicationVelocityChart,
  RecentApplicationsSection,
  QuickActionsCard,
} from "../components";
import { DashboardPageHeader } from "../components/dashboard-header";
import { DASHBOARD_PAGE_STYLES } from "../constants/dashboard.constants";
import { useDashboardStats } from "../hooks";

export function DashboardHomePage() {
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div className={DASHBOARD_PAGE_STYLES.container}>
      <div className={DASHBOARD_PAGE_STYLES.wrapper}>
        <DashboardPageHeader />

        <div className={DASHBOARD_PAGE_STYLES.statsGrid}>
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-32 animate-pulse bg-gradient-to-r from-zinc-200/50 via-zinc-100/50 to-zinc-200/50 dark:from-zinc-800/50 dark:via-zinc-700/50 dark:to-zinc-800/50 rounded-lg"
                />
              ))
            : stats &&
              stats.map((stat, index) => (
                <StatCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  trend={stat.trend}
                  gradient={stat.gradient}
                  shadowColor={stat.shadowColor}
                />
              ))}
        </div>

        <div className={DASHBOARD_PAGE_STYLES.mainContentGrid}>
          <SuccessMetricsChart />
          <ApplicationFunnel />
        </div>

        <div className={DASHBOARD_PAGE_STYLES.velocitySection}>
          <ApplicationVelocityChart />
        </div>

        <div className={DASHBOARD_PAGE_STYLES.bottomGrid}>
          <div className="lg:col-span-2">
            <RecentApplicationsSection />
          </div>
          <div>
            <QuickActionsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
