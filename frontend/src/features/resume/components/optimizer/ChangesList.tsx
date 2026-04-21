import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface ChangesListProps {
  changes: string[];
}

export function ChangesList({ changes }: ChangesListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="lg:col-span-2 space-y-4"
    >
      <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
        Key Changes
      </h2>

      <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
        {changes.map((change, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.03 }}
            className="flex gap-3 p-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900"
          >
            <Check className="size-4 text-violet-600 dark:text-violet-400 shrink-0 mt-0.5" />
            <p className="text-sm text-zinc-700 dark:text-zinc-300">{change}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
