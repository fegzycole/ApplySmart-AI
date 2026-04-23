import { Fragment } from "react";
import { FEATURE_COMPARISON_STYLES, FEATURE_CATEGORIES, PRICING_PAGE_STYLES } from "../../constants/pricing.constants";
import { TableHeader } from "./TableHeader";
import { CategoryRow } from "./CategoryRow";
import { FeatureRow } from "./FeatureRow";

export function FeatureComparisonTable() {
  return (
    <section className={FEATURE_COMPARISON_STYLES.section}>
      <div className={PRICING_PAGE_STYLES.maxWidth}>
        <div className={FEATURE_COMPARISON_STYLES.header.container}>
          <h2 className={FEATURE_COMPARISON_STYLES.header.title}>
            Compare All Features
          </h2>
          <p className={FEATURE_COMPARISON_STYLES.header.description}>
            See what's included in each plan
          </p>
        </div>

        <div className={FEATURE_COMPARISON_STYLES.table.wrapper}>
          <div className={FEATURE_COMPARISON_STYLES.table.container}>
            <table className={FEATURE_COMPARISON_STYLES.table.table}>
              <TableHeader />
              <tbody>
                {FEATURE_CATEGORIES.map((category) => (
                  <Fragment key={category.category}>
                    <CategoryRow categoryName={category.category} />
                    {category.items.map((item, itemIndex) => (
                      <FeatureRow key={itemIndex} feature={item} />
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
