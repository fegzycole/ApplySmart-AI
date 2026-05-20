import { Award, Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { SectionHeader } from "./SectionHeader";
import { FormField } from "./FormField";
import { EmptyState } from "./EmptyState";
import { ItemCard } from "./ItemCard";
import { MonthYearPicker } from "./MonthYearPicker";

export function CertificationsSection() {
  const {
    resumeData,
    addCertification,
    updateCertification,
    deleteCertification,
  } = useResumeBuilder();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeader icon={Award} title="Certifications" stage="Stage 07" />
        <Button
          onClick={addCertification}
          className="h-12 w-full rounded-2xl bg-primary px-6 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 sm:w-auto"
        >
          <Plus className="mr-2 size-5" />
          Add Certification
        </Button>
      </div>

      {resumeData.certifications.length === 0 ? (
        <EmptyState
          icon={Award}
          message="No certification vectors synthesized yet."
          buttonLabel="Synthesize Certification"
          onAdd={addCertification}
        />
      ) : (
        <div className="space-y-6">
          {resumeData.certifications.map((certification, index) => (
            <ItemCard
              key={certification.id}
              label={`Certification Vector 0${index + 1}`}
              onDelete={() => deleteCertification(certification.id)}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <FormField
                  label="Certification Name"
                  placeholder="AWS Certified Developer"
                  value={certification.name}
                  onChange={(value) => updateCertification(certification.id, { name: value })}
                />
                <FormField
                  label="Issuing Authority"
                  placeholder="Amazon Web Services"
                  value={certification.issuer}
                  onChange={(value) => updateCertification(certification.id, { issuer: value })}
                />
                <MonthYearPicker
                  label="Issue Date"
                  value={certification.date}
                  onChange={(value) => updateCertification(certification.id, { date: value })}
                />
              </div>
            </ItemCard>
          ))}
        </div>
      )}
    </div>
  );
}
