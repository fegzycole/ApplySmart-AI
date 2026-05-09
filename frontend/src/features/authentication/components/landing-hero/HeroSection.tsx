import { Link } from "react-router";
import { Button } from "@/shared/components/ui/button";
import { Sparkles, ArrowRight, Zap, Target, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.3 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden">
      <motion.div
        className="max-w-[1400px] w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Main Hero Bento Block */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-8 bg-card/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-12 lg:p-20 flex flex-col justify-center relative overflow-hidden group shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] -z-10 group-hover:bg-primary/20 transition-all duration-1000" />
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold mb-8 w-fit">
            <Sparkles className="size-4" />
            <span>THE FUTURE OF CAREER DESIGN</span>
          </div>

          <h1 className="text-6xl sm:text-7xl lg:text-9xl font-bold tracking-tighter leading-[0.85] mb-8">
            <span className="text-foreground">CRAFT YOUR</span>
            <br />
            <span className="text-muted-foreground/30 italic">LEGACY.</span>
          </h1>

          <p className="text-xl lg:text-2xl text-muted-foreground max-w-xl mb-12 leading-tight">
            An ultra-high-fidelity AI workspace designed for those who don't just apply—they command.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/signup">
              <Button size="lg" className="h-16 px-10 text-xl rounded-full gap-3 shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">
                Access Now <ArrowRight className="size-6" />
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Sidebar Bento Blocks */}
        <div className="lg:col-span-4 grid grid-cols-1 gap-6">
          <motion.div 
            variants={itemVariants}
            className="bg-primary/5 backdrop-blur-3xl border border-primary/10 rounded-[2.5rem] p-8 flex flex-col justify-between hover:bg-primary/10 transition-colors group cursor-default shadow-xl"
          >
            <Zap className="size-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="text-3xl font-bold mb-2">98%</h3>
              <p className="text-muted-foreground">ATS Success Rate</p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-card/20 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between hover:bg-card/30 transition-colors group cursor-default shadow-xl"
          >
            <Target className="size-10 text-muted-foreground mb-6 group-hover:text-primary transition-colors" />
            <div>
              <h3 className="text-3xl font-bold mb-2">0.4s</h3>
              <p className="text-muted-foreground">Optimization Speed</p>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-foreground text-background rounded-[2.5rem] p-8 flex flex-col justify-between hover:opacity-90 transition-opacity group cursor-default shadow-2xl"
          >
            <ShieldCheck className="size-10 mb-6 group-hover:rotate-12 transition-transform" />
            <div>
              <h3 className="text-3xl font-bold mb-2">PRO</h3>
              <p className="opacity-70">Grade Security</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
