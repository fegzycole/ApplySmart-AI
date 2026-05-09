import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "./BrandLogo";
import { MobileMenuButton } from "./MobileMenuButton";
import { MobileNavigation } from "./MobileNavigation";
import { NavigationLinks } from "./NavigationLinks";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";

export function AppHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="pointer-events-none fixed top-3 left-0 right-0 z-50 px-3 sm:top-4 sm:px-6 lg:top-6">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto mx-auto w-full max-w-fit"
      >
        <div className="flex items-center gap-1.5 rounded-[2rem] border border-white/60 bg-white/40 px-2 py-1.5 shadow-2xl backdrop-blur-3xl dark:border-zinc-800/40 dark:bg-zinc-900/40 sm:gap-2.5 sm:rounded-full sm:px-4 sm:py-2 lg:gap-4 lg:px-6">
          <BrandLogo />

          <div className="mx-0.5 hidden h-6 w-px bg-zinc-200 dark:bg-zinc-800 lg:block lg:mx-1 xl:mx-2 xl:h-8" />

          <NavigationLinks variant="desktop" />

          <div className="mx-0.5 h-6 w-px bg-zinc-200 dark:bg-zinc-800 sm:mx-1 lg:mx-2 lg:h-8" />

          <div className="flex items-center gap-1 sm:gap-2">
            <ThemeToggle className="hidden sm:flex" />
            <UserMenu />
            <MobileMenuButton
              open={mobileMenuOpen}
              onToggle={() => setMobileMenuOpen((open) => !open)}
            />
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="absolute top-full left-1/2 mt-3 w-[min(22rem,calc(100vw-1.5rem))] -translate-x-1/2 px-0 sm:mt-4 sm:w-[24rem] sm:px-2"
            >
              <div className="rounded-[1.75rem] border border-white/10 bg-card/90 p-4 shadow-2xl backdrop-blur-2xl sm:rounded-3xl sm:p-6">
                <MobileNavigation
                  open={mobileMenuOpen}
                  onNavigate={() => setMobileMenuOpen(false)}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}
