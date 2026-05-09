import { useState, useEffect } from "react";
import { DECORATIVE_BG_STYLES } from "../../constants/authentication.constants";

export function DecorativeBackground() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={DECORATIVE_BG_STYLES.wrapper}>
      <div 
        className="pointer-events-none fixed inset-0 z-0 opacity-30 dark:opacity-10"
        style={{
          background: `radial-gradient(1200px circle at ${mousePos.x}px ${mousePos.y}px, var(--color-primary), transparent 80%)`,
          filter: "blur(120px)",
        }}
      />
      <div className={DECORATIVE_BG_STYLES.topRight} />
      <div className={DECORATIVE_BG_STYLES.bottomLeft} />
    </div>
  );
}
