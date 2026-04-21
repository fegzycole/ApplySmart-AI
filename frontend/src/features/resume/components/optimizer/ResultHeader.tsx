import { motion } from "framer-motion";
import { Check } from "lucide-react";

export function ResultHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center space-y-4"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
        className="inline-flex items-center justify-center size-16 rounded-full bg-gradient-to-br from-violet-100 to-fuchsia-100 dark:from-violet-950 dark:to-fuchsia-950"
      >
        <Check className="size-8 text-violet-600 dark:text-violet-400" />
      </motion.div>
      <h1 className="text-4xl font-bold">
        <span className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-cyan-600 bg-clip-text text-transparent">
          Optimization Complete
        </span>
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
        Your resume has been optimized with AI-powered keyword matching and formatting
      </p>
    </motion.div>
  );
}
