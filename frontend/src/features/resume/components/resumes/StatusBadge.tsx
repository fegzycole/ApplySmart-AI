import { CheckCircle2, Edit2 } from "lucide-react";
import type { ResumeStatus } from "../../services/resume.service";

interface StatusBadgeProps {
  status: ResumeStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (status === "optimized" || status === "published") {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 whitespace-nowrap">
        <CheckCircle2 className="size-3 text-emerald-600 dark:text-emerald-400" />
        <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
          {status === "published" ? "Published" : "Optimized"}
        </span>
      </div>
    );
  }

  return (
    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 whitespace-nowrap">
      <Edit2 className="size-3 text-amber-600 dark:text-amber-400" />
      <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
        Draft
      </span>
    </div>
  );
}
