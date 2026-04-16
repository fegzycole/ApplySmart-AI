import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { EmptyState } from "@/shared/components/EmptyState";
import { LoadingSkeleton } from "@/shared/components/skeletons";
import { RECENT_APPLICATIONS_STYLES } from "../../constants/dashboard.constants";
import { ApplicationItem, ApplicationsHeader } from ".";
import { useRecentApplications } from "../../hooks";

export function RecentApplicationsSection() {
  const { data: applications, isLoading } = useRecentApplications(5);

  return (
    <Card className={RECENT_APPLICATIONS_STYLES.card}>
      <CardHeader className={RECENT_APPLICATIONS_STYLES.header.wrapper}>
        <ApplicationsHeader />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingSkeleton variant="table" height="h-80" />
        ) : (
          <div className={RECENT_APPLICATIONS_STYLES.content}>
            {applications && applications.length > 0 ? (
              applications.map((app, index) => (
                <ApplicationItem key={index} application={app} />
              ))
            ) : (
              <EmptyState message="No applications yet" />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
