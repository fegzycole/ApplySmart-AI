import { CheckCircle2, Clock, XCircle } from "lucide-react";
import type { ApplicationStatus } from "../../types/dashboard.types";
import { RECENT_APPLICATIONS_STYLES } from "../../constants/dashboard.constants";

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
}

const STATUS_CONFIG = {
  interview: {
    label: "Interview",
    icon: CheckCircle2,
    className: RECENT_APPLICATIONS_STYLES.status.interview
  },
  applied: {
    label: "Applied",
    icon: Clock,
    className: RECENT_APPLICATIONS_STYLES.status.applied
  },
  rejected: {
    label: "Rejected",
    icon: XCircle,
    className: RECENT_APPLICATIONS_STYLES.status.rejected
  }
} as const;

export function ApplicationStatusBadge({ status }: ApplicationStatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  const Icon = config.icon;

  return (
    <span className={`${RECENT_APPLICATIONS_STYLES.status.base} ${config.className}`}>
      <Icon className={RECENT_APPLICATIONS_STYLES.status.icon} />
      {config.label}
    </span>
  );
}
