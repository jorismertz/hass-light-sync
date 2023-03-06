export type ColorPickingMethods = "average" | "vibrant";
export type RgbColor = [number, number, number];

export type YDimension = {
  top: number;
  height: number;
};

export type XDimension = {
  left: number;
  width: number;
};

export interface Zone extends YDimension, XDimension {}

type Display = {
  width: number;
  height: number;
};

type HomeAssistantConfig = {
  host: string;
  key?: string;
  entities: string[];
};

type ImageProcessingConfig = {
  method?: ColorPickingMethods;
  blur?: number;
  emitImages?: boolean;
};

export interface Config {
  display: Display;
  zones: number[];
  homeAssistant: HomeAssistantConfig;
  imageProcessing?: ImageProcessingConfig;
}
