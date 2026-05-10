import { Skeleton } from "@/shared/components/ui/skeleton";
import { BUILDER_LAYOUT_STYLES } from "../../constants/resume-builder.constants";

const FORM_SECTIONS = 6;
const TEMPLATE_CARDS = 4;

export function ResumeBuilderSkeleton() {
  return (
    <div className={BUILDER_LAYOUT_STYLES.container}>
      <div className={BUILDER_LAYOUT_STYLES.wrapper}>
        {/* Page header */}
        <div className="space-y-3">
          <Skeleton className="h-8 w-56 sm:h-10 sm:w-72" />
          <Skeleton className="h-4 w-64 sm:w-96" />
        </div>

        <div className={`${BUILDER_LAYOUT_STYLES.bentoGrid} gap-6 sm:gap-8 lg:gap-10`}>
          {/* Theme selector — full width */}
          <div className="col-span-12 min-w-0">
            <div className="rounded-[2rem] border-2 border-primary/10 bg-primary/5 p-6 sm:p-8 lg:p-10">
              <div className="mb-4 space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-3 w-44" />
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {Array.from({ length: TEMPLATE_CARDS }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-20 w-full rounded-2xl sm:h-24" />
                    <Skeleton className="h-4 w-16 mx-auto" />
                    <Skeleton className="h-3 w-24 mx-auto" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Form column */}
          <div className="col-span-12 min-w-0 space-y-6 sm:space-y-10 xl:col-span-6">
            {Array.from({ length: FORM_SECTIONS }).map((_, i) => (
              <div
                key={i}
                className="rounded-[2rem] border-2 border-zinc-100/80 bg-white/60 dark:border-zinc-800/60 dark:bg-zinc-900/40"
              >
                {/* Accordion section header */}
                <div className="flex items-center justify-between p-5 sm:p-6">
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-9 w-9 shrink-0 rounded-xl" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-3 w-40" />
                    </div>
                  </div>
                  <Skeleton className="h-6 w-6 shrink-0 rounded-lg" />
                </div>
                {/* Show a couple of input rows for the first two sections */}
                {i < 2 && (
                  <div className="border-t border-zinc-100 dark:border-zinc-800 p-5 pt-4 space-y-4 sm:p-6 sm:pt-5">
                    <div className="grid gap-4 sm:grid-cols-2">
                      {Array.from({ length: i === 0 ? 4 : 2 }).map((_, j) => (
                        <div key={j} className="space-y-1.5">
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-12 w-full rounded-2xl sm:h-14" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Preview column */}
          <div className="col-span-12 min-w-0 space-y-6 sm:space-y-10 xl:col-span-6">
            <div className="w-full overflow-hidden xl:sticky xl:top-8">
              {/* Preview header bar */}
              <div className="mb-4 flex items-center justify-between">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 w-28 rounded-2xl" />
              </div>

              {/* A4 paper preview */}
              <div className="rounded-[2rem] border-2 border-zinc-100/80 bg-white/60 p-3 dark:border-zinc-800/60 dark:bg-zinc-900/40 sm:p-5">
                {/* Paper surface — A4 ratio ≈ 1/1.414 */}
                <div className="w-full rounded-2xl bg-zinc-50 dark:bg-zinc-950/50" style={{ aspectRatio: "1 / 1.414" }}>
                  <div className="p-6 space-y-4 sm:p-8 sm:space-y-5">
                    {/* Name / header area */}
                    <div className="space-y-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
                      <Skeleton className="h-7 w-48 sm:h-8 sm:w-64" />
                      <Skeleton className="h-4 w-72" />
                      <div className="flex gap-3 pt-1">
                        <Skeleton className="h-3 w-24" />
                        <Skeleton className="h-3 w-28" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                    </div>

                    {/* Summary section */}
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-5/6" />
                      <Skeleton className="h-3 w-4/5" />
                    </div>

                    {/* Experience section */}
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-28" />
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <Skeleton className="h-3.5 w-36" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                        <Skeleton className="h-3 w-28" />
                        <Skeleton className="h-3 w-full mt-1" />
                        <Skeleton className="h-3 w-11/12" />
                        <Skeleton className="h-3 w-4/5" />
                      </div>
                    </div>

                    {/* Education section */}
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <div className="flex justify-between">
                        <Skeleton className="h-3.5 w-40" />
                        <Skeleton className="h-3 w-20" />
                      </div>
                      <Skeleton className="h-3 w-32" />
                    </div>

                    {/* Skills */}
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-16" />
                      <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <Skeleton key={i} className="h-5 w-14 rounded-full" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
