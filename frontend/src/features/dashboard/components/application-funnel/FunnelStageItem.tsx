import type { FunnelStage } from "../../types/dashboard.types";
import { APPLICATION_FUNNEL_STYLES, FUNNEL_COLOR_MAP } from "../../constants/dashboard.constants";

interface FunnelStageItemProps {
  stage: FunnelStage;
  isLast: boolean;
}

export function FunnelStageItem({ stage, isLast }: FunnelStageItemProps) {
  const Icon = stage.icon;
  const colors = FUNNEL_COLOR_MAP[stage.color as keyof typeof FUNNEL_COLOR_MAP];

  return (
    <div className={APPLICATION_FUNNEL_STYLES.stage.container}>
      {!isLast && (
        <div className={APPLICATION_FUNNEL_STYLES.stage.connector} />
      )}

      <div className={APPLICATION_FUNNEL_STYLES.stage.wrapper}>
        <div className={`${APPLICATION_FUNNEL_STYLES.stage.icon.base} ${colors.icon}`}>
          <Icon className={APPLICATION_FUNNEL_STYLES.stage.icon.icon} />
        </div>

        <div className={APPLICATION_FUNNEL_STYLES.stage.content}>
          <div className={APPLICATION_FUNNEL_STYLES.stage.header}>
            <h4 className={APPLICATION_FUNNEL_STYLES.stage.title}>
              {stage.name}
            </h4>
            <div className={APPLICATION_FUNNEL_STYLES.stage.valueContainer}>
              <span className={`${APPLICATION_FUNNEL_STYLES.stage.value} ${colors.text}`}>
                {stage.value}
              </span>
              <span className={APPLICATION_FUNNEL_STYLES.stage.percentage}>
                ({stage.percentage}%)
              </span>
            </div>
          </div>

          <div className={APPLICATION_FUNNEL_STYLES.stage.progressBar.container}>
            <div
              className={`${APPLICATION_FUNNEL_STYLES.stage.progressBar.fill} ${colors.progress}`}
              style={{ width: `${stage.percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
