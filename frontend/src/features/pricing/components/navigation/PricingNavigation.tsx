import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { Sparkles, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { NAVIGATION_STYLES } from "../../constants/pricing.constants";

export function PricingNavigation() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className={NAVIGATION_STYLES.container}>
      <div className={NAVIGATION_STYLES.wrapper}>
        <div className={NAVIGATION_STYLES.content}>
          <Link to="/" className={NAVIGATION_STYLES.logo.container}>
            <Sparkles className={NAVIGATION_STYLES.logo.icon} />
            <span className={NAVIGATION_STYLES.logo.text}>ApplySmart AI</span>
          </Link>
          <div className={NAVIGATION_STYLES.actions.container}>
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={NAVIGATION_STYLES.actions.themeButton}
            >
              {theme === "dark" ? (
                <Sun className={`${NAVIGATION_STYLES.actions.themeIcon} text-zinc-400`} />
              ) : (
                <Moon className={`${NAVIGATION_STYLES.actions.themeIcon} text-zinc-600`} />
              )}
            </button>
            <Link to="/login">
              <Button variant="ghost" className={NAVIGATION_STYLES.actions.signInButton}>
                Sign In
              </Button>
            </Link>
            <Link to="/signup">
              <Button className={NAVIGATION_STYLES.actions.signUpButton}>
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
