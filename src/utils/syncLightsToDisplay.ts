import { configuration } from "../../config";
import { RgbColor } from "../types";
import { setLightColor } from "./setLightColor";

export function syncLightsToDisplay(colors: RgbColor[]) {
  if (configuration.dryRun) return;
  configuration.homeAssistant.entities.forEach(async (entity, i) => {
    const hasPrefix = entity.startsWith("light.");
    await setLightColor(colors[i], hasPrefix ? entity : `light.${entity}`);
  });
}
