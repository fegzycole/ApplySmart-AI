import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import { BuilderHeader } from "../components/builder/BuilderHeader";
import { BuilderFormCard } from "../components/builder/BuilderFormCard";
import { PreviewCard } from "../components/builder/PreviewCard";
import { PersonalInfoTab } from "../components/builder/PersonalInfoTab";
import { ExperienceTab } from "../components/builder/ExperienceTab";
import { EducationTab } from "../components/builder/EducationTab";
import { SkillsTab } from "../components/builder/SkillsTab";
import { BUILDER_TABS, BUILDER_STYLES } from "../constants/resume-builder.constants";

export function ResumeBuilderPage() {
  const [experiences, setExperiences] = useState([{ id: 1 }]);
  const [education, setEducation] = useState([{ id: 1 }]);
  const [projects, setProjects] = useState([{ id: 1 }]);

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <BuilderHeader />

        <div className="grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <BuilderFormCard>
              <Tabs defaultValue="personal" className="w-full">
                <TabsList className="grid w-full grid-cols-4 h-14 bg-gradient-to-r from-violet-100/50 via-fuchsia-100/50 to-cyan-100/50 dark:from-violet-950/30 dark:via-fuchsia-950/30 dark:to-cyan-950/30 p-1 rounded-xl">
                  {BUILDER_TABS.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <TabsTrigger key={tab.id} value={tab.id} className={BUILDER_STYLES.tabTrigger}>
                        <Icon className="size-4" />
                        <span className="hidden sm:inline">{tab.label}</span>
                      </TabsTrigger>
                    );
                  })}
                </TabsList>

                <TabsContent value="personal">
                  <PersonalInfoTab />
                </TabsContent>

                <TabsContent value="experience">
                  <ExperienceTab
                    experiences={experiences}
                    onAdd={() => setExperiences([...experiences, { id: Date.now() }])}
                    onDelete={(id) => setExperiences(experiences.filter(e => e.id !== id))}
                  />
                </TabsContent>

                <TabsContent value="education">
                  <EducationTab
                    education={education}
                    onAdd={() => setEducation([...education, { id: Date.now() }])}
                    onDelete={(id) => setEducation(education.filter(e => e.id !== id))}
                  />
                </TabsContent>

                <TabsContent value="skills">
                  <SkillsTab
                    projects={projects}
                    onAdd={() => setProjects([...projects, { id: Date.now() }])}
                    onDelete={(id) => setProjects(projects.filter(p => p.id !== id))}
                  />
                </TabsContent>
              </Tabs>
            </BuilderFormCard>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <PreviewCard />
          </div>
        </div>
      </div>
    </div>
  );
}