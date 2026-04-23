import { Code, Plus, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { useResumeBuilder } from "../../contexts/ResumeBuilderContext";
import { SectionHeader } from "./SectionHeader";

export function SkillsSection() {
  const { resumeData, updateSkills } = useResumeBuilder();
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (!newSkill.trim()) return;
    updateSkills([...resumeData.skills, newSkill.trim()]);
    setNewSkill("");
  };

  const removeSkill = (index: number) => {
    updateSkills(resumeData.skills.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-6">
      <SectionHeader icon={Code} title="Skills" />

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1 space-y-2">
            <Label htmlFor="new-skill" className="text-sm font-medium">Add a skill</Label>
            <Input
              id="new-skill"
              placeholder="e.g., JavaScript, Project Management, Data Analysis"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addSkill(); } }}
              className="h-10 rounded-lg"
            />
          </div>
          <div className="flex items-end">
            <Button onClick={addSkill} size="sm" className="h-10 rounded-lg bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700">
              <Plus className="size-4 mr-1" />
              Add
            </Button>
          </div>
        </div>

        {resumeData.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2 p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50 dark:bg-zinc-900/30">
            {resumeData.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
                {skill}
                <button onClick={() => removeSkill(index)} className="ml-2 hover:text-red-500 transition-colors">
                  <X className="size-3" />
                </button>
              </Badge>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
            <Code className="size-10 mx-auto text-zinc-300 dark:text-zinc-700 mb-2" />
            <p className="text-sm text-zinc-500 dark:text-zinc-400">No skills added yet. Start adding your skills above.</p>
          </div>
        )}
      </div>
    </div>
  );
}
