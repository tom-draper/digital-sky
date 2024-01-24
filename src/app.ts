import TupleSet from "./tuple-set";
import { randInt } from "./generate";
import {
  initDefaults,
  randConfig,
  toggleProperties,
  addSunsetLayer,
  addCloudsLayer,
  userConfig,
  type CanvasDimensions,
  Config,
  SkyConfig,
  SunsetConfig,
  SunsetLayer,
  CloudLayer,
  MoonConfig,
  StarsConfig,
  CloudsConfig,
} from "./config";

if (typeof window !== "undefined") {
  // Expose UI trigger functions to the browser
  //@ts-ignore
  window.run = run;
  //@ts-ignore
  window.toggleProperties = toggleProperties;
  //@ts-ignore
  window.addSunsetLayer = addSunsetLayer;
  //@ts-ignore
  window.addCloudsLayer = addCloudsLayer;

  initDefaults();
}

function formatColor(r: number, g: number, b: number, a: number): string {
  return `rgba(${r},${g},${b},${a})`;
}

type Color = [number, number, number, number];

function mutateColor(color: Color, p: number, step: number = 1): Color {
  if (Math.random() < p) {
    const mutatedColor = Object.values(color) as Color;
    switch (randInt(0, 5)) {
      case 0:
        mutatedColor[0] = Math.min(color[0] + step, 255);
        break;
      case 1:
        mutatedColor[1] = Math.min(color[1] + step, 255);
        break;
      case 2:
        mutatedColor[2] = Math.min(color[2] + step, 255);
        break;
      case 3:
        mutatedColor[0] = Math.max(color[0] - step, 0);
        break;
      case 4:
        mutatedColor[1] = Math.max(color[1] - step, 0);
        break;
      case 5:
        mutatedColor[2] = Math.max(color[2] - step, 0);
        break;
    }
    return mutatedColor;
  }

  return color;
}

function mutateColorInPlace(color: Color, p: number, step: number = 1) {
  if (Math.random() < p) {
    /// Modifies the original starting color
    switch (randInt(0, 5)) {
      case 0:
        color[0] = Math.min(color[0] + step, 255);
        break;
      case 1:
        color[1] = Math.min(color[1] + step, 255);
        break;
      case 2:
        color[2] = Math.min(color[2] + step, 255);
        break;
      case 3:
        color[0] = Math.max(color[0] - step, 0);
        break;
      case 4:
        color[1] = Math.max(color[1] - step, 0);
        break;
      case 5:
        color[2] = Math.max(color[2] - step, 0);
        break;
    }
  }
}

function colorSpreadBottom(
  x: number,
  y: number,
  h: number,
  color: Color,
  seen: TupleSet,
  toPaint: [number, number, Color][]
) {
  if (y < h - 1 && !seen.has([x, y + 1])) {
    toPaint.push([x, y + 1, color]);
    seen.add([x, y + 1]);
  }
}

function colorSpreadRight(
  x: number,
  y: number,
  w: number,
  color: Color,
  seen: TupleSet,
  toPaint: [number, number, Color][]
) {
  if (x < w - 1 && !seen.has([x + 1, y])) {
    toPaint.push([x + 1, y, color]);
    seen.add([x + 1, y]);
  }
}

function colorSpreadTop(
  x: number,
  y: number,
  color: Color,
  seen: TupleSet,
  toPaint: [number, number, Color][]
) {
  if (y > 0 && !seen.has([x, y - 1])) {
    toPaint.push([x, y - 1, color]);
    seen.add([x, y - 1]);
  }
}

function colorSpreadLeft(
  x: number,
  y: number,
  color: Color,
  seen: TupleSet,
  toPaint: [number, number, Color][]
) {
  if (x > 0 && !seen.has([x - 1, y])) {
    toPaint.push([x - 1, y, color]);
    seen.add([x - 1, y]);
  }
}

function colorSpreadTopLeft(
  x: number,
  y: number,
  color: Color,
  seen: TupleSet,
  toPaint: [number, number, Color][]
) {
  if (x > 0 && y > 0 && !seen.has([x - 1, y - 1])) {
    toPaint.push([x - 1, y - 1, color]);
    seen.add([x - 1, y - 1]);
  }
}

