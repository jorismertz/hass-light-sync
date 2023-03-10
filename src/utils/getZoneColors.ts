import screenshot from "screenshot-desktop";

//@ts-expect-error
import sharp from "sharp";

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
  const image = await screenshot({ screen: configuration.display?.index });

  const colors = zones.map(async (zone, i) => {
    const downsized = getDownsizedResolution(zone);

    const img = sharp(image);

    const extractedZone = img
      .extract(zone)
      .blur(configuration?.imageProcessing?.blur || 20)
      .resize(downsized.width, downsized.height);

    if (emitImages) extractedZone.toFile(`./screenshots/${i}.png`);

    const imageBuffer = (await extractedZone.toBuffer()) as Buffer;
    const color = await adapters[colorExtractionMethod](imageBuffer);

    return color;
  });

  const resolved = await Promise.all(colors);

  return resolved as RgbColor[];
}
