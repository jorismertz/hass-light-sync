import { getZoneColors } from "./utils/getZoneColors";
import { syncLightsToDisplay } from "./utils/syncLightsToDisplay";

import { configuration } from "../config";
import { log } from "./utils/logger";

async function cycle() {
  const { method, emitImages } = configuration?.imageProcessing || {};

  const zoneColorArray = await getZoneColors(
    method || "vibrant",
    emitImages || false
  );

  log("Syncing lights to display", { verboseOnly: true });

  syncLightsToDisplay(zoneColorArray);

  log("Appointed zone colors:", { verboseOnly: true, data: zoneColorArray });
}

function nextCycle() {
  setTimeout(async function () {
    await cycle();
    nextCycle();
  }, configuration?.cycleInterval || 600);
}

log("Starting up...", { verboseOnly: false });
nextCycle();
