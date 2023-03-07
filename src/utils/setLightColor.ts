import { configuration } from "../../config";
import axios from "axios";

import type { RgbColor } from "../types";
import { getBrightnessAdjustments } from "./getBrightnessAdjustments";
import { log } from "./logger";

export async function setLightColor(rgb_color: RgbColor, entity_id: string) {
  const key = configuration.homeAssistant.key;
  if (!key) throw new Error("No key provided");

  const brightness = getBrightnessAdjustments(rgb_color);

  log(
    `Setting light ${entity_id} to color ${rgb_color}, brightness ${brightness}`,
    {
      verboseOnly: true,
    }
  );

  // Axios is used because standard node fetch isn't supported here.
  await axios.post(
    configuration.homeAssistant.host + "api/services/light/turn_on",
    {
      brightness_pct: brightness,
      transition: 1,
      entity_id,
      rgb_color,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + key,
      },
    }
  );
}
