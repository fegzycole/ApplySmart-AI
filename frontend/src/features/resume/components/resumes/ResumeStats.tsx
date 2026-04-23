import { FileText, CheckCircle2 } from "lucide-react";
import { StatCard } from "./StatCard";

interface ResumeStatsProps {
  total: number;
  complete: number;
}

export function ResumeStats({ total, complete }: ResumeStatsProps) {
  return (
    <div className="grid grid-cols-2 lg:gap-4 mb-6 lg:mb-8 gap-3">
      <StatCard
        title="Total Resumes"
        value={total}
        icon={FileText}
        gradient="from-violet-50 to-fuchsia-50 dark:from-violet-950/30 dark:to-fuchsia-950/30 border-violet-200 dark:border-violet-800"
      />
      <StatCard
        title="Complete"
        value={complete}
        icon={CheckCircle2}
        gradient="from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30 border-emerald-200 dark:border-emerald-800"
      />
    </div>
  );
}
