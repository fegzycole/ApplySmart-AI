import { Clock } from "lucide-react";
import { DateInfoItem } from "./DateInfoItem";
import { RESUME_CARD_STYLES } from "../../constants/resume-card.constants";
import type { Resume } from "../../services/resume.service";

interface DateInfoSectionProps {
  resume: Resume;
}

export function DateInfoSection({ resume }: DateInfoSectionProps) {
  return (
    <div className={RESUME_CARD_STYLES.dateInfoContainerClassName}>
      <DateInfoItem
        label="Last Modified"
        value={resume.lastModified}
        icon={Clock}
        gradient="from-violet-500 to-fuchsia-500"
      />
    </div>
  );
}
