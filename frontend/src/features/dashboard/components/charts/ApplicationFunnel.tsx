import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { EmptyState } from "@/shared/components/EmptyState";
import { LoadingSkeleton } from "@/shared/components/skeletons";
import {
  APPLICATION_FUNNEL_STYLES,
  STAGE_ICON_MAP,
} from "../../constants/dashboard.constants";
import {
  FunnelHeader,
  FunnelStageItem,
  ConversionMetricsSection,
} from "../application-funnel";
import { useApplicationFunnel } from "../../hooks";
import { Bookmark } from "lucide-react";

export function ApplicationFunnel() {
  const { data: funnelData, isLoading } = useApplicationFunnel();

  return (
    <Card className={APPLICATION_FUNNEL_STYLES.card}>
      <CardHeader className={APPLICATION_FUNNEL_STYLES.header.wrapper}>
        <FunnelHeader />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingSkeleton variant="default" height="h-64" />
        ) : (
          <div className={APPLICATION_FUNNEL_STYLES.content}>
            {funnelData && funnelData.length > 0 ? (
              <>
                {funnelData.map((stage, index) => (
                  <FunnelStageItem
                    key={index}
                    stage={{
                      ...stage,
                      icon: STAGE_ICON_MAP[stage.name] || Bookmark,
                    }}
                    isLast={index === funnelData.length - 1}
                  />
                ))}
                <ConversionMetricsSection />
              </>
            ) : (
              <EmptyState message="No data available" />
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
