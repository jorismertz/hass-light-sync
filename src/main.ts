import { setLightColor } from "./utils/setLightColor.js";
import { getZoneColors } from "./utils/getZoneColors.js";

import type { RgbColor } from "./types";
import { configuration } from "../config.js";

function syncLightsToScreen(colors: RgbColor[]) {
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
