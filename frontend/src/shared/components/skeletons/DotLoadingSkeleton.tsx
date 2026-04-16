interface DotLoadingSkeletonProps {
  height?: string;
}

export const DotLoadingSkeleton = ({ height }: DotLoadingSkeletonProps) => {
  return (
    <div className={`flex items-center justify-center ${height}`}>
      <div className="flex items-center gap-2">
        <div className="size-2 rounded-full bg-violet-500 animate-bounce [animation-delay:-0.3s]" />
        <div className="size-2 rounded-full bg-fuchsia-500 animate-bounce [animation-delay:-0.15s]" />
        <div className="size-2 rounded-full bg-cyan-500 animate-bounce" />
      </div>
    </div>
  );
};
