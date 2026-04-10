import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { UserRow } from "./UserRow";
import { TableWrapper } from "./TableWrapper";
import { CHART_TITLES, TABLE_HEADERS } from "../../constants/admin.constants";
import { useAdminUsers } from "../../hooks";
import type { UserAdminDto } from "../../types/admin.types";
import { FEATURE_FLAGS } from "@/shared/config/feature-flags";

export function RecentUsersTable() {
  const { data, isLoading, isError } = useAdminUsers({ page: 0, size: 10 });

  const users = Array.isArray(data) ? data : (data as any)?.content || [];
  const recentUsers = [...users]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 10);

  return (
    <TableWrapper
      title={CHART_TITLES.recentUsers.title}
      description={CHART_TITLES.recentUsers.description}
      isLoading={isLoading}
      isError={isError}
      isEmpty={recentUsers.length === 0}
      emptyMessage="No recent users"
    >
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{TABLE_HEADERS.name}</TableHead>
            <TableHead>{TABLE_HEADERS.email}</TableHead>
            {FEATURE_FLAGS.ADMIN_SUBSCRIPTION_ANALYTICS && (
              <TableHead>{TABLE_HEADERS.plan}</TableHead>
            )}
            <TableHead>{TABLE_HEADERS.status}</TableHead>
            <TableHead>{TABLE_HEADERS.joined}</TableHead>
            <TableHead className="text-right">{TABLE_HEADERS.actions}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentUsers.map((user: UserAdminDto) => (
            <UserRow key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </TableWrapper>
  );
}
