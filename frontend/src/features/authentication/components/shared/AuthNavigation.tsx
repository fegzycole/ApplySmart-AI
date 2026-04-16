import { Link } from "react-router";
import { Sparkles, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { AUTH_NAV_STYLES } from "../../constants/authentication.constants";

export function AuthNavigation() {
  const { theme, setTheme } = useTheme();

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
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className={AUTH_NAV_STYLES.themeToggle}
          >
            {theme === "dark" ? (
              <Sun className="size-5 text-violet-400" />
            ) : (
              <Moon className="size-5 text-violet-600" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
