import { useEffect, useState } from "react";
import type { Project } from "../types/resume-builder.types";
import { formatTechnologyInput, parseTechnologyInput } from "../utils/resume-builder-technologies";

function createTechnologyInputMap(projects: Project[]) {
  return Object.fromEntries(
    projects.map((project) => [project.id, formatTechnologyInput(project.technologies)]),
  );
}

export function useProjectTechnologyInputs(projects: Project[]) {
  const [technologyInputs, setTechnologyInputs] = useState<Record<string, string>>(() =>
    createTechnologyInputMap(projects),
  );

  useEffect(() => {
    setTechnologyInputs((currentInputs) => {
      const nextInputs: Record<string, string> = {};

      projects.forEach((project) => {
        nextInputs[project.id] =
          currentInputs[project.id] ?? formatTechnologyInput(project.technologies);
      });

      return nextInputs;
    });
  }, [projects]);

  const getTechnologyInput = (project: Project) =>
    technologyInputs[project.id] ?? formatTechnologyInput(project.technologies);

  const updateTechnologyInput = (projectId: string, value: string) => {
    setTechnologyInputs((currentInputs) => ({
      ...currentInputs,
      [projectId]: value,
    }));

    return parseTechnologyInput(value);
  };

  return {
    getTechnologyInput,
    updateTechnologyInput,
  };
}
