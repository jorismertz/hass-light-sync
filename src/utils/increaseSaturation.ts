import { HSLToRGB, RGBToHSL } from "./rgbToHsl";

export function increaseSaturation(amount: number, color: number[]) {
  const hsl = RGBToHSL(color[0], color[1], color[2]);
  hsl[1] += amount;
  const rgb = HSLToRGB(hsl[0], hsl[1], hsl[2]);
  return rgb;
}
