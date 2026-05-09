import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export function CTASection() {
  return (
    <section className="relative py-16 sm:py-24 lg:py-48 px-4 sm:px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/10 rounded-full blur-[160px] -z-10" />

      <motion.div
        className="max-w-[1200px] mx-auto text-center relative z-10 canvas-card rounded-[2.5rem] sm:rounded-[3.5rem] lg:rounded-[4rem] p-10 sm:p-16 lg:p-32 shadow-2xl"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-bold mb-6 sm:mb-10 lg:mb-12 uppercase tracking-[0.2em]">
          <Sparkles className="size-3 sm:size-4" />
          Final Call
        </div>

        <h2 className="text-4xl sm:text-5xl lg:text-9xl font-bold tracking-tighter leading-[0.85] mb-6 sm:mb-10 lg:mb-12">
          Ready to land your<br />
          <span className="text-muted-foreground/30 italic">dream role?</span>
        </h2>

        <p className="text-base sm:text-xl lg:text-3xl text-muted-foreground mb-10 sm:mb-14 lg:mb-16 max-w-2xl mx-auto leading-tight">
          Join the elite circle of professionals who use AI to out-design the competition.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
          <Link to="/signup">
            <Button size="lg" className="h-14 sm:h-18 lg:h-20 px-9 sm:px-12 text-lg sm:text-xl lg:text-2xl rounded-full shadow-2xl shadow-primary/30 group w-full sm:w-auto">
              Start Your Journey <ArrowRight className="size-6 sm:size-7 lg:size-8 ml-2 sm:ml-3 group-hover:translate-x-2 transition-transform" />
            </Button>
          </Link>
        </div>

        <p className="mt-8 sm:mt-10 lg:mt-12 text-xs sm:text-sm font-medium text-muted-foreground opacity-50 uppercase tracking-widest">
          No credit card. No risk. Pure momentum.
        </p>
      </motion.div>
    </section>
  );
}
