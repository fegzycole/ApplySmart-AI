import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { TableCell, TableRow } from "@/shared/components/ui/table";
import type { RecentUser } from "../../types/admin.types";
import { RECENT_USERS_STYLES } from "../../constants/admin.constants";

interface UserRowProps {
  user: RecentUser;
}

export function UserRow({ user }: UserRowProps) {
  const getPlanBadgeClass = () => {
    switch (user.plan) {
      case "Career Boost":
        return RECENT_USERS_STYLES.planBadge.careerBoost;
      case "Pro":
        return RECENT_USERS_STYLES.planBadge.pro;
      case "Starter":
        return RECENT_USERS_STYLES.planBadge.starter;
      case "Free":
        return RECENT_USERS_STYLES.planBadge.free;
      default:
        return RECENT_USERS_STYLES.planBadge.free;
    }
  };

  const getStatusBadgeClass = () => {
    return user.status === "Active"
      ? RECENT_USERS_STYLES.statusBadge.active
      : RECENT_USERS_STYLES.statusBadge.trial;
  };

  return (
    <TableRow>
      <TableCell className={RECENT_USERS_STYLES.nameCell}>{user.name}</TableCell>
      <TableCell className={RECENT_USERS_STYLES.emailCell}>{user.email}</TableCell>
      <TableCell>
        <Badge variant="outline" className={getPlanBadgeClass()}>
          {user.plan}
        </Badge>
      </TableCell>
      <TableCell>
        <Badge variant="outline" className={getStatusBadgeClass()}>
          {user.status}
        </Badge>
      </TableCell>
      <TableCell className={RECENT_USERS_STYLES.timeCell}>{user.joined}</TableCell>
      <TableCell className={RECENT_USERS_STYLES.actionsCell}>
        <Button variant="ghost" size="sm">
          View
        </Button>
      </TableCell>
    </TableRow>
  );
}
