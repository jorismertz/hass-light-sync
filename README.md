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
*config.ts*
```typescript
export const configuration: Config = {
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
  zones: [2, 3],
  homeAssistant: {
    // Make sure you have a trailing slash.
    host: "http://192.168.0.109:8123/",
    // Long lived access token for home assistant
    key: HASS_KEY,
    // either use the full id: "light.bureau" for example, or just the name: "bureau"
    entities: ["bureau", "bureau_links", "kast", "bed", "bed_links"],
  },
  imageProcessing: {
    method: "vibrant",
    blur: 20,
    // For debugging purposes, this will emit images of the zones to the screenshots folder
    // Make sure to create a /screenshots folder in the root of the project
    emitImages: false, // Make sure to disable this when building!
  },
};
```
*secrets.ts*
```typescript
export const HASS_KEY = "abcdefg"
```

## Usage
```bash
npm run start # or npm run dev to run without building
```
