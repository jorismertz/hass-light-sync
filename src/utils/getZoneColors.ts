import screenshot from "screenshot-desktop";

// @ts-ignore
import Tsharp from "sharp";
// Compiler goes crazy if the type is imported from sharp
const sharp = Tsharp as any;

import { getZoneCoords } from "./calculateZone";
import { configuration } from "../../config";

import type { RgbColor, Zone, AvaibleAdapters } from "../types";
import { adapters } from "../adapters";

const zones = getZoneCoords(configuration);

const getDownsizedResolution = (z: Zone) => {
  return {
    width: Math.floor(z.width / 2),
    height: Math.floor(z.height / 2),
  };
};

export async function getZoneColors(
  colorExtractionMethod: AvaibleAdapters = "vibrant",
  emitImages = false
) {
  const image = await screenshot();

  const colors = zones.map(async (zone, i) => {
    const downsized = getDownsizedResolution(zone);
    const img = sharp(image)
      .extract(zone)
      .blur(configuration?.imageProcessing?.blur || 20)
      .resize(downsized.width, downsized.height);

    if (emitImages) img.toFile(`./screenshots/${i}.png`);

    const imageBuffer = (await img.toBuffer()) as Buffer;
    const color = await adapters[colorExtractionMethod](imageBuffer);

    return color;
  });

  const resolved = await Promise.all(colors);

  return resolved as RgbColor[];
}
