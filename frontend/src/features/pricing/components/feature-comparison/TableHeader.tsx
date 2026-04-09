import { FEATURE_COMPARISON_STYLES, TABLE_PLAN_HEADERS } from "../../constants/pricing.constants";

export function TableHeader() {
  return (
    <thead>
      <tr className={FEATURE_COMPARISON_STYLES.table.thead.row}>
        <th className={FEATURE_COMPARISON_STYLES.table.thead.cellLeft}>Features</th>
        {TABLE_PLAN_HEADERS.map((plan) => (
          <th
            key={plan.name}
            className={
              plan.highlighted
                ? FEATURE_COMPARISON_STYLES.table.thead.cellHighlight
                : FEATURE_COMPARISON_STYLES.table.thead.cell
            }
          >
            {plan.name}
          </th>
        ))}
      </tr>
    </thead>
  );
}
