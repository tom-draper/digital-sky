/* jshint esversion: 6 */

function TupleSet() {
  this.data = new Map();

  this.add = function ([first, second]) {
    if (!this.data.has(first)) {
      this.data.set(first, new Set());
    }

    this.data.get(first).add(second);
    return this;
  };

  this.has = function ([first, second]) {
    return this.data.has(first) && this.data.get(first).has(second);
  };

  this.delete = function ([first, second]) {
    if (!this.data.has(first) || !this.data.get(first).has(second)) {
      return false;
    }

    this.data.get(first).delete(second);
    if (this.data.get(first).size === 0) {
      this.data.delete(first);
    }

    return true;
  };
}

function createGrid(h, w) {
  let grid = [...Array(h)].map((e) => Array(w));
  return grid;
}

function formatColour(r, g, b, a) {
  return `rgba(${r},${g},${b},${a})`;
}

function formatColour2(colour) {
  return `rgba(${colour[0]},${colour[1]},${colour[2]},${colour[3]})`;
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initSky(pixelSize) {
  console.log("Initialising sky...");
  let grid = createGrid(h, w);
  let sky = document.getElementById("sky");

  sky.style.height = h * pixelSize + "px";
  sky.style.width = w * pixelSize + "px";
  sky.style.gridTemplateColumns = "repeat(" + w + ", 1fr)";

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let pixel = document.createElement("div");
      pixel.className = "pixel";
      sky.appendChild(pixel);
      grid[y][x] = pixel;
    }
  }
  console.log("Complete");
  return grid;
}

