var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function TupleSet() {
    this.data = new Map();
    this.add = function (_a) {
        var first = _a[0], second = _a[1];
        if (!this.data.has(first)) {
            this.data.set(first, new Set());
        }
        this.data.get(first).add(second);
        return this;
    };
    this.has = function (_a) {
        var first = _a[0], second = _a[1];
        return this.data.has(first) && this.data.get(first).has(second);
    };
    this["delete"] = function (_a) {
        var first = _a[0], second = _a[1];
        if (!this.data.has(first) || !this.data.get(first).has(second)) {
            return false;
        }
        this.data.get(first)["delete"](second);
        if (this.data.get(first).size === 0) {
            this.data["delete"](first);
        }
        return true;
    };
}
function createGrid(h, w) {
    var grid = __spreadArray([], Array(h), true).map(function (e) { return Array(w); });
    return grid;
}
function formatColour(r, g, b, a) {
    return "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(a, ")");
}
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function mutateColour(colour, step) {
    var mutatedColour = Object.values(colour);
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
    var nextColour = mutateColour(colour, mutationSpeed);
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
    var _a;
    var start = [randInt(0, w - 1), randInt(0, h - 1)];
    var startColour = __spreadArray(__spreadArray([], skyConfig.properties.colour, true), [skyConfig.properties.opacity], false);
    var seen = new TupleSet();
    var toPaint = [];
    toPaint.push([start[0], start[1], startColour]);
    seen.add(start);
    var x;
    var y;
    var colour;
    while (toPaint.length > 0) {
        _a = nextPixel(toPaint), x = _a[0], y = _a[1], colour = _a[2];
        grid[y][x] = [{
                type: 'sky',
                colour: colour
            }];
        colourSpread(x, y, colour, seen, toPaint, skyConfig.properties.mutationSpeed);
    }
}
function inRange(cloudSize, sizeRange) {
    return cloudSize <= sizeRange[0] && cloudSize <= sizeRange[1];
}
function continueExpanding(p, cloudSize, sizeRange) {
    // If we roll the probability OR we haven't reached the min cloud size yet
    // AND we've not exceeded the maximum
    return ((Math.random() < p || cloudSize < sizeRange[0]) && cloudSize < sizeRange[1]);
}
function cloudsSpread(x, y, colour, seen, toPaint, cloudSize, sizeRange, pH, pV) {
    var nextColour = mutateColour(colour, 3);
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
    var cloudPixel = document.createElement("div");
    cloudPixel.className = "pixel cloud";
    cloudPixel.style.background = formatColour.apply(void 0, colour);
    return cloudPixel;
}
// function nextPixelColourless(toPaint: [number, number][]): [number, number] {
//   const idx = Math.floor(Math.random() * toPaint.length);
//   let next = toPaint[idx];
//   toPaint.splice(idx, 1);
//   return next;
// }
// function nextPixelRGB(toPaint: [number, number, [number, number, number]][]): [number, number, [number, number, number]] {
//   const idx = Math.floor(Math.random() * toPaint.length);
//   let next = toPaint[idx];
//   toPaint.splice(idx, 1);
//   return next;
// }
function nextPixel(toPaint) {
    var idx = Math.floor(Math.random() * toPaint.length);
    var next = toPaint[idx];
    toPaint.splice(idx, 1);
    return next;
}
function addCloudToSky(grid, x, y, colour, layer) {
    var _a = pixelHasType(grid[y][x], 'cloud' + layer), hasCloud = _a[0], idx = _a[1];
    if (hasCloud) {
        grid[y][x][idx].colour = combineColours(colour, grid[y][x][idx].colour);
    }
    else {
        grid[y][x].push({ type: 'cloud' + layer, colour: colour });
    }
}
function createCloudBase(grid, startColour, sizeRange, pH, pV) {
    var _a;
    var start = [randInt(0, w - 1), randInt(0, h - 1)];
    var seen = new TupleSet();
    var toPaint = [];
    toPaint.push([start[0], start[1], startColour]);
    seen.add(start);
    var cloudSize = 1;
    var x;
    var y;
    var colour;
    while (toPaint.length > 0) {
        _a = nextPixel(toPaint), x = _a[0], y = _a[1], colour = _a[2];
        addCloudToSky(grid, x, y, colour, 0);
        cloudSize = cloudsSpread(x, y, colour, seen, toPaint, cloudSize, sizeRange, pH, pV);
    }
    return start;
}
function pixelHasType(pixel, type) {
    for (var i = 0; i < pixel.length; i++) {
        if (pixel[i].type == type) {
            return [true, i];
        }
    }
    return [false, -1];
}
function addCloudLayer(grid, start, layer, startColour, sizeRange, pH, pV) {
    var _a;
    var seen = new TupleSet();
    var toPaint = [];
    toPaint.push([start[0], start[1], startColour]);
    seen.add(start);
    var x;
    var y;
    var colour;
    var currentSize = 1;
    while (toPaint.length > 0) {
        _a = nextPixel(toPaint), x = _a[0], y = _a[1], colour = _a[2];
        addCloudToSky(grid, x, y, colour, layer);
        currentSize = cloudsSpread(x, y, colour, seen, toPaint, currentSize, sizeRange, pH, pV);
    }
}
function createCloud(grid, layers) {
    var start = createCloudBase(grid, __spreadArray(__spreadArray([], layers[0].colour, true), [layers[0].opacity], false), [layers[0].minSize, layers[0].maxSize], layers[0].pH, layers[0].pV);
    for (var i = 1; i < layers.length; i++) {
        addCloudLayer(grid, start, i, __spreadArray(__spreadArray([], layers[i].colour, true), [layers[i].opacity], false), [layers[i].minSize, layers[i].maxSize], layers[i].pH, layers[i].pV);
    }
}
function createClouds(grid, cloudConfig) {
    for (var i = 0; i < cloudConfig.properties.quantity; i++) {
        createCloud(grid, cloudConfig.properties.layers);
    }
}
function createStarPixel(colour) {
    var starPixel = document.createElement("div");
    starPixel.className = "pixel star";
    starPixel.style.background = formatColour.apply(void 0, colour);
    return starPixel;
}
function onSky(x, y) {
    return x >= 0 && y >= 0 && x < w && y < h;
}
function starColour(opacity) {
    return [randInt(230, 255), randInt(210, 240), randInt(220, 255), opacity];
}
function createStar(x, y, grid, opacity) {
    var colour = starColour(opacity);
    grid[y][x].push({ type: 'star', colour: colour });
    // Probabilistically add additional neighbouring star pixels
    var p = 0.1;
    [
        [x + 1, y],
        [x, y + 1],
        [x - 1, y],
        [x, y - 1],
    ].forEach(function (coord) {
        if (Math.random() < p && onSky(coord[0], coord[1])) {
            grid[coord[1]][coord[0]].push({ type: 'star', colour: colour });
        }
    });
}
function createStars(grid, starsConfig) {
    var n = h * w * starsConfig.properties.density;
    for (var i = 0; i < n; i++) {
        var x = randInt(0, w - 1);
        var y = randInt(0, h - 1);
        createStar(x, y, grid, starsConfig.properties.opacity);
    }
}
function createSunsetPixel(colour) {
    var sunsetPixel = document.createElement("div");
    sunsetPixel.className = "pixel sunset";
    sunsetPixel.style.background = formatColour.apply(void 0, colour);
    return sunsetPixel;
}
function getRGBValues(str) {
    var vals = str.substring(str.indexOf("(") + 1, str.length - 1).split(", ");
    return [parseInt(vals[0]), parseInt(vals[1]), parseInt(vals[2])];
}
function sunsetSpread(x, y, colour, toPaint, seen, colourStep) {
    var nextColour = mutateColour(colour, colourStep);
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
    var x = (y2 - y1) * (1 - yStretch);
    var y = (x2 - x1) * (1 - xStretch);
    return Math.sqrt(x * x + y * y);
}
function combineColours(colour1, colour2) {
    var a1 = colour1[3];
    var a2 = colour2[3];
    var a = a1 + a2 * (1 - a1);
    var colour = [
        (colour1[0] * a1 + colour2[0] * a2 * (1 - a1)) / a,
        (colour1[1] * a1 + colour2[1] * a2 * (1 - a1)) / a,
        (colour1[2] * a1 + colour2[2] * a2 * (1 - a1)) / a,
        a
    ];
    return colour;
}
function addSunsetToSky(grid, x, y, colour) {
    var _a = pixelHasType(grid[y][x], 'sunset'), hasSunset = _a[0], idx = _a[1];
    if (hasSunset) {
        grid[y][x][idx].colour = combineColours(colour, grid[y][x][idx].colour);
    }
    else {
        grid[y][x].push({ type: 'sunset', colour: colour });
    }
}
function createSunsetLayer(grid, layerConfig) {
    var _a;
    var maxD = h * layerConfig.proportion;
    var seen = new TupleSet();
    var toPaint = [];
    // let colour = [253, 94, 83, layerConfig.maxOpacity];
    var start = [randInt(0, w - 1), h - 1];
    toPaint.push([start[0], start[1], layerConfig.colour]);
    seen.add(start);
    var x;
    var y;
    var colour;
    var scale;
    while (toPaint.length > 0) {
        _a = nextPixel(toPaint), x = _a[0], y = _a[1], colour = _a[2];
        scale =
            1 -
                warpedDistance(x, y, start[0], start[1], layerConfig.xStretch, layerConfig.yStretch) /
                    maxD;
        if (scale > 0) {
            colour[3] = layerConfig.maxOpacity * scale;
            addSunsetToSky(grid, x, y, colour);
            sunsetSpread(x, y, colour, toPaint, seen, layerConfig.colourMutationSpeed);
        }
    }
}
function createSunset(grid, sunsetConfig) {
    for (var i = 0; i < sunsetConfig.properties.layers.length; i++) {
        createSunsetLayer(grid, sunsetConfig.properties.layers[i]);
    }
}
function distance(x1, y1, x2, y2) {
    var x = y2 - y1;
    var y = x2 - x1;
    return Math.sqrt(x * x + y * y);
}
function createMoonPixel(colour) {
    var moonPixel = document.createElement("div");
    moonPixel.className = "pixel moon";
    moonPixel.style.background = formatColour.apply(void 0, colour);
    return moonPixel;
}
function fullMoon(grid, toPaint, moonConfig) {
    var colour = __spreadArray(__spreadArray([], moonConfig.properties.colour, true), [1], false);
    while (toPaint.length > 0) {
        var _a = nextPixel(toPaint), x = _a[0], y = _a[1];
        grid[y][x].push({ type: 'moon', colour: colour });
        mutateColourInPlace(colour, moonConfig.properties.noise);
    }
}
function moonColour(fade) {
    return null;
}
function halfMoon(grid, toPaint, moonConfig, start) {
    var r = moonConfig.properties.radius;
    var position = randInt(0.25 * r, r * 0.9);
    var edge = [start[0] - position, start[1] - position * Math.min(Math.random(), 0.8)];
    var fadeMargin = randInt(0, 10);
    var colour = __spreadArray(__spreadArray([], moonConfig.properties.colour, true), [1], false);
    while (toPaint.length > 0) {
        var _a = nextPixel(toPaint), x = _a[0], y = _a[1];
        var d = distance(x, y, edge[0], edge[1]);
        if (d >= r) {
            var opacity = Math.min((d - r) / fadeMargin, 1);
            grid[y][x].push({ type: 'moon', colour: [colour[0], colour[1], colour[2], opacity] });
            mutateColourInPlace(colour, moonConfig.properties.noise);
        }
        else {
            // Remove any star pixels in the darkness of the half moon
            for (var i = 0; i < grid[y][x].length; i++) {
                if (grid[y][x][i].type == "star") {
                    grid[y][x].splice(i, 1);
                }
            }
        }
    }
}
function createMoon(grid, moonConfig) {
    var r = moonConfig.properties.radius;
    var border = Math.round(1.5 * r);
    var start = [randInt(border, w - 1 - border), randInt(border, h - 1 - border)];
    var toPaint = [];
    for (var y = start[1] - r; y < start[1] + r; y++) {
        for (var x = start[0] - r; x < start[0] + r; x++) {
            if (distance(x, y, start[0], start[1]) < r && onSky(x, y)) {
                toPaint.push([x, y]);
            }
        }
    }
    if (moonConfig.properties.halfMoon) {
        halfMoon(grid, toPaint, moonConfig, start);
    }
    else {
        fullMoon(grid, toPaint, moonConfig);
    }
}
function createSky(config) {
    var grid = createGrid(h, w);
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
function collapsePixel(pixel) {
    var colour = pixel[0].colour;
    for (var j = 1; j < pixel.length; j++) {
        colour = combineColours(pixel[j].colour, colour);
    }
    return colour;
}
function getCanvasContext() {
    var canvas = document.getElementById('canvas');
    canvas.width = w;
    canvas.height = h;
    var context = canvas.getContext('2d');
    return context;
}
function buildCanvas(grid) {
    var context = getCanvasContext();
    var imageData = context.createImageData(w, h);
    for (var y = 0; y < h; y++) {
        for (var x = 0; x < w; x++) {
            // Index 1D array as 2D array with a step of 4 (for rgba elements)
            var i = (x + w * y) * 4;
            var colour = collapsePixel(grid[y][x]);
            imageData.data[i] = colour[0];
            imageData.data[i + 1] = colour[1];
            imageData.data[i + 2] = colour[2];
            imageData.data[i + 3] = colour[3] * 255;
        }
    }
    context.putImageData(imageData, 0, 0);
}
var config = presetLateEvening3;
var w = config.sky.properties.width;
var h = config.sky.properties.height;
var grid = createSky(config);
buildCanvas(grid);
console.log("Complete");
