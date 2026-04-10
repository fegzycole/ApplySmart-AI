import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { TableCell, TableRow } from "@/shared/components/ui/table";
import type { UserAdminDto } from "../../types/admin.types";
import { RECENT_USERS_STYLES } from "../../constants/admin.constants";
import { FEATURE_FLAGS } from "@/shared/config/feature-flags";
import { getPlanBadgeClass, getStatusBadgeClass, formatRelativeDate, getDisplayName, formatPlanName } from "./user-utils";

interface UserRowProps {
  user: UserAdminDto;
}

export function UserRow({ user }: UserRowProps) {
  const displayName = getDisplayName(user.firstName, user.lastName, user.email);
  const displayPlan = formatPlanName(user.plan);

  return (
    <TableRow>
      <TableCell className={RECENT_USERS_STYLES.nameCell}>{displayName}</TableCell>
      <TableCell className={RECENT_USERS_STYLES.emailCell}>{user.email}</TableCell>
      {FEATURE_FLAGS.ADMIN_SUBSCRIPTION_ANALYTICS && (
        <TableCell>
          <Badge variant="outline" className={getPlanBadgeClass(user.plan)}>
            {displayPlan}
          </Badge>
        </TableCell>
      )}
      <TableCell>
        <Badge variant="outline" className={getStatusBadgeClass(user.enabled)}>
          {user.enabled ? "Active" : "Inactive"}
        </Badge>
      </TableCell>
      <TableCell className={RECENT_USERS_STYLES.timeCell}>
        {formatRelativeDate(user.createdAt)}
      </TableCell>
      <TableCell className={RECENT_USERS_STYLES.actionsCell}>
        <Button variant="ghost" size="sm">
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}
