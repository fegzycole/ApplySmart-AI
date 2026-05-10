import { useEffect, useRef } from "react";
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
    <div className="min-h-screen bg-background relative overflow-hidden antialiased selection:bg-primary/20 selection:text-primary">
      <div
        ref={spotlightRef}
        className="pointer-events-none fixed inset-0 z-10 opacity-30 dark:opacity-10 transition-opacity duration-1000"
      />

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
