import { FileText, Clock } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import { ResumeActions } from "./ResumeActions";
import type { Resume } from "../../services/resume.service";

interface ResumeTableRowProps {
  resume: Resume;
  onToggleFavorite: (id: number) => void;
  onDelete: () => void;
}

export function ResumeTableRow({ resume, onToggleFavorite, onDelete }: ResumeTableRowProps) {
  return (
    <tr className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-violet-50/50 dark:hover:bg-violet-950/20 transition-colors duration-200 group">
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg flex-shrink-0">
            <FileText className="size-5 text-white" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-zinc-900 dark:text-white whitespace-nowrap">
              {resume.name}
            </p>
          </div>
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <span className="text-white font-bold text-sm">{resume.score}</span>
          </div>
          <span className="text-sm text-zinc-600 dark:text-zinc-400">Score</span>
        </div>
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
