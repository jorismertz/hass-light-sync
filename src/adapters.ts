import vibrant from "node-vibrant";
import type { RgbColor, AdapterReturnType } from "./types";
import { getAverageColor } from "fast-average-color-node";
import { configuration } from "../config";
import { increaseSaturation } from "./utils/increaseSaturation";

// Adapters are functions that take an image buffer and return a rgb color
// To allow for custom configuration options add a matching type below for your adapter

export const adapters = {
  vibrant: async (image: Buffer): AdapterReturnType => {
    const vibrantColor = await vibrant.from(image).getPalette();

    const prefferedColorPalette =
      configuration?.colorMethod?.vibrant?.pallete || "DarkVibrant";

    return vibrantColor[prefferedColorPalette]?.rgb.map((e) =>
      Math.floor(e)
    ) as RgbColor;
  },
  average: async (image: Buffer): AdapterReturnType => {
    const averageColor = await getAverageColor(image);
    const parsedRgbValue = averageColor.value.map((e) => Math.floor(e));

    const saturationBoost =
      configuration?.colorMethod?.average?.saturationBoost || 20;
    const saturated = increaseSaturation(saturationBoost, parsedRgbValue);

    return saturated as RgbColor;
  },
};

export interface AdapterConfig {
  vibrant?: {
    pallete:
      | "Vibrant"
      | "DarkVibrant"
      | "LightVibrant"
      | "Muted"
      | "DarkMuted"
      | "LightMuted";
  };
  average?: {
    saturationBoost?: number;
  };
}
