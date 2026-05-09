import { ARTIFACT_STYLES } from "../../constants/job-tracker.constants";
import { MapPin } from "lucide-react";

interface JobCardHeaderProps {
  role: string;
  company: string;
  location: string | null;
}

export function JobCardHeader({ role, company, location }: JobCardHeaderProps) {
  return (
    <div className="space-y-4">
      <h4 className={ARTIFACT_STYLES.hero.role}>{role}</h4>
      <div className="flex flex-col gap-1">
        <p className="text-sm font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">
          {company}
        </p>
        {location && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-400 dark:text-zinc-500">
            <MapPin className="size-3" />
            {location}
          </div>
        )}
      </div>
    </div>
  );
}
