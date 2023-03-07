// For later implementation

import screenshotDesktop from "screenshot-desktop";
//@ts-expect-error
import sharp from "sharp";

export async function getDisplayResolution() {
  const image = await screenshotDesktop();
  const shrp = sharp(image);
  const metadata = await shrp.metadata();
  console.log({ width: metadata.width, height: metadata.height });
  return { width: metadata.width, height: metadata.height };
}
