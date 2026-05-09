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
      <div className="space-y-4">
        {/* Doc cards — simple rows for stability */}
        {docs.map((doc) => (
          <div
            key={doc.label}
            className="group relative overflow-hidden flex items-center gap-4 rounded-[1.25rem] border border-border bg-background/50 p-4 transition-all hover:border-primary/20 hover:bg-card"
          >
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${doc.bg} ${doc.color} shadow-inner`}>
              <doc.icon className="size-5" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-black text-foreground uppercase tracking-tight">{doc.label}</p>
              <p className="mt-0.5 truncate text-[10px] font-bold uppercase tracking-widest text-muted-foreground opacity-60">{doc.description}</p>
            </div>

            <div className="shrink-0 text-right">
              <p className="text-2xl font-black tracking-tighter text-foreground">{doc.value}</p>
              <div className="mt-0.5 flex items-center justify-end gap-1 text-[9px] font-black uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-2.5" />
                Ready
              </div>
            </div>
          </div>
        ))}

        {/* Breakdown — stable inventory layout */}
        <div className="rounded-[1.25rem] border border-border bg-secondary/30 p-4">
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground opacity-60">
              Inventory Statistics
            </h4>
            <span className="text-[10px] font-black text-muted-foreground/60 uppercase tracking-widest">
              {totalResumes + coverLetters} Artifacts
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3">
            {subStats.map((stat) => (
              <div key={stat.label} className="flex items-center justify-between gap-2 rounded-xl bg-background/60 px-3 py-2">
                <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
                  {stat.label}
                </p>
                <p className="text-sm font-black tabular-nums text-foreground">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-background shadow-inner">
            <div className="h-full bg-zinc-900 transition-all duration-1000" style={{ width: `${(originalResumes / (totalResumes + coverLetters || 1)) * 100}%` }} />
            <div className="h-full bg-primary transition-all duration-1000 delay-100" style={{ width: `${(optimizedResumes / (totalResumes + coverLetters || 1)) * 100}%` }} />
            <div className="h-full bg-primary/60" style={{ width: `${(builtResumes / (totalResumes + coverLetters || 1)) * 100}%` }} />
            <div className="h-full bg-emerald-500/50" style={{ width: `${(coverLetters / (totalResumes + coverLetters || 1)) * 100}%` }} />
          </div>
        </div>
      </div>
    </DashboardSectionCard>
  );
}

