import { configuration } from "../../config";

// This function check for each rgb value if one of the r, g or b values has changed more than the threshold
export function checkForColorChanges(data: number[][]) {
  return data.map((row) => {
    return row.some((value) => {
      return value > (configuration?.imageProcessing?.rgbChangeThreshold || 5);
    });
  });
}
