import { useEffect, useRef } from "react";
import { DECORATIVE_BG_STYLES } from "../../constants/authentication.constants";

export function DecorativeBackground() {
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const spotlight = spotlightRef.current;
    if (!spotlight) return;
    const handleMouseMove = (e: MouseEvent) => {
      spotlight.style.backgroundImage = `radial-gradient(1200px circle at ${e.clientX}px ${e.clientY}px, var(--color-primary), transparent 80%)`;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={DECORATIVE_BG_STYLES.wrapper}>
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-0 opacity-30 dark:opacity-10"
      />
      <div className={DECORATIVE_BG_STYLES.topRight} />
      <div className={DECORATIVE_BG_STYLES.bottomLeft} />
    </div>
  );
}
