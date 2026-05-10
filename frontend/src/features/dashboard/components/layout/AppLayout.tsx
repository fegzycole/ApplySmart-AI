import { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router";
import { motion } from "framer-motion";
import { AppHeader } from "./AppHeader";

export function AppLayout() {
  const { pathname } = useLocation();
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;
    const handleMouseMove = (e: MouseEvent) => {
      spotlight.style.backgroundImage = `radial-gradient(800px circle at ${e.clientX}px ${e.clientY}px, var(--color-primary), transparent 80%)`;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background relative flex flex-col overflow-hidden antialiased selection:bg-primary/20 selection:text-primary">
      {/* Optimized Spotlight Effect */}
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-10 opacity-30 dark:opacity-10 transition-opacity duration-1000"
      />


      <AppHeader />

      <main className="relative z-40 mx-auto w-full max-w-[1700px] min-w-0 px-4 pt-28 pb-16 sm:px-6 sm:pt-32 sm:pb-20 lg:px-12 lg:pt-36">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-full min-w-0"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
