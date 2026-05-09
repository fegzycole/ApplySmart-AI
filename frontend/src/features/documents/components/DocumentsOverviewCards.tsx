import { motion } from "framer-motion";
import { Card, CardContent } from "@/shared/components/ui/card";
import { DOCUMENT_OVERVIEW_CARDS } from "../constants/documents.constants";
import type { DocumentsOverview } from "../types/documents.types";
import { cn } from "@/shared/lib/utils";

interface DocumentsOverviewCardsProps {
  overview: DocumentsOverview;
}

export function DocumentsOverviewCards({ overview }: DocumentsOverviewCardsProps) {
  return (
    <section className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      {DOCUMENT_OVERVIEW_CARDS.map((card, index) => {
        const Icon = card.icon;
        const value = overview[card.key];

        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative h-full"
          >
            <Card className="h-full rounded-[2rem] sm:rounded-[2.5rem] border-2 border-white/60 bg-white/40 shadow-2xl backdrop-blur-3xl transition-all duration-500 hover:-translate-y-1 hover:border-white dark:border-zinc-800/40 dark:bg-zinc-900/40 dark:hover:border-zinc-700">
              <CardContent className="p-6 sm:p-8 h-full flex flex-col justify-between space-y-4 sm:space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div className={cn(
                    "flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br shadow-xl transition-transform duration-500 group-hover:scale-110",
                    card.color,
                    "text-white shadow-zinc-200/50 dark:shadow-none"
                  )}>
                    <Icon className="size-6 sm:size-7" />
                  </div>
                  <div className="text-right min-w-0">
                    <p className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-zinc-400 dark:text-zinc-500 truncate">
                      Artifacts
                    </p>
                    <p className="text-3xl sm:text-4xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none mt-1 tabular-nums">
                      {value}
                    </p>
                  </div>
                </div>
                
                <div className="min-w-0">
                  <h4 className="text-base sm:text-lg font-bold tracking-tight text-zinc-800 dark:text-zinc-200 truncate">
                    {card.title}
                  </h4>
                  <p className="text-xs sm:text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1 line-clamp-2 min-h-[32px] sm:min-h-[40px]">
                    {card.description}
                  </p>
                </div>

                {/* Subtle Progress Artifact */}
                <div className="h-1 w-full rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: value > 0 ? "65%" : "0%" }}
                    className={cn("h-full rounded-full bg-gradient-to-r", card.color)}
                  />
                </div>
              </CardContent>
            </Card>
            
            {/* Ambient Aura */}
            <div className={cn(
              "absolute inset-0 -z-10 bg-gradient-to-br opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500",
              card.color
            )} />
          </motion.div>
        );
      })}
    </section>
  );
}
