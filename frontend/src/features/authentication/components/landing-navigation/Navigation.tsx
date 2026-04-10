import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { Sparkles, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { FEATURE_FLAGS } from "@/shared/config/feature-flags";

export function Navigation() {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="relative z-10 backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border-b border-violet-200/50 dark:border-violet-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center">
              <Sparkles className="size-5 text-white" />
            </div>
            <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">ApplySmart AI</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-lg hover:bg-violet-100 dark:hover:bg-violet-900/30 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="size-5 text-violet-400" />
              ) : (
                <Moon className="size-5 text-violet-600" />
              )}
            </button>
            {FEATURE_FLAGS.SUBSCRIPTIONS_ENABLED && (
              <Link to="/pricing" className="hidden sm:inline-block">
                <Button variant="ghost" className="hover:bg-violet-100 dark:hover:bg-violet-900/30">Pricing</Button>
              </Link>
            )}
            <Link to="/login" className="hidden sm:inline-block">
              <Button variant="ghost" className="hover:bg-violet-100 dark:hover:bg-violet-900/30">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white shadow-lg shadow-violet-500/50 dark:shadow-violet-900/50 text-sm sm:text-base h-9 sm:h-10 px-3 sm:px-4">
                Start Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
