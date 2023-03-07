import { setLightColor } from "./utils/setLightColor";
import { getZoneColors } from "./utils/getZoneColors";

import type { RgbColor } from "./types";
import { configuration } from "../config";

function syncLightsToScreen(colors: RgbColor[]) {
  if (configuration.dryRun) return;
  configuration.homeAssistant.entities.forEach(async (entity, i) => {
    const hasPrefix = entity.startsWith("light.");
    await setLightColor(colors[i], hasPrefix ? entity : `light.${entity}`);
  });
}

function startLoop() {
  setTimeout(async function () {
    const colors = await getZoneColors(
      configuration?.imageProcessing?.method || "vibrant",
      configuration?.imageProcessing?.emitImages || false
    );

    syncLightsToScreen(colors);
    startLoop();
  }, 600);
}

startLoop();
