import { Clock } from "lucide-react";
import { ResumeIdentity } from "./ResumeIdentity";
import { ResumeScoreBadge } from "./ResumeScoreBadge";
import { StatusBadge } from "./StatusBadge";
import { ResumeActions } from "./ResumeActions";
import type { Resume } from "../../services/resume.service";

interface ResumeTableRowProps {
  resume: Resume;
  onDelete: () => void;
}

export function ResumeTableRow({ resume, onDelete }: ResumeTableRowProps) {
  return (
    <tr className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-violet-50/50 dark:hover:bg-violet-950/20 transition-colors duration-200 group">
      <td className="p-4">
        <ResumeIdentity
          resume={resume}
          titleClassName="font-semibold text-zinc-900 dark:text-white whitespace-nowrap"
        />
      </td>
      <td className="p-4">
        <ResumeScoreBadge score={resume.score} showLabel />
      </td>
      <td className="p-4">
        <StatusBadge status={resume.status} />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 whitespace-nowrap">
          <Clock className="size-4 flex-shrink-0" />
          <span>{resume.lastModified}</span>
        </div>
      </td>
      <td className="p-4">
        <ResumeActions resumeId={String(resume.id)} onDelete={onDelete} />
      </td>
    </tr>
  );
}
