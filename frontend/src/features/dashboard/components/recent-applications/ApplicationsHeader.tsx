import { Button } from "@/shared/components/ui/button";
import { CardDescription, CardTitle } from "@/shared/components/ui/card";
import { ArrowRight } from "lucide-react";
import { RECENT_APPLICATIONS_STYLES } from "../../constants/dashboard.constants";

export function ApplicationsHeader() {
  return (
    <div className={RECENT_APPLICATIONS_STYLES.header.container}>
      <div>
        <CardTitle className={RECENT_APPLICATIONS_STYLES.header.title}>
          Recent Applications
        </CardTitle>
        <CardDescription className={RECENT_APPLICATIONS_STYLES.header.description}>
          Your latest job applications
        </CardDescription>
      </div>
      <Button
        variant="outline"
        size="sm"
        className={RECENT_APPLICATIONS_STYLES.header.button}
      >
        View All
        <ArrowRight className="size-4 ml-2" />
      </Button>
    </div>
  );
}
