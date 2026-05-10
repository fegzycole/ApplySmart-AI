import { Skeleton } from "@/shared/components/ui/skeleton";

const COLUMNS = 5;
const CARDS_PER_COLUMN = 3;

export function JobTrackerSkeleton() {
  return (
    <div className="min-h-screen w-full pb-12 sm:pb-20 bg-[#fafafa] dark:bg-zinc-950 overflow-hidden">
      <div className="mx-auto w-full max-w-[1800px] min-w-0 px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-16 pt-8 sm:pt-12">
        {/* Header row — title + add button */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <Skeleton className="h-9 w-52 sm:h-11 sm:w-64" />
            <Skeleton className="h-4 w-72 sm:w-96" />
          </div>
          <Skeleton className="h-12 w-36 shrink-0 rounded-2xl sm:h-14" />
        </div>

        {/* Kanban board — 5 columns */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:gap-6">
          {Array.from({ length: COLUMNS }).map((_, colIndex) => (
            <div key={colIndex} className="space-y-3">
              {/* Column header */}
              <div className="flex items-center justify-between px-1 mb-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-6 w-7 rounded-full" />
              </div>

              {/* Cards */}
              {Array.from({ length: CARDS_PER_COLUMN }).map((_, cardIndex) => (
                <div
                  key={cardIndex}
                  className="rounded-2xl border-2 border-zinc-100 bg-white p-4 space-y-3 dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </div>
                  <Skeleton className="h-3 w-full" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
