import { DASHBOARD_HEADER_STYLES, DASHBOARD_HEADER_CONTENT } from "../../constants/dashboard.constants";

export function DashboardPageHeader() {
  return (
    <div className={DASHBOARD_HEADER_STYLES.container}>
      <h1 className={DASHBOARD_HEADER_STYLES.title.base}>
        <span className={DASHBOARD_HEADER_STYLES.title.gradient}>
          {DASHBOARD_HEADER_CONTENT.title}
        </span>
      </h1>
      <p className={DASHBOARD_HEADER_STYLES.description}>
        {DASHBOARD_HEADER_CONTENT.description}
      </p>
    </div>
  );
}
