import {
  StatCard,
  SuccessMetricsChart,
  ApplicationFunnel,
  ApplicationVelocityChart,
  RecentApplicationsSection,
  QuickActionsCard
} from "../components";
import { DashboardPageHeader } from "../components/dashboard-header";
import { DASHBOARD_PAGE_STYLES } from "../constants/dashboard.constants";
import { useDashboardStats } from "../hooks";

export function DashboardHomePage() {
  const { data: stats, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <div className={DASHBOARD_PAGE_STYLES.container}>
        <div className={DASHBOARD_PAGE_STYLES.wrapper}>
          <DashboardPageHeader />
          <div className="flex items-center justify-center h-64">
            <div className="text-zinc-500">Loading dashboard...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={DASHBOARD_PAGE_STYLES.container}>
      <div className={DASHBOARD_PAGE_STYLES.wrapper}>
        <DashboardPageHeader />

        <div className={DASHBOARD_PAGE_STYLES.statsGrid}>
          {stats && stats.map((stat, index) => (
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
