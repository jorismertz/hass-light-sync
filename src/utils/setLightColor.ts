import { configuration } from "../../config";
import axios from "axios";

import type { RgbColor } from "../types";



export async function setLightColor(rgb_color: RgbColor, entity_id: string) {
  const key = configuration.homeAssistant.key;
  if (!key) throw new Error("No key provided");
  // Axios is used because standard node fetch isn't supported here.
  await axios.post(
    configuration.homeAssistant.host + "api/services/light/turn_on",
    {
      entity_id,
      rgb_color,
      transition: 1,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + key,
      },
    }
  );
}
