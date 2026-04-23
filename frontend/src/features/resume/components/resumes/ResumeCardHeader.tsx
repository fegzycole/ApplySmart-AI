import { CardHeader, CardTitle } from "@/shared/components/ui/card";
import { ResumeIdentity } from "./ResumeIdentity";
import { ResumeScoreBadge } from "./ResumeScoreBadge";
import { StatusBadge } from "./StatusBadge";
import type { Resume } from "../../services/resume.service";

interface ResumeCardHeaderProps {
  resume: Resume;
}

export function ResumeCardHeader({ resume }: ResumeCardHeaderProps) {
  return (
    <CardHeader className="pb-3">
      <div className="flex items-start justify-between mb-2">
        <ResumeIdentity resume={resume} titleClassName="sr-only" />
        <ResumeScoreBadge score={resume.score} />
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
