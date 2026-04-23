import { Bookmark, CheckCircle2, Clock, Trophy, XCircle } from "lucide-react";
import type { ApplicationStatus } from "../../types/dashboard.types";
import { RECENT_APPLICATIONS_STYLES } from "../../constants/dashboard.constants";

interface ApplicationStatusBadgeProps {
  status: ApplicationStatus;
}

const STATUS_CONFIG: Record<ApplicationStatus, {
  label: string;
  icon: typeof Clock;
  className: string;
}> = {
  saved: {
    label: "Saved",
    icon: Bookmark,
    className: RECENT_APPLICATIONS_STYLES.status.saved
  },
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
  },
  offer: {
    label: "Offer",
    icon: Trophy,
    className: RECENT_APPLICATIONS_STYLES.status.offer
  }
};

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
