import { Users, UserCheck, FileText, Mail } from "lucide-react";
import { StatCard } from "./StatCard";
import { EmptyState } from "@/shared/components/EmptyState";
import { STATS_GRID_STYLES } from "../../constants/admin.constants";
import { useAdminAnalytics } from "../../hooks";
import type { StatCardData } from "../../types/admin.types";

export function StatsGrid() {
  const { data: analytics, isLoading, isError } = useAdminAnalytics();

  if (isLoading) {
    return (
      <div className={STATS_GRID_STYLES.grid}>
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="h-32 animate-pulse bg-gradient-to-r from-zinc-200/50 via-zinc-100/50 to-zinc-200/50 dark:from-zinc-800/50 dark:via-zinc-700/50 dark:to-zinc-800/50 rounded-lg"
          />
        ))}
      </div>
    );
  }

  if (isError || !analytics) {
    return <EmptyState message="Failed to load statistics" />;
  }

  const { overviewStats } = analytics;

  const stats: StatCardData[] = [
    {
      icon: Users,
      label: "Total Users",
      value: overviewStats.totalUsers.toLocaleString(),
      trend: `${overviewStats.activeUsers} active`,
    },
    {
      icon: UserCheck,
      label: "Active Users",
      value: overviewStats.activeUsers.toLocaleString(),
      trend: `${((overviewStats.activeUsers / overviewStats.totalUsers) * 100).toFixed(1)}% of total`,
    },
    {
      icon: FileText,
      label: "Total Resumes",
      value: overviewStats.totalResumes.toLocaleString(),
      trend: `${(overviewStats.totalResumes / overviewStats.totalUsers).toFixed(1)} per user`,
    },
    {
      icon: Mail,
      label: "Cover Letters",
      value: overviewStats.totalCoverLetters.toLocaleString(),
      trend: `${(overviewStats.totalCoverLetters / overviewStats.totalUsers).toFixed(1)} per user`,
    },
  ];

  return (
    <div className={STATS_GRID_STYLES.grid}>
      {stats.map((stat, index) => (
        <StatCard key={index} data={stat} />
      ))}
    </div>
  );
}
