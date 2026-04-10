import { StatCardSkeleton, TableSkeleton } from "@/shared/components/skeletons";
import { Skeleton } from "@/shared/components/ui/skeleton";

export function ResumesPageSkeleton() {
  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Skeleton className="h-10 w-64 mb-4" />
          <Skeleton className="h-5 w-96" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>

        <div className="border rounded-lg overflow-hidden">
          <TableSkeleton rows={5} columns={5} />
        </div>
      </div>
    </div>
  );
}
