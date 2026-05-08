import type { DashboardDocumentStats } from "../../types/dashboard.types";
import { DASHBOARD_DOCUMENT_COLORS } from "../../constants/dashboard.constants";
import { DashboardSectionCard } from "./DashboardSectionCard";

interface DocumentCoveragePanelProps {
  documents: DashboardDocumentStats;
}

export function DocumentCoveragePanel({ documents }: DocumentCoveragePanelProps) {
  const tailoredResumes = documents.optimizedResumes + documents.builtResumes;
  const bars = [
    { label: "Original resumes", value: documents.originalResumes, color: DASHBOARD_DOCUMENT_COLORS.originalResumes },
    { label: "Optimized resumes", value: documents.optimizedResumes, color: DASHBOARD_DOCUMENT_COLORS.optimizedResumes },
    { label: "Built resumes", value: documents.builtResumes, color: DASHBOARD_DOCUMENT_COLORS.builtResumes },
    { label: "Cover letters", value: documents.coverLetters, color: DASHBOARD_DOCUMENT_COLORS.coverLetters },
  ];
  const maxValue = Math.max(1, ...bars.map((bar) => bar.value));

  return (
    <DashboardSectionCard
      title="Document readiness"
      description="See how much polished application material you already have available before you start tailoring again."
    >
      <div className="space-y-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.35rem] border border-zinc-200/80 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/65">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              Tailored resumes
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">
              {tailoredResumes}
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Optimized and builder-produced resumes available for targeted applications.
            </p>
          </div>
          <div className="rounded-[1.35rem] border border-zinc-200/80 bg-zinc-50/80 p-4 dark:border-zinc-800 dark:bg-zinc-900/65">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              Cover letters created
            </p>
            <p className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-zinc-950 dark:text-zinc-50">
              {documents.coverLetters}
            </p>
            <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
              Reusable letters available in your document library.
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {bars.map((bar) => (
            <div key={bar.label} className="space-y-1.5">
              <div className="flex items-center justify-between gap-3 text-sm">
                <span className="font-medium text-zinc-800 dark:text-zinc-200">{bar.label}</span>
                <span className="text-zinc-500 dark:text-zinc-400">{bar.value}</span>
              </div>
              <div className="h-2.5 overflow-hidden rounded-full bg-zinc-200/80 dark:bg-zinc-800">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(bar.value / maxValue) * 100}%`,
                    backgroundColor: bar.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardSectionCard>
  );
}
