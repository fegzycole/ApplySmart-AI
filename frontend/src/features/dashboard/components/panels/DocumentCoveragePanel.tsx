import { FileText, Sparkles, CheckCircle2, Files } from "lucide-react";
import type { DashboardDocumentStats } from "../../types/dashboard.types";
import { DashboardSectionCard } from "./DashboardSectionCard";

interface DocumentCoveragePanelProps {
  documents: DashboardDocumentStats;
}

export function DocumentCoveragePanel({ documents }: DocumentCoveragePanelProps) {
  const { originalResumes, optimizedResumes, builtResumes, coverLetters } = documents;
  const tailoredResumes = optimizedResumes + builtResumes;
  const totalResumes = originalResumes + optimizedResumes + builtResumes;

  const docs = [
    {
      label: "Tailored Resumes",
      value: tailoredResumes,
      description: "Optimized and builder-produced resumes.",
      icon: Sparkles,
      color: "text-primary",
      bg: "bg-primary/5",
    },
    {
      label: "Cover Letters",
      value: coverLetters,
      description: "Reusable letters in your document library.",
      icon: FileText,
      color: "text-emerald-500",
      bg: "bg-emerald-500/5",
    },
  ];

  const subStats = [
    { label: "Original", value: originalResumes },
    { label: "Optimized", value: optimizedResumes },
    { label: "Built", value: builtResumes },
    { label: "Letters", value: coverLetters },
  ];

  return (
    <DashboardSectionCard
      title="Document Readiness"
      description="See how much polished material you have available before you start tailoring again."
      action={
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-lg dark:bg-sky-600">
          <Files className="size-4" />
        </div>
      }
    >
      <div className="space-y-6">
        {/* Doc cards — vertical stack for no compression */}
        <div className="space-y-4">
          {docs.map((doc) => (
            <div
              key={doc.label}
              className="group relative overflow-hidden flex items-center gap-5 rounded-[1.75rem] border border-zinc-100 bg-white/50 p-5 transition-all hover:border-primary/30 hover:bg-white dark:border-zinc-800 dark:bg-zinc-900/40"
            >
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${doc.bg} ${doc.color} shadow-inner`}>
                <doc.icon className="size-6" />
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-tight">{doc.label}</p>
                <p className="mt-1 truncate text-[10px] font-bold uppercase tracking-widest text-zinc-400">{doc.description}</p>
              </div>

              <div className="shrink-0 text-right">
                <p className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50">{doc.value}</p>
                <div className="mt-1 flex items-center justify-end gap-1.5 text-[9px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-3" />
                  Ready
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Breakdown — flexible inventory statistics */}
        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-100 bg-zinc-50/50 p-6 dark:border-zinc-800 dark:bg-zinc-950/20">
          <div className="mb-5 flex items-center justify-between">
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-zinc-400">
              Inventory Statistics
            </h4>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500/60">
              {totalResumes + coverLetters} Artifacts
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 2xl:grid-cols-2">
            {subStats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1 rounded-2xl bg-white/80 p-4 shadow-sm dark:bg-zinc-900/60">
                <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">
                  {stat.label}
                </p>
                <p className="text-xl font-black tabular-nums text-zinc-900 dark:text-zinc-50">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800 shadow-inner">
            <div className="h-full bg-zinc-900 transition-all duration-1000" style={{ width: `${(originalResumes / (totalResumes + coverLetters || 1)) * 100}%` }} />
            <div className="h-full bg-sky-500 transition-all duration-1000 delay-100" style={{ width: `${(optimizedResumes / (totalResumes + coverLetters || 1)) * 100}%` }} />
            <div className="h-full bg-sky-300 transition-all duration-1000 delay-200" style={{ width: `${(builtResumes / (totalResumes + coverLetters || 1)) * 100}%` }} />
            <div className="h-full bg-emerald-400 transition-all duration-1000 delay-300" style={{ width: `${(coverLetters / (totalResumes + coverLetters || 1)) * 100}%` }} />
          </div>
        </div>
      </div>
    </DashboardSectionCard>
  );
}
