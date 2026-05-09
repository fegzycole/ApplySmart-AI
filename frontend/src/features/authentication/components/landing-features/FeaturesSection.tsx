import { Target, FileText, BarChart3, Zap, Shield, Users, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function FeaturesSection() {
  return (
    <section className="relative py-24 lg:py-40 px-6">
      <div className="max-w-[1400px] mx-auto">
        <motion.div 
          className="mb-24 text-center lg:text-left lg:flex lg:items-end lg:justify-between"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-3xl">
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8">
              Everything you need<br />
              <span className="text-muted-foreground/40 italic">to dominate.</span>
            </h2>
            <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Powerful AI tools designed to turn your job search into a strategic campaign.
            </p>
          </div>
          <div className="hidden lg:block">
            <Sparkles className="size-16 text-primary/20 animate-pulse" />
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Main Feature: Resume Optimizer */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 lg:row-span-2 canvas-card rounded-[3rem] p-12 flex flex-col justify-between group"
          >
            <div className="size-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
              <Target className="size-10 text-primary" />
            </div>
            <div>
              <h3 className="text-4xl font-bold mb-4">Resume Optimizer</h3>
              <p className="text-lg text-muted-foreground mb-8 leading-snug">
                Get past ATS systems with AI-optimized resumes tailored to every single job description in seconds.
              </p>
              <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                Learn more <ArrowUpRight className="size-5" />
              </div>
            </div>
          </motion.div>

          {/* Feature: Cover Letter */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 canvas-card rounded-[3rem] p-10 flex flex-col justify-between hover:bg-primary/5 group"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="size-16 rounded-2xl bg-foreground/5 flex items-center justify-center">
                <FileText className="size-8 text-foreground" />
              </div>
              <Zap className="size-6 text-primary animate-pulse" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Cover Letter Generator</h3>
              <p className="text-muted-foreground leading-snug">
                Create personalized, compelling letters that tell your story better than you can.
              </p>
            </div>
          </motion.div>

          {/* Feature: Analytics */}
          <motion.div 
            variants={itemVariants}
            className="canvas-card rounded-[3rem] p-8 flex flex-col justify-between group"
          >
            <BarChart3 className="size-10 text-muted-foreground group-hover:text-primary transition-colors" />
            <div className="mt-6">
              <h3 className="text-xl font-bold mb-1">Performance Analytics</h3>
              <p className="text-sm text-muted-foreground">Track metrics and improve your success rate.</p>
            </div>
          </motion.div>

          {/* Feature: ATS */}
          <motion.div 
            variants={itemVariants}
            className="canvas-card rounded-[3rem] p-8 flex flex-col justify-between bg-foreground text-background group shadow-2xl"
          >
            <Shield className="size-10 mb-6 group-hover:scale-110 transition-transform" />
            <div>
              <h3 className="text-xl font-bold mb-1">ATS Guard</h3>
              <p className="text-sm opacity-70">100% compatibility across 500+ ATS platforms.</p>
            </div>
          </motion.div>

          {/* Bottom Feature: Tracker */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 canvas-card rounded-[3rem] p-10 flex items-center gap-8 group"
          >
            <div className="size-24 rounded-[2rem] bg-primary/10 flex-shrink-0 flex items-center justify-center group-hover:rotate-6 transition-transform">
              <BarChart3 className="size-10 text-primary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">Job Tracker</h3>
              <p className="text-muted-foreground">
                Organize all your applications in one visual, high-speed command center.
              </p>
            </div>
          </motion.div>

          {/* Feature: Templates */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-2 canvas-card rounded-[3rem] p-10 flex flex-col justify-center relative overflow-hidden group"
          >
             <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Users className="size-64" />
             </div>
             <h3 className="text-3xl font-bold mb-4">Expert Templates</h3>
             <p className="text-lg text-muted-foreground leading-tight max-w-sm">
               Professionally designed resume templates for every industry. Crafted for clarity.
             </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
