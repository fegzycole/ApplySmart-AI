import { Briefcase } from "lucide-react";
import type { Application } from "../../types/dashboard.types";
import { RECENT_APPLICATIONS_STYLES } from "../../constants/dashboard.constants";
import { ApplicationStatusBadge } from "./ApplicationStatusBadge";

interface ApplicationItemProps {
  application: Application;
}

export function ApplicationItem({ application }: ApplicationItemProps) {
  return (
    <div className={RECENT_APPLICATIONS_STYLES.item.container}>
      <div className={RECENT_APPLICATIONS_STYLES.item.icon.wrapper}>
        <Briefcase className={RECENT_APPLICATIONS_STYLES.item.icon.icon} />
      </div>
      <div className={RECENT_APPLICATIONS_STYLES.item.content}>
        <p className={RECENT_APPLICATIONS_STYLES.item.company}>
          {application.company}
        </p>
        <p className={RECENT_APPLICATIONS_STYLES.item.role}>
          {application.role}
        </p>
        <div className={RECENT_APPLICATIONS_STYLES.item.footer}>
          <ApplicationStatusBadge status={application.status} />
          <span className={RECENT_APPLICATIONS_STYLES.item.date}>
            {application.date}
          </span>
        </div>
      </div>
    </div>
  );
}
