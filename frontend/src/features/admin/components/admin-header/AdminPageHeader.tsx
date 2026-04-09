import { ADMIN_HEADER_STYLES, ADMIN_HEADER_CONTENT } from "../../constants/admin.constants";

export function AdminPageHeader() {
  return (
    <div className={ADMIN_HEADER_STYLES.pageHeader.container}>
      <h1 className={ADMIN_HEADER_STYLES.pageHeader.title}>
        {ADMIN_HEADER_CONTENT.title}
      </h1>
      <p className={ADMIN_HEADER_STYLES.pageHeader.description}>
        {ADMIN_HEADER_CONTENT.description}
      </p>
    </div>
  );
}
