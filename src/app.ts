class MyTupleSet {
  private data: Map<number, Set<number>>;
  private count: number;

  public constructor() {
    this.data = new Map();
    this.count = 0;
  }

  public add([first, second]: [any, any]) {
    if (!this.data.has(first)) {
      this.data.set(first, new Set());
    }

    this.data.get(first).add(second);
    this.count++;
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
    this.count--;
    return true;
  }

  public empty(): boolean {
    return this.count == 0
  }
}

function createGrid2(h: number, w: number): any[][] {
  let grid = [...Array(h)].map((e) => Array(w));
  return grid;
}

function formatColour(r: number, g: number, b: number, a: number): string {
  return `rgba(${r},${g},${b},${a})`;
}

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type Colour = [number, number, number, number];

function mutateColour(colour: Colour, p: number, step: number = 1): Colour {
  if (Math.random() < p) {
    let mutatedColour = Object.values(colour) as Colour;
    switch (randInt(0, 5)) {
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

  return colour
}

function mutateColourInPlace(colour: Colour, p: number, step: number = 1) {
  if (Math.random() < p) {
    /// Modifies the original starting colour
    switch (randInt(0, 5)) {
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
}

function colourSpreadBottom(
  x: number,
  y: number,
  colour: Colour,
  seen: MyTupleSet,
  toPaint: [number, number, Colour][],
) {
  if (y < h - 1 && !seen.has([x, y + 1])) {
    toPaint.push([x, y + 1, colour]);
    seen.add([x, y + 1]);
  }
}

function colourSpreadRight(
  x: number,
  y: number,
  colour: Colour,
  seen: MyTupleSet,
  toPaint: [number, number, Colour][],
) {
  if (x < w - 1 && !seen.has([x + 1, y])) {
    toPaint.push([x + 1, y, colour]);
    seen.add([x + 1, y]);
  }
}

function colourSpreadTop(
  x: number,
  y: number,
  colour: Colour,
  seen: MyTupleSet,
  toPaint: [number, number, Colour][],
) {
  if (y > 0 && !seen.has([x, y - 1])) {
    toPaint.push([x, y - 1, colour]);
    seen.add([x, y - 1]);
  }
}

function colourSpreadLeft(
  x: number,
  y: number,
  colour: Colour,
  seen: MyTupleSet,
  toPaint: [number, number, Colour][],
) {
  if (x > 0 && !seen.has([x - 1, y])) {
    toPaint.push([x - 1, y, colour]);
    seen.add([x - 1, y]);
  }
}

function colourSpreadTopLeft(
  x: number,
  y: number,
  colour: Colour,
  seen: MyTupleSet,
  toPaint: [number, number, Colour][],
) {
  if (x > 0 && y > 0 && !seen.has([x - 1, y - 1])) {
    toPaint.push([x - 1, y - 1, colour]);
    seen.add([x - 1, y - 1]);
  }
}

function colourSpreadBottomLeft(
  x: number,
  y: number,
  colour: Colour,
  seen: MyTupleSet,
  toPaint: [number, number, Colour][],
) {
  if (x > 0 && y < h - 1 && !seen.has([x - 1, y + 1])) {
    toPaint.push([x - 1, y + 1, colour]);
    seen.add([x - 1, y + 1]);
  }
}

function colourSpreadTopRight(
  x: number,
  y: number,
  colour: Colour,
  seen: MyTupleSet,
  toPaint: [number, number, Colour][],
) {
  if (x < w - 1 && y > 0 && !seen.has([x + 1, y - 1])) {
    toPaint.push([x + 1, y - 1, colour]);
    seen.add([x + 1, y - 1]);
  }
}

function colourSpreadBottomRight(
  x: number,
  y: number,
  colour: Colour,
  seen: MyTupleSet,
  toPaint: [number, number, Colour][],
) {
  if (x < w - 1 && y < h - 1 && !seen.has([x + 1, y + 1])) {
    toPaint.push([x + 1, y + 1, colour]);
    seen.add([x + 1, y + 1]);
  }
}

/*
 * Colour appears drawn out from the starting point.
*/
function colourSpread8Dir(
  x: number,
  y: number,
  colour: Colour,
  seen: MyTupleSet,
  toPaint: [number, number, Colour][],
) {
  colourSpreadBottom(x, y, colour, seen, toPaint);
  colourSpreadRight(x, y, colour, seen, toPaint);
  colourSpreadTop(x, y, colour, seen, toPaint);
  colourSpreadLeft(x, y, colour, seen, toPaint);
  colourSpreadTopLeft(x, y, colour, seen, toPaint);
  colourSpreadBottomLeft(x, y, colour, seen, toPaint);
  colourSpreadTopRight(x, y, colour, seen, toPaint);
  colourSpreadBottomRight(x, y, colour, seen, toPaint);
}

/*
 * Picks a random starting pixel, and adds its 8 neighbours to the pool of pixels 
 * to be randomly selected next iteration whilst mutating the brush colour each iteration.
 */
function colourSpread(grid: Grid, skyConfig: SkyConfig) {
  let seen = new MyTupleSet();
  let toPaint: [number, number, Colour][] = [];

  let mutationSpeed = skyConfig.properties.mutationSpeed;

  let startColour: Colour = [
    ...skyConfig.properties.colour,
    skyConfig.properties.opacity,
  ];

  let start: [number, number] = [randInt(0, w - 1), randInt(0, h - 1)];
  toPaint.push([start[0], start[1], startColour]);
  seen.add(start);

  let x, y, colour;
  for (let i = 0; i < w * h; i++) {
    [x, y, colour] = nextPixel(toPaint);
    grid.get(y).set(x, [
      {
        type: "sky",
        colour: colour,
      },
    ]);

    colourSpread8Dir(
      x,
      y,
      mutateColour(colour, mutationSpeed),
      seen,
      toPaint,
    );
  }
}

/*
 * Picks a random starting pixel, and adds its 8 neighbours to the queue from 
 * a pixel is popped each iteration.
 */
function colourSpreadQueue(grid: Grid, skyConfig: SkyConfig) {
  let seen = new MyTupleSet();
  let toPaint: [number, number, Colour][] = [];

  let mutationSpeed = skyConfig.properties.mutationSpeed;

  let startColour: Colour = [
    ...skyConfig.properties.colour,
    skyConfig.properties.opacity,
  ];

  let start: [number, number] = [randInt(0, w - 1), randInt(0, h - 1)];
  toPaint.push([start[0], start[1], startColour]);
  seen.add(start);

  let x, y, colour;
  for (let i = 0; i < w * h; i++) {
    [x, y, colour] = toPaint.pop();

    grid.get(y).set(x, [
      {
        type: "sky",
        colour: colour,
      },
    ]);

    colourSpread8Dir(
      x,
      y,
      mutateColour(colour, mutationSpeed),
      seen,
      toPaint,
    );
  }
}

/* 
 * Pick random pixels across the entire image whilst mutating the brush colour
 * to creates a noise effect.
 */
function colourRandom(grid: Grid, skyConfig: SkyConfig) {
  let pixels = [];
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      pixels.push([x, y])
    }
  }
  shuffleArray(pixels);

  let colour: Colour = [
    ...skyConfig.properties.colour,
    skyConfig.properties.opacity,
  ];

  let mutationSpeed = skyConfig.properties.mutationSpeed;

  for (let i = 0; i < w*h; i++) {
    let [x, y] = pixels.pop();
    grid.get(y).set(x, [
      {
        type: "sky",
        colour: colour,
      },
    ]);
    colour = mutateColour(colour, mutationSpeed)
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
  colour: Colour;
};

function colourSky(grid: Grid, skyConfig: SkyConfig) {
  let mutationStyle = skyConfig.properties.mutationStyle;
  if (mutationStyle == 'Colour spread') {
    colourSpread(grid, skyConfig);
  } else if (mutationStyle == 'Random') {
    colourRandom(grid, skyConfig);
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

  if (continueExpanding(pV, cloudSize, sizeRange)) {
    if (y < h - 1 && !seen.has([x, y + 1])) {
      seen.add([x, y + 1]);
      toPaint.push([x, y + 1, colour]);
      cloudSize += 1;
    }
    if (y > 0 && !seen.has([x, y - 1])) {
      seen.add([x, y - 1]);
      toPaint.push([x, y - 1, colour]);
      cloudSize += 1;
    }
  }
  if (continueExpanding(pH, cloudSize, sizeRange)) {
    if (x < w - 1 && !seen.has([x + 1, y])) {
      seen.add([x + 1, y]);
      toPaint.push([x + 1, y, colour]);
      cloudSize += 1;
    }

    if (x > 0 && !seen.has([x - 1, y])) {
      seen.add([x - 1, y]);
      toPaint.push([x - 1, y, colour]);
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

function nextPixel(
  toPaint: [x: number, y: number, colour?: Colour][]
): [x: number, y: number, colour?: Colour] {
  const idx = Math.floor(Math.random() * toPaint.length);
  let next = toPaint[idx];
  toPaint.splice(idx, 1);
  return next;
}

function addCloudToSky(
  grid: Grid,
  x: number,
  y: number,
  colour: Colour,
  layer: number
) {
  let [hasCloud, idx] = pixelHasType(grid.get(y).get(x), "cloud" + layer);
  if (hasCloud) {
    grid.get(y).get(x)[idx].colour = combineColours(colour, grid.get(y).get(x)[idx].colour);
  } else {
    grid.get(y).get(x).push({ type: "cloud" + layer, colour: colour });
  }
}

function createCloudBase(
  grid: Grid,
  startColour: Colour,
  sizeRange: [number, number],
  pH: number,
  pV: number
): [number, number] {
  let seen = new MyTupleSet();
  let toPaint: [number, number, Colour][] = [];

  let start: [number, number] = [randInt(0, w - 1), randInt(0, h - 1)];
  toPaint.push([start[0], start[1], startColour]);
  seen.add(start);

  let cloudSize = 1;
  while (toPaint.length > 0) {
    let [x, y, colour] = nextPixel(toPaint);
    addCloudToSky(grid, x, y, colour, 0);

    let nextColour = mutateColour(colour, 0.9);
    cloudSize = cloudsSpread(
      x,
      y,
      nextColour,
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

function addCloudLayer(
  grid: Grid,
  start: [number, number],
  layer: number,
  startColour: Colour,
  sizeRange: [number, number],
  pH: number,
  pV: number
) {
  let seen = new MyTupleSet();
  let toPaint: [number, number, Colour][] = [];

  toPaint.push([start[0], start[1], startColour]);
  seen.add(start);

  let currentSize = 1;
  while (toPaint.length > 0) {
    let [x, y, colour] = nextPixel(toPaint);
    addCloudToSky(grid, x, y, colour, layer);

    let nextColour = mutateColour(colour, 0.9);
    currentSize = cloudsSpread(
      x,
      y,
      nextColour,
      seen,
      toPaint,
      currentSize,
      sizeRange,
      pH,
      pV
    );
  }
}

function createCloud(grid: Grid, layers: CloudLayer[]) {
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

function createClouds(grid: Grid, cloudConfig: CloudsConfig) {
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

function createStar(x: number, y: number, grid: Grid, opacity: number) {
  let colour = starColour(opacity);

  grid.get(y).get(x).push({ type: "star", colour: colour } as Pixel);

  // Probabilistically add additional neighbouring star pixels
  let p = 0.1;
  [
    [x + 1, y],
    [x, y + 1],
    [x - 1, y],
    [x, y - 1],
  ].forEach((coord) => {
    if (Math.random() < p && onSky(coord[0], coord[1])) {
      grid.get(coord[1]).get(coord[0]).push({ type: "star", colour: colour });
    }
  });
}

function createStars(grid: Grid, starsConfig: StarsConfig) {
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

function sunsetSpread(
  x: number,
  y: number,
  colour: Colour,
  toPaint: [number, number, Colour][],
  seen: any,
) {

  colourSpreadBottom(x, y, colour, seen, toPaint)
  colourSpreadTop(x, y, colour, seen, toPaint)
  colourSpreadRight(x, y, colour, seen, toPaint)
  colourSpreadLeft(x, y, colour, seen, toPaint)
}

function warpedDistance(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  xStretch: number,
  yStretch: number
): number {
  let x = (y2 - y1) * (1 - yStretch);
  let y = (x2 - x1) * (1 - xStretch);
  return Math.sqrt(x * x + y * y);
}

function combineColours(colour1: Colour, colour2: Colour): Colour {
  let a1 = colour1[3];
  let a2 = colour2[3];
  let a = a1 + a2 * (1 - a1);
  let colour: Colour = [
    (colour1[0] * a1 + colour2[0] * a2 * (1 - a1)) / a,
    (colour1[1] * a1 + colour2[1] * a2 * (1 - a1)) / a,
    (colour1[2] * a1 + colour2[2] * a2 * (1 - a1)) / a,
    a,
  ];
  return colour;
}

function addSunsetToSky(
  grid: Grid,
  x: number,
  y: number,
  colour: Colour
) {
  let [hasSunset, idx] = pixelHasType(grid.get(y).get(x), "sunset");
  if (hasSunset) {
    grid.get(y).get(x)[idx].colour = combineColours(colour, grid.get(y).get(x)[idx].colour);
  } else {
    grid.get(y).get(x).push({ type: "sunset", colour: colour });
  }
}

function createSunsetLayer(grid: Grid, layerConfig: SunsetLayer) {
  const maxD = h * layerConfig.proportion;

  let seen = new MyTupleSet();
  let toPaint: [number, number, Colour][] = [];

  const start: [number, number] = [randInt(0, w - 1), h - 1];
  toPaint.push([start[0], start[1], [...layerConfig.colour, 1]]);
  seen.add(start);

  let scale: number;
  while (toPaint.length > 0) {
    let [x, y, colour] = nextPixel(toPaint);
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
      let nextColour = mutateColour(colour, layerConfig.mutationSpeed);
      sunsetSpread(x, y, nextColour, toPaint, seen);
    }
  }
}

function createSunset(grid: Grid, sunsetConfig: SunsetConfig) {
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

function fullMoon(
  grid: Grid,
  toPaint: [number, number][],
  moonConfig: MoonConfig
) {
  console.log(moonConfig);
  let colour: Colour = [...moonConfig.properties.colour, 1];
  while (toPaint.length > 0) {
    const [x, y] = nextPixel(toPaint);
    grid.get(y).get(x).push({ type: "moon", colour: colour });
    colour = mutateColour(colour, moonConfig.properties.noise);
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
  let colour: Colour = [...moonConfig.properties.colour, 1];
  while (toPaint.length > 0) {
    const [x, y] = nextPixel(toPaint);
    const d = distance(x, y, edge[0], edge[1]);
    if (d >= r) {
      const opacity = Math.min((d - r) / fadeMargin, 1);
      grid.get(y).get(x).push({
        type: "moon",
        colour: [colour[0], colour[1], colour[2], opacity],
      });
      colour = mutateColour(colour, moonConfig.properties.noise);
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

function createMoon(grid: Grid, moonConfig: MoonConfig) {
  const r = moonConfig.properties.radius;

  const border = Math.round(1.5 * r);
  const start: [number, number] = [
    randInt(border, w - 1 - border),
    randInt(border, h - 1 - border),
  ];

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

type Grid = Map<number, Map<number, Pixel[]>>

function createGrid(h: number, w: number): Grid {
  let grid: any = new Map();
  for (let i = 0; i < h; i++) {
    grid.set(i, new Map());
  }
  return grid;
}

function createSky(config: Config): Grid {
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
  width: number;
  height: number;
};

function getCanvasContext(): CanvasRenderingContext2D {
  let canvas: Canvas = document.getElementById("canvas") as Canvas;
  canvas.width = w;
  canvas.height = h;
  let context = canvas.getContext("2d");
  return context;
}

function buildCanvas(grid: Grid) {
  let context = getCanvasContext();
  let imageData = context.createImageData(w, h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // Index 1D array as 2D array with a step of 4 (for rgba elements)
      const i = (x + w * y) * 4;
      const colour = collapsePixel(grid.get(y).get(x));

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
  let start = Date.now();

  w = config.sky.properties.width;
  h = config.sky.properties.height;

  let grid = createSky(config);
  buildCanvas(grid);

  let end = Date.now();
  console.log(`Completed in ${end - start}ms`);
}
