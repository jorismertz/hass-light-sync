import type { RgbColor } from "../types";

export function getRelativeColorDistances(
  previousColors: RgbColor[] | undefined,
  currentColors: RgbColor[]
) {
  if (!previousColors) return;

  const allDistances = previousColors.map((previousColor, i) => {
    return previousColor.map((previousValue, o) => {
      return Math.abs(previousValue - currentColors[i][o]);
    });
  });

  return allDistances;
}
