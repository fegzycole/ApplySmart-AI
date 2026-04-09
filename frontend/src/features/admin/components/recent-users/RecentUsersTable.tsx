import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { UserRow } from "./UserRow";
import { CHART_TITLES, RECENT_USERS_STYLES, TABLE_HEADERS } from "../../constants/admin.constants";

export function RecentUsersTable() {
  const users: any[] = [];

  return (
    <Card className={RECENT_USERS_STYLES.card}>
      <CardHeader>
        <CardTitle>{CHART_TITLES.recentUsers.title}</CardTitle>
        <CardDescription>{CHART_TITLES.recentUsers.description}</CardDescription>
      </CardHeader>
      <CardContent>
        {users.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-zinc-500">
            No recent users
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{TABLE_HEADERS.name}</TableHead>
                <TableHead>{TABLE_HEADERS.email}</TableHead>
                <TableHead>{TABLE_HEADERS.plan}</TableHead>
                <TableHead>{TABLE_HEADERS.status}</TableHead>
                <TableHead>{TABLE_HEADERS.joined}</TableHead>
                <TableHead className="text-right">{TABLE_HEADERS.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <UserRow key={index} user={user} />
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
