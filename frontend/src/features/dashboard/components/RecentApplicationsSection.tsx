import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { RECENT_APPLICATIONS_STYLES } from "../constants/dashboard.constants";
import { ApplicationItem, ApplicationsHeader } from "./recent-applications";
import { useRecentApplications } from "../hooks";

export function RecentApplicationsSection() {
  const { data: applications, isLoading } = useRecentApplications(5);

  return (
    <Card className={RECENT_APPLICATIONS_STYLES.card}>
      <CardHeader className={RECENT_APPLICATIONS_STYLES.header.wrapper}>
        <ApplicationsHeader />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-32 text-zinc-500">
            Loading applications...
          </div>
        ) : (
          <div className={RECENT_APPLICATIONS_STYLES.content}>
            {applications && applications.length > 0 ? (
              applications.map((app, index) => (
                <ApplicationItem key={index} application={app} />
              ))
            ) : (
              <div className="flex items-center justify-center h-32 text-zinc-500">
                No applications yet
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
