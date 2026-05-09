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
      <div 
        className="pointer-events-none fixed inset-0 z-10 opacity-30 dark:opacity-10"
        style={{
          background: `radial-gradient(1200px circle at ${mousePos.x}px ${mousePos.y}px, var(--color-primary), transparent 80%)`,
          filter: "blur(120px)",
        }}
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
