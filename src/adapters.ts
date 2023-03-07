import Vibrant from "node-vibrant";
import type { RgbColor } from "./types";
import { getAverageColor } from "fast-average-color-node";

type AdapterReturnType = Promise<RgbColor>;

export const adapters = {
  vibrant: async (image: Buffer): AdapterReturnType => {
    const vibrantColor = await Vibrant.from(image).getPalette();
    return vibrantColor?.DarkVibrant?.rgb.map((e) => Math.floor(e)) as RgbColor;
  },
  average: async (image: Buffer): AdapterReturnType => {
    const averageColor = await getAverageColor(image);
    const parsedRgbValue = averageColor.value.map((e) => Math.floor(e));

    // Average color returns an array with 4 values, the last being alpha
    parsedRgbValue.pop();

    return parsedRgbValue as RgbColor;
  },
};
