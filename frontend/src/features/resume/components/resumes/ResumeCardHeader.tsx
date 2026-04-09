import { CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ResumeCardIcon } from "./ResumeCardIcon";
import { StatusBadge } from "./StatusBadge";
import type { Resume } from "../../services/resume.service";

interface ResumeCardHeaderProps {
  resume: Resume;
  onToggleFavorite: () => void;
}

export function ResumeCardHeader({ resume }: ResumeCardHeaderProps) {
  return (
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between mb-2">
        <ResumeCardIcon />
        <div className="size-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
          <span className="text-white font-bold text-sm">{resume.score}</span>
        </div>
      </div>

      <CardTitle className="text-base line-clamp-2 mb-2">
        {resume.name}
      </CardTitle>

      <div className="flex flex-wrap items-center gap-2">
        <StatusBadge status={resume.status} />
      </div>
    </CardHeader>
  );
}
