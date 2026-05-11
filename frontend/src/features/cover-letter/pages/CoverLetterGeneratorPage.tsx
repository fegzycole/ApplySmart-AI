import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";
import { COVER_LETTER_PAGE_STYLES } from "../constants/cover-letter.constants";
import { useCoverLetterGenerator } from "../hooks/useCoverLetterGenerator";
import { GeneratorPageHeader } from "../components/generator-header";
import { LeftColumnSection, RightColumnSection } from "../components/page-sections";
import { MISSION_CONTROL_ANIMATIONS } from "@/shared/constants/animations";

export function CoverLetterGeneratorPage() {
  const {
    generated,
    generating,
    generatedLetter,
    uploadedFile,
    fieldErrors,
    formErrors,
    company,
    position,
    jobDescription,
    highlights,
    tone,
    setCompany,
    setPosition,
    setJobDescription,
    setHighlights,
    setTone,
    handleGenerate,
    handleFileUpload,
    handleFileDrop,
    removeFile,
    handleNewLetter
  } = useCoverLetterGenerator();

  return (
    <motion.div 
      variants={MISSION_CONTROL_ANIMATIONS.stagger.container}
      initial="hidden"
      animate="visible"
      className={COVER_LETTER_PAGE_STYLES.container}
    >
      <div className={cn(COVER_LETTER_PAGE_STYLES.wrapper, "space-y-10 sm:space-y-16 pt-8 sm:pt-12")}>
        <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item}>
          <GeneratorPageHeader />
        </motion.div>

        <div className={cn(COVER_LETTER_PAGE_STYLES.grid, "gap-8 lg:gap-12")}>
          <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item} className={cn(COVER_LETTER_PAGE_STYLES.leftColumn, "col-span-1 lg:col-span-1")}>
            <LeftColumnSection
              company={company}
              position={position}
              jobDescription={jobDescription}
              highlights={highlights}
              tone={tone}
              onCompanyChange={setCompany}
              onPositionChange={setPosition}
              onJobDescriptionChange={setJobDescription}
              onHighlightsChange={setHighlights}
              onToneChange={setTone}
              uploadedFile={uploadedFile}
              onFileUpload={handleFileUpload}
              onFileDrop={handleFileDrop}
              onRemoveFile={removeFile}
              fieldErrors={fieldErrors}
              formErrors={formErrors}
              generating={generating}
              onGenerate={handleGenerate}
            />
          </motion.div>

          <motion.div variants={MISSION_CONTROL_ANIMATIONS.stagger.item} className={cn(COVER_LETTER_PAGE_STYLES.rightColumn, "col-span-1 lg:col-span-1")}>
            <div className="lg:sticky lg:top-8 w-full">
              <RightColumnSection
                generated={generated}
                onNewLetter={handleNewLetter}
                generatedLetter={generatedLetter}
                generating={generating}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>

  );
}
