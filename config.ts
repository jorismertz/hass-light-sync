import type { Config } from "./src/types";
import { HASS_KEY } from "./secrets";

export const configuration: Config = {
  // Enables verbose logging
  verbose: true,
  // How often the lights should sync to the display in milliseconds
  // Lowering this value could result in higher usage.
  cycleInterval: 600,
  // Resolution of your main display which the lights will sync to.
  display: {
    width: 2560,
    height: 1440,
  },
  // Each entry in this array is a row, the value of the entry is the amount of columns
  // This example would be layed out like this:
  // xx xx
  // x x x
  // Each x represent a zone which controls an entity
  // zones: [2, 3],
  zones: [2],
  // Allows for testing of color picking without actually sending data to home assistant
  dryRun: false,

  homeAssistant: {
    // Make sure you have a trailing slash.
    host: "http://192.168.0.109:8123/",
    // Long lived access token for home assistant
    key: HASS_KEY,
    // either use the full id: "light.bureau" for example, or just the name: "bureau"
    // Should be in order of zones (left to right / top to bottom)
    // entities: ["bureau_links", "bureau", "kast", "bed", "bed_links"],
    entities: ["bureau_links", "bureau"],
  },
  imageProcessing: {
    method: "vibrant",
    // Increasing blur will reduce sensity to small brightly colored details
    blur: 25,
    // For debugging purposes, this will emit images of the zones to the screenshots folder
    // Make sure to create a /screenshots folder in the root of the project
    emitImages: true, // Make sure to disable this when building!
    // Max amount of r / g / b value change before the light will update
    rgbChangeThreshold: 5,
  },
  // Options for the image processing method
  colorMethod: {
    vibrant: {
      // Vibrant generates a few different color pallete's
      // in my experience, darkvibrant gives the best result
      pallete: "DarkVibrant",
    },
  },
};
