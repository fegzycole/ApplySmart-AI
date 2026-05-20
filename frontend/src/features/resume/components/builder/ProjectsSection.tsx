import { Folder, Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { useProjectTechnologyInputs } from "../../hooks/useProjectTechnologyInputs";
import { SectionHeader } from "./SectionHeader";
import { FormField } from "./FormField";
import { EmptyState } from "./EmptyState";
import { ItemCard } from "./ItemCard";

export function ProjectsSection() {
  const { resumeData, addProject, updateProject, deleteProject } = useResumeBuilder();
  const { getTechnologyInput, updateTechnologyInput } = useProjectTechnologyInputs(resumeData.projects);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <SectionHeader icon={Folder} title="Projects" stage="Stage 06" />
        <Button
          onClick={addProject}
          className="h-12 w-full rounded-2xl bg-primary px-6 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95 sm:w-auto"
        >
          <Plus className="mr-2 size-5" />
          Add Project
        </Button>
      </div>

      {resumeData.projects.length === 0 ? (
        <EmptyState
          icon={Folder}
          message="No project vectors synthesized yet."
          buttonLabel="Synthesize Project"
          onAdd={addProject}
        />
      ) : (
        <div className="space-y-6">
          {resumeData.projects.map((project, index) => (
            <ItemCard
              key={project.id}
              label={`Project Vector 0${index + 1}`}
              onDelete={() => deleteProject(project.id)}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <FormField
                  label="Project Name"
                  placeholder="Portfolio Platform"
                  value={project.name}
                  onChange={(value) => updateProject(project.id, { name: value })}
                />
                <FormField
                  label="Reference Link"
                  placeholder="github.com/user/project"
                  value={project.link}
                  onChange={(value) => updateProject(project.id, { link: value })}
                />
              </div>

              <div className="space-y-4 group">
                <Label className="ml-1 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 transition-all group-focus-within:text-primary group-focus-within:tracking-[0.4em]">
                  Project Description
                </Label>
                <Textarea
                  placeholder="Describe the problem, build scope, impact, and your ownership."
                  value={project.description}
                  onChange={(event) => updateProject(project.id, { description: event.target.value })}
                  className="min-h-[120px] resize-none rounded-[1.5rem] border-2 border-border/50 bg-background/50 p-4 text-sm leading-relaxed shadow-inner backdrop-blur-2xl transition-all duration-300 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 sm:rounded-[2rem] sm:p-6 lg:rounded-[2.5rem] lg:p-8"
                />
              </div>

              <div className="space-y-4 group">
                <Label className="ml-1 text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/40 transition-all group-focus-within:text-primary group-focus-within:tracking-[0.4em]">
                  Technology Stack
                </Label>
                <Textarea
                  placeholder="React, TypeScript, Spring Boot, PostgreSQL"
                  value={getTechnologyInput(project)}
                  onChange={(event) => {
                    const technologies = updateTechnologyInput(project.id, event.target.value);
                    updateProject(project.id, { technologies });
                  }}
                  className="min-h-[96px] resize-none rounded-[1.5rem] border-2 border-border/50 bg-background/50 p-4 text-sm leading-relaxed shadow-inner backdrop-blur-2xl transition-all duration-300 focus-visible:border-primary focus-visible:ring-4 focus-visible:ring-primary/10 sm:rounded-[2rem] sm:p-6 lg:rounded-[2.5rem] lg:p-8"
                />
                <div className="ml-1 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary/40" />
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40">
                    Separate technologies with commas or new lines.
                  </p>
                </div>
              </div>
            </ItemCard>
          ))}
        </div>
      )}
    </div>
  );
}
