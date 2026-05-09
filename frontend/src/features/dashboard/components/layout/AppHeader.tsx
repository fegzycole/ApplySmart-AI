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
    <header className="pointer-events-none fixed top-3 left-0 right-0 z-50 px-3 sm:top-4 sm:px-4 lg:top-6 lg:px-6">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="pointer-events-auto mx-auto w-full max-w-[24rem] sm:max-w-fit"
      >
        <div className="flex w-full items-center justify-between gap-2 rounded-[1.75rem] border border-white/10 bg-card/75 px-3 py-2.5 shadow-2xl backdrop-blur-2xl dark:border-white/5 sm:w-auto sm:gap-4 sm:rounded-full sm:px-5 sm:py-3 lg:px-6">
          <BrandLogo />
          
          <div className="mx-2 hidden h-6 w-px bg-foreground/10 lg:block" />
          
          <NavigationLinks variant="desktop" />
          
          <div className="mx-1 h-6 w-px bg-foreground/10 sm:mx-2" />
          
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
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
