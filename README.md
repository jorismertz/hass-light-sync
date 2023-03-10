# Home Assistant Light Sync
Hue Sync alike program for homeassistant light entities.

⚠️ This will not work with DRM protected content ⚠️

## Install
```bash
git clone https://github.com/jorismertz/hass-light-sync
cd hass-light-sync
npm install
npm run build # Make sure to edit the configuration before building.
```

## Configuration

*secrets.ts*
```typescript
export const HASS_KEY = "abcdefg"
```

*config.ts*
```typescript
import type { Config } from "./src/types";
import { HASS_KEY } from "./secrets";

export const configuration: Config = {
  // Enables verbose logging
  verbose: true, // *optional*
  // How often the lights should sync to the display in milliseconds
  // Lowering this value could result in higher usage.
  cycleInterval: 600, // *optional*
  // Resolution of your main display which the lights will sync to.
  display: {
    // Index of display you want to sync
    index: 0, // *optional*
    width: 2560,
    height: 1440,
  },
  // Each entry in this array is a row, the value of the entry is the amount of columns
  // This example would be layed out like this:
  // xx xx
  // x x x
  // Each x represent a zone which controls an entity
  zones: [2, 3],
  // Allows for testing of color picking without actually sending data to home assistant
  dryRun: false, // *optional*

  homeAssistant: {
    // Make sure you have a trailing slash.
    host: "http://192.168.0.109:8123/",
    // Long lived access token for home assistant
    key: HASS_KEY,
    // either use the full id: "light.bureau" for example, or just the name: "bureau"
    // Arrays of entity id's will be treated as a group. This way you can map multiple lights to a single zone.
    entities: ["bureau", "bureau_links", "kast", "bed", "bed_links"],
  },
  imageProcessing: {
    method: "average", // *optional*
    // Setting a higher value here makes the lights less sensitive to small bright colors
    blur: 20, // *optional*
    // For debugging purposes, this will emit images of the zones to the screenshots folder
    // Make sure to create a /screenshots folder in the root of the project
    emitImages: false, // Make sure to disable this when building! *optional*
  },
  // Options for the image processing method
  colorMethod: {
    vibrant: {
      // Vibrant generates a few different color pallete's
      // in my experience, darkvibrant gives the best result
      pallete: "DarkVibrant", // *optional*
    },
    average: {
      // Average has more accurate results but colors are less saturated
      // Define the percentage to boost the saturation here
      saturationBoost: 25 // *optional*
    }
  },
};
```

## Usage
```bash
# Run it with ts-node
npm run dev

# Run compiled javascript 
npm run start
```

## To-Do / Planned features
- [x] Cancel requests if previous rgb value isn't changed enough
- [x] Limit Light brightness at brighter/whiter color values
- [ ] Automatically grab display resolution
- [ ] Allow for multiple entertainment / display configurations
- [ ] Refactor into cli tool for ease of use
- [ ] Move over to websocket instead of http calls
- [ ] Fix lights turning blue on black screen