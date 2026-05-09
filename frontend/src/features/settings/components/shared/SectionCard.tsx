import { type LucideIcon } from "lucide-react";
import { type ReactNode } from "react";
import { MODULE_ARTIFACT_STYLES } from "../../constants/settings.constants";
import { cn } from "@/shared/lib/utils";
import { motion } from "framer-motion";

interface SectionCardProps {
  icon: LucideIcon;
  iconGradient?: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function SectionCard({
  icon: Icon,
  iconGradient,
  title,
  description,
  children,
}: SectionCardProps) {
  return (
    <div className={cn(MODULE_ARTIFACT_STYLES.panel, "min-w-0 w-full")}>
      <div className={MODULE_ARTIFACT_STYLES.body}>
        <div className={MODULE_ARTIFACT_STYLES.header}>
          <div
            className={cn(
              MODULE_ARTIFACT_STYLES.iconWrapper,
              iconGradient && "bg-gradient-to-br",
              iconGradient
            )}
          >
            <Icon className="size-8 sm:size-10 text-white" />
            <motion.div 
              className="absolute inset-0 rounded-2xl sm:rounded-[2.5rem] bg-sky-500/20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className={MODULE_ARTIFACT_STYLES.title}>{title}</h3>
            <div className="mt-3 flex items-start gap-3">
              <div className="mt-[0.35rem] h-2 w-2 shrink-0 rounded-full bg-sky-500 animate-pulse" />
              <span className="text-[11px] sm:text-xs font-black uppercase leading-tight tracking-[0.3em] text-zinc-400">
                {description}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6 sm:pt-10">
          {children}
        </div>
      </div>
    </div>
  );
}
