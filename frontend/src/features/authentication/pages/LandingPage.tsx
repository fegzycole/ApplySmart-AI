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
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-cyan-50 dark:from-zinc-950 dark:via-violet-950/20 dark:to-zinc-950 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-violet-400/30 to-purple-600/30 dark:from-violet-600/20 dark:to-purple-800/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-cyan-400/30 to-teal-600/30 dark:from-cyan-600/20 dark:to-teal-800/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-fuchsia-400/20 to-indigo-600/20 dark:from-fuchsia-600/10 dark:to-indigo-800/10 rounded-full blur-3xl" />
      </div>

      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <PricingPreview />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
