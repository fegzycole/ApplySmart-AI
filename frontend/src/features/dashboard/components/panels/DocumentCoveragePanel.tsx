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
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-lg shadow-primary/20">
          <Files className="size-4" />
        </div>
      }
    >
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {docs.map((doc) => (
            <div
              key={doc.label}
              className="group relative overflow-hidden rounded-[1.5rem] border border-border bg-background/50 p-4 transition-all hover:border-primary/20 hover:bg-card sm:rounded-[2rem] sm:p-6"
            >
              <div className="flex items-start justify-between">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${doc.bg} ${doc.color}`}>
                  <doc.icon className="size-6" />
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-3" />
                  Polished
                </div>
              </div>
              
              <div className="mt-4 sm:mt-6">
                <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  {doc.value}
                </p>
                <p className="text-sm font-bold text-foreground">
                  {doc.label}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {doc.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-[1.5rem] border border-border bg-secondary/30 p-4 sm:rounded-[2rem] sm:p-6">
          <div className="mb-3 flex items-center justify-between sm:mb-4">
            <h4 className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
              Inventory Breakdown
            </h4>
            <span className="text-[0.65rem] font-bold text-muted-foreground/60">
              {totalResumes + coverLetters} Total Files
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {subStats.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <p className="text-xl font-bold text-foreground tabular-nums">
                  {stat.value}
                </p>
                <p className="text-[0.65rem] font-bold uppercase tracking-widest text-muted-foreground/60">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex h-1.5 w-full overflow-hidden rounded-full bg-background">
            <div className="h-full bg-primary" style={{ width: `${(originalResumes / (totalResumes + coverLetters || 1)) * 100}%` }} />
            <div className="h-full bg-primary/60" style={{ width: `${(optimizedResumes / (totalResumes + coverLetters || 1)) * 100}%` }} />
            <div className="h-full bg-primary/30" style={{ width: `${(builtResumes / (totalResumes + coverLetters || 1)) * 100}%` }} />
            <div className="h-full bg-emerald-500/50" style={{ width: `${(coverLetters / (totalResumes + coverLetters || 1)) * 100}%` }} />
          </div>
        </div>
      </div>
    </DashboardSectionCard>
  );
}
