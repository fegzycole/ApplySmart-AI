import { AdminNavigation, AdminPageHeader } from "../components/admin-header";
import { StatsGrid } from "../components/stats-grid";
import { UserGrowthChart, RevenueChart, SubscriptionChart, AIUsageChart } from "../components/charts";
import { RecentUsersTable } from "../components/recent-users";
import { AdminDashboardSkeleton } from "../components/skeletons";
import { ADMIN_PAGE_STYLES, CHARTS_STYLES } from "../constants/admin.constants";
import { useAdminAnalytics } from "../hooks";

export function AdminDashboardPage() {
  const { isLoading } = useAdminAnalytics();

  if (isLoading) {
    return <AdminDashboardSkeleton />;
  }

  return (
    <div className={ADMIN_PAGE_STYLES.container}>
      <AdminNavigation />

      <div className={ADMIN_PAGE_STYLES.contentWrapper}>
        <div className={ADMIN_PAGE_STYLES.maxWidth}>
          <AdminPageHeader />
          <StatsGrid />

          <div className={CHARTS_STYLES.grid}>
            <UserGrowthChart />
            <RevenueChart />
            <SubscriptionChart />
            <AIUsageChart />
          </div>

          <RecentUsersTable />
        </div>
      </div>
    </div>
  );
}
