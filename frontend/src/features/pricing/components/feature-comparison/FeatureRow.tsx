import { FEATURE_COMPARISON_STYLES } from "../../constants/pricing.constants";
import { FeatureCell } from "./FeatureCell";
import type { FeatureItem } from "../../types/pricing.types";

interface FeatureRowProps {
  feature: FeatureItem;
}

export function FeatureRow({ feature }: FeatureRowProps) {
  return (
    <tr className={FEATURE_COMPARISON_STYLES.table.tbody.itemRow}>
      <td className={FEATURE_COMPARISON_STYLES.table.tbody.cellLeft}>{feature.name}</td>
      <FeatureCell value={feature.free} />
      <FeatureCell value={feature.starter} />
      <FeatureCell value={feature.pro} highlighted />
      <FeatureCell value={feature.boost} />
    </tr>
  );
}
