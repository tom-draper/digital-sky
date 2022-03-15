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
    if (!this.data.has(first) || !this.data.get(first).has(second))
      return false;

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

function randomColour() {
  return `rgb(${randInt(0, 255)},${randInt(0, 255)},${randInt(0, 255)})`;
}

function formatColour(r, g, b) {
  return `rgb(${r},${g},${b})`;
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
  let mutatedColour = [...colour];
  switch (randInt(0, 60)) {
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

function mutateColour2(colour, step) {
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
    seen.add([x, y + 1]);
    toPaint.push([x, y + 1, nextColour]);
  }
  if (x < w - 1 && !seen.has([x + 1, y])) {
    seen.add([x + 1, y]);
    toPaint.push([x + 1, y, nextColour]);
  }
  if (y > 0 && !seen.has([x, y - 1])) {
    seen.add([x, y - 1]);
    toPaint.push([x, y - 1, nextColour]);
  }
  if (x > 0 && !seen.has([x - 1, y])) {
    seen.add([x - 1, y]);
    toPaint.push([x - 1, y, nextColour]);
  }
  if (x > 0 && y > 0 && !seen.has([x - 1, y - 1])) {
    seen.add([x - 1, y - 1]);
    toPaint.push([x - 1, y - 1, nextColour]);
  }
  if (x > 0 && y < h - 1 && !seen.has([x - 1, y + 1])) {
    seen.add([x - 1, y + 1]);
    toPaint.push([x - 1, y + 1, nextColour]);
  }
  if (x < w - 1 && y > 0 && !seen.has([x + 1, y - 1])) {
    seen.add([x + 1, y - 1]);
    toPaint.push([x + 1, y - 1, nextColour]);
  }
  if (x < w - 1 && y < h - 1 && !seen.has([x + 1, y + 1])) {
    seen.add([x + 1, y + 1]);
    toPaint.push([x + 1, y + 1, nextColour]);
  }
}

function colourSky(grid, startColour) {
  let startX = randInt(0, w - 1);
  let startY = randInt(0, h - 1);
  // let startColour = [255, 192, 203];  // Pink
  // let startColour = [135, 206, 235, 1]; // Blue

  let seen = new TupleSet();
  let toPaint = [];

  toPaint.push([startX, startY, startColour]);
  seen.add([startX, startY]);

  let x, y, colour;
  let idx;
  while (toPaint.length > 0) {
    idx = Math.floor(Math.random() * toPaint.length);
    [x, y, colour] = toPaint[idx];
    toPaint.splice(idx, 1);
    grid[y][x].style.background = formatColour(colour[0], colour[1], colour[2]);
    colourSpread(x, y, colour, seen, toPaint);
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
  cloudPixel.style.background = formatColour(colour[0], colour[1], colour[2]);
  cloudPixel.style.opacity = colour[3].toString();
  return cloudPixel;
}

function nextCloudPixel(toPaint) {
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
  cloud.level = [
    [start]
  ];

  let cloudSize = 1;
  let x, y, colour;
  while (toPaint.length > 0) {
    [x, y, colour] = nextCloudPixel(toPaint);
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
    [x, y, colour] = nextCloudPixel(toPaint);
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

function createCloud(grid, cloudConfig) {
  let cloud = {};

  let baseLayer = cloudConfig.layers[0];
  createCloudBase(
    grid, 
    cloud, 
    [...baseLayer.colour, baseLayer.opacity], 
    [baseLayer.minSize, baseLayer.maxSize], 
    baseLayer.pH, 
    baseLayer.pV
  );
  
  for (let i = 1; i < cloudConfig.layers.length; i++) {
    let layer = cloudConfig.layers[i];
    addCloudLayer(
      grid, 
      cloud, 
      [...layer.colour, layer.opacity], 
      [layer.minSize, layer.maxSize], 
      layer.pH, 
      layer.pV);
  }

  return cloud;
}

function createClouds(grid, n, cloudConfig) {
  clouds = [];
  for (let i = 0; i < n; i++) {
    clouds[i] = createCloud(grid, cloudConfig);
  }
  return clouds;
}


let config = {
  sky: {
    height: 600,
    width: 1000,
    pixelSize: 1,
    colour: [135, 206, 235],
    opacity: 1,
  },
  clouds: {
    // Cloud layers are created in order
    layers: [
      {
        colour: [235, 235, 235],
        opacity: 0.2,
        minSize: 100,
        maxSize: 10000,
        pH: 0.7,  // Probability of horizontal expansion
        pV: 0.3,  // Probability of vertical expansion
      },
      {
        colour: [235, 235, 235],
        opacity: 0.15,
        minSize: 100,
        maxSize: 10000,
        pH: 0.7,
        pV: 0.3,
      },
      {
        colour: [235, 235, 235],
        opacity: 0.15,
        minSize: 100,
        maxSize: 10000,
        pH: 0.7,
        pV: 0.3,
      },
      {
        colour: [235, 235, 235],
        opacity: 0.15,
        minSize: 100,
        maxSize: 10000,
        pH: 0.7, 
        pV: 0.3,
      },
      {
        colour: [240, 211, 201],
        opacity: 0.3,
        minSize: 100,
        maxSize: 2000,
        pH: 0.6, 
        pV: 0.2,
      },
      {
        colour: [240, 211, 201],
        opacity: 0.15,
        minSize: 100,
        maxSize: 2000,
        pH: 0.6, 
        pV: 0.2,
      },
      {
        colour: [173, 216, 230],
        opacity: 0.15,
        minSize: 100,
        maxSize: 1000,
        pH: 0.6, 
        pV: 0.2,
      },
      {
        colour: [173, 216, 230],
        opacity: 0.15,
        minSize: 100,
        maxSize: 1000,
        pH: 0.6, 
        pV: 0.2,
      },
      {
        colour: [240, 240, 240],
        opacity: 0.2,
        minSize: 100,
        maxSize: 1000,
        pH: 0.6, 
        pV: 0.2,
      },
    ]
  }
};

let w = config.sky.width;
let h = config.sky.height;

let grid = initSky(config.sky.pixelSize);
colourSky(grid, [...config.sky.colour, config.sky.opacity]);
createClouds(grid, 10, config.clouds);
