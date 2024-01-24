import { CloudLayer, SunsetLayer } from "./config";

export function randFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomSunsetColor(): [number, number, number] {
  return [randInt(100, 255), randInt(100, 240), randInt(100, 255)];
}

export function randSunsetLayers(): SunsetLayer[] {
  const sunsetLayers: SunsetLayer[] = [];
  const n = randInt(1, 10);
  for (let i = 0; i < n; i++) {
    const layer: SunsetLayer = {
      color: randomSunsetColor(),
      maxOpacity: randFloat(0.2, 1),
      proportion: randFloat(0.2, 1),
      mutationSpeed: randInt(1, 3),
      xStretch: randFloat(0.2, 1.2), // >1 (thinner), <1 (wider)
      yStretch: randFloat(0.7, 1.5), // >1 (shorter), <1 (taller)
    };
    sunsetLayers.push(layer);
  }
  return sunsetLayers;
}

function randomCloudColor(): [number, number, number] {
  return [randInt(200, 255), randInt(200, 255), randInt(200, 255)];
}

export function randCloudLayers(): CloudLayer[] {
  const cloudLayers: CloudLayer[] = [];
  const n = randInt(1, 25);
  for (let i = 0; i < n; i++) {
    const layer: CloudLayer = {
      color: randomCloudColor(),
      opacity: randFloat(0.05, 0.5),
      minSize: randInt(500, 1000),
      maxSize: randInt(5000, 50000),
      pH: randFloat(0.5, 0.9), // Probability of horizontal expansion
      pV: randFloat(0.1, 0.5), // Probability of vertical expansion
    };
    cloudLayers.push(layer);
  }
  return cloudLayers;
}

export function randBool() {
  return Math.random() < 0.5;
}

export function randMutationStyle() {
  const styles = [
    "Color spread",
    "Random",
    "Point spread",
    "Point spread wavy",
    "Horizontal",
    "Vertical",
    "Diagonal",
  ];
  return styles[randInt(0, styles.length - 1)];
}