function mutateColour(colour, step) {
  let mutatedColour = Object.values(colour);
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

function mutateColourInPlace(colour, step) {
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

  return colour;
}

function colourSpread(x, y, colour, seen, toPaint) {
  let nextColour = mutateColour(colour, 1);

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

function colourSky(grid, skyConfig) {
  console.log("Colouring sky...");

  let start = [randInt(0, w - 1), randInt(0, h - 1)];
  let startColour = [...skyConfig.colour, skyConfig.opacity];

  let seen = new TupleSet();
  let toPaint = [];

  toPaint.push([start[0], start[1], startColour]);
  seen.add(start);

  let x, y, colour;
  while (toPaint.length > 0) {
    [x, y, colour] = nextPixel(toPaint);
    grid[y][x].style.background = formatColour2(colour);
    colourSpread(x, y, colour, seen, toPaint);
  }
  console.log("Complete");
}

function inRange(cloudSize, sizeRange) {
  return cloudSize <= sizeRange[0] && cloudSize <= sizeRange[1];
}

function continueExpanding(p, cloudSize, sizeRange) {
  // If we roll the probability OR we haven't reached the min cloud size yet
  // AND we've not exceeded the maximum
  return (
    (Math.random() < p || cloudSize < sizeRange[0]) && cloudSize < sizeRange[1]
  );
}

function cloudsSpread(
  x,
  y,
  colour,
  seen,
  toPaint,
  cloudSize,
  sizeRange,
  pH,
  pV
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

function createCloudPixel(colour) {
  let cloudPixel = document.createElement("div");
  cloudPixel.className = "pixel cloud";
  cloudPixel.style.background = formatColour(...colour);
  // cloudPixel.style.opacity = colour[3].toString();
  return cloudPixel;
}

function nextPixel(toPaint) {
  idx = Math.floor(Math.random() * toPaint.length);
  next = toPaint[idx];
  toPaint.splice(idx, 1);
  return next;
}

function createCloudBase(grid, cloud, startColour, sizeRange, pH, pV) {
  let start = [randInt(0, w - 1), randInt(0, h - 1)];

  let seen = new TupleSet();
  let toPaint = [];

  toPaint.push([start[0], start[1], startColour]);
  seen.add(start);

  cloud.start = start;
  cloud.level = [[start]];

  let cloudSize = 1;
  let x, y, colour;
  while (toPaint.length > 0) {
    [x, y, colour] = nextPixel(toPaint);
    let cloudPixel = createCloudPixel(colour);
    grid[y][x].appendChild(cloudPixel);
    cloud.level[0].push([x, y]);

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
}

function addCloudLayer(grid, cloud, startColour, sizeRange, pH, pV) {
  let seen = new TupleSet();
  let toPaint = [];

  toPaint.push([cloud.start[0], cloud.start[1], startColour]);
  seen.add(cloud.start);

  let cloudLevel = cloud.level.length;
  cloud.level[cloudLevel] = [cloud.start];

  let x, y, colour;
  let cloudSize = 1;
  while (toPaint.length > 0) {
    [x, y, colour] = nextPixel(toPaint);
    let cloudPixel = createCloudPixel(colour);
    grid[y][x].appendChild(cloudPixel);
    cloud.level[cloudLevel].push([x, y]);

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
}

function createCloud(grid, layers) {
  let cloud = {};

  createCloudBase(
    grid,
    cloud,
    [...layers[0].colour, layers[0].opacity],
    [layers[0].minSize, layers[0].maxSize],
    layers[0].pH,
    layers[0].pV
  );

  for (let i = 1; i < layers.length; i++) {
    addCloudLayer(
      grid,
      cloud,
      [...layers[i].colour, layers[i].opacity],
      [layers[i].minSize, layers[i].maxSize],
      layers[i].pH,
      layers[i].pV
    );
  }

  return cloud;
}

function createClouds(grid, cloudConfig) {
  let clouds = [];
  for (let i = 0; i < cloudConfig.quantity; i++) {
    clouds[i] = createCloud(grid, cloudConfig.layers);
  }
  return clouds;
}

function createStarPixel(colour) {
  let starPixel = document.createElement("div");
  starPixel.className = "pixel star";
  starPixel.style.background = formatColour(...colour);
  return starPixel;
}

function onSky(x, y) {
  return x >= 0 && y >= 0 && x < w && y < h;
}

function starColour() {
  return [randInt(230, 255), randInt(210, 240), randInt(220, 255), 1];
}

function createStar(x, y, grid) {
  let star = [[x, y]];
  let colour = starColour();
  let starPixel = createStarPixel(colour);
  grid[y][x].appendChild(starPixel);

  let p = 0.1;
  [
    [x + 1, y],
    [x, y + 1],
    [x - 1, y],
    [x, y - 1],
  ].forEach((coord) => {
    if (Math.random() < p && onSky(...coord)) {
      starPixel = createStarPixel(colour);
      grid[coord[1]][coord[0]].appendChild(starPixel);
      star.push(coord);
    }
  });

  return star;
}

function createStars(grid, starsConfig) {
  let stars = [];
  let n = h * w * starsConfig.density;
  for (let i = 0; i < n; i++) {
    let star = createStar(randInt(0, w - 1), randInt(0, h - 1), grid);
    stars.push(star);
  }
  return stars;
}

function createSunsetPixel(colour) {
  let sunsetPixel = document.createElement("div");
  sunsetPixel.className = "pixel sunset";
  sunsetPixel.style.background = formatColour(...colour);
  return sunsetPixel;
}

function getRGBValues(str) {
  var vals = str.substring(str.indexOf("(") + 1, str.length - 1).split(", ");
  return [parseInt(vals[0]), parseInt(vals[1]), parseInt(vals[2])];
}

function sunsetSpread(x, y, colour, toPaint, seen, colourStep) {
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

function warpedDistance(x1, y1, x2, y2, xStretch, yStretch) {
  let x = y2 - y1 * yStretch;
  let y = (x2 - x1) * xStretch;
  return Math.sqrt(x * x + y * y);
}

function combineColours(colour1, colour2) {
  let a1 = colour1[3];
  let a2 = colour2[3];
  let a = a1 + a2 * (1 - a1);
  let colour = [
    (colour1[0] * a1 + colour2[0] * a2 * (1 - a1)) / a,
    (colour1[1] * a1 + colour2[1] * a2 * (1 - a1)) / a,
    (colour1[2] * a1 + colour2[2] * a2 * (1 - a1)) / a,
    a
  ];
  return colour;
}

function applyColour(x, y, grid, colour) {
  let originalColour = [...getRGBValues(grid[y][x].style.background), 1];
  let combinedColour = combineColours(colour, originalColour);
  grid[y][x].style.background = formatColour2(combinedColour);
}

function createSunsetLayer(grid, layer) {
  let maxD = h * layer.proportion;

  let seen = new TupleSet();
  let toPaint = [];

  let colour = [253, 94, 83, layer.maxOpacity];

  let start = [randInt(0, w), h - 1];
  toPaint.push([start[0], start[1], layer.colour]);
  seen.add(start);

  let scale;
  while (toPaint.length > 0) {
    [x, y, colour] = nextPixel(toPaint);
    scale =
      1 -
      warpedDistance(
        x,
        y,
        start[0],
        start[1],
        layer.xStretch,
        layer.yStretch
      ) /
        maxD;
    if (scale > 0) {
      colour[3] = layer.maxOpacity * scale;
      applyColour(x, y, grid, colour);
      sunsetSpread(x, y, colour, toPaint, seen, layer.colourMutationSpeed);
    }
  }
}

function createSunset(grid, sunsetConfig) {
  for (let i = 0; i < sunsetConfig.layers.length; i++) {
    createSunsetLayer(grid, sunsetConfig.layers[i]);
  }
}

function createSky(config) {
  let grid = initSky(config.sky.pixelSize);

  colourSky(grid, config.sky);

  if (config.sunset.include) {
    console.log("Creating sunset...");
    createSunset(grid, config.sunset);
    console.log("Complete");
  }

  if (config.stars.include) {
    console.log("Creating stars...");
    createStars(grid, config.stars);
    console.log("Complete");
  }

  if (config.clouds.include) {
    console.log("Creating clouds...");
    createClouds(grid, config.clouds);
    console.log("Complete");
  }
  console.log("Rendering sky...");
}

let skyColours = {
  daytime: [135, 206, 235],
  evening: [255, 192, 203],
  nighttime: [19, 19, 19],
};

let config = presetSunset;

// Check for preset sky colour
if (config.sky.colour in skyColours) {
  config.sky.colour = skyColours[config.sky.colour];
}

let w = config.sky.width;
let h = config.sky.height;
createSky(config);
