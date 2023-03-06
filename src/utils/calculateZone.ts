import type { XDimension, Zone, Config } from "../types";

export function getColumnCoords(columnAmount: number, screenWidth: number) {
  const zones: XDimension[] = [];

  for (let i = 0; i < columnAmount; i++) {
    zones.push({
      left: Math.floor((screenWidth / columnAmount) * i),
      width: Math.floor(screenWidth / columnAmount),
    });
  }

  return zones;
}

function getRowCoords(
  rowAmount: number,
  rowIndex: number,
  screenHeight: number
) {
  return {
    top: Math.floor((screenHeight / rowAmount) * rowIndex),
    height: Math.floor(screenHeight / rowAmount),
  };
}

export function getZoneCoords(config: Config) {
  const data: Zone[] = [];

  config.zones.forEach((row, index) => {
    const rowPos = getRowCoords(
      config.zones.length,
      index,
      config.display.height
    );
    const columnPos = getColumnCoords(row, config.display.width);

    const res = columnPos.map((column) => {
      return {
        ...column,
        ...rowPos,
      };
    });
    data.push(...res);
  });

  return data;
}
