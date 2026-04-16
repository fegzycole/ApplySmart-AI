import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { EmptyState } from "@/shared/components/EmptyState";
import { LoadingSkeleton } from "@/shared/components/skeletons";
import { CHARTS_STYLES } from "../../constants/admin.constants";

type ChartState = "loading" | "error" | "empty" | "success";

interface ChartWrapperProps {
  title: string;
  description: string;
  state: ChartState;
  emptyMessage?: string;
  children: React.ReactNode;
}

const STATE_MESSAGES: Record<
  Exclude<ChartState, "success" | "loading">,
  string
> = {
  error: "Failed to load chart data",
  empty: "No data available",
};

export function ChartWrapper({
  title,
  description,
  state,
  emptyMessage,
  children,
}: ChartWrapperProps) {
  const renderContent = () => {
    if (state === "loading") {
      return <LoadingSkeleton variant="chart" height="h-80" />;
    }

    if (state === "success") {
      return <div className={CHARTS_STYLES.chartContainer}>{children}</div>;
    }

    const message =
      state === "empty" && emptyMessage ? emptyMessage : STATE_MESSAGES[state];

    return <EmptyState message={message} height="h-80" />;
  };

  return (
    <Card className={CHARTS_STYLES.card}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  );
}
