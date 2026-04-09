import { Card, CardContent, CardHeader } from "@/shared/components/ui/card";
import { APPLICATION_FUNNEL_STYLES } from "../constants/dashboard.constants";
import { FunnelHeader, FunnelStageItem, ConversionMetricsSection } from "./application-funnel";
import { useApplicationFunnel } from "../hooks";

export function ApplicationFunnel() {
  const { data: funnelData, isLoading } = useApplicationFunnel();

  return (
    <Card className={APPLICATION_FUNNEL_STYLES.card}>
      <CardHeader className={APPLICATION_FUNNEL_STYLES.header.wrapper}>
        <FunnelHeader />
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-32 text-zinc-500">
            Loading funnel data...
          </div>
        ) : (
          <div className={APPLICATION_FUNNEL_STYLES.content}>
            {funnelData && funnelData.length > 0 ? (
              <>
                {funnelData.map((stage, index) => (
                  <FunnelStageItem
                    key={index}
                    stage={stage}
                    isLast={index === funnelData.length - 1}
                  />
                ))}
                <ConversionMetricsSection />
              </>
            ) : (
              <div className="flex items-center justify-center h-32 text-zinc-500">
                No data available
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