function colorSpreadBottomLeft(
  x: number,
  y: number,
  h: number,
  color: Color,
  seen: TupleSet,
  toPaint: [number, number, Color][]
) {
  if (x > 0 && y < h - 1 && !seen.has([x - 1, y + 1])) {
    toPaint.push([x - 1, y + 1, color]);
    seen.add([x - 1, y + 1]);
  }
}

function colorSpreadTopRight(
  x: number,
  y: number,
  w: number,
  color: Color,
  seen: TupleSet,
  toPaint: [number, number, Color][]
) {
  if (x < w - 1 && y > 0 && !seen.has([x + 1, y - 1])) {
    toPaint.push([x + 1, y - 1, color]);
    seen.add([x + 1, y - 1]);
  }
}

function colorSpreadBottomRight(
  x: number,
  y: number,
  dimensions: CanvasDimensions,
  color: Color,
  seen: TupleSet,
  toPaint: [number, number, Color][]
) {
  if (
    x < dimensions.width - 1 &&
    y < dimensions.height - 1 &&
    !seen.has([x + 1, y + 1])
  ) {
    toPaint.push([x + 1, y + 1, color]);
    seen.add([x + 1, y + 1]);
  }
}

/*
 * Color appears drawn out from the starting point.
 */
function colorSpread8Dir(
  x: number,
  y: number,
  dimensions: CanvasDimensions,
  color: Color,
  seen: TupleSet,
  toPaint: [number, number, Color][]
) {
  colorSpreadBottom(x, y, dimensions.height, color, seen, toPaint);
  colorSpreadRight(x, y, dimensions.width, color, seen, toPaint);
  colorSpreadTop(x, y, color, seen, toPaint);
  colorSpreadLeft(x, y, color, seen, toPaint);
  colorSpreadTopLeft(x, y, color, seen, toPaint);
  colorSpreadBottomLeft(x, y, dimensions.height, color, seen, toPaint);
  colorSpreadTopRight(x, y, dimensions.width, color, seen, toPaint);
  colorSpreadBottomRight(x, y, dimensions, color, seen, toPaint);
}

function colorSpread4Dir(
  x: number,
  y: number,
  dimensions: CanvasDimensions,
  color: Color,
  seen: TupleSet,
  toPaint: [number, number, Color][]
) {
  colorSpreadBottom(x, y, dimensions.height, color, seen, toPaint);
  colorSpreadRight(x, y, dimensions.width, color, seen, toPaint);
  colorSpreadTop(x, y, color, seen, toPaint);
  colorSpreadLeft(x, y, color, seen, toPaint);
}

/*
 * Picks a random starting pixel, and adds its 8 neighbours to the pool of pixels
 * to be randomly selected next iteration whilst mutating the brush color each iteration.
 */
function colorSpread(
  grid: Grid,
  skyConfig: SkyConfig,
  dimensions: CanvasDimensions
) {
  const seen = new TupleSet();
  const toPaint: [number, number, Color][] = [];

  const mutationSpeed = skyConfig.properties.mutationSpeed;

  const startColor: Color = [
    ...skyConfig.properties.color,
    skyConfig.properties.opacity,
  ];

  const start: [number, number] = [
    randInt(0, dimensions.width - 1),
    randInt(0, dimensions.height - 1),
  ];
  toPaint.push([start[0], start[1], startColor]);
  seen.add(start);

  let x, y, color;
  for (let i = 0; i < dimensions.width * dimensions.height; i++) {
    [x, y, color] = nextPixel(toPaint);
    grid.get(y).set(x, [
      {
        type: "sky",
        color: color,
      },
    ]);

    colorSpread8Dir(
      x,
      y,
      dimensions,
      mutateColor(color, mutationSpeed),
      seen,
      toPaint
    );
  }
}

/*
 * Picks a random starting pixel, and adds its 8 neighbours to the pool of pixels
 * to be randomly selected next iteration whilst mutating the brush color each iteration.
 */
