import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { Sparkles, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { FEATURE_FLAGS } from "@/shared/config/feature-flags";

export function Navigation() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-8 left-0 right-0 z-50 px-6 pointer-events-none">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-fit mx-auto pointer-events-auto"
      >
        <div className="flex items-center gap-6 bg-card/60 backdrop-blur-3xl border border-white/10 shadow-2xl rounded-full px-8 py-4">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-full bg-primary flex items-center justify-center">
              <Sparkles className="size-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground hidden sm:block">ApplySmart</span>
          </div>

          <div className="h-6 w-px bg-foreground/10 mx-2 hidden sm:block" />

          <div className="flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-foreground/5 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="size-5 text-primary" />
              ) : (
                <Moon className="size-5 text-primary" />
              )}
            </button>
            {FEATURE_FLAGS.SUBSCRIPTIONS_ENABLED && (
              <Link to="/pricing" className="hidden lg:inline-block">
                <Button variant="ghost" className="rounded-full">Pricing</Button>
              </Link>
            )}
            <Link to="/login" className="hidden sm:inline-block">
              <Button variant="ghost" className="rounded-full">Sign In</Button>
            </Link>
            <Link to="/signup">
              <Button className="rounded-full px-6 shadow-xl shadow-primary/20">
                Join Now
              </Button>
            </Link>
          </div>
        </div>
      </motion.nav>
    </header>
  );
}
