import { configuration } from "../../config";
import { RgbColor } from "../types";
import { setLightColor } from "./setLightColor";
import { getRelativeColorDistances } from "./getRelativeColorDistance";
import { checkForColorChanges } from "./checkForColorChange";
import { log } from "./logger";

let lastState: RgbColor[] | undefined = undefined;

export function syncLightsToDisplay(colors: RgbColor[]) {
  if (configuration.dryRun) return;

  const distances = getRelativeColorDistances(lastState, colors);
  const hasChanged = distances
    ? checkForColorChanges(distances)
    : colors.map(() => true);

  configuration.homeAssistant.entities.forEach(async (entity, i) => {
    const hasPrefix = entity.startsWith("light.");

    if (!hasChanged[i]) return;

    log(`Setting light ${entity} to color ${colors[i]}`, { verboseOnly: true });

    await setLightColor(colors[i], hasPrefix ? entity : `light.${entity}`);
  });

  lastState = colors;
}
