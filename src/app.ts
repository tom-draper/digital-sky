

class MyTupleSet {
  private data: Map<number, Set<number>>

  public constructor() {
    this.data = new Map();
  }

  public add([first, second]: [any, any]) {
    if (!this.data.has(first)) {
      this.data.set(first, new Set());
    }

    this.data.get(first).add(second);
    return this;
  }

  public has([first, second]: [any, any]): boolean {
    return this.data.has(first) && this.data.get(first).has(second);
  }

  public delete([first, second]: [any, any]): boolean {
    if (!this.data.has(first) || !this.data.get(first).has(second)) {
      return false;
    }

    this.data.get(first).delete(second);
    if (this.data.get(first).size === 0) {
      this.data.delete(first);
    }

    return true;
  }
}

function createGrid(h: number, w: number): any[][] {
  let grid = [...Array(h)].map(e => Array(w));
  return grid;
}

function formatColour(r: number, g: number, b: number, a: number): string {
  return `rgba(${r},${g},${b},${a})`;
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type Colour = [number, number, number, number];

function mutateColour(colour: Colour, step: number): Colour {
  let mutatedColour = Object.values(colour) as Colour;
  switch (randInt(0, 50)) {
    case 0:
      mutatedColour[0] = Math.min(colour[0] + step, 255);
      break;
    case 1:
      mutatedColour[1] = Math.min(colour[1] + step, 255);
      break;
    case 2:
      mutatedColour[2] = Math.min(colour[2] + step, 255);
      break;
    case 3:
      mutatedColour[0] = Math.max(colour[0] - step, 0);
      break;
    case 4:
      mutatedColour[1] = Math.max(colour[1] - step, 0);
      break;
    case 5:
      mutatedColour[2] = Math.max(colour[2] - step, 0);
      break;
  }

  return mutatedColour;
}

function mutateColourInPlace(colour: Colour, step: number) {
  /// Modifies the original starting colour
  switch (randInt(0, 50)) {
    case 0:
      colour[0] = Math.min(colour[0] + step, 255);
      break;
    case 1:
      colour[1] = Math.min(colour[1] + step, 255);
      break;
    case 2:
      colour[2] = Math.min(colour[2] + step, 255);
      break;
    case 3:
      colour[0] = Math.max(colour[0] - step, 0);
      break;
    case 4:
      colour[1] = Math.max(colour[1] - step, 0);
      break;
    case 5:
      colour[2] = Math.max(colour[2] - step, 0);
      break;
  }
}

function colourSpread(x: number, y: number, colour: Colour, seen: MyTupleSet,
  toPaint: [number, number, Colour][], mutationSpeed: number) {
  let nextColour = mutateColour(colour, mutationSpeed);

  if (y < h - 1 && !seen.has([x, y + 1])) {
    toPaint.push([x, y + 1, nextColour]);
    seen.add([x, y + 1]);
  }
  if (x < w - 1 && !seen.has([x + 1, y])) {
    toPaint.push([x + 1, y, nextColour]);
    seen.add([x + 1, y]);
  }
  if (y > 0 && !seen.has([x, y - 1])) {
    toPaint.push([x, y - 1, nextColour]);
    seen.add([x, y - 1]);
  }
  if (x > 0 && !seen.has([x - 1, y])) {
    toPaint.push([x - 1, y, nextColour]);
    seen.add([x - 1, y]);
  }
  if (x > 0 && y > 0 && !seen.has([x - 1, y - 1])) {
    toPaint.push([x - 1, y - 1, nextColour]);
    seen.add([x - 1, y - 1]);
  }
  if (x > 0 && y < h - 1 && !seen.has([x - 1, y + 1])) {
    toPaint.push([x - 1, y + 1, nextColour]);
    seen.add([x - 1, y + 1]);
  }
  if (x < w - 1 && y > 0 && !seen.has([x + 1, y - 1])) {
    toPaint.push([x + 1, y - 1, nextColour]);
    seen.add([x + 1, y - 1]);
  }
  if (x < w - 1 && y < h - 1 && !seen.has([x + 1, y + 1])) {
    toPaint.push([x + 1, y + 1, nextColour]);
    seen.add([x + 1, y + 1]);
  }
}

type Pixel = {
  type: string,
  colour: Colour
}

function colourSky(grid: Pixel[][][], skyConfig: SkyConfig) {
  let start: [number, number] = [randInt(0, w - 1), randInt(0, h - 1)];
  let startColour: Colour = [...skyConfig.properties.colour, skyConfig.properties.opacity];

  let seen = new MyTupleSet();
  let toPaint: [number, number, Colour][] = [];

  toPaint.push([start[0], start[1], startColour]);
  seen.add(start);

  let x: number;
  let y: number;
  let colour: Colour;
  while (toPaint.length > 0) {
    [x, y, colour] = nextPixel(toPaint);
    grid[y][x] = [{
      type: 'sky',
      colour: colour
    }];
    colourSpread(x, y, colour, seen, toPaint, skyConfig.properties.mutationSpeed);
  }
}

function inRange(cloudSize: number, sizeRange: [number, number]): boolean {
  return cloudSize <= sizeRange[0] && cloudSize <= sizeRange[1];
}

function continueExpanding(p: number, cloudSize: number, sizeRange: [number, number]): boolean {
  // If we roll the probability OR we haven't reached the min cloud size yet
  // AND we've not exceeded the maximum
  return (
    (Math.random() < p || cloudSize < sizeRange[0]) && cloudSize < sizeRange[1]
  );
}

function cloudsSpread(
  x: number,
  y: number,
  colour: Colour,
  seen: MyTupleSet,
  toPaint: [number, number, Colour][],
  cloudSize: number,
  sizeRange: [number, number],
  pH: number,
  pV: number
) {
  let nextColour = mutateColour(colour, 3);

  if (continueExpanding(pV, cloudSize, sizeRange)) {
    if (y < h - 1 && !seen.has([x, y + 1])) {
      seen.add([x, y + 1]);
      toPaint.push([x, y + 1, nextColour]);
      cloudSize += 1;
    }
    if (y > 0 && !seen.has([x, y - 1])) {
      seen.add([x, y - 1]);
      toPaint.push([x, y - 1, nextColour]);
      cloudSize += 1;
    }
  }
  if (continueExpanding(pH, cloudSize, sizeRange)) {
    if (x < w - 1 && !seen.has([x + 1, y])) {
      seen.add([x + 1, y]);
      toPaint.push([x + 1, y, nextColour]);
      cloudSize += 1;
    }

    if (x > 0 && !seen.has([x - 1, y])) {
      seen.add([x - 1, y]);
      toPaint.push([x - 1, y, nextColour]);
      cloudSize += 1;
    }
  }

  return cloudSize;
}

function createCloudPixel(colour: Colour) {
  let cloudPixel = document.createElement("div");
  cloudPixel.className = "pixel cloud";
  cloudPixel.style.background = formatColour(...colour);
  return cloudPixel;
}

function nextPixel(toPaint: [x: number, y: number, colour?: Colour][]): [x: number, y: number, colour?: Colour] {
  const idx = Math.floor(Math.random() * toPaint.length);
  let next = toPaint[idx];
  toPaint.splice(idx, 1);
  return next;
}

function addCloudToSky(grid: Pixel[][][], x: number, y: number, colour: Colour, layer: number) {
  let [hasCloud, idx] = pixelHasType(grid[y][x], 'cloud' + layer);
  if (hasCloud) {
    grid[y][x][idx].colour = combineColours(colour, grid[y][x][idx].colour);
  } else {
    grid[y][x].push({ type: 'cloud' + layer, colour: colour });
  }
}

function createCloudBase(grid: Pixel[][][], startColour: Colour, sizeRange: [number, number], pH: number, pV: number): [number, number] {
  let start: [number, number] = [randInt(0, w - 1), randInt(0, h - 1)];

  let seen = new MyTupleSet();
  let toPaint: [number, number, Colour][] = [];

  toPaint.push([start[0], start[1], startColour]);
  seen.add(start);

  let cloudSize = 1;
  let x: number;
  let y: number;
  let colour: Colour;
  while (toPaint.length > 0) {
    [x, y, colour] = nextPixel(toPaint);
    addCloudToSky(grid, x, y, colour, 0);
    cloudSize = cloudsSpread(
      x,
      y,
      colour,
      seen,
      toPaint,
      cloudSize,
      sizeRange,
      pH,
      pV
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

function addCloudLayer(grid: Pixel[][][], start: [number, number], layer: number, startColour: Colour, sizeRange: [number, number], pH: number, pV: number) {
  let seen = new MyTupleSet();
  let toPaint: [number, number, Colour][] = [];

  toPaint.push([start[0], start[1], startColour]);
  seen.add(start);

  let x: number;
  let y: number;
  let colour: Colour;
  let currentSize = 1;
  while (toPaint.length > 0) {
    [x, y, colour] = nextPixel(toPaint);
    addCloudToSky(grid, x, y, colour, layer);
    currentSize = cloudsSpread(
      x,
      y,
      colour,
      seen,
      toPaint,
      currentSize,
      sizeRange,
      pH,
      pV
    );
  }
}

function createCloud(grid: Pixel[][][], layers: CloudLayer[]) {
  let start = createCloudBase(
    grid,
    [...layers[0].colour, layers[0].opacity],
    [layers[0].minSize, layers[0].maxSize],
    layers[0].pH,
    layers[0].pV
  );

  for (let i = 1; i < layers.length; i++) {
    addCloudLayer(
      grid,
      start,
      i,
      [...layers[i].colour, layers[i].opacity],
      [layers[i].minSize, layers[i].maxSize],
      layers[i].pH,
      layers[i].pV
    );
  }
}

function createClouds(grid: Pixel[][][], cloudConfig: CloudsConfig) {
  for (let i = 0; i < cloudConfig.properties.quantity; i++) {
    createCloud(grid, cloudConfig.properties.layers);
  }
}

function createStarPixel(colour: Colour): HTMLDivElement {
  let starPixel = document.createElement("div");
  starPixel.className = "pixel star";
  starPixel.style.background = formatColour(...colour);
  return starPixel;
}

function onSky(x: number, y: number): boolean {
  return x >= 0 && y >= 0 && x < w && y < h;
}

function starColour(opacity: number): Colour {
  return [randInt(230, 255), randInt(210, 240), randInt(220, 255), opacity];
}

function createStar(x: number, y: number, grid: Pixel[][][], opacity: number) {
  let colour = starColour(opacity);

  grid[y][x].push({ type: 'star', colour: colour });

  // Probabilistically add additional neighbouring star pixels
  let p = 0.1;
  [
    [x + 1, y],
    [x, y + 1],
    [x - 1, y],
    [x, y - 1],
  ].forEach((coord) => {
    if (Math.random() < p && onSky(coord[0], coord[1])) {
      grid[coord[1]][coord[0]].push({ type: 'star', colour: colour });
    }
  });
}

function createStars(grid: Pixel[][][], starsConfig: StarsConfig) {
  let n = h * w * starsConfig.properties.density;
  for (let i = 0; i < n; i++) {
    let x = randInt(0, w - 1);
    let y = randInt(0, h - 1);
    createStar(x, y, grid, starsConfig.properties.opacity);
  }
}

function createSunsetPixel(colour: Colour): HTMLDivElement {
  let sunsetPixel = document.createElement("div");
  sunsetPixel.className = "pixel sunset";
  sunsetPixel.style.background = formatColour(...colour);
  return sunsetPixel;
}

function getRGBValues(str: string): [number, number, number] {
  let vals = str.substring(str.indexOf("(") + 1, str.length - 1).split(", ");
  return [parseInt(vals[0]), parseInt(vals[1]), parseInt(vals[2])];
}

function sunsetSpread(x: number, y: number, colour: Colour,
  toPaint: [number, number, number[]][],
  seen: any, colourStep: number) {
  let nextColour = mutateColour(colour, colourStep);

  if (y < h - 1 && !seen.has([x, y + 1])) {
    seen.add([x, y + 1]);
    toPaint.push([x, y + 1, nextColour]);
  }
  if (y > 0 && !seen.has([x, y - 1])) {
    seen.add([x, y - 1]);
    toPaint.push([x, y - 1, nextColour]);
  }
  if (x < w - 1 && !seen.has([x + 1, y])) {
    seen.add([x + 1, y]);
    toPaint.push([x + 1, y, nextColour]);
  }
  if (x > 0 && !seen.has([x - 1, y])) {
    seen.add([x - 1, y]);
    toPaint.push([x - 1, y, nextColour]);
  }
}

function warpedDistance(x1: number, y1: number, x2: number, y2: number, xStretch: number, yStretch: number): number {
  let x = (y2 - y1) * (1 - yStretch);
  let y = (x2 - x1) * (1 - xStretch);
  return Math.sqrt(x * x + y * y);
}

function combineColours(colour1: Colour,
  colour2: Colour): Colour {
  let a1 = colour1[3];
  let a2 = colour2[3];
  let a = a1 + a2 * (1 - a1);
  let colour: Colour = [
    (colour1[0] * a1 + colour2[0] * a2 * (1 - a1)) / a,
    (colour1[1] * a1 + colour2[1] * a2 * (1 - a1)) / a,
    (colour1[2] * a1 + colour2[2] * a2 * (1 - a1)) / a,
    a
  ];
  return colour;
}

function addSunsetToSky(grid: Pixel[][][], x: number, y: number, colour: Colour) {
  let [hasSunset, idx] = pixelHasType(grid[y][x], 'sunset');
  if (hasSunset) {
    grid[y][x][idx].colour = combineColours(colour, grid[y][x][idx].colour);
  } else {
    grid[y][x].push({ type: 'sunset', colour: colour });
  }
}

function createSunsetLayer(grid: Pixel[][][], layerConfig: SunsetLayer) {
  const maxD = h * layerConfig.proportion;

  let seen = new MyTupleSet();
  let toPaint: [number, number, Colour][] = [];

  // let colour = [253, 94, 83, layerConfig.maxOpacity];

  const start: [number, number] = [randInt(0, w - 1), h - 1];
  toPaint.push([start[0], start[1], [...layerConfig.colour, 1]]);
  seen.add(start);

  let x: number;
  let y: number;
  let colour: Colour;
  let scale: number;
  while (toPaint.length > 0) {
    [x, y, colour] = nextPixel(toPaint);
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
    if (scale > 0) {
      colour[3] = layerConfig.maxOpacity * scale;
      addSunsetToSky(grid, x, y, colour);
      sunsetSpread(x, y, colour, toPaint, seen, layerConfig.colourMutationSpeed);
    }
  }
}

function createSunset(grid: Pixel[][][], sunsetConfig: SunsetConfig) {
  for (let i = 0; i < sunsetConfig.properties.layers.length; i++) {
    createSunsetLayer(grid, sunsetConfig.properties.layers[i]);
  }
}

function distance(x1: number, y1: number, x2: number, y2: number): number {
  const x = y2 - y1;
  const y = x2 - x1;
  return Math.sqrt(x * x + y * y);
}

function createMoonPixel(colour: Colour): HTMLDivElement {
  let moonPixel = document.createElement("div");
  moonPixel.className = "pixel moon";
  moonPixel.style.background = formatColour(...colour);
  return moonPixel;
}

function fullMoon(grid: Pixel[][][], toPaint: [number, number][], moonConfig: MoonConfig) {
  let colour: Colour = [...moonConfig.properties.colour, 1];
  while (toPaint.length > 0) {
    const [x, y] = nextPixel(toPaint);
    grid[y][x].push({ type: 'moon', colour: colour });
    mutateColourInPlace(colour, moonConfig.properties.noise);
  }
}

function moonColour(fade: number): null {
  return null;
}

function halfMoon(grid: Pixel[][][], toPaint: [number, number][],
  moonConfig: MoonConfig, start: [number, number]) {
  const r = moonConfig.properties.radius;
  const position = randInt(0.25 * r, r * 0.9);
  const edge = [start[0] - position, start[1] - position * Math.min(Math.random(), 0.8)];

  const fadeMargin = randInt(0, 10);
  let colour: Colour = [...moonConfig.properties.colour, 1];
  while (toPaint.length > 0) {
    const [x, y] = nextPixel(toPaint);
    const d = distance(x, y, edge[0], edge[1]);
    if (d >= r) {
      const opacity = Math.min((d - r) / fadeMargin, 1);
      grid[y][x].push({ type: 'moon', colour: [colour[0], colour[1], colour[2], opacity] });
      mutateColourInPlace(colour, moonConfig.properties.noise);
    } else {
      // Remove any star pixels in the darkness of the half moon
      for (let i = 0; i < grid[y][x].length; i++) {
        if (grid[y][x][i].type == "star") {
          grid[y][x].splice(i, 1);
        }
      }
    }
  }
}

function createMoon(grid: Pixel[][][], moonConfig: MoonConfig) {
  const r = moonConfig.properties.radius;

  const border = Math.round(1.5 * r);
  const start: [number, number] = [randInt(border, w - 1 - border), randInt(border, h - 1 - border)];

  let toPaint: [number, number][] = [];
  for (let y = start[1] - r; y < start[1] + r; y++) {
    for (let x = start[0] - r; x < start[0] + r; x++) {
      if (distance(x, y, start[0], start[1]) < r && onSky(x, y)) {
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

function createSky(config: Config): Pixel[][][] {
  let grid = createGrid(h, w);

  console.log("Colouring sky...");
  colourSky(grid, config.sky);

  if (config.sunset.include) {
    console.log("Creating sunset...");
    createSunset(grid, config.sunset);
  }

  if (config.stars.include) {
    console.log("Creating stars...");
    createStars(grid, config.stars);
  }

  if (config.moon.include) {
    console.log("Creating moon...");
    createMoon(grid, config.moon);
  }

  if (config.clouds.include) {
    console.log("Creating clouds...");
    createClouds(grid, config.clouds);
  }

  return grid;
}

function collapsePixel(pixel: Pixel[]) {
  let colour = pixel[0].colour;
  for (let j = 1; j < pixel.length; j++) {
    colour = combineColours(pixel[j].colour, colour);
  }
  return colour;
}

type Canvas = HTMLCanvasElement & {
  width: number,
  height: number
}

function getCanvasContext(): CanvasRenderingContext2D {
  let canvas: Canvas = document.getElementById('canvas') as Canvas;
  canvas.width = w;
  canvas.height = h;
  let context = canvas.getContext('2d');
  return context;
}

function buildCanvas(grid: Pixel[][][]) {
  let context = getCanvasContext()
  let imageData = context.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // Index 1D array as 2D array with a step of 4 (for rgba elements)
      const i = (x + w * y) * 4;
      const colour = collapsePixel(grid[y][x]);

      imageData.data[i] = colour[0];
      imageData.data[i + 1] = colour[1];
      imageData.data[i + 2] = colour[2];
      imageData.data[i + 3] = colour[3] * 255;
    }
  }

  context.putImageData(imageData, 0, 0);
}

let w: number;
let h: number;

function runSkyGeneration() {
  const config: Config = presetLateEvening3;
  
  w = config.sky.properties.width;
  h = config.sky.properties.height;
  
  let grid = createSky(config);
  buildCanvas(grid);
  console.log("Complete");
}
