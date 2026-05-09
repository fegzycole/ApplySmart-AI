import { motion } from "framer-motion";
import { Star, Quote, CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    quote: "ApplySmart AI helped me land 3x more interviews. The resume optimizer is a game-changer for anyone serious about their career.",
    author: {
      name: "Sarah Johnson",
      role: "Software Engineer",
      initials: "SJ"
    },
    accent: "text-primary"
  },
  {
    quote: "The job tracker keeps me organized and the analytics show exactly where to improve. It's like having a personal career coach.",
    author: {
      name: "Michael Chen",
      role: "Product Manager",
      initials: "MC"
    },
    accent: "text-blue-500"
  },
  {
    quote: "Best investment for my career transition. Got my dream job within 2 months of using ApplySmart! Jaw-dropping results.",
    author: {
      name: "Emma Patel",
      role: "UX Designer",
      initials: "EP"
    },
    accent: "text-fuchsia-500"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TestimonialsSection() {
  return (
    <section className="relative py-24 lg:py-40 px-6 overflow-hidden">
      {/* Background Decorative Text */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none opacity-[0.02] dark:opacity-[0.05] select-none">
        <span className="text-[20rem] font-black leading-none uppercase">Success</span>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        <motion.div 
          className="text-center mb-24"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-5xl lg:text-7xl font-bold tracking-tight mb-8">
            Loved by the world's<br />
            <span className="text-primary italic">most ambitious.</span>
          </h2>
          <div className="flex items-center justify-center gap-2 text-xl font-medium">
             <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="size-6 fill-primary text-primary" />)}
             </div>
             <span className="ml-2 text-muted-foreground">Trusted by 50,000+ professionals</span>
          </div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {testimonials.map((t) => (
            <motion.div 
              key={t.author.name}
              variants={itemVariants}
              className="canvas-card rounded-[3.5rem] p-12 relative overflow-hidden group"
            >
              {/* Massive Initials Background */}
              <div className="absolute -top-10 -right-10 text-[12rem] font-black opacity-[0.03] group-hover:opacity-[0.07] transition-opacity select-none">
                {t.author.initials}
              </div>

              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-8 text-primary font-bold text-sm tracking-widest uppercase">
                  <CheckCircle2 className="size-4" />
                  Verified Success
                </div>

                <Quote className="size-12 text-primary/20 mb-6" />

                <p className="text-2xl lg:text-3xl font-medium leading-[1.3] mb-12 text-foreground">
                  "{t.quote}"
                </p>

                <div className="flex items-center gap-5 mt-auto">
                  <div className="size-16 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold shadow-xl shadow-primary/20">
                    {t.author.initials}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold">{t.author.name}</h4>
                    <p className="text-muted-foreground">{t.author.role}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
