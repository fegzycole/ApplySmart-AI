import { StatCardSkeleton, ChartSkeleton, TableSkeleton } from "@/shared/components/skeletons";
import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { CHARTS_STYLES } from "../../constants/admin.constants";

export function AdminDashboardSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <nav className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </nav>

      <div className="p-4 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Skeleton className="h-9 w-48 mb-2" />
            <Skeleton className="h-5 w-64" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
            {Array.from({ length: 4 }).map((_, i) => (
              <StatCardSkeleton key={i} />
            ))}
          </div>

          <div className={CHARTS_STYLES.grid}>
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
            <ChartSkeleton />
          </div>

          <Card className="border-zinc-200 dark:border-zinc-800 mt-6">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48 mt-2" />
            </CardHeader>
            <CardContent>
              <TableSkeleton rows={10} columns={6} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
