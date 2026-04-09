import { FEATURE_COMPARISON_STYLES } from "../../constants/pricing.constants";

interface CategoryRowProps {
  categoryName: string;
}

export function CategoryRow({ categoryName }: CategoryRowProps) {
  return (
    <tr className={FEATURE_COMPARISON_STYLES.table.tbody.categoryRow}>
      <td colSpan={5} className={FEATURE_COMPARISON_STYLES.table.tbody.categoryCell}>
        {categoryName}
      </td>
    </tr>
  );
}
