import { CardDescription, CardTitle } from "@/shared/components/ui/card";
import { Award } from "lucide-react";
import { APPLICATION_FUNNEL_STYLES } from "../../constants/dashboard.constants";

export function FunnelHeader() {
  return (
    <div className={APPLICATION_FUNNEL_STYLES.header.container}>
      <div className={APPLICATION_FUNNEL_STYLES.header.icon.wrapper}>
        <Award className={APPLICATION_FUNNEL_STYLES.header.icon.icon} />
      </div>
      <div className={APPLICATION_FUNNEL_STYLES.header.content}>
        <CardTitle className={APPLICATION_FUNNEL_STYLES.header.title}>
          Application Funnel
        </CardTitle>
        <CardDescription className={APPLICATION_FUNNEL_STYLES.header.description}>
          Your journey from apply to offer
        </CardDescription>
      </div>
    </div>
  );
}
