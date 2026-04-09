import { Link } from "react-router";
import { Sparkles } from "lucide-react";
import { AUTH_NAV_STYLES } from "../../constants/authentication.constants";

export function AuthNavigation() {
  return (
    <nav className={AUTH_NAV_STYLES.nav}>
      <div className={AUTH_NAV_STYLES.wrapper}>
        <div className={AUTH_NAV_STYLES.content}>
          <Link to="/" className={AUTH_NAV_STYLES.logoContainer}>
            <div className={AUTH_NAV_STYLES.logoIcon.wrapper}>
              <Sparkles className={AUTH_NAV_STYLES.logoIcon.icon} />
            </div>
            <span className={AUTH_NAV_STYLES.logoText}>ApplySmart AI</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
