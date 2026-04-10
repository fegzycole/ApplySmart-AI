import { Skeleton } from "@/shared/components/ui/skeleton";
import { FormSkeleton } from "@/shared/components/skeletons";

export function SettingsSkeleton() {
  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <Skeleton className="h-9 w-32 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>

        <div className="mb-6">
          <Skeleton className="h-14 w-full rounded-xl" />
        </div>

        <div className="space-y-6">
          <div className="border rounded-lg p-6">
            <FormSkeleton fields={3} />
          </div>

          <div className="border rounded-lg p-6">
            <FormSkeleton fields={2} />
          </div>
        </div>
      </div>
    </div>
  );
}