function colorPointSpreadWavy(
  grid: Grid,
  skyConfig: SkyConfig,
  dimensions: CanvasDimensions
) {
  const seen = new TupleSet();
  const toPaint: [number, number, Color][] = [];

  const mutationSpeed = skyConfig.properties.mutationSpeed;

  let color: Color = [
    ...skyConfig.properties.color,
    skyConfig.properties.opacity,
  ];

  const start: [number, number] = [
    randInt(0, dimensions.width - 1),
    randInt(0, dimensions.height - 1),
  ];
  toPaint.push([start[0], start[1], color]);
  seen.add(start);

  for (let i = 0; i < dimensions.width * dimensions.height; i++) {
    const [x, y, _] = nextPixel(toPaint);
    color = mutateColor(color, mutationSpeed);
    grid.get(y).set(x, [
      {
        type: "sky",
        color: color,
      },
    ]);

    colorSpread8Dir(x, y, dimensions, null, seen, toPaint);
  }
}

function nextClosestPixel(
  toPaint: [x: number, y: number, color?: Color][],
  centre: [x: number, y: number]
): [x: number, y: number, color?: Color] {
  let idx = 0;
  let d = Number.POSITIVE_INFINITY;
  for (let i = 0; i < toPaint.length; i++) {
    const dist = distance(toPaint[i][0], toPaint[i][1], centre[0], centre[1]);
    if (dist < d) {
      d = dist;
      idx = i;
    }
  }

  /* Select and remove random pixel from toPaint list
  Achieved by moving random element to the end and using .pop() -> for 720p 
  image, found to be 10X faster than Array.splice on the random index. */
  [toPaint[idx], toPaint[toPaint.length - 1]] = [
    toPaint[toPaint.length - 1],
    toPaint[idx],
  ];
  const next = toPaint.pop();
  return next;
}

/*
 * Picks a random starting pixel, and adds its 8 neighbours to the pool of pixels
 * to be selected next iteration. The closest pixel to the starting point is selected next.
 */
function colorPointSpread(
  grid: Grid,
  skyConfig: SkyConfig,
  dimensions: CanvasDimensions
) {
  const seen = new TupleSet();
  const toPaint: [number, number, null][] = [];

  const mutationSpeed = skyConfig.properties.mutationSpeed;

  let color: Color = [
    ...skyConfig.properties.color,
    skyConfig.properties.opacity,
  ];

  const start: [number, number] = [
    randInt(0, dimensions.width - 1),
    randInt(0, dimensions.height - 1),
  ];
  toPaint.push([start[0], start[1], null]);
  seen.add(start);

  for (let i = 0; i < dimensions.width * dimensions.height; i++) {
    const [x, y, _] = nextClosestPixel(toPaint, start);
    color = mutateColor(color, mutationSpeed);
    grid.get(y).set(x, [
      {
        type: "sky",
        color: color,
      },
    ]);

    colorSpread8Dir(x, y, dimensions, null, seen, toPaint);
  }
}

/*
 * Picks a random starting pixel, and adds its 8 neighbours to the queue from
 * a pixel is popped each iteration.
 */
function colorSpreadQueue(
  grid: Grid,
  skyConfig: SkyConfig,
  colorSpreadFunc: (
    x: number,
    y: number,
    dimensions: CanvasDimensions,
    color: Color,
    seen: TupleSet,
    toPaint: [number, number, Color][]
  ) => void,
  dimensions: CanvasDimensions
) {
  const seen = new TupleSet();
  const toPaint: [number, number, Color][] = [];

  const mutationSpeed = skyConfig.properties.mutationSpeed;

  const startColor: Color = [
    ...skyConfig.properties.color,
    skyConfig.properties.opacity,
  ];

  const start: [number, number] = [
    randInt(0, dimensions.width - 1),
    randInt(0, dimensions.height - 1),
  ];
  toPaint.push([start[0], start[1], startColor]);
  seen.add(start);

  let x, y, color;
  for (let i = 0; i < dimensions.width * dimensions.height; i++) {
    [x, y, color] = toPaint.pop();

    grid.get(y).set(x, [
      {
        type: "sky",
        color: color,
      },
    ]);

    colorSpreadFunc(
      x,
      y,
      dimensions,
      mutateColor(color, mutationSpeed),
      seen,
      toPaint
    );
  }
}

