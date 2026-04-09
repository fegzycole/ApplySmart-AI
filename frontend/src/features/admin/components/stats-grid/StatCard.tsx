import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { TrendingUp } from "lucide-react";
import type { StatCardData } from "../../types/admin.types";
import { STATS_GRID_STYLES } from "../../constants/admin.constants";

interface StatCardProps {
  data: StatCardData;
}

export function StatCard({ data }: StatCardProps) {
  const Icon = data.icon;

  return (
    <Card className={STATS_GRID_STYLES.card}>
      <CardHeader className={STATS_GRID_STYLES.cardHeader}>
        <CardDescription className={STATS_GRID_STYLES.cardDescription}>
          <Icon className="size-4" />
          {data.label}
        </CardDescription>
        <CardTitle className={STATS_GRID_STYLES.cardTitle}>
          {data.value}
        </CardTitle>
      </CardHeader>
      <CardContent className={STATS_GRID_STYLES.cardContent}>
        <div className={STATS_GRID_STYLES.trend.container}>
          <TrendingUp className={STATS_GRID_STYLES.trend.icon} />
          <span>{data.trend}</span>
        </div>
      </CardContent>
    </Card>
  );
}
