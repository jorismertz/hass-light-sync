import { getZoneColors } from "./utils/getZoneColors";
import { syncLightsToDisplay } from "./utils/syncLightsToDisplay";

import { configuration } from "../config";

async function cycle() {
  const { method, emitImages } = configuration?.imageProcessing || {};

  const zoneColorArray = await getZoneColors(
    method || "vibrant",
    emitImages || false
  );

  syncLightsToDisplay(zoneColorArray);
}

function nextCycle() {
  setTimeout(async function () {
    await cycle();
    nextCycle();
  }, configuration?.cycleInterval || 600);
}

nextCycle();
