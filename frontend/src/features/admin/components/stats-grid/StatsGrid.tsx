import { Users, UserCheck, FileText, Mail, Briefcase, DollarSign } from "lucide-react";
import { StatCard } from "./StatCard";
import { STATS_GRID_STYLES } from "../../constants/admin.constants";
import { useAdminAnalytics } from "../../hooks";
import type { StatCardData } from "../../types/admin.types";

export function StatsGrid() {
  const { data: analytics, isLoading, isError } = useAdminAnalytics();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-32 text-zinc-500 mb-8">
        Loading statistics...
      </div>
    );
  }

  if (isError || !analytics) {
    return (
      <div className="flex items-center justify-center h-32 text-zinc-500 mb-8">
        Failed to load statistics
      </div>
    );
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
