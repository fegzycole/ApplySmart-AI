import { JOB_CARD_STYLES } from "../../constants/job-tracker.constants";

interface JobCardHeaderProps {
  role: string;
  company: string;
  location: string | null;
}

export function JobCardHeader({ role, company, location }: JobCardHeaderProps) {
  return (
    <div className={JOB_CARD_STYLES.header.container}>
      <h4 className={JOB_CARD_STYLES.header.role}>{role}</h4>
      <div className={JOB_CARD_STYLES.header.companyRow}>
        <p className={JOB_CARD_STYLES.header.company}>{company}</p>
        {location ? (
          <>
            <span className={JOB_CARD_STYLES.header.separator}>•</span>
            <p className={JOB_CARD_STYLES.header.location}>{location}</p>
          </>
        ) : null}
      </div>
    </div>
  );
}