/*
 * Pick random pixels across the entire image whilst mutating the brush color
 * to creates a noise effect.
 */
function colorRandom(
  grid: Grid,
  skyConfig: SkyConfig,
  dimensions: CanvasDimensions
) {
  const pixels = [];
  for (let y = 0; y < dimensions.height; y++) {
    for (let x = 0; x < dimensions.width; x++) {
      pixels.push([x, y]);
    }
  }
  shuffleArray(pixels);

  let color: Color = [
    ...skyConfig.properties.color,
    skyConfig.properties.opacity,
  ];

  const mutationSpeed = skyConfig.properties.mutationSpeed;

  for (let i = 0; i < dimensions.width * dimensions.height; i++) {
    const [x, y] = pixels.pop();
    grid.get(y).set(x, [
      {
        type: "sky",
        color: color,
      },
    ]);
    color = mutateColor(color, mutationSpeed);
  }
}

function shuffleArray(arr: any[]) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

type Pixel = {
  type: string;
  color: Color;
};

function colorHorizontal(
  x: number,
  y: number,
  dimensions: CanvasDimensions,
  color: Color,
  seen: TupleSet,
  toPaint: [number, number, Color][]
) {
  colorSpreadTop(x, y, color, seen, toPaint);
  colorSpreadBottom(x, y, dimensions.height, color, seen, toPaint);
  colorSpreadLeft(x, y, color, seen, toPaint);
  colorSpreadRight(x, y, dimensions.width, color, seen, toPaint);
}

function colorDiagonal(
  x: number,
  y: number,
  dimensions: CanvasDimensions,
  color: Color,
  seen: TupleSet,
  toPaint: [number, number, Color][]
) {
  colorSpreadBottom(x, y, dimensions.height, color, seen, toPaint);
  colorSpreadRight(x, y, dimensions.width, color, seen, toPaint);
  colorSpreadTop(x, y, color, seen, toPaint);
  colorSpreadLeft(x, y, color, seen, toPaint);
  colorSpreadTopLeft(x, y, color, seen, toPaint);
  colorSpreadBottomLeft(x, y, dimensions.height, color, seen, toPaint);
  colorSpreadTopRight(x, y, dimensions.width, color, seen, toPaint);
  colorSpreadBottomRight(x, y, dimensions, color, seen, toPaint);
}

function colorVertical(
  x: number,
  y: number,
  dimensions: CanvasDimensions,
  color: Color,
  seen: TupleSet,
  toPaint: [number, number, Color][]
) {
  colorSpreadLeft(x, y, color, seen, toPaint);
  colorSpreadRight(x, y, dimensions.width, color, seen, toPaint);
  colorSpreadTop(x, y, color, seen, toPaint);
  colorSpreadBottom(x, y, dimensions.height, color, seen, toPaint);
}

function paintSky(
  grid: Grid,
  skyConfig: SkyConfig,
  dimensions: CanvasDimensions
) {
  const mutationStyle = skyConfig.properties.mutationStyle;
  switch (mutationStyle) {
    case "Color spread":
      colorSpread(grid, skyConfig, dimensions);
      break;
    case "Random":
      colorRandom(grid, skyConfig, dimensions);
      break;
    case "Point spread":
      colorPointSpread(grid, skyConfig, dimensions);
      break;
    case "Point spread wavy":
      colorPointSpreadWavy(grid, skyConfig, dimensions);
      break;
    case "Horizontal":
      colorSpreadQueue(grid, skyConfig, colorHorizontal, dimensions);
      break;
    case "Vertical":
      colorSpreadQueue(grid, skyConfig, colorVertical, dimensions);
      break;
    case "Diagonal":
      colorSpreadQueue(grid, skyConfig, colorDiagonal, dimensions);
      break;
  }
}

function inRange(cloudSize: number, sizeRange: [number, number]): boolean {
  return cloudSize <= sizeRange[0] && cloudSize <= sizeRange[1];
}

function continueExpanding(
  p: number,
  cloudSize: number,
  sizeRange: [number, number]
): boolean {
  // If we roll the probability OR we haven't reached the min cloud size yet
  // AND we've not exceeded the maximum
  return (
    cloudSize < sizeRange[1] && (cloudSize < sizeRange[0] || Math.random() < p)
  );
}

