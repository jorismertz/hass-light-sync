import type { RgbColor } from "../types";
import { brightnessByColor } from "./getBrightnessByColor";
import { rgbToHex } from "./rgbToHex";

export function getBrightnessAdjustments(color: RgbColor) {
  const hexValue = rgbToHex(color[0], color[1], color[2]);
  const brightness = brightnessByColor(hexValue);
  const brightnessAdjustment = 255 - (brightness || 85);
  return Math.floor((brightnessAdjustment / 255) * 100);
}
