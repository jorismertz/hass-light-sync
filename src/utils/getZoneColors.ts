import { getAverageColor } from "fast-average-color-node";
import screenshot from "screenshot-desktop";
import vibrant from "node-vibrant";

// Compiler goes crazy if the type is imported from sharp
// @ts-ignore
import Tsharp from "sharp";
const sharp = Tsharp as any;

import { getZoneCoords } from "./calculateZone.js";
import { configuration } from "../../config.js";

import type { ColorPickingMethods, RgbColor, Zone } from "../types";

const zones = getZoneCoords(configuration);

const getSmall = (z: Zone) => {
  return {
    width: Math.floor(z.width / 2),
    height: Math.floor(z.height / 2),
  };
};

export async function getZoneColors(
  method: ColorPickingMethods = "vibrant",
  emitImages = false
) {
  const image = await screenshot();

  const colors = zones.map(async (zone, i) => {
    const downsized = getSmall(zone);
    const img = sharp(image)
      .extract(zone)
      .blur(configuration?.imageProcessing?.blur || 20)
      .resize(downsized.width, downsized.height);

    if (emitImages) img.toFile(`./screenshots/${i}.png`);

    const buf = (await img.toBuffer()) as Buffer;

    const vibrantColor = await vibrant.from(buf).getPalette();
    const averageColor = await getAverageColor(buf);

    const averageRgb = averageColor.value.map((e) => Math.floor(e));
    averageRgb.pop();
    const vibrantRgb = vibrantColor?.DarkVibrant?.rgb.map((e) => Math.floor(e));

    // Provide a fallback if vibrant color isn't provided
    if (method === "vibrant" && !vibrantRgb) return averageRgb;
    return method === "average" ? averageRgb : vibrantRgb;
  });

  const resolved = await Promise.all(colors);

  return resolved as RgbColor[];
}
