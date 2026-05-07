import { Skeleton } from "@/shared/components/ui/skeleton";

export function DocumentsPageSkeleton() {
  return (
    <div className="px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:gap-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-40 rounded-full" />
          <Skeleton className="h-12 w-72" />
          <Skeleton className="h-5 w-full max-w-2xl" />
          <Skeleton className="h-12 w-full max-w-xl" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-36 rounded-[1.5rem]" />
          ))}
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-72 rounded-[1.5rem]" />
          ))}
        </div>
      </div>
    </div>
  );
}