function cloudsSpread(
  x: number,
  y: number,
  color: Color,
  seen: TupleSet,
  toPaint: [number, number, Color][],
  cloudSize: number,
  sizeRange: [number, number],
  pH: number,
  pV: number,
  dimensions: CanvasDimensions
) {
  if (continueExpanding(pV, cloudSize, sizeRange)) {
    if (y < dimensions.height - 1 && !seen.has([x, y + 1])) {
      seen.add([x, y + 1]);
      toPaint.push([x, y + 1, color]);
      cloudSize += 1;
    }
    if (y > 0 && !seen.has([x, y - 1])) {
      seen.add([x, y - 1]);
      toPaint.push([x, y - 1, color]);
      cloudSize += 1;
    }
  }
  if (continueExpanding(pH, cloudSize, sizeRange)) {
    if (x < dimensions.width - 1 && !seen.has([x + 1, y])) {
      seen.add([x + 1, y]);
      toPaint.push([x + 1, y, color]);
      cloudSize += 1;
    }

    if (x > 0 && !seen.has([x - 1, y])) {
      seen.add([x - 1, y]);
      toPaint.push([x - 1, y, color]);
      cloudSize += 1;
    }
  }

  return cloudSize;
}

function createCloudPixel(color: Color) {
  const cloudPixel = document.createElement("div");
  cloudPixel.className = "pixel cloud";
  cloudPixel.style.background = formatColor(...color);
  return cloudPixel;
}

function nextPixel(
  toPaint: [x: number, y: number, color?: Color][]
): [x: number, y: number, color?: Color] {
  /* Select and remove random pixel from toPaint list
  Achieved by moving random element to the end and using .pop() -> for 720p 
  image, found to be 10X faster than Array.splice on the random index. */
  const idx = Math.floor(Math.random() * toPaint.length);
  [toPaint[idx], toPaint[toPaint.length - 1]] = [
    toPaint[toPaint.length - 1],
    toPaint[idx],
  ];
  const next = toPaint.pop();
  return next;
}

function addCloudToSky(
  grid: Grid,
  x: number,
  y: number,
  color: Color,
  layer: number
) {
  const [hasCloud, idx] = pixelHasType(grid.get(y).get(x), "cloud" + layer);
  if (hasCloud) {
    grid.get(y).get(x)[idx].color = combineColors(
      color,
      grid.get(y).get(x)[idx].color
    );
  } else {
    grid
      .get(y)
      .get(x)
      .push({ type: "cloud" + layer, color: color });
  }
}

function createCloudBase(
  grid: Grid,
  startColor: Color,
  sizeRange: [number, number],
  pH: number,
  pV: number,
  dimensions: CanvasDimensions
): [number, number] {
  const seen = new TupleSet();
  const toPaint: [number, number, Color][] = [];

  const start: [number, number] = [
    randInt(0, dimensions.width - 1),
    randInt(0, dimensions.height - 1),
  ];
  toPaint.push([start[0], start[1], startColor]);
  seen.add(start);

  let cloudSize = 1;
  while (toPaint.length > 0) {
    const [x, y, color] = nextPixel(toPaint);
    addCloudToSky(grid, x, y, color, 0);

    const nextColor = mutateColor(color, 0.9);
    cloudSize = cloudsSpread(
      x,
      y,
      nextColor,
      seen,
      toPaint,
      cloudSize,
      sizeRange,
      pH,
      pV,
      dimensions
    );
  }

  return start;
}

function pixelHasType(pixel: Pixel[], type: string): [boolean, number] {
  for (let i = 0; i < pixel.length; i++) {
    if (pixel[i].type == type) {
      return [true, i];
    }
  }
  return [false, -1];
}

function addCloudLayer(
  grid: Grid,
  start: [number, number],
  layer: number,
  startColor: Color,
  sizeRange: [number, number],
  pH: number,
  pV: number,
  dimensions: CanvasDimensions
) {
  const seen = new TupleSet();
  const toPaint: [number, number, Color][] = [];

  toPaint.push([start[0], start[1], startColor]);
  seen.add(start);

  let currentSize = 1;
  while (toPaint.length > 0) {
    const [x, y, color] = nextPixel(toPaint);
    addCloudToSky(grid, x, y, color, layer);

    const nextColor = mutateColor(color, 0.9);
    currentSize = cloudsSpread(
      x,
      y,
      nextColor,
      seen,
      toPaint,
      currentSize,
      sizeRange,
      pH,
      pV,
      dimensions
    );
  }
}

