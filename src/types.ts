import { adapters, AdapterConfig } from "./adapters";

export type RgbColor = [number, number, number];
export type AvaibleAdapters = keyof typeof adapters;
export type AdapterReturnType = Promise<RgbColor>;
export type EntityId = string | string[];
export type Entities = EntityId[];

export type YDimension = {
  top: number;
  height: number;
};

export type XDimension = {
  left: number;
  width: number;
};

export interface Zone extends YDimension, XDimension {}

export type Resolution = {
  width: number;
  height: number;
};

export interface Display extends Resolution {
  index?: number;
}

type HomeAssistantConfig = {
  host: string;
  key?: string;
  entities: Entities;
};

type ImageProcessingConfig = {
  rgbChangeThreshold?: number;
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
