import {
  ApplicationVelocityPanel,
  DashboardHeroPanel,
  DashboardInsightsPanel,
  DashboardMetricGrid,
  DocumentCoveragePanel,
  OutcomeTrendPanel,
  PipelineSnapshotPanel,
  RecentApplicationsPanel,
} from "../components";
import { DashboardPageHeader } from "../components/dashboard-header";
import { DashboardSkeleton } from "../components/skeletons";
import { DASHBOARD_PAGE_STYLES } from "../constants/dashboard.constants";
import { useDashboardData } from "../hooks";

export function DashboardHomePage() {
  const { data, isLoading } = useDashboardData();

  if (isLoading || !data) {
    return <DashboardSkeleton />;
  }

  return (
    <div className={DASHBOARD_PAGE_STYLES.container}>
      <div className={DASHBOARD_PAGE_STYLES.wrapper}>
        <DashboardPageHeader />
        <DashboardHeroPanel data={data} />

        <div className={DASHBOARD_PAGE_STYLES.metricsGrid}>
          <DashboardMetricGrid data={data} />
        </div>

        <div className={DASHBOARD_PAGE_STYLES.topPanels}>
          <ApplicationVelocityPanel data={data.applicationVelocity} />
          <OutcomeTrendPanel data={data.successMetrics} />
        </div>

        <div className={DASHBOARD_PAGE_STYLES.midPanels}>
          <PipelineSnapshotPanel data={data} />
          <DashboardInsightsPanel data={data} />
        </div>

        <div className={DASHBOARD_PAGE_STYLES.bottomPanels}>
          <DocumentCoveragePanel documents={data.documents} />
          <RecentApplicationsPanel applications={data.recentApplications} />
        </div>
      </div>
    </div>
  );
}
