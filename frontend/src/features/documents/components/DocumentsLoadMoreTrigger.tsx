import { useEffect, useRef } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface DocumentsLoadMoreTriggerProps {
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  onLoadMore: () => void;
}

export function DocumentsLoadMoreTrigger({
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: DocumentsLoadMoreTriggerProps) {
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node || !hasNextPage || isFetchingNextPage) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, onLoadMore]);

  if (!hasNextPage && !isFetchingNextPage) {
    return null;
  }

  return (
    <div className="flex flex-col items-center gap-3 pt-2">
      <div ref={sentinelRef} className="h-px w-full" />

      {isFetchingNextPage ? (
        <div className="inline-flex items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
          <Loader2 className="size-4 animate-spin" />
          Loading more documents...
        </div>
      ) : (
        <Button variant="outline" onClick={onLoadMore} className="rounded-xl">
          Load more
        </Button>
      )}
    </div>
  );
}
