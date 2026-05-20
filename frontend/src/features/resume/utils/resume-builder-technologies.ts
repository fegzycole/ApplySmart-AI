export function formatTechnologyInput(technologies: string[]) {
  return technologies.join(", ");
}

export function parseTechnologyInput(value: string) {
  return value
    .split(/[\n,]/)
    .map((technology) => technology.trim())
    .filter(Boolean);
}
