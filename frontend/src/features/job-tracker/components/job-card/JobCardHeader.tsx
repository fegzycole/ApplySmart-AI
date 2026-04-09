import { Building2 } from "lucide-react";
import { JOB_CARD_STYLES } from "../../constants/job-tracker.constants";

interface JobCardHeaderProps {
  role: string;
  company: string;
}

export function JobCardHeader({ role, company }: JobCardHeaderProps) {
  return (
    <div className={JOB_CARD_STYLES.header.container}>
      <div className={JOB_CARD_STYLES.icon.wrapper}>
        <Building2 className={JOB_CARD_STYLES.icon.icon} />
      </div>
      <div className={JOB_CARD_STYLES.header.textContainer}>
        <h4 className={JOB_CARD_STYLES.header.role}>
          {role}
        </h4>
        <p className={JOB_CARD_STYLES.header.company}>{company}</p>
      </div>
    </div>
  );
}
