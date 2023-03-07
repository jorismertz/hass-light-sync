import { getZoneColors } from "./utils/getZoneColors";
import { syncLightsToDisplay } from "./utils/syncLightsToDisplay";

import { configuration } from "../config";

function startLoop() {
  setTimeout(async function () {
    const { method, emitImages } = configuration?.imageProcessing || {};

    const colors = await getZoneColors(
      method || "vibrant",
      emitImages || false
    );

    syncLightsToDisplay(colors);
    startLoop();
  }, 600);
}

startLoop();
