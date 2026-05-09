import { motion } from "framer-motion";
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
import { 
  DASHBOARD_PAGE_STYLES, 
  MISSION_CONTROL_ANIMATIONS 
} from "../constants/dashboard.constants";
import { useDashboardData } from "../hooks";

export function DashboardHomePage() {
  const { data, isLoading } = useDashboardData();

  if (isLoading || !data) {
    return <DashboardSkeleton />;
  }

  return (
    <motion.div
      variants={MISSION_CONTROL_ANIMATIONS.stagger.container}
      initial="hidden"
      animate="visible"
      className={DASHBOARD_PAGE_STYLES.container}
    >
      <div className={DASHBOARD_PAGE_STYLES.wrapper}>
        <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
          <DashboardPageHeader />
        </motion.div>

        <div className={DASHBOARD_PAGE_STYLES.bentoGrid}>
          {/* Top: Immersive Hero */}
          <motion.div 
            variants={MISSION_CONTROL_ANIMATIONS.stagger.item}
            className={DASHBOARD_PAGE_STYLES.heroSection}
          >
            <DashboardHeroPanel data={data} />
          </motion.div>

          {/* Left: Main Stage (Metrics & Activity) */}
          <div className={DASHBOARD_PAGE_STYLES.mainStage}>
            <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
              <div className={DASHBOARD_PAGE_STYLES.metricsGrid}>
                <DashboardMetricGrid data={data} />
              </div>
            </motion.div>

            <motion.div 
              variants={MISSION_CONTROL_ANIMATIONS.stagger.item}
              className="canvas-card rounded-[2.5rem] p-1 shadow-2xl shadow-zinc-200/50 dark:shadow-none"
            >
              <RecentApplicationsPanel applications={data.recentApplications} />
            </motion.div>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-8">
              <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item} className="canvas-card rounded-[2.5rem] p-1">
                <ApplicationVelocityPanel data={data.applicationVelocity} />
              </motion.div>
              <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item} className="canvas-card rounded-[2.5rem] p-1">
                <OutcomeTrendPanel data={data.successMetrics} />
              </motion.div>
            </div>
          </div>

          {/* Right: Side Stage (Intelligence & Documentation) */}
          <div className={DASHBOARD_PAGE_STYLES.sideStage}>
            <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
              <DashboardInsightsPanel data={data} />
            </motion.div>

            <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item} className="canvas-card rounded-[2.5rem] p-1">
              <PipelineSnapshotPanel data={data} />
            </motion.div>

            <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item} className="canvas-card rounded-[2.5rem] p-1">
              <DocumentCoveragePanel documents={data.documents} />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
