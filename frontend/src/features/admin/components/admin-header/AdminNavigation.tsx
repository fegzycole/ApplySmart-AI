import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Sparkles, ArrowLeft } from "lucide-react";
import { ADMIN_HEADER_STYLES, ADMIN_HEADER_CONTENT } from "../../constants/admin.constants";

export function AdminNavigation() {
  return (
    <nav className={ADMIN_HEADER_STYLES.nav}>
      <div className={ADMIN_HEADER_STYLES.navWrapper}>
        <div className={ADMIN_HEADER_STYLES.navContent}>
          <div className={ADMIN_HEADER_STYLES.leftSection}>
            <Link to="/" className={ADMIN_HEADER_STYLES.logoContainer}>
              <Sparkles className={ADMIN_HEADER_STYLES.logoIcon} />
              <span className={ADMIN_HEADER_STYLES.logoText}>ApplySmart AI</span>
            </Link>
            <Badge variant="outline" className={ADMIN_HEADER_STYLES.adminBadge}>
              {ADMIN_HEADER_CONTENT.adminBadgeText}
            </Badge>
          </div>
          <Link to="/app">
            <Button variant="outline" size="sm">
              <ArrowLeft className="size-4 mr-2" />
              {ADMIN_HEADER_CONTENT.backButtonText}
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
