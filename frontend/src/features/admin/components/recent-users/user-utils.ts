import { RECENT_USERS_STYLES } from "../../constants/admin.constants";

export function getPlanBadgeClass(plan: string) {
  const upperPlan = plan.toUpperCase();
  if (upperPlan.includes("CAREER")) return RECENT_USERS_STYLES.planBadge.careerBoost;
  if (upperPlan.includes("PRO")) return RECENT_USERS_STYLES.planBadge.pro;
  if (upperPlan.includes("STARTER")) return RECENT_USERS_STYLES.planBadge.starter;
  return RECENT_USERS_STYLES.planBadge.free;
}

export function getStatusBadgeClass(enabled: boolean) {
  return enabled
    ? RECENT_USERS_STYLES.statusBadge.active
    : RECENT_USERS_STYLES.statusBadge.trial;
}

export function formatRelativeDate(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "Yesterday";
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return date.toLocaleDateString();
}

export function getDisplayName(firstName: string | null, lastName: string | null, email: string) {
  return firstName && lastName
    ? `${firstName} ${lastName}`
    : email.split('@')[0];
}

export function formatPlanName(plan: string) {
  return plan
    .split('_')
    .map(word => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
}
