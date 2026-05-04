export function normalizeSkill(skill: string) {
  return skill.trim().replace(/\s+/g, " ");
}

export function dedupeSkills(skills: string[]) {
  const seen = new Set<string>();

  return skills.reduce<string[]>((uniqueSkills, skill) => {
    const normalizedSkill = normalizeSkill(skill);

    if (!normalizedSkill) {
      return uniqueSkills;
    }

    const key = normalizedSkill.toLowerCase();
    if (seen.has(key)) {
      return uniqueSkills;
    }

    seen.add(key);
    uniqueSkills.push(normalizedSkill);
    return uniqueSkills;
  }, []);
}

export function hasSkill(skills: string[], candidate: string) {
  const normalizedCandidate = normalizeSkill(candidate).toLowerCase();

  if (!normalizedCandidate) {
    return false;
  }

  return skills.some((skill) => normalizeSkill(skill).toLowerCase() === normalizedCandidate);
}
