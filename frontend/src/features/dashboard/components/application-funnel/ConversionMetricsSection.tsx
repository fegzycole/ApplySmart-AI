import { APPLICATION_FUNNEL_STYLES } from "../../constants/dashboard.constants";
import { useConversionMetrics } from "../../hooks/useDashboardQueries";

export function ConversionMetricsSection() {
  const { data: metrics, isLoading } = useConversionMetrics();

  if (isLoading) {
    return (
      <div className={APPLICATION_FUNNEL_STYLES.metrics.container}>
        <div className="col-span-2 text-center text-sm text-zinc-500">Loading metrics...</div>
      </div>
    );
  }

  if (!metrics || metrics.length === 0) {
    return (
      <div className={APPLICATION_FUNNEL_STYLES.metrics.container}>
        <div className="col-span-2 text-center text-sm text-zinc-500">No metrics available</div>
      </div>
    );
  }

  return (
    <div className={APPLICATION_FUNNEL_STYLES.metrics.container}>
      {metrics.map((metric, index) => (
        <div key={index} className={`${APPLICATION_FUNNEL_STYLES.metrics.card} ${metric.gradient}`}>
          <div className={`${APPLICATION_FUNNEL_STYLES.metrics.value} ${
            index === 0
              ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600'
              : 'bg-gradient-to-r from-emerald-600 to-green-600'
          }`}>
            {metric.value}
          </div>
          <div className={APPLICATION_FUNNEL_STYLES.metrics.label}>
            {metric.label}
          </div>
        </div>
      ))}
    </div>
  );
}
