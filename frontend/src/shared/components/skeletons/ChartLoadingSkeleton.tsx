interface ChartLoadingSkeletonProps {
  height?: string;
}

export const ChartLoadingSkeleton = ({ height }: ChartLoadingSkeletonProps) => {
  return (
    <div className={`${height} flex items-center justify-center`}>
      <div className="w-full h-full space-y-4 animate-pulse">
        <div className="h-full bg-gradient-to-r from-zinc-200/50 via-zinc-100/50 to-zinc-200/50 dark:from-zinc-800/50 dark:via-zinc-700/50 dark:to-zinc-800/50 rounded-lg" />
      </div>
    </div>
  );
};
