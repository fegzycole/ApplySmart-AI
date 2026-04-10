import { Skeleton } from "@/shared/components/ui/skeleton";

export function JobTrackerSkeleton() {
  const columns = 4;
  const cardsPerColumn = 3;

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-8">
          <Skeleton className="h-10 w-48 mb-4" />
          <Skeleton className="h-5 w-96" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <div key={colIndex} className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-8 rounded-full" />
              </div>

              <div className="space-y-3">
                {Array.from({ length: cardsPerColumn }).map((_, cardIndex) => (
                  <div
                    key={cardIndex}
                    className="border rounded-lg p-4 space-y-3 bg-white dark:bg-zinc-900"
                  >
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <div className="flex gap-2">
                      <Skeleton className="h-6 w-16 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
