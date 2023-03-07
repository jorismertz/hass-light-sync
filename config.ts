import type { Config } from "./src/types";
import { HASS_KEY } from "./secrets";

export const configuration: Config = {
  verbose: true,
  display: {
    width: 2560,
    height: 1440,
  },
  zones: [2],
  dryRun: false,

  homeAssistant: {
    host: "http://192.168.0.109:8123/",
    key: HASS_KEY,
    entities: ["bureau_links", "bureau"],
  },
  imageProcessing: {
    method: "average",
    blur: 25,
  },
  colorMethod: {
    average: {
      saturationBoost: 30,
    },
  },
};
