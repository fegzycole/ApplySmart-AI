interface TableLoadingSkeletonProps {
  height?: string;
}

export const TableLoadingSkeleton = ({ height }: TableLoadingSkeletonProps) => {
  return (
    <div className={`${height} space-y-3 animate-pulse`}>
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="h-12 bg-gradient-to-r from-zinc-200/50 via-zinc-100/50 to-zinc-200/50 dark:from-zinc-800/50 dark:via-zinc-700/50 dark:to-zinc-800/50 rounded-lg"
        />
      ))}
    </div>
  );
};
