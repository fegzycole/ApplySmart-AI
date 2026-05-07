import { COVER_LETTER_PAGE_STYLES } from "../../constants/cover-letter.constants";
import { HowItWorksCard, AIFeaturesCard } from "../info-cards";
import { GeneratedLetterCard } from "../generated-output";
import type { CoverLetter } from "../../services/cover-letter.service";

interface RightColumnSectionProps {
  generated: boolean;
  onNewLetter: () => void;
  generatedLetter?: CoverLetter;
}

export function RightColumnSection({ generated, onNewLetter, generatedLetter }: RightColumnSectionProps) {
  return (
    <div className={COVER_LETTER_PAGE_STYLES.rightColumn}>
      {!generated ? (
        <>
          <HowItWorksCard />
          <AIFeaturesCard />
        </>
      ) : (
        <GeneratedLetterCard onNewLetter={onNewLetter} generatedLetter={generatedLetter} />
      )}
    </div>
  );
}
