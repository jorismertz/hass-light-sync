import { adapters, AdapterConfig } from "./adapters";

export type RgbColor = [number, number, number];
export type AvaibleAdapters = keyof typeof adapters;
export type AdapterReturnType = Promise<RgbColor>;

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
  method?: AvaibleAdapters;
  blur?: number;
  emitImages?: boolean;
};

interface ImageProcessingMethodOptions extends AdapterConfig {}

export interface Config {
  verbose?: boolean;
  cycleInterval?: number;
  display: Display;
  zones: number[];
  dryRun?: boolean;
  homeAssistant: HomeAssistantConfig;
  imageProcessing?: ImageProcessingConfig;
  colorMethod?: ImageProcessingMethodOptions;
}
