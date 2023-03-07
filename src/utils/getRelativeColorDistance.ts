import type { RgbColor } from "../types";
import { log } from "./logger";

export function getRelativeColorDistances(
  previousColors: RgbColor[] | undefined,
  currentColors: RgbColor[]
) {
  if (!previousColors) return;

  try {
    const allDistances = previousColors.map((previousColor, i) => {
      return previousColor.map((previousValue, o) => {
        return Math.abs(previousValue - currentColors[i][o]);
      });
    });

    return allDistances;
  } catch (e) {
    log("Error getting relative color distances", {
      verboseOnly: false,
      data: e,
    });
  }
}
