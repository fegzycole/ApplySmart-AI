import { ResumeCardIcon } from "./ResumeCardIcon";
import type { Resume } from "../../services/resume.service";

interface ResumeIdentityProps {
  resume: Pick<Resume, "name">;
  titleClassName?: string;
}

export function ResumeIdentity({ resume, titleClassName = "font-semibold text-zinc-900 dark:text-white" }: ResumeIdentityProps) {
  return (
    <div className="flex items-center gap-3 min-w-0">
      <ResumeCardIcon />
      <p className={titleClassName}>{resume.name}</p>
    </div>
  );
}
