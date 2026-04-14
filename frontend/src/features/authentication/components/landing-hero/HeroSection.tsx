import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { Sparkles } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative z-10 pt-12 sm:pt-24 pb-16 sm:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-violet-500/10 via-fuchsia-500/10 to-cyan-500/10 border border-violet-200 dark:border-violet-800 text-violet-700 dark:text-violet-300 text-xs sm:text-sm mb-6 sm:mb-8 backdrop-blur-sm">
          <Sparkles className="size-3 sm:size-4" />
          <span className="font-medium">Powered by Advanced AI Technology</span>
        </div>
        <h1 className="text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 leading-tight">
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
            Land More Interviews
          </span>
          <br />
          <span className="text-zinc-900 dark:text-white">With AI</span>
        </h1>
        <p className="text-base sm:text-xl text-zinc-600 dark:text-zinc-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed px-4">
          Create ATS-optimized resumes, generate compelling cover letters, and track your job applications—all powered by cutting-edge artificial intelligence.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
          <Link to="/signup" className="w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-700 hover:to-fuchsia-700 text-white text-base sm:text-lg px-8 sm:px-10 h-12 sm:h-14 rounded-full shadow-2xl shadow-violet-500/50 dark:shadow-violet-900/50 transform hover:scale-105 transition-all">
              Start Free Trial
            </Button>
          </Link>
        </div>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-500 mt-4 sm:mt-6 px-4">
          ✨ No credit card required • 🚀 7-day free trial • 🔒 Cancel anytime
        </p>
      </div>

      {/* Floating decorative elements */}
      <div className="hidden sm:block absolute top-20 right-10 w-20 h-20 bg-gradient-to-br from-violet-400 to-fuchsia-500 rounded-2xl opacity-20 blur-xl animate-pulse" />
      <div className="hidden sm:block absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-full opacity-20 blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
    </section>
  );
}
