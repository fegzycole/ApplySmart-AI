import { Banknote, Clock } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { ARTIFACT_STYLES } from "../../constants/job-tracker.constants";
import { formatJobTimestamp } from "../../utils/job-tracker";

interface JobCardMetaProps {
  salary: string | null;
  applicationDeadline: string | null;
}

export function JobCardMeta({ salary, applicationDeadline }: JobCardMetaProps) {
  const deadline = formatJobTimestamp(applicationDeadline);

  if (!salary && !deadline) {
    return null;
  }

  return (
    <div className={cn(ARTIFACT_STYLES.controlBar, "w-fit max-w-full overflow-hidden")}>
      {salary ? (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/5 dark:bg-white/5 text-[11px] font-bold text-zinc-600 dark:text-zinc-300 whitespace-nowrap overflow-hidden">
          <Banknote className="size-3.5 text-emerald-500 shrink-0" />
          <span className="truncate">{salary}</span>
        </div>
      ) : null}
      {deadline ? (
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-900/5 dark:bg-white/5 text-[11px] font-bold text-zinc-600 dark:text-zinc-300 whitespace-nowrap overflow-hidden">
          <Clock className="size-3.5 text-sky-500 shrink-0" />
          <span className="truncate">{deadline}</span>
        </div>
      ) : null}
    </div>
  );
}
