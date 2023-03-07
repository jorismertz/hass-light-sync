import Vibrant from "node-vibrant";
import type { RgbColor, AdapterReturnType } from "./types";
import { getAverageColor } from "fast-average-color-node";
import { configuration } from "../config";

export const adapters = {
  vibrant: async (image: Buffer): AdapterReturnType => {
    const vibrantColor = await Vibrant.from(image).getPalette();

    const prefferedColorPalette =
      configuration?.colorMethod?.vibrant?.pallete || "DarkVibrant";

    return vibrantColor[prefferedColorPalette]?.rgb.map((e) =>
      Math.floor(e)
    ) as RgbColor;
  },
  average: async (image: Buffer): AdapterReturnType => {
    const averageColor = await getAverageColor(image);
    const parsedRgbValue = averageColor.value.map((e) => Math.floor(e));

    // Average color returns an array with 4 values, the last being alpha
    parsedRgbValue.pop();

    return parsedRgbValue as RgbColor;
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
}
