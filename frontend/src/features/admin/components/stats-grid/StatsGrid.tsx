import { StatCard } from "./StatCard";
import { STATS_GRID_STYLES } from "../../constants/admin.constants";

export function StatsGrid() {
  // No data available - waiting for API integration
  const stats: any[] = [];

  if (stats.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-zinc-500 mb-8">
        No admin statistics available
      </div>
    );
  }

  return (
    <div className={STATS_GRID_STYLES.grid}>
      {stats.map((stat, index) => (
        <StatCard key={index} data={stat} />
      ))}
    </div>
  );
}
