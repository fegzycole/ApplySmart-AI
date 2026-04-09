import { Check } from "lucide-react";
import { FEATURE_COMPARISON_STYLES } from "../../constants/pricing.constants";

interface FeatureCellProps {
  value: boolean | string;
  highlighted?: boolean;
}

export function FeatureCell({ value, highlighted = false }: FeatureCellProps) {
  const cellClass = highlighted
    ? FEATURE_COMPARISON_STYLES.table.tbody.cellHighlight
    : FEATURE_COMPARISON_STYLES.table.tbody.cell;

  return (
    <td className={cellClass}>
      {typeof value === 'boolean' ? (
        value ? <Check className={FEATURE_COMPARISON_STYLES.table.tbody.checkIcon} /> : '—'
      ) : (
        value
      )}
    </td>
  );
}
