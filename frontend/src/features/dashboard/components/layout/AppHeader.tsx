import { useState } from "react";
import { BrandLogo } from "./BrandLogo";
import { MobileMenuButton } from "./MobileMenuButton";
import { MobileNavigation } from "./MobileNavigation";
import { NavigationLinks } from "./NavigationLinks";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";

export function AppHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <BrandLogo />
          <NavigationLinks variant="desktop" />
          <div className="flex items-center gap-2">
            <ThemeToggle className="hidden sm:flex" />
            <UserMenu />
            <MobileMenuButton
              open={mobileMenuOpen}
              onToggle={() => setMobileMenuOpen((open) => !open)}
            />
          </div>
        </div>

        <MobileNavigation
          open={mobileMenuOpen}
          onNavigate={() => setMobileMenuOpen(false)}
        />
      </div>
    </nav>
  );
}