function createCloud(
  grid: Grid,
  layers: CloudLayer[],
  dimensions: CanvasDimensions
) {
  const start = createCloudBase(
    grid,
    [...layers[0].color, layers[0].opacity],
    [layers[0].minSize, layers[0].maxSize],
    layers[0].pH,
    layers[0].pV,
    dimensions
  );

  for (let i = 1; i < layers.length; i++) {
    addCloudLayer(
      grid,
      start,
      i,
      [...layers[i].color, layers[i].opacity],
      [layers[i].minSize, layers[i].maxSize],
      layers[i].pH,
      layers[i].pV,
      dimensions
    );
  }
}

function createClouds(
  grid: Grid,
  cloudsConfig: CloudsConfig,
  dimensions: CanvasDimensions
) {
  for (let i = 0; i < cloudsConfig.properties.quantity; i++) {
    createCloud(grid, cloudsConfig.properties.layers, dimensions);
  }
}

function createStarPixel(color: Color): HTMLDivElement {
  const starPixel = document.createElement("div");
  starPixel.className = "pixel star";
  starPixel.style.background = formatColor(...color);
  return starPixel;
}

function onSky(x: number, y: number, dimensions: CanvasDimensions): boolean {
  return x >= 0 && y >= 0 && x < dimensions.width && y < dimensions.height;
}

function starColor(opacity: number): Color {
  return [randInt(230, 255), randInt(210, 240), randInt(220, 255), opacity];
}

function createStar(
  x: number,
  y: number,
  dimensions: CanvasDimensions,
  grid: Grid,
  opacity: number
) {
  const color = starColor(opacity);

  try {
    grid
      .get(y)
      .get(x)
      .push({ type: "star", color: color } as Pixel);
  } catch (e) {
    console.log(x, y, e);
  }

  // Probabilistically add additional neighbouring star pixels
  const p = 0.1;
  [
    [x + 1, y],
    [x, y + 1],
    [x - 1, y],
    [x, y - 1],
  ].forEach((coord) => {
    if (Math.random() < p && onSky(coord[0], coord[1], dimensions)) {
      grid.get(coord[1]).get(coord[0]).push({ type: "star", color: color });
    }
  });
}

function createStars(
  grid: Grid,
  starsConfig: StarsConfig,
  dimensions: CanvasDimensions
) {
  const n =
    dimensions.height * dimensions.width * starsConfig.properties.density;
  for (let i = 0; i < n; i++) {
    const x = randInt(0, dimensions.width - 1);
    const y = randInt(0, dimensions.height - 1);
    createStar(x, y, dimensions, grid, starsConfig.properties.opacity);
  }
}

function createSunsetPixel(color: Color): HTMLDivElement {
  const sunsetPixel = document.createElement("div");
  sunsetPixel.className = "pixel sunset";
  sunsetPixel.style.background = formatColor(...color);
  return sunsetPixel;
}

function getRGBValues(str: string): [number, number, number] {
  const vals = str.substring(str.indexOf("(") + 1, str.length - 1).split(", ");
  return [parseInt(vals[0]), parseInt(vals[1]), parseInt(vals[2])];
}

function sunsetSpread(
  x: number,
  y: number,
  dimensions: CanvasDimensions,
  color: Color,
  toPaint: [number, number, Color][],
  seen: TupleSet
) {
  colorSpreadBottom(x, y, dimensions.height, color, seen, toPaint);
  colorSpreadTop(x, y, color, seen, toPaint);
  colorSpreadRight(x, y, dimensions.width, color, seen, toPaint);
  colorSpreadLeft(x, y, color, seen, toPaint);
}

function warpedDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  xStretch: number,
  yStretch: number
): number {
  const x = (y2 - y1) * (1 - yStretch);
  const y = (x2 - x1) * (1 - xStretch);
  return Math.sqrt(x * x + y * y);
}

