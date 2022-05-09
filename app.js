
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
  let grid = [...Array(h)].map(e => Array(w));
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
}

function colourSpread(x, y, colour, seen, toPaint, mutationSpeed) {
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

function colourSky(grid, skyConfig) {
  let start = [randInt(0, w - 1), randInt(0, h - 1)];
  let startColour = [...skyConfig.colour, skyConfig.opacity];

  let seen = new TupleSet();
  let toPaint = [];

  toPaint.push([start[0], start[1], startColour]);
  seen.add(start);

  let x, y, colour;
  while (toPaint.length > 0) {
    [x, y, colour] = nextPixel(toPaint);
    grid[y][x] = [{
      type: 'sky', 
      colour: colour
    }];
    colourSpread(x, y, colour, seen, toPaint, skyConfig.mutationSpeed);
  }
}

function moveCloud(grid, cloud) {
  let movedCloud = {};
  for (let y in cloud.pixels) {
    movedCloud[y] = {};
    for (let x in cloud.pixels[y]) {
      grid[y][x].removeChild(cloud.pixels[y][x].div);
      if (x-10 >= 0) {
        grid[y][x-10].appendChild(cloud.pixels[y][x].div);
        movedCloud[y][x-10] = cloud.pixels[y][x];
      }
    }
  }
  return movedCloud;
}

function moveClouds(grid, clouds) {
  console.log("Moving clouds...");
  for (let i = 0; i < clouds.length; i++) {
    console.log("Cloud", i);
    clouds[i].pixels = moveCloud(grid, clouds[i]);
  }
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
  return cloudPixel;
}

function nextPixel(toPaint) {
  idx = Math.floor(Math.random() * toPaint.length);
  next = toPaint[idx];
  toPaint.splice(idx, 1);
  return next;
}

function addCloudToSky(grid, x, y, colour, layer) {
  let [hasCloud, idx] = pixelHasType(grid[y][x], 'cloud' + layer);
  if (hasCloud) {
    grid[y][x][idx].colour = combineColours(colour, grid[y][x][idx].colour);
  } else {
    grid[y][x].push({type: 'cloud' + layer, colour: colour});
  }
}

function createCloudBase(grid, startColour, sizeRange, pH, pV) {
  let start = [randInt(0, w - 1), randInt(0, h - 1)];

  let seen = new TupleSet();
  let toPaint = [];

  toPaint.push([start[0], start[1], startColour]);
  seen.add(start);

  let cloudSize = 1;
  while (toPaint.length > 0) {
    let [x, y, colour] = nextPixel(toPaint);
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

function pixelHasType(pixel, type) {
  for (let i = 0; i < pixel.length; i++) {
    if (pixel[i].type == type) {
      return [true, i];
    }
  }
  return [false, null];
}

function addCloudLayer(grid, start, layer, startColour, sizeRange, pH, pV) {
  let seen = new TupleSet();
  let toPaint = [];

  toPaint.push([start[0], start[1], startColour]);
  seen.add(start);

  let currentSize = 1;
  while (toPaint.length > 0) {
    let [x, y, colour] = nextPixel(toPaint);
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

function createCloud(grid, layers) {
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

function createClouds(grid, cloudConfig) {
  for (let i = 0; i < cloudConfig.quantity; i++) {
    createCloud(grid, cloudConfig.layers);
  }
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

function starColour(opacity) {
  return [randInt(230, 255), randInt(210, 240), randInt(220, 255), opacity];
}

function createStar(x, y, grid, opacity) {
  let colour = starColour(opacity);

  grid[y][x].push({type: 'star', colour: colour});

  // Probabilistically add additional neighbouring star pixels
  let p = 0.1;
  [
    [x + 1, y],
    [x, y + 1],
    [x - 1, y],
    [x, y - 1],
  ].forEach((coord) => {
    if (Math.random() < p && onSky(coord[0], coord[1])) {
      grid[coord[1]][coord[0]].push({type: 'star', colour: colour});
    }
  });
}

function createStars(grid, starsConfig) {
  let n = h * w * starsConfig.density;
  for (let i = 0; i < n; i++) {
    let x  = randInt(0, w - 1);
    let y  = randInt(0, h - 1);
    createStar(x, y, grid, starsConfig.opacity);
  }
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

function addSunsetToSky(grid, x, y, colour) {
  let [hasSunset, idx] = pixelHasType(grid[y][x], 'sunset');
  if (hasSunset) {
    grid[y][x][idx].colour = combineColours(colour, grid[y][x][idx].colour);
  } else {
    grid[y][x].push({type: 'sunset', colour: colour});
  }
}

function createSunsetLayer(grid, layerConfig) {
  let maxD = h * layerConfig.proportion;

  let seen = new TupleSet();
  let toPaint = [];

  let colour = [253, 94, 83, layerConfig.maxOpacity];

  let start = [randInt(0, w - 1), h - 1];
  toPaint.push([start[0], start[1], layerConfig.colour]);
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

function createSunset(grid, sunsetConfig) {
  for (let i = 0; i < sunsetConfig.layers.length; i++) {
    createSunsetLayer(grid, sunsetConfig.layers[i]);
  }
}


function distance(x1, y1, x2, y2) {
  let x = y2 - y1;
  let y = x2 - x1;
  return Math.sqrt(x * x + y * y);
}

function createMoonPixel(colour) {
  let moonPixel = document.createElement("div");
  moonPixel.className = "pixel moon";
  moonPixel.style.background = formatColour(...colour);
  return moonPixel;
}

function fullMoon(grid, toPaint, moonConfig) {
  let colour = [...moonConfig.colour, 1];
  while (toPaint.length > 0) {
    [x, y] = nextPixel(toPaint);
    grid[y][x].push({type: 'moon', colour: colour});
    mutateColourInPlace(colour, moonConfig.noise);
  }
}

function moonColour(fade) {
  return null;
}

function halfMoon(grid, toPaint, moonConfig, start) {
  let r = moonConfig.radius;
  let position = randInt(0.25*r, r*0.9);
  let edge = [start[0] - position, start[1] - position*Math.min(Math.random(), 0.8)];
  
  let fadeMargin = randInt(0, 10);
  let colour = [...moonConfig.colour, 1];
  while (toPaint.length > 0) {
    [x, y] = nextPixel(toPaint);
    let d = distance(x, y, edge[0], edge[1]);
    if (d >= r) {
      let opacity = Math.min((d - r) / fadeMargin, 1);
      grid[y][x].push({type: 'moon', colour: [colour[0], colour[1], colour[2], opacity]});
      mutateColourInPlace(colour, moonConfig.noise);
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

function createMoon(grid, moonConfig) {
  let r = moonConfig.radius;

  let border = Math.round(1.5 * r);
  let start = [randInt(border, w - 1 - border), randInt(border, h - 1 - border)];
  
  let toPaint = [];
  for (let y = start[1] - r; y < start[1] + r; y++) {
    for (let x = start[0] - r; x < start[0] + r; x++) {
      if (distance(x, y, start[0], start[1]) < r && onSky(x, y)) {
        toPaint.push([x, y]);
      }
    }
  }

  if (moonConfig.halfMoon) {
    halfMoon(grid, toPaint, moonConfig, start); 
  } else {
    fullMoon(grid, toPaint, moonConfig);
  }
}

function createSky(config) {
  let grid = createGrid(h, w);
  
  console.log("Colouring sky...");
  colourSky(grid, config.sky.properties);

  if (config.sunset.include) {
    console.log("Creating sunset...");
    createSunset(grid, config.sunset.properties);
  }

  if (config.stars.include) {
    console.log("Creating stars...");
    createStars(grid, config.stars.properties);
  }

  if (config.moon.include) {
    console.log("Creating moon...");
    createMoon(grid, config.moon.properties);
  }
  
  if (config.clouds.include) {
    console.log("Creating clouds...");
    createClouds(grid, config.clouds.properties);
  }

  return grid;
}

function collapsePixel(pixel) {
  let colour = pixel[0].colour;
  for (let j = 1; j < pixel.length; j++) {
    colour = combineColours(pixel[j].colour, colour);
  }
  return colour;
}

function buildCanvas(grid) {
  let canvas = document.getElementById('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  const imageData = ctx.createImageData(w, h);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      // Index 1D array as 2D array with a step of 4 (for rgba elements)
      let i = (x + w * y) * 4;
      
      let colour = collapsePixel(grid[y][x]);
      
      imageData.data[i] = colour[0];
      imageData.data[i + 1] = colour[1];
      imageData.data[i + 2] = colour[2];
      imageData.data[i + 3] = colour[3] * 255;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

let skyColours = {
  daytime: [135, 206, 235],
  evening: [255, 192, 203],
  nighttime: [19, 19, 19],
};

let config = presetLateEvening2;

// Check for preset sky colour
if (config.sky.properties.colour in skyColours) {
  config.sky.properties.colour = skyColours[config.sky.properties.colour];
}

let w = config.sky.properties.width;
let h = config.sky.properties.height;

let grid = createSky(config);
console.log(grid);
buildCanvas(grid);
console.log("Complete");