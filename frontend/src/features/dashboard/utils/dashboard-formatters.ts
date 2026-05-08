export function formatPercent(value: number) {
  return `${Math.round(value)}%`;
}

export function formatCompactCount(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