function combineColors(color1: Color, color2: Color): Color {
  const a1 = color1[3];
  const a2 = color2[3];
  const a = a1 + a2 * (1 - a1);
  const color: Color = [
    (color1[0] * a1 + color2[0] * a2 * (1 - a1)) / a,
    (color1[1] * a1 + color2[1] * a2 * (1 - a1)) / a,
    (color1[2] * a1 + color2[2] * a2 * (1 - a1)) / a,
    a,
  ];
  return color;
}

function addSunsetToSky(grid: Grid, x: number, y: number, color: Color) {
  const [hasSunset, idx] = pixelHasType(grid.get(y).get(x), "sunset");
  if (hasSunset) {
    grid.get(y).get(x)[idx].color = combineColors(
      color,
      grid.get(y).get(x)[idx].color
    );
  } else {
    grid.get(y).get(x).push({ type: "sunset", color: color });
  }
}

function createSunsetLayer(
  grid: Grid,
  layerConfig: SunsetLayer,
  dimensions: CanvasDimensions
) {
  const maxD = dimensions.height * layerConfig.proportion;

  const seen = new TupleSet();
  const toPaint: [number, number, Color][] = [];

  // Select a random pixel to grow the sunset from
  const start: [number, number] = [
    randInt(0, dimensions.width - 1),
    dimensions.height - 1,
  ];
  toPaint.push([start[0], start[1], [...layerConfig.color, 1]]);
  seen.add(start);

  let scale: number;
  let x, y, color;
  while (toPaint.length > 0) {
    [x, y, color] = nextPixel(toPaint);
    scale =
      1 -
      warpedDistance(
        x,
        y,
        start[0],
        start[1],
        layerConfig.xStretch,
        layerConfig.yStretch
      ) /
        maxD;
    if (scale <= 0) {
      continue;
    }
    color[3] = layerConfig.maxOpacity * scale; // Adjust opacity
    try {
      grid.get(y).get(x).push({ type: "sunset", color: color });
    } catch (e) {
      console.log("sunset", x, y, e);
    }

    sunsetSpread(
      x,
      y,
      dimensions,
      mutateColor(color, layerConfig.mutationSpeed),
      toPaint,
      seen
    );
  }
}

function createSunset(
  grid: Grid,
  sunsetConfig: SunsetConfig,
  dimensions: CanvasDimensions
) {
  for (let i = 0; i < sunsetConfig.properties.layers.length; i++) {
    createSunsetLayer(grid, sunsetConfig.properties.layers[i], dimensions);
  }
}

function distance(x1: number, y1: number, x2: number, y2: number): number {
  const x = y2 - y1;
  const y = x2 - x1;
  return Math.sqrt(x * x + y * y);
}

function createMoonPixel(color: Color): HTMLDivElement {
  const moonPixel = document.createElement("div");
  moonPixel.className = "pixel moon";
  moonPixel.style.background = formatColor(...color);
  return moonPixel;
}

function fullMoon(
  grid: Grid,
  toPaint: [number, number][],
  moonConfig: MoonConfig
) {
  let color: Color = [...moonConfig.properties.color, 1];
  while (toPaint.length > 0) {
    const [x, y] = nextPixel(toPaint);
    grid.get(y).get(x).push({ type: "moon", color: color });
    color = mutateColor(color, moonConfig.properties.noise);
  }
}

function halfMoon(
  grid: Grid,
  toPaint: [number, number][],
  moonConfig: MoonConfig,
  start: [number, number]
) {
  const r = moonConfig.properties.radius;
  const position = randInt(0.25 * r, r * 0.9);
  const edge = [
    start[0] - position,
    start[1] - position * Math.min(Math.random(), 0.8),
  ];

  const fadeMargin = randInt(0, 10);
  let color: Color = [...moonConfig.properties.color, 1];

  while (toPaint.length > 0) {
    const [x, y] = nextPixel(toPaint);
    const d = distance(x, y, edge[0], edge[1]);
    if (d >= r) {
      const opacity = Math.min((d - r) / fadeMargin, 1);
      color[3] = opacity;
      grid.get(y).get(x).push({
        type: "moon",
        color: color,
      });
      color = mutateColor(color, moonConfig.properties.noise);
    } else {
      // Remove any star pixels in the darkness of the half moon
      for (let i = 0; i < grid.get(y).get(x).length; i++) {
        if (grid.get(y).get(x)[i].type == "star") {
          grid.get(y).get(x).splice(i, 1);
        }
      }
    }
  }
}

