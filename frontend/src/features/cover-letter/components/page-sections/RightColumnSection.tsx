import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { COVER_LETTER_PAGE_STYLES } from "../../constants/cover-letter.constants";
import { HowItWorksCard, AIFeaturesCard } from "../info-cards";
import { GeneratedLetterCard } from "../generated-output";
import { SynthesisProgress } from "../generated-output/SynthesisProgress";
import type { CoverLetter } from "../../services/cover-letter.service";

interface RightColumnSectionProps {
  generated: boolean;
  generating: boolean;
  onNewLetter: () => void;
  generatedLetter?: CoverLetter;
}

export function RightColumnSection({ generated, generating, onNewLetter, generatedLetter }: RightColumnSectionProps) {
  return (
    <div className={cn(COVER_LETTER_PAGE_STYLES.rightColumn, "min-w-0 w-full")}>
      <AnimatePresence mode="wait">
        {generating ? (
          <motion.div
            key="generating"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="min-w-0 w-full"
          >
            <SynthesisProgress />
          </motion.div>
        ) : generated ? (
          <motion.div
            key="generated"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="min-w-0 w-full"
          >
            <GeneratedLetterCard onNewLetter={onNewLetter} generatedLetter={generatedLetter} />
          </motion.div>
        ) : (
          <motion.div
            key="idle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-10 min-w-0 w-full"
          >
            <HowItWorksCard />
            <AIFeaturesCard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
