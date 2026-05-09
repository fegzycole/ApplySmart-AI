import { Skeleton } from "@/shared/components/ui/skeleton";

export function DocumentsPageSkeleton() {
  return (
    <div className="mx-auto flex max-w-[1700px] flex-col gap-12 px-4 sm:px-6 lg:px-8 pt-12 pb-20">
      {/* Header Skeleton */}
      <div className="flex flex-col items-center space-y-8">
        <Skeleton className="h-24 w-24 rounded-[2.5rem]" />
        <Skeleton className="h-20 w-full max-w-4xl rounded-2xl" />
        <Skeleton className="h-6 w-full max-w-2xl rounded-full" />
        <div className="flex gap-4">
          <Skeleton className="h-14 w-44 rounded-2xl" />
          <Skeleton className="h-14 w-44 rounded-2xl" />
        </div>
      </div>

      {/* Overview Cards Skeleton */}
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-44 rounded-[2.5rem]" />
        ))}
      </div>

      {/* Main Content Layout Skeleton */}
      <div className="grid gap-10 lg:grid-cols-[280px_minmax(0,1fr)] items-start">
        {/* Rail Skeleton */}
        <Skeleton className="h-[400px] w-full rounded-[3rem]" />
        
        {/* Panel Skeleton */}
        <div className="space-y-10">
          <div className="space-y-4">
             <Skeleton className="h-12 w-64 rounded-xl" />
             <Skeleton className="h-5 w-full max-w-lg rounded-full" />
          </div>
          <div className="grid gap-8">
            {Array.from({ length: 2 }).map((_, index) => (
              <Skeleton key={index} className="h-[320px] rounded-[3rem]" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