function createMoon(
  grid: Grid,
  moonConfig: MoonConfig,
  dimensions: CanvasDimensions
) {
  const r = moonConfig.properties.radius;

  const border = Math.round(1.5 * r);
  const start: [number, number] = [
    randInt(border, dimensions.width - 1 - border),
    randInt(border, dimensions.height - 1 - border),
  ];

  const toPaint: [number, number][] = [];
  for (let y = start[1] - r; y < start[1] + r; y++) {
    for (let x = start[0] - r; x < start[0] + r; x++) {
      if (distance(x, y, start[0], start[1]) < r && onSky(x, y, dimensions)) {
        toPaint.push([x, y]);
      }
    }
  }

  if (moonConfig.properties.halfMoon) {
    halfMoon(grid, toPaint, moonConfig, start);
  } else {
    fullMoon(grid, toPaint, moonConfig);
  }
}

export type Grid = Map<number, Map<number, Pixel[]>>;

function createGrid(h: number): Grid {
  const grid: any = new Map();
  for (let i = 0; i < h; i++) {
    grid.set(i, new Map());
  }
  return grid;
}

export function createSky(config: Config): Promise<Grid> {
  const dimensions = config.sky.properties.dimensions;
  const grid = createGrid(dimensions.height);

  return new Promise(function (res, err) {
    console.log("Painting sky...");
    setTimeout(() => {
      paintSky(grid, config.sky, dimensions);

      if (config.sunset.include) {
        console.log("Applying sunset...");
        createSunset(grid, config.sunset, dimensions);
      }

      if (config.stars.include) {
        console.log("Drawing stars...");
        createStars(grid, config.stars, dimensions);
      }

      if (config.moon.include) {
        console.log("Adding moon...");
        createMoon(grid, config.moon, dimensions);
      }

      if (config.clouds.include) {
        console.log("Brushing clouds...");
        createClouds(grid, config.clouds, dimensions);
      }
      res(grid);
    }, 10);
  });
}

export function collapsePixel(pixel: Pixel[]) {
  let color = pixel[0].color;
  for (let j = 1; j < pixel.length; j++) {
    color = combineColors(pixel[j].color, color);
  }
  return color;
}

type Canvas = HTMLCanvasElement & {
  width: number;
  height: number;
};

function getCanvasContext(config: Config): CanvasRenderingContext2D {
  const canvas: Canvas = document.getElementById("canvas") as Canvas;
  canvas.width = config.sky.properties.dimensions.width;
  canvas.height = config.sky.properties.dimensions.height;
  const context = canvas.getContext("2d");
  return context;
}

function buildCanvas(grid: Grid, config: Config) {
  const w = config.sky.properties.dimensions.width;
  const h = config.sky.properties.dimensions.height;
  const context = getCanvasContext(config);
  const imageData = context.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // Index 1D array as 2D array with a step of 4 (for rgba elements)
      const i = (x + w * y) * 4;
      const color = collapsePixel(grid.get(y).get(x));

      imageData.data[i] = color[0];
      imageData.data[i + 1] = color[1];
      imageData.data[i + 2] = color[2];
      imageData.data[i + 3] = color[3] * 255;
    }
  }

  context.putImageData(imageData, 0, 0);
}

async function generateSky(config: Config) {
  const start = Date.now();
  const grid = await createSky(config);
  buildCanvas(grid, config);
  const end = Date.now();
  console.log(`Completed in ${end - start}ms`);
}

function run(random: boolean) {
  document.getElementById("generate-btn").style.display = "none";
  document.getElementById("loading-spinner").style.display = "grid";
  setTimeout(function () {
    const config = random ? randConfig() : userConfig();
    generateSky(config).then(() => {
      document.getElementById("config").style.display = "none";
    });
  }, 10);
}
