import { configuration } from "../../config";
import { RgbColor } from "../types";
import { setLightColor } from "./setLightColor";
import { getRelativeColorDistances } from "./getRelativeColorDistance";
import { checkForColorChanges } from "./checkForColorChange";

let lastState: RgbColor[] | undefined = undefined;

function addLightEntityPrefix(str: string) {
  if (str.startsWith("light.")) return str;
  return `light.${str}`;
}

export function syncLightsToDisplay(colors: RgbColor[]) {
  if (configuration.dryRun) return;

  const distances = getRelativeColorDistances(lastState, colors);
  const hasChanged = distances
    ? checkForColorChanges(distances)
    : colors.map(() => true);

  configuration.homeAssistant.entities.forEach(async (entity, i) => {
    const entities =
      typeof entity === "string"
        ? addLightEntityPrefix(entity)
        : entity.map(addLightEntityPrefix);

    if (!hasChanged[i]) return;

    await setLightColor(colors[i], entities);
  });

  lastState = colors;
}
