import { ChartLoadingSkeleton } from "./ChartLoadingSkeleton";
import { DotLoadingSkeleton } from "./DotLoadingSkeleton";
import { TableLoadingSkeleton } from "./TableLoadingSkeleton";

interface LoadingSkeletonProps {
  variant?: "chart" | "table" | "default";
  height?: string;
}

export function LoadingSkeleton({
  variant = "default",
  height = "h-32",
}: LoadingSkeletonProps) {
  if (variant === "chart") {
    return <ChartLoadingSkeleton height={height} />;
  }

  if (variant === "table") {
    return <TableLoadingSkeleton height={height} />;
  }

  return <DotLoadingSkeleton height={height} />;
}
