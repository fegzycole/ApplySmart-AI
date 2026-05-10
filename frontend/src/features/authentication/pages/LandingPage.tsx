import { useState, useEffect } from "react";
import {
  Navigation,
  HeroSection,
  FeaturesSection,
  PricingPreview,
  TestimonialsSection,
  CTASection,
  Footer
} from "../components";

export function LandingPage() {
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden antialiased selection:bg-primary/20 selection:text-primary">
      {mousePos && (
        <div
          className="pointer-events-none fixed inset-0 z-10 opacity-30 dark:opacity-10 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, var(--color-primary), transparent 80%)`,
          }}
        />
      )}

      <Navigation />
      
      <main className="relative z-20">
        <HeroSection />
        <FeaturesSection />
        <PricingPreview />
        <TestimonialsSection />
        <CTASection />
      </main>
      
      <Footer />
    </div>
  );
}
