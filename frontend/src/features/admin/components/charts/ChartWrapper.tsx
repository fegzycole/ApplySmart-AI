import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { CHARTS_STYLES } from "../../constants/admin.constants";

interface ChartWrapperProps {
  title: string;
  description: string;
  isLoading: boolean;
  isError: boolean;
  hasData: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
}

export function ChartWrapper({
  title,
  description,
  isLoading,
  isError,
  hasData,
  emptyMessage = "No data available",
  children,
}: ChartWrapperProps) {
  return (
    <Card className={CHARTS_STYLES.card}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-80 text-zinc-500">
            Loading chart data...
          </div>
        ) : isError || !hasData ? (
          <div className="flex items-center justify-center h-80 text-zinc-500">
            {emptyMessage}
          </div>
        ) : (
          <div className={CHARTS_STYLES.chartContainer}>{children}</div>
        )}
      </CardContent>
    </Card>
  );
}
