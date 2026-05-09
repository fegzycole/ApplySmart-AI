import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { motion } from "framer-motion";
import { AppHeader } from "./AppHeader";

export function AppLayout() {
  const { pathname } = useLocation();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden antialiased selection:bg-primary/20 selection:text-primary">
      {/* Spotlight Effect - Matching Landing Page */}
      <div 
        className="pointer-events-none fixed inset-0 z-10 opacity-30 dark:opacity-10"
        style={{
          background: `radial-gradient(1200px circle at ${mousePos.x}px ${mousePos.y}px, var(--color-primary), transparent 80%)`,
          filter: "blur(120px)",
        }}
      />

      <AppHeader />

      <main className="relative z-40 mx-auto max-w-[1800px] px-3 pt-24 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:px-12 lg:pt-32 xl:px-20 xl:pb-24">
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.24,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}
