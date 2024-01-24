/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.collapsePixel = exports.createSky = void 0;
const tuple_set_1 = __importDefault(__webpack_require__(/*! ./tuple-set */ "./src/tuple-set.ts"));
const generate_1 = __webpack_require__(/*! ./generate */ "./src/generate.ts");
const config_1 = __webpack_require__(/*! ./config */ "./src/config.ts");
if (typeof window !== "undefined") {
    // Expose UI trigger functions to the browser
    //@ts-ignore
    window.run = run;
    //@ts-ignore
    window.toggleProperties = config_1.toggleProperties;
    //@ts-ignore
    window.addSunsetLayer = config_1.addSunsetLayer;
    //@ts-ignore
    window.addCloudsLayer = config_1.addCloudsLayer;
    (0, config_1.initDefaults)();
}
function formatColor(r, g, b, a) {
    return `rgba(${r},${g},${b},${a})`;
}
function mutateColor(color, p, step = 1) {
    if (Math.random() < p) {
        const mutatedColor = Object.values(color);
        switch ((0, generate_1.randInt)(0, 5)) {
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
function mutateColorInPlace(color, p, step = 1) {
    if (Math.random() < p) {
        /// Modifies the original starting color
        switch ((0, generate_1.randInt)(0, 5)) {
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
function colorSpreadBottom(x, y, h, color, seen, toPaint) {
    if (y < h - 1 && !seen.has([x, y + 1])) {
        toPaint.push([x, y + 1, color]);
        seen.add([x, y + 1]);
    }
}
function colorSpreadRight(x, y, w, color, seen, toPaint) {
    if (x < w - 1 && !seen.has([x + 1, y])) {
        toPaint.push([x + 1, y, color]);
        seen.add([x + 1, y]);
    }
}
function colorSpreadTop(x, y, color, seen, toPaint) {
    if (y > 0 && !seen.has([x, y - 1])) {
        toPaint.push([x, y - 1, color]);
        seen.add([x, y - 1]);
    }
}
function colorSpreadLeft(x, y, color, seen, toPaint) {
    if (x > 0 && !seen.has([x - 1, y])) {
        toPaint.push([x - 1, y, color]);
        seen.add([x - 1, y]);
    }
}
function colorSpreadTopLeft(x, y, color, seen, toPaint) {
    if (x > 0 && y > 0 && !seen.has([x - 1, y - 1])) {
        toPaint.push([x - 1, y - 1, color]);
        seen.add([x - 1, y - 1]);
    }
}
function colorSpreadBottomLeft(x, y, h, color, seen, toPaint) {
    if (x > 0 && y < h - 1 && !seen.has([x - 1, y + 1])) {
        toPaint.push([x - 1, y + 1, color]);
        seen.add([x - 1, y + 1]);
    }
}
function colorSpreadTopRight(x, y, w, color, seen, toPaint) {
    if (x < w - 1 && y > 0 && !seen.has([x + 1, y - 1])) {
        toPaint.push([x + 1, y - 1, color]);
        seen.add([x + 1, y - 1]);
    }
}
function colorSpreadBottomRight(x, y, dimensions, color, seen, toPaint) {
    if (x < dimensions.width - 1 &&
        y < dimensions.height - 1 &&
        !seen.has([x + 1, y + 1])) {
        toPaint.push([x + 1, y + 1, color]);
        seen.add([x + 1, y + 1]);
    }
}
/*
 * Color appears drawn out from the starting point.
 */
function colorSpread8Dir(x, y, dimensions, color, seen, toPaint) {
    colorSpreadBottom(x, y, dimensions.height, color, seen, toPaint);
    colorSpreadRight(x, y, dimensions.width, color, seen, toPaint);
    colorSpreadTop(x, y, color, seen, toPaint);
    colorSpreadLeft(x, y, color, seen, toPaint);
    colorSpreadTopLeft(x, y, color, seen, toPaint);
    colorSpreadBottomLeft(x, y, dimensions.height, color, seen, toPaint);
    colorSpreadTopRight(x, y, dimensions.width, color, seen, toPaint);
    colorSpreadBottomRight(x, y, dimensions, color, seen, toPaint);
}
function colorSpread4Dir(x, y, dimensions, color, seen, toPaint) {
    colorSpreadBottom(x, y, dimensions.height, color, seen, toPaint);
    colorSpreadRight(x, y, dimensions.width, color, seen, toPaint);
    colorSpreadTop(x, y, color, seen, toPaint);
    colorSpreadLeft(x, y, color, seen, toPaint);
}
/*
 * Picks a random starting pixel, and adds its 8 neighbours to the pool of pixels
 * to be randomly selected next iteration whilst mutating the brush color each iteration.
 */
function colorSpread(grid, skyConfig, dimensions) {
    const seen = new tuple_set_1.default();
    const toPaint = [];
    const mutationSpeed = skyConfig.properties.mutationSpeed;
    const startColor = [
        ...skyConfig.properties.color,
        skyConfig.properties.opacity,
    ];
    const start = [
        (0, generate_1.randInt)(0, dimensions.width - 1),
        (0, generate_1.randInt)(0, dimensions.height - 1),
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
        colorSpread8Dir(x, y, dimensions, mutateColor(color, mutationSpeed), seen, toPaint);
    }
}
/*
 * Picks a random starting pixel, and adds its 8 neighbours to the pool of pixels
 * to be randomly selected next iteration whilst mutating the brush color each iteration.
 */
function colorPointSpreadWavy(grid, skyConfig, dimensions) {
    const seen = new tuple_set_1.default();
    const toPaint = [];
    const mutationSpeed = skyConfig.properties.mutationSpeed;
    let color = [
        ...skyConfig.properties.color,
        skyConfig.properties.opacity,
    ];
    const start = [
        (0, generate_1.randInt)(0, dimensions.width - 1),
        (0, generate_1.randInt)(0, dimensions.height - 1),
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
function nextClosestPixel(toPaint, centre) {
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
function colorPointSpread(grid, skyConfig, dimensions) {
    const seen = new tuple_set_1.default();
    const toPaint = [];
    const mutationSpeed = skyConfig.properties.mutationSpeed;
    let color = [
        ...skyConfig.properties.color,
        skyConfig.properties.opacity,
    ];
    const start = [
        (0, generate_1.randInt)(0, dimensions.width - 1),
        (0, generate_1.randInt)(0, dimensions.height - 1),
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
function colorSpreadQueue(grid, skyConfig, colorSpreadFunc, dimensions) {
    const seen = new tuple_set_1.default();
    const toPaint = [];
    const mutationSpeed = skyConfig.properties.mutationSpeed;
    const startColor = [
        ...skyConfig.properties.color,
        skyConfig.properties.opacity,
    ];
    const start = [
        (0, generate_1.randInt)(0, dimensions.width - 1),
        (0, generate_1.randInt)(0, dimensions.height - 1),
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
        colorSpreadFunc(x, y, dimensions, mutateColor(color, mutationSpeed), seen, toPaint);
    }
}
/*
 * Pick random pixels across the entire image whilst mutating the brush color
 * to creates a noise effect.
 */
function colorRandom(grid, skyConfig, dimensions) {
    const pixels = [];
    for (let y = 0; y < dimensions.height; y++) {
        for (let x = 0; x < dimensions.width; x++) {
            pixels.push([x, y]);
        }
    }
    shuffleArray(pixels);
    let color = [
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
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
function colorHorizontal(x, y, dimensions, color, seen, toPaint) {
    colorSpreadTop(x, y, color, seen, toPaint);
    colorSpreadBottom(x, y, dimensions.height, color, seen, toPaint);
    colorSpreadLeft(x, y, color, seen, toPaint);
    colorSpreadRight(x, y, dimensions.width, color, seen, toPaint);
}
function colorDiagonal(x, y, dimensions, color, seen, toPaint) {
    colorSpreadBottom(x, y, dimensions.height, color, seen, toPaint);
    colorSpreadRight(x, y, dimensions.width, color, seen, toPaint);
    colorSpreadTop(x, y, color, seen, toPaint);
    colorSpreadLeft(x, y, color, seen, toPaint);
    colorSpreadTopLeft(x, y, color, seen, toPaint);
    colorSpreadBottomLeft(x, y, dimensions.height, color, seen, toPaint);
    colorSpreadTopRight(x, y, dimensions.width, color, seen, toPaint);
    colorSpreadBottomRight(x, y, dimensions, color, seen, toPaint);
}
function colorVertical(x, y, dimensions, color, seen, toPaint) {
    colorSpreadLeft(x, y, color, seen, toPaint);
    colorSpreadRight(x, y, dimensions.width, color, seen, toPaint);
    colorSpreadTop(x, y, color, seen, toPaint);
    colorSpreadBottom(x, y, dimensions.height, color, seen, toPaint);
}
function paintSky(grid, skyConfig, dimensions) {
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
function inRange(cloudSize, sizeRange) {
    return cloudSize <= sizeRange[0] && cloudSize <= sizeRange[1];
}
function continueExpanding(p, cloudSize, sizeRange) {
    // If we roll the probability OR we haven't reached the min cloud size yet
    // AND we've not exceeded the maximum
    return (cloudSize < sizeRange[1] && (cloudSize < sizeRange[0] || Math.random() < p));
}
function cloudsSpread(x, y, color, seen, toPaint, cloudSize, sizeRange, pH, pV, dimensions) {
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
function createCloudPixel(color) {
    const cloudPixel = document.createElement("div");
    cloudPixel.className = "pixel cloud";
    cloudPixel.style.background = formatColor(...color);
    return cloudPixel;
}
function nextPixel(toPaint) {
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
function addCloudToSky(grid, x, y, color, layer) {
    const [hasCloud, idx] = pixelHasType(grid.get(y).get(x), "cloud" + layer);
    if (hasCloud) {
        grid.get(y).get(x)[idx].color = combineColors(color, grid.get(y).get(x)[idx].color);
    }
    else {
        grid
            .get(y)
            .get(x)
            .push({ type: "cloud" + layer, color: color });
    }
}
function createCloudBase(grid, startColor, sizeRange, pH, pV, dimensions) {
    const seen = new tuple_set_1.default();
    const toPaint = [];
    const start = [
        (0, generate_1.randInt)(0, dimensions.width - 1),
        (0, generate_1.randInt)(0, dimensions.height - 1),
    ];
    toPaint.push([start[0], start[1], startColor]);
    seen.add(start);
    let cloudSize = 1;
    while (toPaint.length > 0) {
        const [x, y, color] = nextPixel(toPaint);
        addCloudToSky(grid, x, y, color, 0);
        const nextColor = mutateColor(color, 0.9);
        cloudSize = cloudsSpread(x, y, nextColor, seen, toPaint, cloudSize, sizeRange, pH, pV, dimensions);
    }
    return start;
}
function pixelHasType(pixel, type) {
    for (let i = 0; i < pixel.length; i++) {
        if (pixel[i].type == type) {
            return [true, i];
        }
    }
    return [false, -1];
}
function addCloudLayer(grid, start, layer, startColor, sizeRange, pH, pV, dimensions) {
    const seen = new tuple_set_1.default();
    const toPaint = [];
    toPaint.push([start[0], start[1], startColor]);
    seen.add(start);
    let currentSize = 1;
    while (toPaint.length > 0) {
        const [x, y, color] = nextPixel(toPaint);
        addCloudToSky(grid, x, y, color, layer);
        const nextColor = mutateColor(color, 0.9);
        currentSize = cloudsSpread(x, y, nextColor, seen, toPaint, currentSize, sizeRange, pH, pV, dimensions);
    }
}
function createCloud(grid, layers, dimensions) {
    const start = createCloudBase(grid, [...layers[0].color, layers[0].opacity], [layers[0].minSize, layers[0].maxSize], layers[0].pH, layers[0].pV, dimensions);
    for (let i = 1; i < layers.length; i++) {
        addCloudLayer(grid, start, i, [...layers[i].color, layers[i].opacity], [layers[i].minSize, layers[i].maxSize], layers[i].pH, layers[i].pV, dimensions);
    }
}
function createClouds(grid, cloudsConfig, dimensions) {
    for (let i = 0; i < cloudsConfig.properties.quantity; i++) {
        createCloud(grid, cloudsConfig.properties.layers, dimensions);
    }
}
function createStarPixel(color) {
    const starPixel = document.createElement("div");
    starPixel.className = "pixel star";
    starPixel.style.background = formatColor(...color);
    return starPixel;
}
function onSky(x, y, dimensions) {
    return x >= 0 && y >= 0 && x < dimensions.width && y < dimensions.height;
}
function starColor(opacity) {
    return [(0, generate_1.randInt)(230, 255), (0, generate_1.randInt)(210, 240), (0, generate_1.randInt)(220, 255), opacity];
}
function createStar(x, y, dimensions, grid, opacity) {
    const color = starColor(opacity);
    grid
        .get(y)
        .get(x)
        .push({ type: "star", color: color });
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
function createStars(grid, starsConfig, dimensions) {
    const n = dimensions.height * dimensions.width * starsConfig.properties.density;
    for (let i = 0; i < n; i++) {
        const x = (0, generate_1.randInt)(0, dimensions.width - 1);
        const y = (0, generate_1.randInt)(0, dimensions.height - 1);
        createStar(x, y, dimensions, grid, starsConfig.properties.opacity);
    }
}
function createSunsetPixel(color) {
    const sunsetPixel = document.createElement("div");
    sunsetPixel.className = "pixel sunset";
    sunsetPixel.style.background = formatColor(...color);
    return sunsetPixel;
}
function getRGBValues(str) {
    const vals = str.substring(str.indexOf("(") + 1, str.length - 1).split(", ");
    return [parseInt(vals[0]), parseInt(vals[1]), parseInt(vals[2])];
}
function sunsetSpread(x, y, dimensions, color, toPaint, seen) {
    colorSpreadBottom(x, y, dimensions.height, color, seen, toPaint);
    colorSpreadTop(x, y, color, seen, toPaint);
    colorSpreadRight(x, y, dimensions.width, color, seen, toPaint);
    colorSpreadLeft(x, y, color, seen, toPaint);
}
function warpedDistance(x1, y1, x2, y2, xStretch, yStretch) {
    const x = (y2 - y1) * (1 - yStretch);
    const y = (x2 - x1) * (1 - xStretch);
    return Math.sqrt(x * x + y * y);
}
function combineColors(color1, color2) {
    const a1 = color1[3];
    const a2 = color2[3];
    const a = a1 + a2 * (1 - a1);
    const color = [
        (color1[0] * a1 + color2[0] * a2 * (1 - a1)) / a,
        (color1[1] * a1 + color2[1] * a2 * (1 - a1)) / a,
        (color1[2] * a1 + color2[2] * a2 * (1 - a1)) / a,
        a,
    ];
    return color;
}
function addSunsetToSky(grid, x, y, color) {
    const [hasSunset, idx] = pixelHasType(grid.get(y).get(x), "sunset");
    if (hasSunset) {
        grid.get(y).get(x)[idx].color = combineColors(color, grid.get(y).get(x)[idx].color);
    }
    else {
        grid.get(y).get(x).push({ type: "sunset", color: color });
    }
}
function createSunsetLayer(grid, layerConfig, dimensions) {
    const maxD = dimensions.height * layerConfig.proportion;
    const seen = new tuple_set_1.default();
    const toPaint = [];
    // Select a random pixel to grow the sunset from
    const start = [
        (0, generate_1.randInt)(0, dimensions.width - 1),
        dimensions.height - 1,
    ];
    toPaint.push([start[0], start[1], [...layerConfig.color, 1]]);
    seen.add(start);
    let scale;
    let x, y, color;
    while (toPaint.length > 0) {
        [x, y, color] = nextPixel(toPaint);
        scale =
            1 -
                warpedDistance(x, y, start[0], start[1], layerConfig.xStretch, layerConfig.yStretch) /
                    maxD;
        if (scale <= 0) {
            continue;
        }
        color[3] = layerConfig.maxOpacity * scale; // Adjust opacity
        grid.get(y).get(x).push({ type: "sunset", color: color });
        sunsetSpread(x, y, dimensions, mutateColor(color, layerConfig.mutationSpeed), toPaint, seen);
    }
}
function createSunset(grid, sunsetConfig, dimensions) {
    for (let i = 0; i < sunsetConfig.properties.layers.length; i++) {
        createSunsetLayer(grid, sunsetConfig.properties.layers[i], dimensions);
    }
}
function distance(x1, y1, x2, y2) {
    const x = y2 - y1;
    const y = x2 - x1;
    return Math.sqrt(x * x + y * y);
}
function createMoonPixel(color) {
    const moonPixel = document.createElement("div");
    moonPixel.className = "pixel moon";
    moonPixel.style.background = formatColor(...color);
    return moonPixel;
}
function fullMoon(grid, toPaint, moonConfig) {
    let color = [...moonConfig.properties.color, 1];
    while (toPaint.length > 0) {
        const [x, y] = nextPixel(toPaint);
        grid.get(y).get(x).push({ type: "moon", color: color });
        color = mutateColor(color, moonConfig.properties.noise);
    }
}
function halfMoon(grid, toPaint, moonConfig, start) {
    const r = moonConfig.properties.radius;
    const position = (0, generate_1.randInt)(0.25 * r, r * 0.9);
    const edge = [
        start[0] - position,
        start[1] - position * Math.min(Math.random(), 0.8),
    ];
    const fadeMargin = (0, generate_1.randInt)(0, 10);
    let color = [...moonConfig.properties.color, 1];
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
        }
        else {
            // Remove any star pixels in the darkness of the half moon
            for (let i = 0; i < grid.get(y).get(x).length; i++) {
                if (grid.get(y).get(x)[i].type == "star") {
                    grid.get(y).get(x).splice(i, 1);
                }
            }
        }
    }
}
function createMoon(grid, moonConfig, dimensions) {
    const r = moonConfig.properties.radius;
    const border = Math.round(1.5 * r);
    const start = [
        (0, generate_1.randInt)(border, dimensions.width - 1 - border),
        (0, generate_1.randInt)(border, dimensions.height - 1 - border),
    ];
    const toPaint = [];
    for (let y = start[1] - r; y < start[1] + r; y++) {
        for (let x = start[0] - r; x < start[0] + r; x++) {
            if (distance(x, y, start[0], start[1]) < r && onSky(x, y, dimensions)) {
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
function createGrid(h) {
    const grid = new Map();
    for (let i = 0; i < h; i++) {
        grid.set(i, new Map());
    }
    return grid;
}
function createSky(config) {
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
exports.createSky = createSky;
function collapsePixel(pixel) {
    let color = pixel[0].color;
    for (let j = 1; j < pixel.length; j++) {
        color = combineColors(pixel[j].color, color);
    }
    return color;
}
exports.collapsePixel = collapsePixel;
function getCanvasContext(config) {
    const canvas = document.getElementById("canvas");
    canvas.width = config.sky.properties.dimensions.width;
    canvas.height = config.sky.properties.dimensions.height;
    const context = canvas.getContext("2d");
    return context;
}
function buildCanvas(grid, config) {
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
function generateSky(config) {
    return __awaiter(this, void 0, void 0, function* () {
        const start = Date.now();
        const grid = yield createSky(config);
        buildCanvas(grid, config);
        const end = Date.now();
        console.log(`Completed in ${end - start}ms`);
    });
}
function run(random) {
    document.getElementById("generate-btn").style.display = "none";
    document.getElementById("loading-spinner").style.display = "grid";
    setTimeout(function () {
        const config = random ? (0, config_1.randConfig)() : (0, config_1.userConfig)();
        generateSky(config).then(() => {
            document.getElementById("config").style.display = "none";
        });
    }, 10);
}


/***/ }),

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randConfig = exports.userConfig = exports.initDefaults = exports.addCloudsLayer = exports.addSunsetLayer = exports.toggleProperties = void 0;
const generate_1 = __webpack_require__(/*! ./generate */ "./src/generate.ts");
let sunsetLayerCount = 0;
let cloudLayerCount = 0;
function defaultConfig() {
    const config = {
        sky: {
            properties: {
                dimensions: {
                    width: 1280,
                    height: 720,
                },
                pixelSize: 1,
                color: [94, 122, 187],
                opacity: 1,
                mutationSpeed: 0.3,
                mutationStyle: "Color spread",
            },
        },
        stars: {
            include: false,
            properties: {
                opacity: 1,
                density: 0.005,
            },
        },
        moon: {
            include: false,
            properties: {
                color: [200, 200, 200],
                radius: 25,
                halfMoon: false,
                noise: 0.5,
            },
        },
        sunset: {
            include: true,
            properties: {
                layers: [
                    {
                        color: [254, 207, 199],
                        maxOpacity: 0.7,
                        proportion: 0.7,
                        mutationSpeed: 0.2,
                        xStretch: 0.7,
                        yStretch: 0.5,
                    },
                    {
                        color: [253, 227, 228],
                        maxOpacity: 0.5,
                        proportion: 0.7,
                        mutationSpeed: 0.2,
                        xStretch: 0.6,
                        yStretch: 0.3,
                    },
                ],
            },
        },
        clouds: {
            include: false,
            properties: {
                quantity: 6,
                layers: [
                    {
                        color: [255, 255, 255],
                        opacity: 0.6,
                        minSize: 1000,
                        maxSize: 65000,
                        pH: 0.72, // Probability of horizontal expansion
                        pV: 0.3, // Probability of vertical expansion
                    },
                    {
                        color: [245, 245, 245],
                        opacity: 0.6,
                        minSize: 1000,
                        maxSize: 65000,
                        pH: 0.72, // Probability of horizontal expansion
                        pV: 0.3, // Probability of vertical expansion
                    },
                    {
                        color: [255, 255, 255],
                        opacity: 0.6,
                        minSize: 1000,
                        maxSize: 65000,
                        pH: 0.72, // Probability of horizontal expansion
                        pV: 0.3, // Probability of vertical expansion
                    },
                    {
                        color: [245, 245, 245],
                        opacity: 0.6,
                        minSize: 1000,
                        maxSize: 65000,
                        pH: 0.72, // Probability of horizontal expansion
                        pV: 0.3, // Probability of vertical expansion
                    },
                    {
                        color: [225, 225, 225],
                        opacity: 0.5,
                        minSize: 1000,
                        maxSize: 65000,
                        pH: 0.72, // Probability of horizontal expansion
                        pV: 0.3, // Probability of vertical expansion
                    },
                    {
                        color: [200, 200, 200],
                        opacity: 0.4,
                        minSize: 1000,
                        maxSize: 65000,
                        pH: 0.72, // Probability of horizontal expansion
                        pV: 0.3, // Probability of vertical expansion
                    },
                ],
            },
        },
    };
    return config;
}
function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}
function initSkyDefaults(config) {
    document.getElementById("skyWidth").value =
        config.sky.properties.dimensions.width.toString();
    document.getElementById("skyHeight").value =
        config.sky.properties.dimensions.height.toString();
    document.getElementById("skyPixelSize").value =
        config.sky.properties.pixelSize.toString();
    document.getElementById("skyColor").value = rgbToHex(config.sky.properties.color[0], config.sky.properties.color[1], config.sky.properties.color[2]);
    document.getElementById("skyOpacity").value =
        config.sky.properties.opacity.toString();
    document.getElementById("skyMutationSpeed").value =
        config.sky.properties.mutationSpeed.toString();
}
function initStarsDefaults(config) {
    document.getElementById("starsInclude").checked =
        config.stars.include;
    document.getElementById("starsOpacity").value =
        config.stars.properties.opacity.toString();
    document.getElementById("starsDensity").value =
        config.stars.properties.density.toString();
}
function toggleProperties(checkboxId, propertiesId) {
    if (document.getElementById(checkboxId).checked) {
        document.getElementById(propertiesId).style.display = "grid";
    }
    else {
        document.getElementById(propertiesId).style.display = "none";
    }
}
exports.toggleProperties = toggleProperties;
function initMoonDefaults(config) {
    document.getElementById("moonInclude").checked =
        config.moon.include;
    document.getElementById("moonColor").value = rgbToHex(config.moon.properties.color[0], config.moon.properties.color[1], config.moon.properties.color[2]);
    document.getElementById("moonRadius").value =
        config.moon.properties.radius.toString();
    document.getElementById("moonHalfMoon").checked =
        config.moon.properties.halfMoon;
    document.getElementById("moonNoise").value =
        config.moon.properties.noise.toString();
}
function renameLayers(layersID) {
    const layers = document.getElementById(layersID);
    for (let i = 0; i < layers.children.length; i++) {
        layers.children[i].children[0].textContent = "Layer " + (i + 1);
    }
}
function createSunsetLayers(config) {
    const originalSunsetLayer = document.getElementById("sunsetLayer");
    const layers = document.getElementById("sunsetLayers");
    layers.removeChild(originalSunsetLayer);
    for (let i = 0; i < config.sunset.properties.layers.length; i++) {
        const layer = originalSunsetLayer.cloneNode(true);
        layer.removeAttribute("id");
        layer.children[0].textContent = "Layer " + (i + 1);
        layer.children[1].onclick = function () {
            layers.removeChild(layer);
            sunsetLayerCount -= 1;
            renameLayers("sunsetLayers");
        };
        layer.children[2].children[1].value = rgbToHex(config.sunset.properties.layers[i].color[0], config.sunset.properties.layers[i].color[1], config.sunset.properties.layers[i].color[2]);
        layer.children[3].children[0].value =
            config.sunset.properties.layers[i].maxOpacity;
        layer.children[4].children[0].value =
            config.sunset.properties.layers[i].proportion;
        layer.children[5].children[0].value =
            config.sunset.properties.layers[i].mutationSpeed;
        layer.children[6].children[0].value =
            config.sunset.properties.layers[i].xStretch;
        layer.children[7].children[0].value =
            config.sunset.properties.layers[i].yStretch;
        layers.appendChild(layer);
        sunsetLayerCount += 1;
    }
}
function addSunsetLayer() {
    const originalSunsetLayer = document.getElementById("sunsetLayer");
    const layers = document.getElementById("sunsetLayers");
    let layer;
    if (layers.children.length > 0) {
        // Take previous sunset layer as template
        layer = layers.children[layers.children.length - 1].cloneNode(true);
    }
    else {
        // Revert to default template
        layer = originalSunsetLayer.cloneNode(true);
        layer.removeAttribute("id");
    }
    sunsetLayerCount += 1;
    layer.children[0].textContent = "Layer " + sunsetLayerCount;
    layer.children[1].onclick = function () {
        layers.removeChild(layer);
        sunsetLayerCount -= 1;
        renameLayers("sunsetLayers");
    };
    layers.appendChild(layer);
}
exports.addSunsetLayer = addSunsetLayer;
function initSunsetDefaults(config) {
    document.getElementById("sunsetInclude").checked =
        config.sunset.include;
    createSunsetLayers(config);
}
function createCloudsLayers(config) {
    const originalCloudLayer = document.getElementById("cloudsLayer");
    document.getElementById("cloudsLayers").removeChild(originalCloudLayer);
    for (let i = 0; i < config.clouds.properties.layers.length; i++) {
        const layer = originalCloudLayer.cloneNode(true);
        layer.removeAttribute("id");
        layer.children[0].textContent = "Layer " + (i + 1);
        layer.children[1].onclick = function () {
            document.getElementById("cloudsLayers").removeChild(layer);
            cloudLayerCount -= 1;
            renameLayers("cloudsLayers");
        };
        layer.children[2].children[1].value = rgbToHex(config.clouds.properties.layers[i].color[0], config.clouds.properties.layers[i].color[1], config.clouds.properties.layers[i].color[2]);
        layer.children[3].children[0].value =
            config.clouds.properties.layers[i].opacity;
        layer.children[4].children[0].value =
            config.clouds.properties.layers[i].minSize;
        layer.children[5].children[0].value =
            config.clouds.properties.layers[i].maxSize;
        layer.children[6].children[0].value = config.clouds.properties.layers[i].pH;
        layer.children[7].children[0].value = config.clouds.properties.layers[i].pV;
        document.getElementById("cloudsLayers").appendChild(layer);
        cloudLayerCount += 1;
    }
}
function addCloudsLayer() {
    const originalCloudLayer = document.getElementById("cloudsLayer");
    const layers = document.getElementById("cloudsLayers");
    let layer;
    if (layers.children.length > 0) {
        // Take previous cloud layer as template
        layer = layers.children[layers.children.length - 1].cloneNode(true);
    }
    else {
        // Revert to default template
        layer = originalCloudLayer.cloneNode(true);
        layer.removeAttribute("id");
    }
    cloudLayerCount += 1;
    layer.children[0].textContent = "Layer " + cloudLayerCount;
    layer.children[1].onclick = function () {
        document.getElementById("cloudsLayers").removeChild(layer);
        cloudLayerCount -= 1;
        renameLayers("cloudsLayers");
    };
    layers.appendChild(layer);
}
exports.addCloudsLayer = addCloudsLayer;
function initCloudsDefaults(config) {
    document.getElementById("cloudsInclude").checked =
        config.clouds.include;
    document.getElementById("cloudsQuantity").value =
        config.clouds.properties.quantity.toString();
    createCloudsLayers(config);
}
function hideExcluded(config) {
    if (!config.stars.include) {
        document.getElementById("starsProperties").style.display = "none";
    }
    if (!config.moon.include) {
        document.getElementById("moonProperties").style.display = "none";
    }
    if (!config.sunset.include) {
        document.getElementById("sunsetProperties").style.display = "none";
    }
    if (!config.clouds.include) {
        document.getElementById("cloudsProperties").style.display = "none";
    }
}
function initDefaults() {
    const config = defaultConfig();
    initSkyDefaults(config);
    initStarsDefaults(config);
    initMoonDefaults(config);
    initSunsetDefaults(config);
    initCloudsDefaults(config);
    hideExcluded(config);
}
exports.initDefaults = initDefaults;
function userSky() {
    const sky = {
        properties: {
            dimensions: {
                height: parseInt(document.getElementById("skyHeight").value),
                width: parseInt(document.getElementById("skyWidth").value),
            },
            pixelSize: parseInt(document.getElementById("skyPixelSize").value),
            color: hexToRGB(document.getElementById("skyColor").value),
            opacity: parseFloat(document.getElementById("skyOpacity").value),
            mutationSpeed: parseFloat(document.getElementById("skyMutationSpeed").value),
            mutationStyle: (document.getElementById("skyMutationStyle")).value,
        },
    };
    return sky;
}
function userStars() {
    const stars = {
        include: document.getElementById("starsInclude")
            .checked,
        properties: {
            opacity: parseFloat(document.getElementById("starsOpacity").value),
            density: parseFloat(document.getElementById("starsDensity").value),
        },
    };
    return stars;
}
function userMoon() {
    const moon = {
        include: document.getElementById("moonInclude").checked,
        properties: {
            color: hexToRGB(document.getElementById("moonColor").value),
            radius: parseInt(document.getElementById("moonRadius").value),
            halfMoon: document.getElementById("moonHalfMoon")
                .checked,
            noise: parseFloat(document.getElementById("moonNoise").value),
        },
    };
    return moon;
}
function userSunset() {
    const sunsetLayers = userSunsetLayers();
    const config = {
        include: document.getElementById("sunsetInclude")
            .checked,
        properties: {
            layers: sunsetLayers,
        },
    };
    return config;
}
function userSunsetLayers() {
    const layers = document.getElementById("sunsetLayers");
    const configLayers = [];
    for (let i = 0; i < layers.children.length; i++) {
        const layer = layers.children[i];
        const configLayer = {
            color: hexToRGB(layer.children[2].children[1].value),
            maxOpacity: parseFloat(layer.children[3].children[0].value),
            proportion: parseFloat(layer.children[4].children[0].value),
            mutationSpeed: parseFloat(layer.children[5].children[0].value),
            xStretch: parseFloat(layer.children[6].children[0].value),
            yStretch: parseFloat(layer.children[7].children[0].value),
        };
        configLayers.push(configLayer);
    }
    return configLayers;
}
function userCloudLayers() {
    const layers = document.getElementById("cloudsLayers");
    const cloudLayers = [];
    for (let i = 0; i < layers.children.length; i++) {
        const layer = layers.children[i];
        const configLayer = {
            color: hexToRGB(layer.children[2].children[1].value),
            opacity: parseFloat(layer.children[3].children[0].value),
            minSize: parseInt(layer.children[4].children[0].value),
            maxSize: parseInt(layer.children[5].children[0].value),
            pH: parseFloat(layer.children[6].children[0].value),
            pV: parseFloat(layer.children[7].children[0].value),
        };
        cloudLayers.push(configLayer);
    }
    return cloudLayers;
}
function userClouds() {
    const clouds = {
        include: document.getElementById("cloudsInclude")
            .checked,
        properties: {
            quantity: parseInt(document.getElementById("cloudsQuantity").value),
            layers: userCloudLayers(),
        },
    };
    return clouds;
}
function userConfig() {
    const config = {
        sky: userSky(),
        stars: userStars(),
        moon: userMoon(),
        sunset: userSunset(),
        clouds: userClouds(),
    };
    lowerRandomMutationSpeed(config);
    return config;
}
exports.userConfig = userConfig;
function randConfig() {
    const config = {
        sky: {
            properties: {
                dimensions: {
                    height: 720,
                    width: 1280,
                },
                pixelSize: (0, generate_1.randInt)(1, 5),
                color: [(0, generate_1.randInt)(0, 255), (0, generate_1.randInt)(0, 255), (0, generate_1.randInt)(0, 255)],
                opacity: (0, generate_1.randFloat)(0.5, 1),
                mutationSpeed: (0, generate_1.randFloat)(0.1, 0.5),
                mutationStyle: (0, generate_1.randMutationStyle)(),
            },
        },
        stars: {
            include: (0, generate_1.randBool)(),
            properties: {
                opacity: (0, generate_1.randFloat)(0.1, 1),
                density: (0, generate_1.randFloat)(0.001, 0.01),
            },
        },
        moon: {
            include: (0, generate_1.randBool)(),
            properties: {
                color: [(0, generate_1.randInt)(0, 255), (0, generate_1.randInt)(0, 255), (0, generate_1.randInt)(0, 255)],
                radius: (0, generate_1.randInt)(10, 50),
                halfMoon: (0, generate_1.randBool)(),
                noise: (0, generate_1.randFloat)(0, 1),
            },
        },
        sunset: {
            include: (0, generate_1.randBool)(),
            properties: {
                layers: (0, generate_1.randSunsetLayers)(),
            },
        },
        clouds: {
            include: (0, generate_1.randBool)(),
            properties: {
                quantity: (0, generate_1.randInt)(1, 25),
                layers: (0, generate_1.randCloudLayers)(),
            },
        },
    };
    lowerRandomMutationSpeed(config);
    return config;
}
exports.randConfig = randConfig;
function lowerRandomMutationSpeed(config) {
    // "Random" mutation style is much more sensitive to mutation speed
    // -> works best with a much lower mutation speed
    if (config.sky.properties.mutationStyle == "Random") {
        config.sky.properties.mutationSpeed /= 60;
    }
}


/***/ }),

/***/ "./src/generate.ts":
/*!*************************!*\
  !*** ./src/generate.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.randMutationStyle = exports.randBool = exports.randCloudLayers = exports.randSunsetLayers = exports.randInt = exports.randFloat = void 0;
function randFloat(min, max) {
    return Math.random() * (max - min) + min;
}
exports.randFloat = randFloat;
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
exports.randInt = randInt;
function randomSunsetColor() {
    return [randInt(100, 255), randInt(100, 240), randInt(100, 255)];
}
function randSunsetLayers() {
    const sunsetLayers = [];
    const n = randInt(1, 10);
    for (let i = 0; i < n; i++) {
        const layer = {
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
exports.randSunsetLayers = randSunsetLayers;
function randomCloudColor() {
    return [randInt(200, 255), randInt(200, 255), randInt(200, 255)];
}
function randCloudLayers() {
    const cloudLayers = [];
    const n = randInt(1, 25);
    for (let i = 0; i < n; i++) {
        const layer = {
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
exports.randCloudLayers = randCloudLayers;
function randBool() {
    return Math.random() < 0.5;
}
exports.randBool = randBool;
function randMutationStyle() {
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
exports.randMutationStyle = randMutationStyle;


/***/ }),

/***/ "./src/tuple-set.ts":
/*!**************************!*\
  !*** ./src/tuple-set.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class TupleSet {
    constructor() {
        this.data = new Map();
        this.count = 0;
    }
    add([first, second]) {
        if (!this.data.has(first)) {
            this.data.set(first, new Set());
        }
        this.data.get(first).add(second);
        this.count++;
        return this;
    }
    has([first, second]) {
        return this.data.has(first) && this.data.get(first).has(second);
    }
    delete([first, second]) {
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
    empty() {
        return this.count == 0;
    }
}
exports["default"] = TupleSet;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiO0FBQ0EsNEJBQTRCLCtEQUErRCxpQkFBaUI7QUFDNUc7QUFDQSxvQ0FBb0MsTUFBTSwrQkFBK0IsWUFBWTtBQUNyRixtQ0FBbUMsTUFBTSxtQ0FBbUMsWUFBWTtBQUN4RixnQ0FBZ0M7QUFDaEM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLDZDQUE2QztBQUM3QztBQUNBLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxxQkFBcUIsR0FBRyxpQkFBaUI7QUFDekMsb0NBQW9DLG1CQUFPLENBQUMsdUNBQWE7QUFDekQsbUJBQW1CLG1CQUFPLENBQUMscUNBQVk7QUFDdkMsaUJBQWlCLG1CQUFPLENBQUMsaUNBQVU7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMENBQTBDO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMENBQTBDO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvQkFBb0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsMENBQTBDO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Es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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFlOzs7Ozs7O1VDakNmO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUV0QkE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaWdpdGFsLXNreS8uL3NyYy9hcHAudHMiLCJ3ZWJwYWNrOi8vZGlnaXRhbC1za3kvLi9zcmMvY29uZmlnLnRzIiwid2VicGFjazovL2RpZ2l0YWwtc2t5Ly4vc3JjL2dlbmVyYXRlLnRzIiwid2VicGFjazovL2RpZ2l0YWwtc2t5Ly4vc3JjL3R1cGxlLXNldC50cyIsIndlYnBhY2s6Ly9kaWdpdGFsLXNreS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kaWdpdGFsLXNreS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2RpZ2l0YWwtc2t5L3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly9kaWdpdGFsLXNreS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19hd2FpdGVyID0gKHRoaXMgJiYgdGhpcy5fX2F3YWl0ZXIpIHx8IGZ1bmN0aW9uICh0aGlzQXJnLCBfYXJndW1lbnRzLCBQLCBnZW5lcmF0b3IpIHtcbiAgICBmdW5jdGlvbiBhZG9wdCh2YWx1ZSkgeyByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBQID8gdmFsdWUgOiBuZXcgUChmdW5jdGlvbiAocmVzb2x2ZSkgeyByZXNvbHZlKHZhbHVlKTsgfSk7IH1cbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgZnVuY3Rpb24gZnVsZmlsbGVkKHZhbHVlKSB7IHRyeSB7IHN0ZXAoZ2VuZXJhdG9yLm5leHQodmFsdWUpKTsgfSBjYXRjaCAoZSkgeyByZWplY3QoZSk7IH0gfVxuICAgICAgICBmdW5jdGlvbiByZWplY3RlZCh2YWx1ZSkgeyB0cnkgeyBzdGVwKGdlbmVyYXRvcltcInRocm93XCJdKHZhbHVlKSk7IH0gY2F0Y2ggKGUpIHsgcmVqZWN0KGUpOyB9IH1cbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cbiAgICAgICAgc3RlcCgoZ2VuZXJhdG9yID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pKS5uZXh0KCkpO1xuICAgIH0pO1xufTtcbnZhciBfX2ltcG9ydERlZmF1bHQgPSAodGhpcyAmJiB0aGlzLl9faW1wb3J0RGVmYXVsdCkgfHwgZnVuY3Rpb24gKG1vZCkge1xuICAgIHJldHVybiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSA/IG1vZCA6IHsgXCJkZWZhdWx0XCI6IG1vZCB9O1xufTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY29sbGFwc2VQaXhlbCA9IGV4cG9ydHMuY3JlYXRlU2t5ID0gdm9pZCAwO1xuY29uc3QgdHVwbGVfc2V0XzEgPSBfX2ltcG9ydERlZmF1bHQocmVxdWlyZShcIi4vdHVwbGUtc2V0XCIpKTtcbmNvbnN0IGdlbmVyYXRlXzEgPSByZXF1aXJlKFwiLi9nZW5lcmF0ZVwiKTtcbmNvbnN0IGNvbmZpZ18xID0gcmVxdWlyZShcIi4vY29uZmlnXCIpO1xuaWYgKHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAvLyBFeHBvc2UgVUkgdHJpZ2dlciBmdW5jdGlvbnMgdG8gdGhlIGJyb3dzZXJcbiAgICAvL0B0cy1pZ25vcmVcbiAgICB3aW5kb3cucnVuID0gcnVuO1xuICAgIC8vQHRzLWlnbm9yZVxuICAgIHdpbmRvdy50b2dnbGVQcm9wZXJ0aWVzID0gY29uZmlnXzEudG9nZ2xlUHJvcGVydGllcztcbiAgICAvL0B0cy1pZ25vcmVcbiAgICB3aW5kb3cuYWRkU3Vuc2V0TGF5ZXIgPSBjb25maWdfMS5hZGRTdW5zZXRMYXllcjtcbiAgICAvL0B0cy1pZ25vcmVcbiAgICB3aW5kb3cuYWRkQ2xvdWRzTGF5ZXIgPSBjb25maWdfMS5hZGRDbG91ZHNMYXllcjtcbiAgICAoMCwgY29uZmlnXzEuaW5pdERlZmF1bHRzKSgpO1xufVxuZnVuY3Rpb24gZm9ybWF0Q29sb3IociwgZywgYiwgYSkge1xuICAgIHJldHVybiBgcmdiYSgke3J9LCR7Z30sJHtifSwke2F9KWA7XG59XG5mdW5jdGlvbiBtdXRhdGVDb2xvcihjb2xvciwgcCwgc3RlcCA9IDEpIHtcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA8IHApIHtcbiAgICAgICAgY29uc3QgbXV0YXRlZENvbG9yID0gT2JqZWN0LnZhbHVlcyhjb2xvcik7XG4gICAgICAgIHN3aXRjaCAoKDAsIGdlbmVyYXRlXzEucmFuZEludCkoMCwgNSkpIHtcbiAgICAgICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgICAgICBtdXRhdGVkQ29sb3JbMF0gPSBNYXRoLm1pbihjb2xvclswXSArIHN0ZXAsIDI1NSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgbXV0YXRlZENvbG9yWzFdID0gTWF0aC5taW4oY29sb3JbMV0gKyBzdGVwLCAyNTUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIG11dGF0ZWRDb2xvclsyXSA9IE1hdGgubWluKGNvbG9yWzJdICsgc3RlcCwgMjU1KTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICBtdXRhdGVkQ29sb3JbMF0gPSBNYXRoLm1heChjb2xvclswXSAtIHN0ZXAsIDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICAgICAgIG11dGF0ZWRDb2xvclsxXSA9IE1hdGgubWF4KGNvbG9yWzFdIC0gc3RlcCwgMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgbXV0YXRlZENvbG9yWzJdID0gTWF0aC5tYXgoY29sb3JbMl0gLSBzdGVwLCAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbXV0YXRlZENvbG9yO1xuICAgIH1cbiAgICByZXR1cm4gY29sb3I7XG59XG5mdW5jdGlvbiBtdXRhdGVDb2xvckluUGxhY2UoY29sb3IsIHAsIHN0ZXAgPSAxKSB7XG4gICAgaWYgKE1hdGgucmFuZG9tKCkgPCBwKSB7XG4gICAgICAgIC8vLyBNb2RpZmllcyB0aGUgb3JpZ2luYWwgc3RhcnRpbmcgY29sb3JcbiAgICAgICAgc3dpdGNoICgoMCwgZ2VuZXJhdGVfMS5yYW5kSW50KSgwLCA1KSkge1xuICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgIGNvbG9yWzBdID0gTWF0aC5taW4oY29sb3JbMF0gKyBzdGVwLCAyNTUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgIGNvbG9yWzFdID0gTWF0aC5taW4oY29sb3JbMV0gKyBzdGVwLCAyNTUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgIGNvbG9yWzJdID0gTWF0aC5taW4oY29sb3JbMl0gKyBzdGVwLCAyNTUpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgICAgIGNvbG9yWzBdID0gTWF0aC5tYXgoY29sb3JbMF0gLSBzdGVwLCAwKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICBjb2xvclsxXSA9IE1hdGgubWF4KGNvbG9yWzFdIC0gc3RlcCwgMCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICAgICAgY29sb3JbMl0gPSBNYXRoLm1heChjb2xvclsyXSAtIHN0ZXAsIDApO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gY29sb3JTcHJlYWRCb3R0b20oeCwgeSwgaCwgY29sb3IsIHNlZW4sIHRvUGFpbnQpIHtcbiAgICBpZiAoeSA8IGggLSAxICYmICFzZWVuLmhhcyhbeCwgeSArIDFdKSkge1xuICAgICAgICB0b1BhaW50LnB1c2goW3gsIHkgKyAxLCBjb2xvcl0pO1xuICAgICAgICBzZWVuLmFkZChbeCwgeSArIDFdKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjb2xvclNwcmVhZFJpZ2h0KHgsIHksIHcsIGNvbG9yLCBzZWVuLCB0b1BhaW50KSB7XG4gICAgaWYgKHggPCB3IC0gMSAmJiAhc2Vlbi5oYXMoW3ggKyAxLCB5XSkpIHtcbiAgICAgICAgdG9QYWludC5wdXNoKFt4ICsgMSwgeSwgY29sb3JdKTtcbiAgICAgICAgc2Vlbi5hZGQoW3ggKyAxLCB5XSk7XG4gICAgfVxufVxuZnVuY3Rpb24gY29sb3JTcHJlYWRUb3AoeCwgeSwgY29sb3IsIHNlZW4sIHRvUGFpbnQpIHtcbiAgICBpZiAoeSA+IDAgJiYgIXNlZW4uaGFzKFt4LCB5IC0gMV0pKSB7XG4gICAgICAgIHRvUGFpbnQucHVzaChbeCwgeSAtIDEsIGNvbG9yXSk7XG4gICAgICAgIHNlZW4uYWRkKFt4LCB5IC0gMV0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNvbG9yU3ByZWFkTGVmdCh4LCB5LCBjb2xvciwgc2VlbiwgdG9QYWludCkge1xuICAgIGlmICh4ID4gMCAmJiAhc2Vlbi5oYXMoW3ggLSAxLCB5XSkpIHtcbiAgICAgICAgdG9QYWludC5wdXNoKFt4IC0gMSwgeSwgY29sb3JdKTtcbiAgICAgICAgc2Vlbi5hZGQoW3ggLSAxLCB5XSk7XG4gICAgfVxufVxuZnVuY3Rpb24gY29sb3JTcHJlYWRUb3BMZWZ0KHgsIHksIGNvbG9yLCBzZWVuLCB0b1BhaW50KSB7XG4gICAgaWYgKHggPiAwICYmIHkgPiAwICYmICFzZWVuLmhhcyhbeCAtIDEsIHkgLSAxXSkpIHtcbiAgICAgICAgdG9QYWludC5wdXNoKFt4IC0gMSwgeSAtIDEsIGNvbG9yXSk7XG4gICAgICAgIHNlZW4uYWRkKFt4IC0gMSwgeSAtIDFdKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjb2xvclNwcmVhZEJvdHRvbUxlZnQoeCwgeSwgaCwgY29sb3IsIHNlZW4sIHRvUGFpbnQpIHtcbiAgICBpZiAoeCA+IDAgJiYgeSA8IGggLSAxICYmICFzZWVuLmhhcyhbeCAtIDEsIHkgKyAxXSkpIHtcbiAgICAgICAgdG9QYWludC5wdXNoKFt4IC0gMSwgeSArIDEsIGNvbG9yXSk7XG4gICAgICAgIHNlZW4uYWRkKFt4IC0gMSwgeSArIDFdKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjb2xvclNwcmVhZFRvcFJpZ2h0KHgsIHksIHcsIGNvbG9yLCBzZWVuLCB0b1BhaW50KSB7XG4gICAgaWYgKHggPCB3IC0gMSAmJiB5ID4gMCAmJiAhc2Vlbi5oYXMoW3ggKyAxLCB5IC0gMV0pKSB7XG4gICAgICAgIHRvUGFpbnQucHVzaChbeCArIDEsIHkgLSAxLCBjb2xvcl0pO1xuICAgICAgICBzZWVuLmFkZChbeCArIDEsIHkgLSAxXSk7XG4gICAgfVxufVxuZnVuY3Rpb24gY29sb3JTcHJlYWRCb3R0b21SaWdodCh4LCB5LCBkaW1lbnNpb25zLCBjb2xvciwgc2VlbiwgdG9QYWludCkge1xuICAgIGlmICh4IDwgZGltZW5zaW9ucy53aWR0aCAtIDEgJiZcbiAgICAgICAgeSA8IGRpbWVuc2lvbnMuaGVpZ2h0IC0gMSAmJlxuICAgICAgICAhc2Vlbi5oYXMoW3ggKyAxLCB5ICsgMV0pKSB7XG4gICAgICAgIHRvUGFpbnQucHVzaChbeCArIDEsIHkgKyAxLCBjb2xvcl0pO1xuICAgICAgICBzZWVuLmFkZChbeCArIDEsIHkgKyAxXSk7XG4gICAgfVxufVxuLypcbiAqIENvbG9yIGFwcGVhcnMgZHJhd24gb3V0IGZyb20gdGhlIHN0YXJ0aW5nIHBvaW50LlxuICovXG5mdW5jdGlvbiBjb2xvclNwcmVhZDhEaXIoeCwgeSwgZGltZW5zaW9ucywgY29sb3IsIHNlZW4sIHRvUGFpbnQpIHtcbiAgICBjb2xvclNwcmVhZEJvdHRvbSh4LCB5LCBkaW1lbnNpb25zLmhlaWdodCwgY29sb3IsIHNlZW4sIHRvUGFpbnQpO1xuICAgIGNvbG9yU3ByZWFkUmlnaHQoeCwgeSwgZGltZW5zaW9ucy53aWR0aCwgY29sb3IsIHNlZW4sIHRvUGFpbnQpO1xuICAgIGNvbG9yU3ByZWFkVG9wKHgsIHksIGNvbG9yLCBzZWVuLCB0b1BhaW50KTtcbiAgICBjb2xvclNwcmVhZExlZnQoeCwgeSwgY29sb3IsIHNlZW4sIHRvUGFpbnQpO1xuICAgIGNvbG9yU3ByZWFkVG9wTGVmdCh4LCB5LCBjb2xvciwgc2VlbiwgdG9QYWludCk7XG4gICAgY29sb3JTcHJlYWRCb3R0b21MZWZ0KHgsIHksIGRpbWVuc2lvbnMuaGVpZ2h0LCBjb2xvciwgc2VlbiwgdG9QYWludCk7XG4gICAgY29sb3JTcHJlYWRUb3BSaWdodCh4LCB5LCBkaW1lbnNpb25zLndpZHRoLCBjb2xvciwgc2VlbiwgdG9QYWludCk7XG4gICAgY29sb3JTcHJlYWRCb3R0b21SaWdodCh4LCB5LCBkaW1lbnNpb25zLCBjb2xvciwgc2VlbiwgdG9QYWludCk7XG59XG5mdW5jdGlvbiBjb2xvclNwcmVhZDREaXIoeCwgeSwgZGltZW5zaW9ucywgY29sb3IsIHNlZW4sIHRvUGFpbnQpIHtcbiAgICBjb2xvclNwcmVhZEJvdHRvbSh4LCB5LCBkaW1lbnNpb25zLmhlaWdodCwgY29sb3IsIHNlZW4sIHRvUGFpbnQpO1xuICAgIGNvbG9yU3ByZWFkUmlnaHQoeCwgeSwgZGltZW5zaW9ucy53aWR0aCwgY29sb3IsIHNlZW4sIHRvUGFpbnQpO1xuICAgIGNvbG9yU3ByZWFkVG9wKHgsIHksIGNvbG9yLCBzZWVuLCB0b1BhaW50KTtcbiAgICBjb2xvclNwcmVhZExlZnQoeCwgeSwgY29sb3IsIHNlZW4sIHRvUGFpbnQpO1xufVxuLypcbiAqIFBpY2tzIGEgcmFuZG9tIHN0YXJ0aW5nIHBpeGVsLCBhbmQgYWRkcyBpdHMgOCBuZWlnaGJvdXJzIHRvIHRoZSBwb29sIG9mIHBpeGVsc1xuICogdG8gYmUgcmFuZG9tbHkgc2VsZWN0ZWQgbmV4dCBpdGVyYXRpb24gd2hpbHN0IG11dGF0aW5nIHRoZSBicnVzaCBjb2xvciBlYWNoIGl0ZXJhdGlvbi5cbiAqL1xuZnVuY3Rpb24gY29sb3JTcHJlYWQoZ3JpZCwgc2t5Q29uZmlnLCBkaW1lbnNpb25zKSB7XG4gICAgY29uc3Qgc2VlbiA9IG5ldyB0dXBsZV9zZXRfMS5kZWZhdWx0KCk7XG4gICAgY29uc3QgdG9QYWludCA9IFtdO1xuICAgIGNvbnN0IG11dGF0aW9uU3BlZWQgPSBza3lDb25maWcucHJvcGVydGllcy5tdXRhdGlvblNwZWVkO1xuICAgIGNvbnN0IHN0YXJ0Q29sb3IgPSBbXG4gICAgICAgIC4uLnNreUNvbmZpZy5wcm9wZXJ0aWVzLmNvbG9yLFxuICAgICAgICBza3lDb25maWcucHJvcGVydGllcy5vcGFjaXR5LFxuICAgIF07XG4gICAgY29uc3Qgc3RhcnQgPSBbXG4gICAgICAgICgwLCBnZW5lcmF0ZV8xLnJhbmRJbnQpKDAsIGRpbWVuc2lvbnMud2lkdGggLSAxKSxcbiAgICAgICAgKDAsIGdlbmVyYXRlXzEucmFuZEludCkoMCwgZGltZW5zaW9ucy5oZWlnaHQgLSAxKSxcbiAgICBdO1xuICAgIHRvUGFpbnQucHVzaChbc3RhcnRbMF0sIHN0YXJ0WzFdLCBzdGFydENvbG9yXSk7XG4gICAgc2Vlbi5hZGQoc3RhcnQpO1xuICAgIGxldCB4LCB5LCBjb2xvcjtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpbWVuc2lvbnMud2lkdGggKiBkaW1lbnNpb25zLmhlaWdodDsgaSsrKSB7XG4gICAgICAgIFt4LCB5LCBjb2xvcl0gPSBuZXh0UGl4ZWwodG9QYWludCk7XG4gICAgICAgIGdyaWQuZ2V0KHkpLnNldCh4LCBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJza3lcIixcbiAgICAgICAgICAgICAgICBjb2xvcjogY29sb3IsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcbiAgICAgICAgY29sb3JTcHJlYWQ4RGlyKHgsIHksIGRpbWVuc2lvbnMsIG11dGF0ZUNvbG9yKGNvbG9yLCBtdXRhdGlvblNwZWVkKSwgc2VlbiwgdG9QYWludCk7XG4gICAgfVxufVxuLypcbiAqIFBpY2tzIGEgcmFuZG9tIHN0YXJ0aW5nIHBpeGVsLCBhbmQgYWRkcyBpdHMgOCBuZWlnaGJvdXJzIHRvIHRoZSBwb29sIG9mIHBpeGVsc1xuICogdG8gYmUgcmFuZG9tbHkgc2VsZWN0ZWQgbmV4dCBpdGVyYXRpb24gd2hpbHN0IG11dGF0aW5nIHRoZSBicnVzaCBjb2xvciBlYWNoIGl0ZXJhdGlvbi5cbiAqL1xuZnVuY3Rpb24gY29sb3JQb2ludFNwcmVhZFdhdnkoZ3JpZCwgc2t5Q29uZmlnLCBkaW1lbnNpb25zKSB7XG4gICAgY29uc3Qgc2VlbiA9IG5ldyB0dXBsZV9zZXRfMS5kZWZhdWx0KCk7XG4gICAgY29uc3QgdG9QYWludCA9IFtdO1xuICAgIGNvbnN0IG11dGF0aW9uU3BlZWQgPSBza3lDb25maWcucHJvcGVydGllcy5tdXRhdGlvblNwZWVkO1xuICAgIGxldCBjb2xvciA9IFtcbiAgICAgICAgLi4uc2t5Q29uZmlnLnByb3BlcnRpZXMuY29sb3IsXG4gICAgICAgIHNreUNvbmZpZy5wcm9wZXJ0aWVzLm9wYWNpdHksXG4gICAgXTtcbiAgICBjb25zdCBzdGFydCA9IFtcbiAgICAgICAgKDAsIGdlbmVyYXRlXzEucmFuZEludCkoMCwgZGltZW5zaW9ucy53aWR0aCAtIDEpLFxuICAgICAgICAoMCwgZ2VuZXJhdGVfMS5yYW5kSW50KSgwLCBkaW1lbnNpb25zLmhlaWdodCAtIDEpLFxuICAgIF07XG4gICAgdG9QYWludC5wdXNoKFtzdGFydFswXSwgc3RhcnRbMV0sIGNvbG9yXSk7XG4gICAgc2Vlbi5hZGQoc3RhcnQpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZGltZW5zaW9ucy53aWR0aCAqIGRpbWVuc2lvbnMuaGVpZ2h0OyBpKyspIHtcbiAgICAgICAgY29uc3QgW3gsIHksIF9dID0gbmV4dFBpeGVsKHRvUGFpbnQpO1xuICAgICAgICBjb2xvciA9IG11dGF0ZUNvbG9yKGNvbG9yLCBtdXRhdGlvblNwZWVkKTtcbiAgICAgICAgZ3JpZC5nZXQoeSkuc2V0KHgsIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInNreVwiLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuICAgICAgICBjb2xvclNwcmVhZDhEaXIoeCwgeSwgZGltZW5zaW9ucywgbnVsbCwgc2VlbiwgdG9QYWludCk7XG4gICAgfVxufVxuZnVuY3Rpb24gbmV4dENsb3Nlc3RQaXhlbCh0b1BhaW50LCBjZW50cmUpIHtcbiAgICBsZXQgaWR4ID0gMDtcbiAgICBsZXQgZCA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvUGFpbnQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgZGlzdCA9IGRpc3RhbmNlKHRvUGFpbnRbaV1bMF0sIHRvUGFpbnRbaV1bMV0sIGNlbnRyZVswXSwgY2VudHJlWzFdKTtcbiAgICAgICAgaWYgKGRpc3QgPCBkKSB7XG4gICAgICAgICAgICBkID0gZGlzdDtcbiAgICAgICAgICAgIGlkeCA9IGk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyogU2VsZWN0IGFuZCByZW1vdmUgcmFuZG9tIHBpeGVsIGZyb20gdG9QYWludCBsaXN0XG4gICAgQWNoaWV2ZWQgYnkgbW92aW5nIHJhbmRvbSBlbGVtZW50IHRvIHRoZSBlbmQgYW5kIHVzaW5nIC5wb3AoKSAtPiBmb3IgNzIwcFxuICAgIGltYWdlLCBmb3VuZCB0byBiZSAxMFggZmFzdGVyIHRoYW4gQXJyYXkuc3BsaWNlIG9uIHRoZSByYW5kb20gaW5kZXguICovXG4gICAgW3RvUGFpbnRbaWR4XSwgdG9QYWludFt0b1BhaW50Lmxlbmd0aCAtIDFdXSA9IFtcbiAgICAgICAgdG9QYWludFt0b1BhaW50Lmxlbmd0aCAtIDFdLFxuICAgICAgICB0b1BhaW50W2lkeF0sXG4gICAgXTtcbiAgICBjb25zdCBuZXh0ID0gdG9QYWludC5wb3AoKTtcbiAgICByZXR1cm4gbmV4dDtcbn1cbi8qXG4gKiBQaWNrcyBhIHJhbmRvbSBzdGFydGluZyBwaXhlbCwgYW5kIGFkZHMgaXRzIDggbmVpZ2hib3VycyB0byB0aGUgcG9vbCBvZiBwaXhlbHNcbiAqIHRvIGJlIHNlbGVjdGVkIG5leHQgaXRlcmF0aW9uLiBUaGUgY2xvc2VzdCBwaXhlbCB0byB0aGUgc3RhcnRpbmcgcG9pbnQgaXMgc2VsZWN0ZWQgbmV4dC5cbiAqL1xuZnVuY3Rpb24gY29sb3JQb2ludFNwcmVhZChncmlkLCBza3lDb25maWcsIGRpbWVuc2lvbnMpIHtcbiAgICBjb25zdCBzZWVuID0gbmV3IHR1cGxlX3NldF8xLmRlZmF1bHQoKTtcbiAgICBjb25zdCB0b1BhaW50ID0gW107XG4gICAgY29uc3QgbXV0YXRpb25TcGVlZCA9IHNreUNvbmZpZy5wcm9wZXJ0aWVzLm11dGF0aW9uU3BlZWQ7XG4gICAgbGV0IGNvbG9yID0gW1xuICAgICAgICAuLi5za3lDb25maWcucHJvcGVydGllcy5jb2xvcixcbiAgICAgICAgc2t5Q29uZmlnLnByb3BlcnRpZXMub3BhY2l0eSxcbiAgICBdO1xuICAgIGNvbnN0IHN0YXJ0ID0gW1xuICAgICAgICAoMCwgZ2VuZXJhdGVfMS5yYW5kSW50KSgwLCBkaW1lbnNpb25zLndpZHRoIC0gMSksXG4gICAgICAgICgwLCBnZW5lcmF0ZV8xLnJhbmRJbnQpKDAsIGRpbWVuc2lvbnMuaGVpZ2h0IC0gMSksXG4gICAgXTtcbiAgICB0b1BhaW50LnB1c2goW3N0YXJ0WzBdLCBzdGFydFsxXSwgbnVsbF0pO1xuICAgIHNlZW4uYWRkKHN0YXJ0KTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRpbWVuc2lvbnMud2lkdGggKiBkaW1lbnNpb25zLmhlaWdodDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IFt4LCB5LCBfXSA9IG5leHRDbG9zZXN0UGl4ZWwodG9QYWludCwgc3RhcnQpO1xuICAgICAgICBjb2xvciA9IG11dGF0ZUNvbG9yKGNvbG9yLCBtdXRhdGlvblNwZWVkKTtcbiAgICAgICAgZ3JpZC5nZXQoeSkuc2V0KHgsIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInNreVwiLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuICAgICAgICBjb2xvclNwcmVhZDhEaXIoeCwgeSwgZGltZW5zaW9ucywgbnVsbCwgc2VlbiwgdG9QYWludCk7XG4gICAgfVxufVxuLypcbiAqIFBpY2tzIGEgcmFuZG9tIHN0YXJ0aW5nIHBpeGVsLCBhbmQgYWRkcyBpdHMgOCBuZWlnaGJvdXJzIHRvIHRoZSBxdWV1ZSBmcm9tXG4gKiBhIHBpeGVsIGlzIHBvcHBlZCBlYWNoIGl0ZXJhdGlvbi5cbiAqL1xuZnVuY3Rpb24gY29sb3JTcHJlYWRRdWV1ZShncmlkLCBza3lDb25maWcsIGNvbG9yU3ByZWFkRnVuYywgZGltZW5zaW9ucykge1xuICAgIGNvbnN0IHNlZW4gPSBuZXcgdHVwbGVfc2V0XzEuZGVmYXVsdCgpO1xuICAgIGNvbnN0IHRvUGFpbnQgPSBbXTtcbiAgICBjb25zdCBtdXRhdGlvblNwZWVkID0gc2t5Q29uZmlnLnByb3BlcnRpZXMubXV0YXRpb25TcGVlZDtcbiAgICBjb25zdCBzdGFydENvbG9yID0gW1xuICAgICAgICAuLi5za3lDb25maWcucHJvcGVydGllcy5jb2xvcixcbiAgICAgICAgc2t5Q29uZmlnLnByb3BlcnRpZXMub3BhY2l0eSxcbiAgICBdO1xuICAgIGNvbnN0IHN0YXJ0ID0gW1xuICAgICAgICAoMCwgZ2VuZXJhdGVfMS5yYW5kSW50KSgwLCBkaW1lbnNpb25zLndpZHRoIC0gMSksXG4gICAgICAgICgwLCBnZW5lcmF0ZV8xLnJhbmRJbnQpKDAsIGRpbWVuc2lvbnMuaGVpZ2h0IC0gMSksXG4gICAgXTtcbiAgICB0b1BhaW50LnB1c2goW3N0YXJ0WzBdLCBzdGFydFsxXSwgc3RhcnRDb2xvcl0pO1xuICAgIHNlZW4uYWRkKHN0YXJ0KTtcbiAgICBsZXQgeCwgeSwgY29sb3I7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaW1lbnNpb25zLndpZHRoICogZGltZW5zaW9ucy5oZWlnaHQ7IGkrKykge1xuICAgICAgICBbeCwgeSwgY29sb3JdID0gdG9QYWludC5wb3AoKTtcbiAgICAgICAgZ3JpZC5nZXQoeSkuc2V0KHgsIFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiBcInNreVwiLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuICAgICAgICBjb2xvclNwcmVhZEZ1bmMoeCwgeSwgZGltZW5zaW9ucywgbXV0YXRlQ29sb3IoY29sb3IsIG11dGF0aW9uU3BlZWQpLCBzZWVuLCB0b1BhaW50KTtcbiAgICB9XG59XG4vKlxuICogUGljayByYW5kb20gcGl4ZWxzIGFjcm9zcyB0aGUgZW50aXJlIGltYWdlIHdoaWxzdCBtdXRhdGluZyB0aGUgYnJ1c2ggY29sb3JcbiAqIHRvIGNyZWF0ZXMgYSBub2lzZSBlZmZlY3QuXG4gKi9cbmZ1bmN0aW9uIGNvbG9yUmFuZG9tKGdyaWQsIHNreUNvbmZpZywgZGltZW5zaW9ucykge1xuICAgIGNvbnN0IHBpeGVscyA9IFtdO1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgZGltZW5zaW9ucy5oZWlnaHQ7IHkrKykge1xuICAgICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IGRpbWVuc2lvbnMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgcGl4ZWxzLnB1c2goW3gsIHldKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBzaHVmZmxlQXJyYXkocGl4ZWxzKTtcbiAgICBsZXQgY29sb3IgPSBbXG4gICAgICAgIC4uLnNreUNvbmZpZy5wcm9wZXJ0aWVzLmNvbG9yLFxuICAgICAgICBza3lDb25maWcucHJvcGVydGllcy5vcGFjaXR5LFxuICAgIF07XG4gICAgY29uc3QgbXV0YXRpb25TcGVlZCA9IHNreUNvbmZpZy5wcm9wZXJ0aWVzLm11dGF0aW9uU3BlZWQ7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkaW1lbnNpb25zLndpZHRoICogZGltZW5zaW9ucy5oZWlnaHQ7IGkrKykge1xuICAgICAgICBjb25zdCBbeCwgeV0gPSBwaXhlbHMucG9wKCk7XG4gICAgICAgIGdyaWQuZ2V0KHkpLnNldCh4LCBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogXCJza3lcIixcbiAgICAgICAgICAgICAgICBjb2xvcjogY29sb3IsXG4gICAgICAgICAgICB9LFxuICAgICAgICBdKTtcbiAgICAgICAgY29sb3IgPSBtdXRhdGVDb2xvcihjb2xvciwgbXV0YXRpb25TcGVlZCk7XG4gICAgfVxufVxuZnVuY3Rpb24gc2h1ZmZsZUFycmF5KGFycikge1xuICAgIGZvciAobGV0IGkgPSBhcnIubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xuICAgICAgICBjb25zdCBqID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKGkgKyAxKSk7XG4gICAgICAgIFthcnJbaV0sIGFycltqXV0gPSBbYXJyW2pdLCBhcnJbaV1dO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNvbG9ySG9yaXpvbnRhbCh4LCB5LCBkaW1lbnNpb25zLCBjb2xvciwgc2VlbiwgdG9QYWludCkge1xuICAgIGNvbG9yU3ByZWFkVG9wKHgsIHksIGNvbG9yLCBzZWVuLCB0b1BhaW50KTtcbiAgICBjb2xvclNwcmVhZEJvdHRvbSh4LCB5LCBkaW1lbnNpb25zLmhlaWdodCwgY29sb3IsIHNlZW4sIHRvUGFpbnQpO1xuICAgIGNvbG9yU3ByZWFkTGVmdCh4LCB5LCBjb2xvciwgc2VlbiwgdG9QYWludCk7XG4gICAgY29sb3JTcHJlYWRSaWdodCh4LCB5LCBkaW1lbnNpb25zLndpZHRoLCBjb2xvciwgc2VlbiwgdG9QYWludCk7XG59XG5mdW5jdGlvbiBjb2xvckRpYWdvbmFsKHgsIHksIGRpbWVuc2lvbnMsIGNvbG9yLCBzZWVuLCB0b1BhaW50KSB7XG4gICAgY29sb3JTcHJlYWRCb3R0b20oeCwgeSwgZGltZW5zaW9ucy5oZWlnaHQsIGNvbG9yLCBzZWVuLCB0b1BhaW50KTtcbiAgICBjb2xvclNwcmVhZFJpZ2h0KHgsIHksIGRpbWVuc2lvbnMud2lkdGgsIGNvbG9yLCBzZWVuLCB0b1BhaW50KTtcbiAgICBjb2xvclNwcmVhZFRvcCh4LCB5LCBjb2xvciwgc2VlbiwgdG9QYWludCk7XG4gICAgY29sb3JTcHJlYWRMZWZ0KHgsIHksIGNvbG9yLCBzZWVuLCB0b1BhaW50KTtcbiAgICBjb2xvclNwcmVhZFRvcExlZnQoeCwgeSwgY29sb3IsIHNlZW4sIHRvUGFpbnQpO1xuICAgIGNvbG9yU3ByZWFkQm90dG9tTGVmdCh4LCB5LCBkaW1lbnNpb25zLmhlaWdodCwgY29sb3IsIHNlZW4sIHRvUGFpbnQpO1xuICAgIGNvbG9yU3ByZWFkVG9wUmlnaHQoeCwgeSwgZGltZW5zaW9ucy53aWR0aCwgY29sb3IsIHNlZW4sIHRvUGFpbnQpO1xuICAgIGNvbG9yU3ByZWFkQm90dG9tUmlnaHQoeCwgeSwgZGltZW5zaW9ucywgY29sb3IsIHNlZW4sIHRvUGFpbnQpO1xufVxuZnVuY3Rpb24gY29sb3JWZXJ0aWNhbCh4LCB5LCBkaW1lbnNpb25zLCBjb2xvciwgc2VlbiwgdG9QYWludCkge1xuICAgIGNvbG9yU3ByZWFkTGVmdCh4LCB5LCBjb2xvciwgc2VlbiwgdG9QYWludCk7XG4gICAgY29sb3JTcHJlYWRSaWdodCh4LCB5LCBkaW1lbnNpb25zLndpZHRoLCBjb2xvciwgc2VlbiwgdG9QYWludCk7XG4gICAgY29sb3JTcHJlYWRUb3AoeCwgeSwgY29sb3IsIHNlZW4sIHRvUGFpbnQpO1xuICAgIGNvbG9yU3ByZWFkQm90dG9tKHgsIHksIGRpbWVuc2lvbnMuaGVpZ2h0LCBjb2xvciwgc2VlbiwgdG9QYWludCk7XG59XG5mdW5jdGlvbiBwYWludFNreShncmlkLCBza3lDb25maWcsIGRpbWVuc2lvbnMpIHtcbiAgICBjb25zdCBtdXRhdGlvblN0eWxlID0gc2t5Q29uZmlnLnByb3BlcnRpZXMubXV0YXRpb25TdHlsZTtcbiAgICBzd2l0Y2ggKG11dGF0aW9uU3R5bGUpIHtcbiAgICAgICAgY2FzZSBcIkNvbG9yIHNwcmVhZFwiOlxuICAgICAgICAgICAgY29sb3JTcHJlYWQoZ3JpZCwgc2t5Q29uZmlnLCBkaW1lbnNpb25zKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiUmFuZG9tXCI6XG4gICAgICAgICAgICBjb2xvclJhbmRvbShncmlkLCBza3lDb25maWcsIGRpbWVuc2lvbnMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJQb2ludCBzcHJlYWRcIjpcbiAgICAgICAgICAgIGNvbG9yUG9pbnRTcHJlYWQoZ3JpZCwgc2t5Q29uZmlnLCBkaW1lbnNpb25zKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFwiUG9pbnQgc3ByZWFkIHdhdnlcIjpcbiAgICAgICAgICAgIGNvbG9yUG9pbnRTcHJlYWRXYXZ5KGdyaWQsIHNreUNvbmZpZywgZGltZW5zaW9ucyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBcIkhvcml6b250YWxcIjpcbiAgICAgICAgICAgIGNvbG9yU3ByZWFkUXVldWUoZ3JpZCwgc2t5Q29uZmlnLCBjb2xvckhvcml6b250YWwsIGRpbWVuc2lvbnMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJWZXJ0aWNhbFwiOlxuICAgICAgICAgICAgY29sb3JTcHJlYWRRdWV1ZShncmlkLCBza3lDb25maWcsIGNvbG9yVmVydGljYWwsIGRpbWVuc2lvbnMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgXCJEaWFnb25hbFwiOlxuICAgICAgICAgICAgY29sb3JTcHJlYWRRdWV1ZShncmlkLCBza3lDb25maWcsIGNvbG9yRGlhZ29uYWwsIGRpbWVuc2lvbnMpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5SYW5nZShjbG91ZFNpemUsIHNpemVSYW5nZSkge1xuICAgIHJldHVybiBjbG91ZFNpemUgPD0gc2l6ZVJhbmdlWzBdICYmIGNsb3VkU2l6ZSA8PSBzaXplUmFuZ2VbMV07XG59XG5mdW5jdGlvbiBjb250aW51ZUV4cGFuZGluZyhwLCBjbG91ZFNpemUsIHNpemVSYW5nZSkge1xuICAgIC8vIElmIHdlIHJvbGwgdGhlIHByb2JhYmlsaXR5IE9SIHdlIGhhdmVuJ3QgcmVhY2hlZCB0aGUgbWluIGNsb3VkIHNpemUgeWV0XG4gICAgLy8gQU5EIHdlJ3ZlIG5vdCBleGNlZWRlZCB0aGUgbWF4aW11bVxuICAgIHJldHVybiAoY2xvdWRTaXplIDwgc2l6ZVJhbmdlWzFdICYmIChjbG91ZFNpemUgPCBzaXplUmFuZ2VbMF0gfHwgTWF0aC5yYW5kb20oKSA8IHApKTtcbn1cbmZ1bmN0aW9uIGNsb3Vkc1NwcmVhZCh4LCB5LCBjb2xvciwgc2VlbiwgdG9QYWludCwgY2xvdWRTaXplLCBzaXplUmFuZ2UsIHBILCBwViwgZGltZW5zaW9ucykge1xuICAgIGlmIChjb250aW51ZUV4cGFuZGluZyhwViwgY2xvdWRTaXplLCBzaXplUmFuZ2UpKSB7XG4gICAgICAgIGlmICh5IDwgZGltZW5zaW9ucy5oZWlnaHQgLSAxICYmICFzZWVuLmhhcyhbeCwgeSArIDFdKSkge1xuICAgICAgICAgICAgc2Vlbi5hZGQoW3gsIHkgKyAxXSk7XG4gICAgICAgICAgICB0b1BhaW50LnB1c2goW3gsIHkgKyAxLCBjb2xvcl0pO1xuICAgICAgICAgICAgY2xvdWRTaXplICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHkgPiAwICYmICFzZWVuLmhhcyhbeCwgeSAtIDFdKSkge1xuICAgICAgICAgICAgc2Vlbi5hZGQoW3gsIHkgLSAxXSk7XG4gICAgICAgICAgICB0b1BhaW50LnB1c2goW3gsIHkgLSAxLCBjb2xvcl0pO1xuICAgICAgICAgICAgY2xvdWRTaXplICs9IDE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGNvbnRpbnVlRXhwYW5kaW5nKHBILCBjbG91ZFNpemUsIHNpemVSYW5nZSkpIHtcbiAgICAgICAgaWYgKHggPCBkaW1lbnNpb25zLndpZHRoIC0gMSAmJiAhc2Vlbi5oYXMoW3ggKyAxLCB5XSkpIHtcbiAgICAgICAgICAgIHNlZW4uYWRkKFt4ICsgMSwgeV0pO1xuICAgICAgICAgICAgdG9QYWludC5wdXNoKFt4ICsgMSwgeSwgY29sb3JdKTtcbiAgICAgICAgICAgIGNsb3VkU2l6ZSArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4ID4gMCAmJiAhc2Vlbi5oYXMoW3ggLSAxLCB5XSkpIHtcbiAgICAgICAgICAgIHNlZW4uYWRkKFt4IC0gMSwgeV0pO1xuICAgICAgICAgICAgdG9QYWludC5wdXNoKFt4IC0gMSwgeSwgY29sb3JdKTtcbiAgICAgICAgICAgIGNsb3VkU2l6ZSArPSAxO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjbG91ZFNpemU7XG59XG5mdW5jdGlvbiBjcmVhdGVDbG91ZFBpeGVsKGNvbG9yKSB7XG4gICAgY29uc3QgY2xvdWRQaXhlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgY2xvdWRQaXhlbC5jbGFzc05hbWUgPSBcInBpeGVsIGNsb3VkXCI7XG4gICAgY2xvdWRQaXhlbC5zdHlsZS5iYWNrZ3JvdW5kID0gZm9ybWF0Q29sb3IoLi4uY29sb3IpO1xuICAgIHJldHVybiBjbG91ZFBpeGVsO1xufVxuZnVuY3Rpb24gbmV4dFBpeGVsKHRvUGFpbnQpIHtcbiAgICAvKiBTZWxlY3QgYW5kIHJlbW92ZSByYW5kb20gcGl4ZWwgZnJvbSB0b1BhaW50IGxpc3RcbiAgICBBY2hpZXZlZCBieSBtb3ZpbmcgcmFuZG9tIGVsZW1lbnQgdG8gdGhlIGVuZCBhbmQgdXNpbmcgLnBvcCgpIC0+IGZvciA3MjBwXG4gICAgaW1hZ2UsIGZvdW5kIHRvIGJlIDEwWCBmYXN0ZXIgdGhhbiBBcnJheS5zcGxpY2Ugb24gdGhlIHJhbmRvbSBpbmRleC4gKi9cbiAgICBjb25zdCBpZHggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0b1BhaW50Lmxlbmd0aCk7XG4gICAgW3RvUGFpbnRbaWR4XSwgdG9QYWludFt0b1BhaW50Lmxlbmd0aCAtIDFdXSA9IFtcbiAgICAgICAgdG9QYWludFt0b1BhaW50Lmxlbmd0aCAtIDFdLFxuICAgICAgICB0b1BhaW50W2lkeF0sXG4gICAgXTtcbiAgICBjb25zdCBuZXh0ID0gdG9QYWludC5wb3AoKTtcbiAgICByZXR1cm4gbmV4dDtcbn1cbmZ1bmN0aW9uIGFkZENsb3VkVG9Ta3koZ3JpZCwgeCwgeSwgY29sb3IsIGxheWVyKSB7XG4gICAgY29uc3QgW2hhc0Nsb3VkLCBpZHhdID0gcGl4ZWxIYXNUeXBlKGdyaWQuZ2V0KHkpLmdldCh4KSwgXCJjbG91ZFwiICsgbGF5ZXIpO1xuICAgIGlmIChoYXNDbG91ZCkge1xuICAgICAgICBncmlkLmdldCh5KS5nZXQoeClbaWR4XS5jb2xvciA9IGNvbWJpbmVDb2xvcnMoY29sb3IsIGdyaWQuZ2V0KHkpLmdldCh4KVtpZHhdLmNvbG9yKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdyaWRcbiAgICAgICAgICAgIC5nZXQoeSlcbiAgICAgICAgICAgIC5nZXQoeClcbiAgICAgICAgICAgIC5wdXNoKHsgdHlwZTogXCJjbG91ZFwiICsgbGF5ZXIsIGNvbG9yOiBjb2xvciB9KTtcbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVDbG91ZEJhc2UoZ3JpZCwgc3RhcnRDb2xvciwgc2l6ZVJhbmdlLCBwSCwgcFYsIGRpbWVuc2lvbnMpIHtcbiAgICBjb25zdCBzZWVuID0gbmV3IHR1cGxlX3NldF8xLmRlZmF1bHQoKTtcbiAgICBjb25zdCB0b1BhaW50ID0gW107XG4gICAgY29uc3Qgc3RhcnQgPSBbXG4gICAgICAgICgwLCBnZW5lcmF0ZV8xLnJhbmRJbnQpKDAsIGRpbWVuc2lvbnMud2lkdGggLSAxKSxcbiAgICAgICAgKDAsIGdlbmVyYXRlXzEucmFuZEludCkoMCwgZGltZW5zaW9ucy5oZWlnaHQgLSAxKSxcbiAgICBdO1xuICAgIHRvUGFpbnQucHVzaChbc3RhcnRbMF0sIHN0YXJ0WzFdLCBzdGFydENvbG9yXSk7XG4gICAgc2Vlbi5hZGQoc3RhcnQpO1xuICAgIGxldCBjbG91ZFNpemUgPSAxO1xuICAgIHdoaWxlICh0b1BhaW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgW3gsIHksIGNvbG9yXSA9IG5leHRQaXhlbCh0b1BhaW50KTtcbiAgICAgICAgYWRkQ2xvdWRUb1NreShncmlkLCB4LCB5LCBjb2xvciwgMCk7XG4gICAgICAgIGNvbnN0IG5leHRDb2xvciA9IG11dGF0ZUNvbG9yKGNvbG9yLCAwLjkpO1xuICAgICAgICBjbG91ZFNpemUgPSBjbG91ZHNTcHJlYWQoeCwgeSwgbmV4dENvbG9yLCBzZWVuLCB0b1BhaW50LCBjbG91ZFNpemUsIHNpemVSYW5nZSwgcEgsIHBWLCBkaW1lbnNpb25zKTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXJ0O1xufVxuZnVuY3Rpb24gcGl4ZWxIYXNUeXBlKHBpeGVsLCB0eXBlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwaXhlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAocGl4ZWxbaV0udHlwZSA9PSB0eXBlKSB7XG4gICAgICAgICAgICByZXR1cm4gW3RydWUsIGldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBbZmFsc2UsIC0xXTtcbn1cbmZ1bmN0aW9uIGFkZENsb3VkTGF5ZXIoZ3JpZCwgc3RhcnQsIGxheWVyLCBzdGFydENvbG9yLCBzaXplUmFuZ2UsIHBILCBwViwgZGltZW5zaW9ucykge1xuICAgIGNvbnN0IHNlZW4gPSBuZXcgdHVwbGVfc2V0XzEuZGVmYXVsdCgpO1xuICAgIGNvbnN0IHRvUGFpbnQgPSBbXTtcbiAgICB0b1BhaW50LnB1c2goW3N0YXJ0WzBdLCBzdGFydFsxXSwgc3RhcnRDb2xvcl0pO1xuICAgIHNlZW4uYWRkKHN0YXJ0KTtcbiAgICBsZXQgY3VycmVudFNpemUgPSAxO1xuICAgIHdoaWxlICh0b1BhaW50Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29uc3QgW3gsIHksIGNvbG9yXSA9IG5leHRQaXhlbCh0b1BhaW50KTtcbiAgICAgICAgYWRkQ2xvdWRUb1NreShncmlkLCB4LCB5LCBjb2xvciwgbGF5ZXIpO1xuICAgICAgICBjb25zdCBuZXh0Q29sb3IgPSBtdXRhdGVDb2xvcihjb2xvciwgMC45KTtcbiAgICAgICAgY3VycmVudFNpemUgPSBjbG91ZHNTcHJlYWQoeCwgeSwgbmV4dENvbG9yLCBzZWVuLCB0b1BhaW50LCBjdXJyZW50U2l6ZSwgc2l6ZVJhbmdlLCBwSCwgcFYsIGRpbWVuc2lvbnMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZUNsb3VkKGdyaWQsIGxheWVycywgZGltZW5zaW9ucykge1xuICAgIGNvbnN0IHN0YXJ0ID0gY3JlYXRlQ2xvdWRCYXNlKGdyaWQsIFsuLi5sYXllcnNbMF0uY29sb3IsIGxheWVyc1swXS5vcGFjaXR5XSwgW2xheWVyc1swXS5taW5TaXplLCBsYXllcnNbMF0ubWF4U2l6ZV0sIGxheWVyc1swXS5wSCwgbGF5ZXJzWzBdLnBWLCBkaW1lbnNpb25zKTtcbiAgICBmb3IgKGxldCBpID0gMTsgaSA8IGxheWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBhZGRDbG91ZExheWVyKGdyaWQsIHN0YXJ0LCBpLCBbLi4ubGF5ZXJzW2ldLmNvbG9yLCBsYXllcnNbaV0ub3BhY2l0eV0sIFtsYXllcnNbaV0ubWluU2l6ZSwgbGF5ZXJzW2ldLm1heFNpemVdLCBsYXllcnNbaV0ucEgsIGxheWVyc1tpXS5wViwgZGltZW5zaW9ucyk7XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlQ2xvdWRzKGdyaWQsIGNsb3Vkc0NvbmZpZywgZGltZW5zaW9ucykge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY2xvdWRzQ29uZmlnLnByb3BlcnRpZXMucXVhbnRpdHk7IGkrKykge1xuICAgICAgICBjcmVhdGVDbG91ZChncmlkLCBjbG91ZHNDb25maWcucHJvcGVydGllcy5sYXllcnMsIGRpbWVuc2lvbnMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZVN0YXJQaXhlbChjb2xvcikge1xuICAgIGNvbnN0IHN0YXJQaXhlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgc3RhclBpeGVsLmNsYXNzTmFtZSA9IFwicGl4ZWwgc3RhclwiO1xuICAgIHN0YXJQaXhlbC5zdHlsZS5iYWNrZ3JvdW5kID0gZm9ybWF0Q29sb3IoLi4uY29sb3IpO1xuICAgIHJldHVybiBzdGFyUGl4ZWw7XG59XG5mdW5jdGlvbiBvblNreSh4LCB5LCBkaW1lbnNpb25zKSB7XG4gICAgcmV0dXJuIHggPj0gMCAmJiB5ID49IDAgJiYgeCA8IGRpbWVuc2lvbnMud2lkdGggJiYgeSA8IGRpbWVuc2lvbnMuaGVpZ2h0O1xufVxuZnVuY3Rpb24gc3RhckNvbG9yKG9wYWNpdHkpIHtcbiAgICByZXR1cm4gWygwLCBnZW5lcmF0ZV8xLnJhbmRJbnQpKDIzMCwgMjU1KSwgKDAsIGdlbmVyYXRlXzEucmFuZEludCkoMjEwLCAyNDApLCAoMCwgZ2VuZXJhdGVfMS5yYW5kSW50KSgyMjAsIDI1NSksIG9wYWNpdHldO1xufVxuZnVuY3Rpb24gY3JlYXRlU3Rhcih4LCB5LCBkaW1lbnNpb25zLCBncmlkLCBvcGFjaXR5KSB7XG4gICAgY29uc3QgY29sb3IgPSBzdGFyQ29sb3Iob3BhY2l0eSk7XG4gICAgZ3JpZFxuICAgICAgICAuZ2V0KHkpXG4gICAgICAgIC5nZXQoeClcbiAgICAgICAgLnB1c2goeyB0eXBlOiBcInN0YXJcIiwgY29sb3I6IGNvbG9yIH0pO1xuICAgIC8vIFByb2JhYmlsaXN0aWNhbGx5IGFkZCBhZGRpdGlvbmFsIG5laWdoYm91cmluZyBzdGFyIHBpeGVsc1xuICAgIGNvbnN0IHAgPSAwLjE7XG4gICAgW1xuICAgICAgICBbeCArIDEsIHldLFxuICAgICAgICBbeCwgeSArIDFdLFxuICAgICAgICBbeCAtIDEsIHldLFxuICAgICAgICBbeCwgeSAtIDFdLFxuICAgIF0uZm9yRWFjaCgoY29vcmQpID0+IHtcbiAgICAgICAgaWYgKE1hdGgucmFuZG9tKCkgPCBwICYmIG9uU2t5KGNvb3JkWzBdLCBjb29yZFsxXSwgZGltZW5zaW9ucykpIHtcbiAgICAgICAgICAgIGdyaWQuZ2V0KGNvb3JkWzFdKS5nZXQoY29vcmRbMF0pLnB1c2goeyB0eXBlOiBcInN0YXJcIiwgY29sb3I6IGNvbG9yIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVTdGFycyhncmlkLCBzdGFyc0NvbmZpZywgZGltZW5zaW9ucykge1xuICAgIGNvbnN0IG4gPSBkaW1lbnNpb25zLmhlaWdodCAqIGRpbWVuc2lvbnMud2lkdGggKiBzdGFyc0NvbmZpZy5wcm9wZXJ0aWVzLmRlbnNpdHk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgY29uc3QgeCA9ICgwLCBnZW5lcmF0ZV8xLnJhbmRJbnQpKDAsIGRpbWVuc2lvbnMud2lkdGggLSAxKTtcbiAgICAgICAgY29uc3QgeSA9ICgwLCBnZW5lcmF0ZV8xLnJhbmRJbnQpKDAsIGRpbWVuc2lvbnMuaGVpZ2h0IC0gMSk7XG4gICAgICAgIGNyZWF0ZVN0YXIoeCwgeSwgZGltZW5zaW9ucywgZ3JpZCwgc3RhcnNDb25maWcucHJvcGVydGllcy5vcGFjaXR5KTtcbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVTdW5zZXRQaXhlbChjb2xvcikge1xuICAgIGNvbnN0IHN1bnNldFBpeGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBzdW5zZXRQaXhlbC5jbGFzc05hbWUgPSBcInBpeGVsIHN1bnNldFwiO1xuICAgIHN1bnNldFBpeGVsLnN0eWxlLmJhY2tncm91bmQgPSBmb3JtYXRDb2xvciguLi5jb2xvcik7XG4gICAgcmV0dXJuIHN1bnNldFBpeGVsO1xufVxuZnVuY3Rpb24gZ2V0UkdCVmFsdWVzKHN0cikge1xuICAgIGNvbnN0IHZhbHMgPSBzdHIuc3Vic3RyaW5nKHN0ci5pbmRleE9mKFwiKFwiKSArIDEsIHN0ci5sZW5ndGggLSAxKS5zcGxpdChcIiwgXCIpO1xuICAgIHJldHVybiBbcGFyc2VJbnQodmFsc1swXSksIHBhcnNlSW50KHZhbHNbMV0pLCBwYXJzZUludCh2YWxzWzJdKV07XG59XG5mdW5jdGlvbiBzdW5zZXRTcHJlYWQoeCwgeSwgZGltZW5zaW9ucywgY29sb3IsIHRvUGFpbnQsIHNlZW4pIHtcbiAgICBjb2xvclNwcmVhZEJvdHRvbSh4LCB5LCBkaW1lbnNpb25zLmhlaWdodCwgY29sb3IsIHNlZW4sIHRvUGFpbnQpO1xuICAgIGNvbG9yU3ByZWFkVG9wKHgsIHksIGNvbG9yLCBzZWVuLCB0b1BhaW50KTtcbiAgICBjb2xvclNwcmVhZFJpZ2h0KHgsIHksIGRpbWVuc2lvbnMud2lkdGgsIGNvbG9yLCBzZWVuLCB0b1BhaW50KTtcbiAgICBjb2xvclNwcmVhZExlZnQoeCwgeSwgY29sb3IsIHNlZW4sIHRvUGFpbnQpO1xufVxuZnVuY3Rpb24gd2FycGVkRGlzdGFuY2UoeDEsIHkxLCB4MiwgeTIsIHhTdHJldGNoLCB5U3RyZXRjaCkge1xuICAgIGNvbnN0IHggPSAoeTIgLSB5MSkgKiAoMSAtIHlTdHJldGNoKTtcbiAgICBjb25zdCB5ID0gKHgyIC0geDEpICogKDEgLSB4U3RyZXRjaCk7XG4gICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbn1cbmZ1bmN0aW9uIGNvbWJpbmVDb2xvcnMoY29sb3IxLCBjb2xvcjIpIHtcbiAgICBjb25zdCBhMSA9IGNvbG9yMVszXTtcbiAgICBjb25zdCBhMiA9IGNvbG9yMlszXTtcbiAgICBjb25zdCBhID0gYTEgKyBhMiAqICgxIC0gYTEpO1xuICAgIGNvbnN0IGNvbG9yID0gW1xuICAgICAgICAoY29sb3IxWzBdICogYTEgKyBjb2xvcjJbMF0gKiBhMiAqICgxIC0gYTEpKSAvIGEsXG4gICAgICAgIChjb2xvcjFbMV0gKiBhMSArIGNvbG9yMlsxXSAqIGEyICogKDEgLSBhMSkpIC8gYSxcbiAgICAgICAgKGNvbG9yMVsyXSAqIGExICsgY29sb3IyWzJdICogYTIgKiAoMSAtIGExKSkgLyBhLFxuICAgICAgICBhLFxuICAgIF07XG4gICAgcmV0dXJuIGNvbG9yO1xufVxuZnVuY3Rpb24gYWRkU3Vuc2V0VG9Ta3koZ3JpZCwgeCwgeSwgY29sb3IpIHtcbiAgICBjb25zdCBbaGFzU3Vuc2V0LCBpZHhdID0gcGl4ZWxIYXNUeXBlKGdyaWQuZ2V0KHkpLmdldCh4KSwgXCJzdW5zZXRcIik7XG4gICAgaWYgKGhhc1N1bnNldCkge1xuICAgICAgICBncmlkLmdldCh5KS5nZXQoeClbaWR4XS5jb2xvciA9IGNvbWJpbmVDb2xvcnMoY29sb3IsIGdyaWQuZ2V0KHkpLmdldCh4KVtpZHhdLmNvbG9yKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGdyaWQuZ2V0KHkpLmdldCh4KS5wdXNoKHsgdHlwZTogXCJzdW5zZXRcIiwgY29sb3I6IGNvbG9yIH0pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZVN1bnNldExheWVyKGdyaWQsIGxheWVyQ29uZmlnLCBkaW1lbnNpb25zKSB7XG4gICAgY29uc3QgbWF4RCA9IGRpbWVuc2lvbnMuaGVpZ2h0ICogbGF5ZXJDb25maWcucHJvcG9ydGlvbjtcbiAgICBjb25zdCBzZWVuID0gbmV3IHR1cGxlX3NldF8xLmRlZmF1bHQoKTtcbiAgICBjb25zdCB0b1BhaW50ID0gW107XG4gICAgLy8gU2VsZWN0IGEgcmFuZG9tIHBpeGVsIHRvIGdyb3cgdGhlIHN1bnNldCBmcm9tXG4gICAgY29uc3Qgc3RhcnQgPSBbXG4gICAgICAgICgwLCBnZW5lcmF0ZV8xLnJhbmRJbnQpKDAsIGRpbWVuc2lvbnMud2lkdGggLSAxKSxcbiAgICAgICAgZGltZW5zaW9ucy5oZWlnaHQgLSAxLFxuICAgIF07XG4gICAgdG9QYWludC5wdXNoKFtzdGFydFswXSwgc3RhcnRbMV0sIFsuLi5sYXllckNvbmZpZy5jb2xvciwgMV1dKTtcbiAgICBzZWVuLmFkZChzdGFydCk7XG4gICAgbGV0IHNjYWxlO1xuICAgIGxldCB4LCB5LCBjb2xvcjtcbiAgICB3aGlsZSAodG9QYWludC5sZW5ndGggPiAwKSB7XG4gICAgICAgIFt4LCB5LCBjb2xvcl0gPSBuZXh0UGl4ZWwodG9QYWludCk7XG4gICAgICAgIHNjYWxlID1cbiAgICAgICAgICAgIDEgLVxuICAgICAgICAgICAgICAgIHdhcnBlZERpc3RhbmNlKHgsIHksIHN0YXJ0WzBdLCBzdGFydFsxXSwgbGF5ZXJDb25maWcueFN0cmV0Y2gsIGxheWVyQ29uZmlnLnlTdHJldGNoKSAvXG4gICAgICAgICAgICAgICAgICAgIG1heEQ7XG4gICAgICAgIGlmIChzY2FsZSA8PSAwKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb2xvclszXSA9IGxheWVyQ29uZmlnLm1heE9wYWNpdHkgKiBzY2FsZTsgLy8gQWRqdXN0IG9wYWNpdHlcbiAgICAgICAgZ3JpZC5nZXQoeSkuZ2V0KHgpLnB1c2goeyB0eXBlOiBcInN1bnNldFwiLCBjb2xvcjogY29sb3IgfSk7XG4gICAgICAgIHN1bnNldFNwcmVhZCh4LCB5LCBkaW1lbnNpb25zLCBtdXRhdGVDb2xvcihjb2xvciwgbGF5ZXJDb25maWcubXV0YXRpb25TcGVlZCksIHRvUGFpbnQsIHNlZW4pO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZVN1bnNldChncmlkLCBzdW5zZXRDb25maWcsIGRpbWVuc2lvbnMpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1bnNldENvbmZpZy5wcm9wZXJ0aWVzLmxheWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjcmVhdGVTdW5zZXRMYXllcihncmlkLCBzdW5zZXRDb25maWcucHJvcGVydGllcy5sYXllcnNbaV0sIGRpbWVuc2lvbnMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRpc3RhbmNlKHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgY29uc3QgeCA9IHkyIC0geTE7XG4gICAgY29uc3QgeSA9IHgyIC0geDE7XG4gICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZU1vb25QaXhlbChjb2xvcikge1xuICAgIGNvbnN0IG1vb25QaXhlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgbW9vblBpeGVsLmNsYXNzTmFtZSA9IFwicGl4ZWwgbW9vblwiO1xuICAgIG1vb25QaXhlbC5zdHlsZS5iYWNrZ3JvdW5kID0gZm9ybWF0Q29sb3IoLi4uY29sb3IpO1xuICAgIHJldHVybiBtb29uUGl4ZWw7XG59XG5mdW5jdGlvbiBmdWxsTW9vbihncmlkLCB0b1BhaW50LCBtb29uQ29uZmlnKSB7XG4gICAgbGV0IGNvbG9yID0gWy4uLm1vb25Db25maWcucHJvcGVydGllcy5jb2xvciwgMV07XG4gICAgd2hpbGUgKHRvUGFpbnQubGVuZ3RoID4gMCkge1xuICAgICAgICBjb25zdCBbeCwgeV0gPSBuZXh0UGl4ZWwodG9QYWludCk7XG4gICAgICAgIGdyaWQuZ2V0KHkpLmdldCh4KS5wdXNoKHsgdHlwZTogXCJtb29uXCIsIGNvbG9yOiBjb2xvciB9KTtcbiAgICAgICAgY29sb3IgPSBtdXRhdGVDb2xvcihjb2xvciwgbW9vbkNvbmZpZy5wcm9wZXJ0aWVzLm5vaXNlKTtcbiAgICB9XG59XG5mdW5jdGlvbiBoYWxmTW9vbihncmlkLCB0b1BhaW50LCBtb29uQ29uZmlnLCBzdGFydCkge1xuICAgIGNvbnN0IHIgPSBtb29uQ29uZmlnLnByb3BlcnRpZXMucmFkaXVzO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gKDAsIGdlbmVyYXRlXzEucmFuZEludCkoMC4yNSAqIHIsIHIgKiAwLjkpO1xuICAgIGNvbnN0IGVkZ2UgPSBbXG4gICAgICAgIHN0YXJ0WzBdIC0gcG9zaXRpb24sXG4gICAgICAgIHN0YXJ0WzFdIC0gcG9zaXRpb24gKiBNYXRoLm1pbihNYXRoLnJhbmRvbSgpLCAwLjgpLFxuICAgIF07XG4gICAgY29uc3QgZmFkZU1hcmdpbiA9ICgwLCBnZW5lcmF0ZV8xLnJhbmRJbnQpKDAsIDEwKTtcbiAgICBsZXQgY29sb3IgPSBbLi4ubW9vbkNvbmZpZy5wcm9wZXJ0aWVzLmNvbG9yLCAxXTtcbiAgICB3aGlsZSAodG9QYWludC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IFt4LCB5XSA9IG5leHRQaXhlbCh0b1BhaW50KTtcbiAgICAgICAgY29uc3QgZCA9IGRpc3RhbmNlKHgsIHksIGVkZ2VbMF0sIGVkZ2VbMV0pO1xuICAgICAgICBpZiAoZCA+PSByKSB7XG4gICAgICAgICAgICBjb25zdCBvcGFjaXR5ID0gTWF0aC5taW4oKGQgLSByKSAvIGZhZGVNYXJnaW4sIDEpO1xuICAgICAgICAgICAgY29sb3JbM10gPSBvcGFjaXR5O1xuICAgICAgICAgICAgZ3JpZC5nZXQoeSkuZ2V0KHgpLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6IFwibW9vblwiLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY29sb3IgPSBtdXRhdGVDb2xvcihjb2xvciwgbW9vbkNvbmZpZy5wcm9wZXJ0aWVzLm5vaXNlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBhbnkgc3RhciBwaXhlbHMgaW4gdGhlIGRhcmtuZXNzIG9mIHRoZSBoYWxmIG1vb25cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JpZC5nZXQoeSkuZ2V0KHgpLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdyaWQuZ2V0KHkpLmdldCh4KVtpXS50eXBlID09IFwic3RhclwiKSB7XG4gICAgICAgICAgICAgICAgICAgIGdyaWQuZ2V0KHkpLmdldCh4KS5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gY3JlYXRlTW9vbihncmlkLCBtb29uQ29uZmlnLCBkaW1lbnNpb25zKSB7XG4gICAgY29uc3QgciA9IG1vb25Db25maWcucHJvcGVydGllcy5yYWRpdXM7XG4gICAgY29uc3QgYm9yZGVyID0gTWF0aC5yb3VuZCgxLjUgKiByKTtcbiAgICBjb25zdCBzdGFydCA9IFtcbiAgICAgICAgKDAsIGdlbmVyYXRlXzEucmFuZEludCkoYm9yZGVyLCBkaW1lbnNpb25zLndpZHRoIC0gMSAtIGJvcmRlciksXG4gICAgICAgICgwLCBnZW5lcmF0ZV8xLnJhbmRJbnQpKGJvcmRlciwgZGltZW5zaW9ucy5oZWlnaHQgLSAxIC0gYm9yZGVyKSxcbiAgICBdO1xuICAgIGNvbnN0IHRvUGFpbnQgPSBbXTtcbiAgICBmb3IgKGxldCB5ID0gc3RhcnRbMV0gLSByOyB5IDwgc3RhcnRbMV0gKyByOyB5KyspIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IHN0YXJ0WzBdIC0gcjsgeCA8IHN0YXJ0WzBdICsgcjsgeCsrKSB7XG4gICAgICAgICAgICBpZiAoZGlzdGFuY2UoeCwgeSwgc3RhcnRbMF0sIHN0YXJ0WzFdKSA8IHIgJiYgb25Ta3koeCwgeSwgZGltZW5zaW9ucykpIHtcbiAgICAgICAgICAgICAgICB0b1BhaW50LnB1c2goW3gsIHldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobW9vbkNvbmZpZy5wcm9wZXJ0aWVzLmhhbGZNb29uKSB7XG4gICAgICAgIGhhbGZNb29uKGdyaWQsIHRvUGFpbnQsIG1vb25Db25maWcsIHN0YXJ0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZ1bGxNb29uKGdyaWQsIHRvUGFpbnQsIG1vb25Db25maWcpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZUdyaWQoaCkge1xuICAgIGNvbnN0IGdyaWQgPSBuZXcgTWFwKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBoOyBpKyspIHtcbiAgICAgICAgZ3JpZC5zZXQoaSwgbmV3IE1hcCgpKTtcbiAgICB9XG4gICAgcmV0dXJuIGdyaWQ7XG59XG5mdW5jdGlvbiBjcmVhdGVTa3koY29uZmlnKSB7XG4gICAgY29uc3QgZGltZW5zaW9ucyA9IGNvbmZpZy5za3kucHJvcGVydGllcy5kaW1lbnNpb25zO1xuICAgIGNvbnN0IGdyaWQgPSBjcmVhdGVHcmlkKGRpbWVuc2lvbnMuaGVpZ2h0KTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlcywgZXJyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiUGFpbnRpbmcgc2t5Li4uXCIpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHBhaW50U2t5KGdyaWQsIGNvbmZpZy5za3ksIGRpbWVuc2lvbnMpO1xuICAgICAgICAgICAgaWYgKGNvbmZpZy5zdW5zZXQuaW5jbHVkZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQXBwbHlpbmcgc3Vuc2V0Li4uXCIpO1xuICAgICAgICAgICAgICAgIGNyZWF0ZVN1bnNldChncmlkLCBjb25maWcuc3Vuc2V0LCBkaW1lbnNpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb25maWcuc3RhcnMuaW5jbHVkZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRHJhd2luZyBzdGFycy4uLlwiKTtcbiAgICAgICAgICAgICAgICBjcmVhdGVTdGFycyhncmlkLCBjb25maWcuc3RhcnMsIGRpbWVuc2lvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbmZpZy5tb29uLmluY2x1ZGUpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkFkZGluZyBtb29uLi4uXCIpO1xuICAgICAgICAgICAgICAgIGNyZWF0ZU1vb24oZ3JpZCwgY29uZmlnLm1vb24sIGRpbWVuc2lvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGNvbmZpZy5jbG91ZHMuaW5jbHVkZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiQnJ1c2hpbmcgY2xvdWRzLi4uXCIpO1xuICAgICAgICAgICAgICAgIGNyZWF0ZUNsb3VkcyhncmlkLCBjb25maWcuY2xvdWRzLCBkaW1lbnNpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcyhncmlkKTtcbiAgICAgICAgfSwgMTApO1xuICAgIH0pO1xufVxuZXhwb3J0cy5jcmVhdGVTa3kgPSBjcmVhdGVTa3k7XG5mdW5jdGlvbiBjb2xsYXBzZVBpeGVsKHBpeGVsKSB7XG4gICAgbGV0IGNvbG9yID0gcGl4ZWxbMF0uY29sb3I7XG4gICAgZm9yIChsZXQgaiA9IDE7IGogPCBwaXhlbC5sZW5ndGg7IGorKykge1xuICAgICAgICBjb2xvciA9IGNvbWJpbmVDb2xvcnMocGl4ZWxbal0uY29sb3IsIGNvbG9yKTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbG9yO1xufVxuZXhwb3J0cy5jb2xsYXBzZVBpeGVsID0gY29sbGFwc2VQaXhlbDtcbmZ1bmN0aW9uIGdldENhbnZhc0NvbnRleHQoY29uZmlnKSB7XG4gICAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjYW52YXNcIik7XG4gICAgY2FudmFzLndpZHRoID0gY29uZmlnLnNreS5wcm9wZXJ0aWVzLmRpbWVuc2lvbnMud2lkdGg7XG4gICAgY2FudmFzLmhlaWdodCA9IGNvbmZpZy5za3kucHJvcGVydGllcy5kaW1lbnNpb25zLmhlaWdodDtcbiAgICBjb25zdCBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcbiAgICByZXR1cm4gY29udGV4dDtcbn1cbmZ1bmN0aW9uIGJ1aWxkQ2FudmFzKGdyaWQsIGNvbmZpZykge1xuICAgIGNvbnN0IHcgPSBjb25maWcuc2t5LnByb3BlcnRpZXMuZGltZW5zaW9ucy53aWR0aDtcbiAgICBjb25zdCBoID0gY29uZmlnLnNreS5wcm9wZXJ0aWVzLmRpbWVuc2lvbnMuaGVpZ2h0O1xuICAgIGNvbnN0IGNvbnRleHQgPSBnZXRDYW52YXNDb250ZXh0KGNvbmZpZyk7XG4gICAgY29uc3QgaW1hZ2VEYXRhID0gY29udGV4dC5jcmVhdGVJbWFnZURhdGEodywgaCk7XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCBoOyB5KyspIHtcbiAgICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB3OyB4KyspIHtcbiAgICAgICAgICAgIC8vIEluZGV4IDFEIGFycmF5IGFzIDJEIGFycmF5IHdpdGggYSBzdGVwIG9mIDQgKGZvciByZ2JhIGVsZW1lbnRzKVxuICAgICAgICAgICAgY29uc3QgaSA9ICh4ICsgdyAqIHkpICogNDtcbiAgICAgICAgICAgIGNvbnN0IGNvbG9yID0gY29sbGFwc2VQaXhlbChncmlkLmdldCh5KS5nZXQoeCkpO1xuICAgICAgICAgICAgaW1hZ2VEYXRhLmRhdGFbaV0gPSBjb2xvclswXTtcbiAgICAgICAgICAgIGltYWdlRGF0YS5kYXRhW2kgKyAxXSA9IGNvbG9yWzFdO1xuICAgICAgICAgICAgaW1hZ2VEYXRhLmRhdGFbaSArIDJdID0gY29sb3JbMl07XG4gICAgICAgICAgICBpbWFnZURhdGEuZGF0YVtpICsgM10gPSBjb2xvclszXSAqIDI1NTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBjb250ZXh0LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xufVxuZnVuY3Rpb24gZ2VuZXJhdGVTa3koY29uZmlnKSB7XG4gICAgcmV0dXJuIF9fYXdhaXRlcih0aGlzLCB2b2lkIDAsIHZvaWQgMCwgZnVuY3Rpb24qICgpIHtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBncmlkID0geWllbGQgY3JlYXRlU2t5KGNvbmZpZyk7XG4gICAgICAgIGJ1aWxkQ2FudmFzKGdyaWQsIGNvbmZpZyk7XG4gICAgICAgIGNvbnN0IGVuZCA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKGBDb21wbGV0ZWQgaW4gJHtlbmQgLSBzdGFydH1tc2ApO1xuICAgIH0pO1xufVxuZnVuY3Rpb24gcnVuKHJhbmRvbSkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2VuZXJhdGUtYnRuXCIpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxvYWRpbmctc3Bpbm5lclwiKS5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IHJhbmRvbSA/ICgwLCBjb25maWdfMS5yYW5kQ29uZmlnKSgpIDogKDAsIGNvbmZpZ18xLnVzZXJDb25maWcpKCk7XG4gICAgICAgIGdlbmVyYXRlU2t5KGNvbmZpZykudGhlbigoKSA9PiB7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbmZpZ1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIH0pO1xuICAgIH0sIDEwKTtcbn1cbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5yYW5kQ29uZmlnID0gZXhwb3J0cy51c2VyQ29uZmlnID0gZXhwb3J0cy5pbml0RGVmYXVsdHMgPSBleHBvcnRzLmFkZENsb3Vkc0xheWVyID0gZXhwb3J0cy5hZGRTdW5zZXRMYXllciA9IGV4cG9ydHMudG9nZ2xlUHJvcGVydGllcyA9IHZvaWQgMDtcbmNvbnN0IGdlbmVyYXRlXzEgPSByZXF1aXJlKFwiLi9nZW5lcmF0ZVwiKTtcbmxldCBzdW5zZXRMYXllckNvdW50ID0gMDtcbmxldCBjbG91ZExheWVyQ291bnQgPSAwO1xuZnVuY3Rpb24gZGVmYXVsdENvbmZpZygpIHtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgIHNreToge1xuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDEyODAsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogNzIwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGl4ZWxTaXplOiAxLFxuICAgICAgICAgICAgICAgIGNvbG9yOiBbOTQsIDEyMiwgMTg3XSxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxLFxuICAgICAgICAgICAgICAgIG11dGF0aW9uU3BlZWQ6IDAuMyxcbiAgICAgICAgICAgICAgICBtdXRhdGlvblN0eWxlOiBcIkNvbG9yIHNwcmVhZFwiLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgICAgc3RhcnM6IHtcbiAgICAgICAgICAgIGluY2x1ZGU6IGZhbHNlLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgICAgZGVuc2l0eTogMC4wMDUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBtb29uOiB7XG4gICAgICAgICAgICBpbmNsdWRlOiBmYWxzZSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogWzIwMCwgMjAwLCAyMDBdLFxuICAgICAgICAgICAgICAgIHJhZGl1czogMjUsXG4gICAgICAgICAgICAgICAgaGFsZk1vb246IGZhbHNlLFxuICAgICAgICAgICAgICAgIG5vaXNlOiAwLjUsXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBzdW5zZXQ6IHtcbiAgICAgICAgICAgIGluY2x1ZGU6IHRydWUsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgbGF5ZXJzOiBbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBbMjU0LCAyMDcsIDE5OV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhPcGFjaXR5OiAwLjcsXG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wb3J0aW9uOiAwLjcsXG4gICAgICAgICAgICAgICAgICAgICAgICBtdXRhdGlvblNwZWVkOiAwLjIsXG4gICAgICAgICAgICAgICAgICAgICAgICB4U3RyZXRjaDogMC43LFxuICAgICAgICAgICAgICAgICAgICAgICAgeVN0cmV0Y2g6IDAuNSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFsyNTMsIDIyNywgMjI4XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heE9wYWNpdHk6IDAuNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb3BvcnRpb246IDAuNyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG11dGF0aW9uU3BlZWQ6IDAuMixcbiAgICAgICAgICAgICAgICAgICAgICAgIHhTdHJldGNoOiAwLjYsXG4gICAgICAgICAgICAgICAgICAgICAgICB5U3RyZXRjaDogMC4zLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBjbG91ZHM6IHtcbiAgICAgICAgICAgIGluY2x1ZGU6IGZhbHNlLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIHF1YW50aXR5OiA2LFxuICAgICAgICAgICAgICAgIGxheWVyczogW1xuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogWzI1NSwgMjU1LCAyNTVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC42LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWluU2l6ZTogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFNpemU6IDY1MDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgcEg6IDAuNzIsIC8vIFByb2JhYmlsaXR5IG9mIGhvcml6b250YWwgZXhwYW5zaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBwVjogMC4zLCAvLyBQcm9iYWJpbGl0eSBvZiB2ZXJ0aWNhbCBleHBhbnNpb25cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFsyNDUsIDI0NSwgMjQ1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuNixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblNpemU6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhTaXplOiA2NTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBIOiAwLjcyLCAvLyBQcm9iYWJpbGl0eSBvZiBob3Jpem9udGFsIGV4cGFuc2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgcFY6IDAuMywgLy8gUHJvYmFiaWxpdHkgb2YgdmVydGljYWwgZXhwYW5zaW9uXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBbMjU1LCAyNTUsIDI1NV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjYsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5TaXplOiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4U2l6ZTogNjUwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBwSDogMC43MiwgLy8gUHJvYmFiaWxpdHkgb2YgaG9yaXpvbnRhbCBleHBhbnNpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIHBWOiAwLjMsIC8vIFByb2JhYmlsaXR5IG9mIHZlcnRpY2FsIGV4cGFuc2lvblxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogWzI0NSwgMjQ1LCAyNDVdLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMC42LFxuICAgICAgICAgICAgICAgICAgICAgICAgbWluU2l6ZTogMTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heFNpemU6IDY1MDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgcEg6IDAuNzIsIC8vIFByb2JhYmlsaXR5IG9mIGhvcml6b250YWwgZXhwYW5zaW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBwVjogMC4zLCAvLyBQcm9iYWJpbGl0eSBvZiB2ZXJ0aWNhbCBleHBhbnNpb25cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29sb3I6IFsyMjUsIDIyNSwgMjI1XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuNSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pblNpemU6IDEwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhTaXplOiA2NTAwMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBIOiAwLjcyLCAvLyBQcm9iYWJpbGl0eSBvZiBob3Jpem9udGFsIGV4cGFuc2lvblxuICAgICAgICAgICAgICAgICAgICAgICAgcFY6IDAuMywgLy8gUHJvYmFiaWxpdHkgb2YgdmVydGljYWwgZXhwYW5zaW9uXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbG9yOiBbMjAwLCAyMDAsIDIwMF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjQsXG4gICAgICAgICAgICAgICAgICAgICAgICBtaW5TaXplOiAxMDAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4U2l6ZTogNjUwMDAsXG4gICAgICAgICAgICAgICAgICAgICAgICBwSDogMC43MiwgLy8gUHJvYmFiaWxpdHkgb2YgaG9yaXpvbnRhbCBleHBhbnNpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIHBWOiAwLjMsIC8vIFByb2JhYmlsaXR5IG9mIHZlcnRpY2FsIGV4cGFuc2lvblxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIGNvbmZpZztcbn1cbmZ1bmN0aW9uIGNvbXBvbmVudFRvSGV4KGMpIHtcbiAgICBjb25zdCBoZXggPSBjLnRvU3RyaW5nKDE2KTtcbiAgICByZXR1cm4gaGV4Lmxlbmd0aCA9PSAxID8gXCIwXCIgKyBoZXggOiBoZXg7XG59XG5mdW5jdGlvbiByZ2JUb0hleChyLCBnLCBiKSB7XG4gICAgcmV0dXJuIFwiI1wiICsgY29tcG9uZW50VG9IZXgocikgKyBjb21wb25lbnRUb0hleChnKSArIGNvbXBvbmVudFRvSGV4KGIpO1xufVxuZnVuY3Rpb24gaGV4VG9SR0IoaGV4KSB7XG4gICAgY29uc3QgciA9IHBhcnNlSW50KGhleC5zbGljZSgxLCAzKSwgMTYpLCBnID0gcGFyc2VJbnQoaGV4LnNsaWNlKDMsIDUpLCAxNiksIGIgPSBwYXJzZUludChoZXguc2xpY2UoNSwgNyksIDE2KTtcbiAgICByZXR1cm4gW3IsIGcsIGJdO1xufVxuZnVuY3Rpb24gaW5pdFNreURlZmF1bHRzKGNvbmZpZykge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2t5V2lkdGhcIikudmFsdWUgPVxuICAgICAgICBjb25maWcuc2t5LnByb3BlcnRpZXMuZGltZW5zaW9ucy53aWR0aC50b1N0cmluZygpO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2t5SGVpZ2h0XCIpLnZhbHVlID1cbiAgICAgICAgY29uZmlnLnNreS5wcm9wZXJ0aWVzLmRpbWVuc2lvbnMuaGVpZ2h0LnRvU3RyaW5nKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza3lQaXhlbFNpemVcIikudmFsdWUgPVxuICAgICAgICBjb25maWcuc2t5LnByb3BlcnRpZXMucGl4ZWxTaXplLnRvU3RyaW5nKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza3lDb2xvclwiKS52YWx1ZSA9IHJnYlRvSGV4KGNvbmZpZy5za3kucHJvcGVydGllcy5jb2xvclswXSwgY29uZmlnLnNreS5wcm9wZXJ0aWVzLmNvbG9yWzFdLCBjb25maWcuc2t5LnByb3BlcnRpZXMuY29sb3JbMl0pO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2t5T3BhY2l0eVwiKS52YWx1ZSA9XG4gICAgICAgIGNvbmZpZy5za3kucHJvcGVydGllcy5vcGFjaXR5LnRvU3RyaW5nKCk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza3lNdXRhdGlvblNwZWVkXCIpLnZhbHVlID1cbiAgICAgICAgY29uZmlnLnNreS5wcm9wZXJ0aWVzLm11dGF0aW9uU3BlZWQudG9TdHJpbmcoKTtcbn1cbmZ1bmN0aW9uIGluaXRTdGFyc0RlZmF1bHRzKGNvbmZpZykge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnNJbmNsdWRlXCIpLmNoZWNrZWQgPVxuICAgICAgICBjb25maWcuc3RhcnMuaW5jbHVkZTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJzT3BhY2l0eVwiKS52YWx1ZSA9XG4gICAgICAgIGNvbmZpZy5zdGFycy5wcm9wZXJ0aWVzLm9wYWNpdHkudG9TdHJpbmcoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJzRGVuc2l0eVwiKS52YWx1ZSA9XG4gICAgICAgIGNvbmZpZy5zdGFycy5wcm9wZXJ0aWVzLmRlbnNpdHkudG9TdHJpbmcoKTtcbn1cbmZ1bmN0aW9uIHRvZ2dsZVByb3BlcnRpZXMoY2hlY2tib3hJZCwgcHJvcGVydGllc0lkKSB7XG4gICAgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGNoZWNrYm94SWQpLmNoZWNrZWQpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQocHJvcGVydGllc0lkKS5zdHlsZS5kaXNwbGF5ID0gXCJncmlkXCI7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChwcm9wZXJ0aWVzSWQpLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICB9XG59XG5leHBvcnRzLnRvZ2dsZVByb3BlcnRpZXMgPSB0b2dnbGVQcm9wZXJ0aWVzO1xuZnVuY3Rpb24gaW5pdE1vb25EZWZhdWx0cyhjb25maWcpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vb25JbmNsdWRlXCIpLmNoZWNrZWQgPVxuICAgICAgICBjb25maWcubW9vbi5pbmNsdWRlO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9vbkNvbG9yXCIpLnZhbHVlID0gcmdiVG9IZXgoY29uZmlnLm1vb24ucHJvcGVydGllcy5jb2xvclswXSwgY29uZmlnLm1vb24ucHJvcGVydGllcy5jb2xvclsxXSwgY29uZmlnLm1vb24ucHJvcGVydGllcy5jb2xvclsyXSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb29uUmFkaXVzXCIpLnZhbHVlID1cbiAgICAgICAgY29uZmlnLm1vb24ucHJvcGVydGllcy5yYWRpdXMudG9TdHJpbmcoKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vb25IYWxmTW9vblwiKS5jaGVja2VkID1cbiAgICAgICAgY29uZmlnLm1vb24ucHJvcGVydGllcy5oYWxmTW9vbjtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vb25Ob2lzZVwiKS52YWx1ZSA9XG4gICAgICAgIGNvbmZpZy5tb29uLnByb3BlcnRpZXMubm9pc2UudG9TdHJpbmcoKTtcbn1cbmZ1bmN0aW9uIHJlbmFtZUxheWVycyhsYXllcnNJRCkge1xuICAgIGNvbnN0IGxheWVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGxheWVyc0lEKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxheWVycy5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICBsYXllcnMuY2hpbGRyZW5baV0uY2hpbGRyZW5bMF0udGV4dENvbnRlbnQgPSBcIkxheWVyIFwiICsgKGkgKyAxKTtcbiAgICB9XG59XG5mdW5jdGlvbiBjcmVhdGVTdW5zZXRMYXllcnMoY29uZmlnKSB7XG4gICAgY29uc3Qgb3JpZ2luYWxTdW5zZXRMYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3Vuc2V0TGF5ZXJcIik7XG4gICAgY29uc3QgbGF5ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdW5zZXRMYXllcnNcIik7XG4gICAgbGF5ZXJzLnJlbW92ZUNoaWxkKG9yaWdpbmFsU3Vuc2V0TGF5ZXIpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29uZmlnLnN1bnNldC5wcm9wZXJ0aWVzLmxheWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBsYXllciA9IG9yaWdpbmFsU3Vuc2V0TGF5ZXIuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICBsYXllci5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgbGF5ZXIuY2hpbGRyZW5bMF0udGV4dENvbnRlbnQgPSBcIkxheWVyIFwiICsgKGkgKyAxKTtcbiAgICAgICAgbGF5ZXIuY2hpbGRyZW5bMV0ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGxheWVycy5yZW1vdmVDaGlsZChsYXllcik7XG4gICAgICAgICAgICBzdW5zZXRMYXllckNvdW50IC09IDE7XG4gICAgICAgICAgICByZW5hbWVMYXllcnMoXCJzdW5zZXRMYXllcnNcIik7XG4gICAgICAgIH07XG4gICAgICAgIGxheWVyLmNoaWxkcmVuWzJdLmNoaWxkcmVuWzFdLnZhbHVlID0gcmdiVG9IZXgoY29uZmlnLnN1bnNldC5wcm9wZXJ0aWVzLmxheWVyc1tpXS5jb2xvclswXSwgY29uZmlnLnN1bnNldC5wcm9wZXJ0aWVzLmxheWVyc1tpXS5jb2xvclsxXSwgY29uZmlnLnN1bnNldC5wcm9wZXJ0aWVzLmxheWVyc1tpXS5jb2xvclsyXSk7XG4gICAgICAgIGxheWVyLmNoaWxkcmVuWzNdLmNoaWxkcmVuWzBdLnZhbHVlID1cbiAgICAgICAgICAgIGNvbmZpZy5zdW5zZXQucHJvcGVydGllcy5sYXllcnNbaV0ubWF4T3BhY2l0eTtcbiAgICAgICAgbGF5ZXIuY2hpbGRyZW5bNF0uY2hpbGRyZW5bMF0udmFsdWUgPVxuICAgICAgICAgICAgY29uZmlnLnN1bnNldC5wcm9wZXJ0aWVzLmxheWVyc1tpXS5wcm9wb3J0aW9uO1xuICAgICAgICBsYXllci5jaGlsZHJlbls1XS5jaGlsZHJlblswXS52YWx1ZSA9XG4gICAgICAgICAgICBjb25maWcuc3Vuc2V0LnByb3BlcnRpZXMubGF5ZXJzW2ldLm11dGF0aW9uU3BlZWQ7XG4gICAgICAgIGxheWVyLmNoaWxkcmVuWzZdLmNoaWxkcmVuWzBdLnZhbHVlID1cbiAgICAgICAgICAgIGNvbmZpZy5zdW5zZXQucHJvcGVydGllcy5sYXllcnNbaV0ueFN0cmV0Y2g7XG4gICAgICAgIGxheWVyLmNoaWxkcmVuWzddLmNoaWxkcmVuWzBdLnZhbHVlID1cbiAgICAgICAgICAgIGNvbmZpZy5zdW5zZXQucHJvcGVydGllcy5sYXllcnNbaV0ueVN0cmV0Y2g7XG4gICAgICAgIGxheWVycy5hcHBlbmRDaGlsZChsYXllcik7XG4gICAgICAgIHN1bnNldExheWVyQ291bnQgKz0gMTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRTdW5zZXRMYXllcigpIHtcbiAgICBjb25zdCBvcmlnaW5hbFN1bnNldExheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdW5zZXRMYXllclwiKTtcbiAgICBjb25zdCBsYXllcnMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1bnNldExheWVyc1wiKTtcbiAgICBsZXQgbGF5ZXI7XG4gICAgaWYgKGxheWVycy5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIFRha2UgcHJldmlvdXMgc3Vuc2V0IGxheWVyIGFzIHRlbXBsYXRlXG4gICAgICAgIGxheWVyID0gbGF5ZXJzLmNoaWxkcmVuW2xheWVycy5jaGlsZHJlbi5sZW5ndGggLSAxXS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBSZXZlcnQgdG8gZGVmYXVsdCB0ZW1wbGF0ZVxuICAgICAgICBsYXllciA9IG9yaWdpbmFsU3Vuc2V0TGF5ZXIuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICBsYXllci5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICB9XG4gICAgc3Vuc2V0TGF5ZXJDb3VudCArPSAxO1xuICAgIGxheWVyLmNoaWxkcmVuWzBdLnRleHRDb250ZW50ID0gXCJMYXllciBcIiArIHN1bnNldExheWVyQ291bnQ7XG4gICAgbGF5ZXIuY2hpbGRyZW5bMV0ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgbGF5ZXJzLnJlbW92ZUNoaWxkKGxheWVyKTtcbiAgICAgICAgc3Vuc2V0TGF5ZXJDb3VudCAtPSAxO1xuICAgICAgICByZW5hbWVMYXllcnMoXCJzdW5zZXRMYXllcnNcIik7XG4gICAgfTtcbiAgICBsYXllcnMuYXBwZW5kQ2hpbGQobGF5ZXIpO1xufVxuZXhwb3J0cy5hZGRTdW5zZXRMYXllciA9IGFkZFN1bnNldExheWVyO1xuZnVuY3Rpb24gaW5pdFN1bnNldERlZmF1bHRzKGNvbmZpZykge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3Vuc2V0SW5jbHVkZVwiKS5jaGVja2VkID1cbiAgICAgICAgY29uZmlnLnN1bnNldC5pbmNsdWRlO1xuICAgIGNyZWF0ZVN1bnNldExheWVycyhjb25maWcpO1xufVxuZnVuY3Rpb24gY3JlYXRlQ2xvdWRzTGF5ZXJzKGNvbmZpZykge1xuICAgIGNvbnN0IG9yaWdpbmFsQ2xvdWRMYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvdWRzTGF5ZXJcIik7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG91ZHNMYXllcnNcIikucmVtb3ZlQ2hpbGQob3JpZ2luYWxDbG91ZExheWVyKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbmZpZy5jbG91ZHMucHJvcGVydGllcy5sYXllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgbGF5ZXIgPSBvcmlnaW5hbENsb3VkTGF5ZXIuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICBsYXllci5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICAgICAgbGF5ZXIuY2hpbGRyZW5bMF0udGV4dENvbnRlbnQgPSBcIkxheWVyIFwiICsgKGkgKyAxKTtcbiAgICAgICAgbGF5ZXIuY2hpbGRyZW5bMV0ub25jbGljayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvdWRzTGF5ZXJzXCIpLnJlbW92ZUNoaWxkKGxheWVyKTtcbiAgICAgICAgICAgIGNsb3VkTGF5ZXJDb3VudCAtPSAxO1xuICAgICAgICAgICAgcmVuYW1lTGF5ZXJzKFwiY2xvdWRzTGF5ZXJzXCIpO1xuICAgICAgICB9O1xuICAgICAgICBsYXllci5jaGlsZHJlblsyXS5jaGlsZHJlblsxXS52YWx1ZSA9IHJnYlRvSGV4KGNvbmZpZy5jbG91ZHMucHJvcGVydGllcy5sYXllcnNbaV0uY29sb3JbMF0sIGNvbmZpZy5jbG91ZHMucHJvcGVydGllcy5sYXllcnNbaV0uY29sb3JbMV0sIGNvbmZpZy5jbG91ZHMucHJvcGVydGllcy5sYXllcnNbaV0uY29sb3JbMl0pO1xuICAgICAgICBsYXllci5jaGlsZHJlblszXS5jaGlsZHJlblswXS52YWx1ZSA9XG4gICAgICAgICAgICBjb25maWcuY2xvdWRzLnByb3BlcnRpZXMubGF5ZXJzW2ldLm9wYWNpdHk7XG4gICAgICAgIGxheWVyLmNoaWxkcmVuWzRdLmNoaWxkcmVuWzBdLnZhbHVlID1cbiAgICAgICAgICAgIGNvbmZpZy5jbG91ZHMucHJvcGVydGllcy5sYXllcnNbaV0ubWluU2l6ZTtcbiAgICAgICAgbGF5ZXIuY2hpbGRyZW5bNV0uY2hpbGRyZW5bMF0udmFsdWUgPVxuICAgICAgICAgICAgY29uZmlnLmNsb3Vkcy5wcm9wZXJ0aWVzLmxheWVyc1tpXS5tYXhTaXplO1xuICAgICAgICBsYXllci5jaGlsZHJlbls2XS5jaGlsZHJlblswXS52YWx1ZSA9IGNvbmZpZy5jbG91ZHMucHJvcGVydGllcy5sYXllcnNbaV0ucEg7XG4gICAgICAgIGxheWVyLmNoaWxkcmVuWzddLmNoaWxkcmVuWzBdLnZhbHVlID0gY29uZmlnLmNsb3Vkcy5wcm9wZXJ0aWVzLmxheWVyc1tpXS5wVjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG91ZHNMYXllcnNcIikuYXBwZW5kQ2hpbGQobGF5ZXIpO1xuICAgICAgICBjbG91ZExheWVyQ291bnQgKz0gMTtcbiAgICB9XG59XG5mdW5jdGlvbiBhZGRDbG91ZHNMYXllcigpIHtcbiAgICBjb25zdCBvcmlnaW5hbENsb3VkTGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3Vkc0xheWVyXCIpO1xuICAgIGNvbnN0IGxheWVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvdWRzTGF5ZXJzXCIpO1xuICAgIGxldCBsYXllcjtcbiAgICBpZiAobGF5ZXJzLmNoaWxkcmVuLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gVGFrZSBwcmV2aW91cyBjbG91ZCBsYXllciBhcyB0ZW1wbGF0ZVxuICAgICAgICBsYXllciA9IGxheWVycy5jaGlsZHJlbltsYXllcnMuY2hpbGRyZW4ubGVuZ3RoIC0gMV0uY2xvbmVOb2RlKHRydWUpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgLy8gUmV2ZXJ0IHRvIGRlZmF1bHQgdGVtcGxhdGVcbiAgICAgICAgbGF5ZXIgPSBvcmlnaW5hbENsb3VkTGF5ZXIuY2xvbmVOb2RlKHRydWUpO1xuICAgICAgICBsYXllci5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKTtcbiAgICB9XG4gICAgY2xvdWRMYXllckNvdW50ICs9IDE7XG4gICAgbGF5ZXIuY2hpbGRyZW5bMF0udGV4dENvbnRlbnQgPSBcIkxheWVyIFwiICsgY2xvdWRMYXllckNvdW50O1xuICAgIGxheWVyLmNoaWxkcmVuWzFdLm9uY2xpY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvdWRzTGF5ZXJzXCIpLnJlbW92ZUNoaWxkKGxheWVyKTtcbiAgICAgICAgY2xvdWRMYXllckNvdW50IC09IDE7XG4gICAgICAgIHJlbmFtZUxheWVycyhcImNsb3Vkc0xheWVyc1wiKTtcbiAgICB9O1xuICAgIGxheWVycy5hcHBlbmRDaGlsZChsYXllcik7XG59XG5leHBvcnRzLmFkZENsb3Vkc0xheWVyID0gYWRkQ2xvdWRzTGF5ZXI7XG5mdW5jdGlvbiBpbml0Q2xvdWRzRGVmYXVsdHMoY29uZmlnKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG91ZHNJbmNsdWRlXCIpLmNoZWNrZWQgPVxuICAgICAgICBjb25maWcuY2xvdWRzLmluY2x1ZGU7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG91ZHNRdWFudGl0eVwiKS52YWx1ZSA9XG4gICAgICAgIGNvbmZpZy5jbG91ZHMucHJvcGVydGllcy5xdWFudGl0eS50b1N0cmluZygpO1xuICAgIGNyZWF0ZUNsb3Vkc0xheWVycyhjb25maWcpO1xufVxuZnVuY3Rpb24gaGlkZUV4Y2x1ZGVkKGNvbmZpZykge1xuICAgIGlmICghY29uZmlnLnN0YXJzLmluY2x1ZGUpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdGFyc1Byb3BlcnRpZXNcIikuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgIH1cbiAgICBpZiAoIWNvbmZpZy5tb29uLmluY2x1ZGUpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb29uUHJvcGVydGllc1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICAgIGlmICghY29uZmlnLnN1bnNldC5pbmNsdWRlKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3Vuc2V0UHJvcGVydGllc1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxuICAgIGlmICghY29uZmlnLmNsb3Vkcy5pbmNsdWRlKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvdWRzUHJvcGVydGllc1wiKS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgfVxufVxuZnVuY3Rpb24gaW5pdERlZmF1bHRzKCkge1xuICAgIGNvbnN0IGNvbmZpZyA9IGRlZmF1bHRDb25maWcoKTtcbiAgICBpbml0U2t5RGVmYXVsdHMoY29uZmlnKTtcbiAgICBpbml0U3RhcnNEZWZhdWx0cyhjb25maWcpO1xuICAgIGluaXRNb29uRGVmYXVsdHMoY29uZmlnKTtcbiAgICBpbml0U3Vuc2V0RGVmYXVsdHMoY29uZmlnKTtcbiAgICBpbml0Q2xvdWRzRGVmYXVsdHMoY29uZmlnKTtcbiAgICBoaWRlRXhjbHVkZWQoY29uZmlnKTtcbn1cbmV4cG9ydHMuaW5pdERlZmF1bHRzID0gaW5pdERlZmF1bHRzO1xuZnVuY3Rpb24gdXNlclNreSgpIHtcbiAgICBjb25zdCBza3kgPSB7XG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIGRpbWVuc2lvbnM6IHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHBhcnNlSW50KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2t5SGVpZ2h0XCIpLnZhbHVlKSxcbiAgICAgICAgICAgICAgICB3aWR0aDogcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza3lXaWR0aFwiKS52YWx1ZSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcGl4ZWxTaXplOiBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNreVBpeGVsU2l6ZVwiKS52YWx1ZSksXG4gICAgICAgICAgICBjb2xvcjogaGV4VG9SR0IoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza3lDb2xvclwiKS52YWx1ZSksXG4gICAgICAgICAgICBvcGFjaXR5OiBwYXJzZUZsb2F0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2t5T3BhY2l0eVwiKS52YWx1ZSksXG4gICAgICAgICAgICBtdXRhdGlvblNwZWVkOiBwYXJzZUZsb2F0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic2t5TXV0YXRpb25TcGVlZFwiKS52YWx1ZSksXG4gICAgICAgICAgICBtdXRhdGlvblN0eWxlOiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJza3lNdXRhdGlvblN0eWxlXCIpKS52YWx1ZSxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiBza3k7XG59XG5mdW5jdGlvbiB1c2VyU3RhcnMoKSB7XG4gICAgY29uc3Qgc3RhcnMgPSB7XG4gICAgICAgIGluY2x1ZGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnNJbmNsdWRlXCIpXG4gICAgICAgICAgICAuY2hlY2tlZCxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgb3BhY2l0eTogcGFyc2VGbG9hdChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN0YXJzT3BhY2l0eVwiKS52YWx1ZSksXG4gICAgICAgICAgICBkZW5zaXR5OiBwYXJzZUZsb2F0KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3RhcnNEZW5zaXR5XCIpLnZhbHVlKSxcbiAgICAgICAgfSxcbiAgICB9O1xuICAgIHJldHVybiBzdGFycztcbn1cbmZ1bmN0aW9uIHVzZXJNb29uKCkge1xuICAgIGNvbnN0IG1vb24gPSB7XG4gICAgICAgIGluY2x1ZGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9vbkluY2x1ZGVcIikuY2hlY2tlZCxcbiAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgY29sb3I6IGhleFRvUkdCKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9vbkNvbG9yXCIpLnZhbHVlKSxcbiAgICAgICAgICAgIHJhZGl1czogcGFyc2VJbnQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb29uUmFkaXVzXCIpLnZhbHVlKSxcbiAgICAgICAgICAgIGhhbGZNb29uOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm1vb25IYWxmTW9vblwiKVxuICAgICAgICAgICAgICAgIC5jaGVja2VkLFxuICAgICAgICAgICAgbm9pc2U6IHBhcnNlRmxvYXQoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb29uTm9pc2VcIikudmFsdWUpLFxuICAgICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIG1vb247XG59XG5mdW5jdGlvbiB1c2VyU3Vuc2V0KCkge1xuICAgIGNvbnN0IHN1bnNldExheWVycyA9IHVzZXJTdW5zZXRMYXllcnMoKTtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgIGluY2x1ZGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3Vuc2V0SW5jbHVkZVwiKVxuICAgICAgICAgICAgLmNoZWNrZWQsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIGxheWVyczogc3Vuc2V0TGF5ZXJzLFxuICAgICAgICB9LFxuICAgIH07XG4gICAgcmV0dXJuIGNvbmZpZztcbn1cbmZ1bmN0aW9uIHVzZXJTdW5zZXRMYXllcnMoKSB7XG4gICAgY29uc3QgbGF5ZXJzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdW5zZXRMYXllcnNcIik7XG4gICAgY29uc3QgY29uZmlnTGF5ZXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllcnMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgbGF5ZXIgPSBsYXllcnMuY2hpbGRyZW5baV07XG4gICAgICAgIGNvbnN0IGNvbmZpZ0xheWVyID0ge1xuICAgICAgICAgICAgY29sb3I6IGhleFRvUkdCKGxheWVyLmNoaWxkcmVuWzJdLmNoaWxkcmVuWzFdLnZhbHVlKSxcbiAgICAgICAgICAgIG1heE9wYWNpdHk6IHBhcnNlRmxvYXQobGF5ZXIuY2hpbGRyZW5bM10uY2hpbGRyZW5bMF0udmFsdWUpLFxuICAgICAgICAgICAgcHJvcG9ydGlvbjogcGFyc2VGbG9hdChsYXllci5jaGlsZHJlbls0XS5jaGlsZHJlblswXS52YWx1ZSksXG4gICAgICAgICAgICBtdXRhdGlvblNwZWVkOiBwYXJzZUZsb2F0KGxheWVyLmNoaWxkcmVuWzVdLmNoaWxkcmVuWzBdLnZhbHVlKSxcbiAgICAgICAgICAgIHhTdHJldGNoOiBwYXJzZUZsb2F0KGxheWVyLmNoaWxkcmVuWzZdLmNoaWxkcmVuWzBdLnZhbHVlKSxcbiAgICAgICAgICAgIHlTdHJldGNoOiBwYXJzZUZsb2F0KGxheWVyLmNoaWxkcmVuWzddLmNoaWxkcmVuWzBdLnZhbHVlKSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uZmlnTGF5ZXJzLnB1c2goY29uZmlnTGF5ZXIpO1xuICAgIH1cbiAgICByZXR1cm4gY29uZmlnTGF5ZXJzO1xufVxuZnVuY3Rpb24gdXNlckNsb3VkTGF5ZXJzKCkge1xuICAgIGNvbnN0IGxheWVycyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvdWRzTGF5ZXJzXCIpO1xuICAgIGNvbnN0IGNsb3VkTGF5ZXJzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsYXllcnMuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgbGF5ZXIgPSBsYXllcnMuY2hpbGRyZW5baV07XG4gICAgICAgIGNvbnN0IGNvbmZpZ0xheWVyID0ge1xuICAgICAgICAgICAgY29sb3I6IGhleFRvUkdCKGxheWVyLmNoaWxkcmVuWzJdLmNoaWxkcmVuWzFdLnZhbHVlKSxcbiAgICAgICAgICAgIG9wYWNpdHk6IHBhcnNlRmxvYXQobGF5ZXIuY2hpbGRyZW5bM10uY2hpbGRyZW5bMF0udmFsdWUpLFxuICAgICAgICAgICAgbWluU2l6ZTogcGFyc2VJbnQobGF5ZXIuY2hpbGRyZW5bNF0uY2hpbGRyZW5bMF0udmFsdWUpLFxuICAgICAgICAgICAgbWF4U2l6ZTogcGFyc2VJbnQobGF5ZXIuY2hpbGRyZW5bNV0uY2hpbGRyZW5bMF0udmFsdWUpLFxuICAgICAgICAgICAgcEg6IHBhcnNlRmxvYXQobGF5ZXIuY2hpbGRyZW5bNl0uY2hpbGRyZW5bMF0udmFsdWUpLFxuICAgICAgICAgICAgcFY6IHBhcnNlRmxvYXQobGF5ZXIuY2hpbGRyZW5bN10uY2hpbGRyZW5bMF0udmFsdWUpLFxuICAgICAgICB9O1xuICAgICAgICBjbG91ZExheWVycy5wdXNoKGNvbmZpZ0xheWVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNsb3VkTGF5ZXJzO1xufVxuZnVuY3Rpb24gdXNlckNsb3VkcygpIHtcbiAgICBjb25zdCBjbG91ZHMgPSB7XG4gICAgICAgIGluY2x1ZGU6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvdWRzSW5jbHVkZVwiKVxuICAgICAgICAgICAgLmNoZWNrZWQsXG4gICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgIHF1YW50aXR5OiBwYXJzZUludChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3Vkc1F1YW50aXR5XCIpLnZhbHVlKSxcbiAgICAgICAgICAgIGxheWVyczogdXNlckNsb3VkTGF5ZXJzKCksXG4gICAgICAgIH0sXG4gICAgfTtcbiAgICByZXR1cm4gY2xvdWRzO1xufVxuZnVuY3Rpb24gdXNlckNvbmZpZygpIHtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgIHNreTogdXNlclNreSgpLFxuICAgICAgICBzdGFyczogdXNlclN0YXJzKCksXG4gICAgICAgIG1vb246IHVzZXJNb29uKCksXG4gICAgICAgIHN1bnNldDogdXNlclN1bnNldCgpLFxuICAgICAgICBjbG91ZHM6IHVzZXJDbG91ZHMoKSxcbiAgICB9O1xuICAgIGxvd2VyUmFuZG9tTXV0YXRpb25TcGVlZChjb25maWcpO1xuICAgIHJldHVybiBjb25maWc7XG59XG5leHBvcnRzLnVzZXJDb25maWcgPSB1c2VyQ29uZmlnO1xuZnVuY3Rpb24gcmFuZENvbmZpZygpIHtcbiAgICBjb25zdCBjb25maWcgPSB7XG4gICAgICAgIHNreToge1xuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiA3MjAsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxMjgwLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcGl4ZWxTaXplOiAoMCwgZ2VuZXJhdGVfMS5yYW5kSW50KSgxLCA1KSxcbiAgICAgICAgICAgICAgICBjb2xvcjogWygwLCBnZW5lcmF0ZV8xLnJhbmRJbnQpKDAsIDI1NSksICgwLCBnZW5lcmF0ZV8xLnJhbmRJbnQpKDAsIDI1NSksICgwLCBnZW5lcmF0ZV8xLnJhbmRJbnQpKDAsIDI1NSldLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6ICgwLCBnZW5lcmF0ZV8xLnJhbmRGbG9hdCkoMC41LCAxKSxcbiAgICAgICAgICAgICAgICBtdXRhdGlvblNwZWVkOiAoMCwgZ2VuZXJhdGVfMS5yYW5kRmxvYXQpKDAuMSwgMC41KSxcbiAgICAgICAgICAgICAgICBtdXRhdGlvblN0eWxlOiAoMCwgZ2VuZXJhdGVfMS5yYW5kTXV0YXRpb25TdHlsZSkoKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHN0YXJzOiB7XG4gICAgICAgICAgICBpbmNsdWRlOiAoMCwgZ2VuZXJhdGVfMS5yYW5kQm9vbCkoKSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAoMCwgZ2VuZXJhdGVfMS5yYW5kRmxvYXQpKDAuMSwgMSksXG4gICAgICAgICAgICAgICAgZGVuc2l0eTogKDAsIGdlbmVyYXRlXzEucmFuZEZsb2F0KSgwLjAwMSwgMC4wMSksXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBtb29uOiB7XG4gICAgICAgICAgICBpbmNsdWRlOiAoMCwgZ2VuZXJhdGVfMS5yYW5kQm9vbCkoKSxcbiAgICAgICAgICAgIHByb3BlcnRpZXM6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogWygwLCBnZW5lcmF0ZV8xLnJhbmRJbnQpKDAsIDI1NSksICgwLCBnZW5lcmF0ZV8xLnJhbmRJbnQpKDAsIDI1NSksICgwLCBnZW5lcmF0ZV8xLnJhbmRJbnQpKDAsIDI1NSldLFxuICAgICAgICAgICAgICAgIHJhZGl1czogKDAsIGdlbmVyYXRlXzEucmFuZEludCkoMTAsIDUwKSxcbiAgICAgICAgICAgICAgICBoYWxmTW9vbjogKDAsIGdlbmVyYXRlXzEucmFuZEJvb2wpKCksXG4gICAgICAgICAgICAgICAgbm9pc2U6ICgwLCBnZW5lcmF0ZV8xLnJhbmRGbG9hdCkoMCwgMSksXG4gICAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBzdW5zZXQ6IHtcbiAgICAgICAgICAgIGluY2x1ZGU6ICgwLCBnZW5lcmF0ZV8xLnJhbmRCb29sKSgpLFxuICAgICAgICAgICAgcHJvcGVydGllczoge1xuICAgICAgICAgICAgICAgIGxheWVyczogKDAsIGdlbmVyYXRlXzEucmFuZFN1bnNldExheWVycykoKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGNsb3Vkczoge1xuICAgICAgICAgICAgaW5jbHVkZTogKDAsIGdlbmVyYXRlXzEucmFuZEJvb2wpKCksXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgcXVhbnRpdHk6ICgwLCBnZW5lcmF0ZV8xLnJhbmRJbnQpKDEsIDI1KSxcbiAgICAgICAgICAgICAgICBsYXllcnM6ICgwLCBnZW5lcmF0ZV8xLnJhbmRDbG91ZExheWVycykoKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfTtcbiAgICBsb3dlclJhbmRvbU11dGF0aW9uU3BlZWQoY29uZmlnKTtcbiAgICByZXR1cm4gY29uZmlnO1xufVxuZXhwb3J0cy5yYW5kQ29uZmlnID0gcmFuZENvbmZpZztcbmZ1bmN0aW9uIGxvd2VyUmFuZG9tTXV0YXRpb25TcGVlZChjb25maWcpIHtcbiAgICAvLyBcIlJhbmRvbVwiIG11dGF0aW9uIHN0eWxlIGlzIG11Y2ggbW9yZSBzZW5zaXRpdmUgdG8gbXV0YXRpb24gc3BlZWRcbiAgICAvLyAtPiB3b3JrcyBiZXN0IHdpdGggYSBtdWNoIGxvd2VyIG11dGF0aW9uIHNwZWVkXG4gICAgaWYgKGNvbmZpZy5za3kucHJvcGVydGllcy5tdXRhdGlvblN0eWxlID09IFwiUmFuZG9tXCIpIHtcbiAgICAgICAgY29uZmlnLnNreS5wcm9wZXJ0aWVzLm11dGF0aW9uU3BlZWQgLz0gNjA7XG4gICAgfVxufVxuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJhbmRNdXRhdGlvblN0eWxlID0gZXhwb3J0cy5yYW5kQm9vbCA9IGV4cG9ydHMucmFuZENsb3VkTGF5ZXJzID0gZXhwb3J0cy5yYW5kU3Vuc2V0TGF5ZXJzID0gZXhwb3J0cy5yYW5kSW50ID0gZXhwb3J0cy5yYW5kRmxvYXQgPSB2b2lkIDA7XG5mdW5jdGlvbiByYW5kRmxvYXQobWluLCBtYXgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pICsgbWluO1xufVxuZXhwb3J0cy5yYW5kRmxvYXQgPSByYW5kRmxvYXQ7XG5mdW5jdGlvbiByYW5kSW50KG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW47XG59XG5leHBvcnRzLnJhbmRJbnQgPSByYW5kSW50O1xuZnVuY3Rpb24gcmFuZG9tU3Vuc2V0Q29sb3IoKSB7XG4gICAgcmV0dXJuIFtyYW5kSW50KDEwMCwgMjU1KSwgcmFuZEludCgxMDAsIDI0MCksIHJhbmRJbnQoMTAwLCAyNTUpXTtcbn1cbmZ1bmN0aW9uIHJhbmRTdW5zZXRMYXllcnMoKSB7XG4gICAgY29uc3Qgc3Vuc2V0TGF5ZXJzID0gW107XG4gICAgY29uc3QgbiA9IHJhbmRJbnQoMSwgMTApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGxheWVyID0ge1xuICAgICAgICAgICAgY29sb3I6IHJhbmRvbVN1bnNldENvbG9yKCksXG4gICAgICAgICAgICBtYXhPcGFjaXR5OiByYW5kRmxvYXQoMC4yLCAxKSxcbiAgICAgICAgICAgIHByb3BvcnRpb246IHJhbmRGbG9hdCgwLjIsIDEpLFxuICAgICAgICAgICAgbXV0YXRpb25TcGVlZDogcmFuZEludCgxLCAzKSxcbiAgICAgICAgICAgIHhTdHJldGNoOiByYW5kRmxvYXQoMC4yLCAxLjIpLCAvLyA+MSAodGhpbm5lciksIDwxICh3aWRlcilcbiAgICAgICAgICAgIHlTdHJldGNoOiByYW5kRmxvYXQoMC43LCAxLjUpLCAvLyA+MSAoc2hvcnRlciksIDwxICh0YWxsZXIpXG4gICAgICAgIH07XG4gICAgICAgIHN1bnNldExheWVycy5wdXNoKGxheWVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHN1bnNldExheWVycztcbn1cbmV4cG9ydHMucmFuZFN1bnNldExheWVycyA9IHJhbmRTdW5zZXRMYXllcnM7XG5mdW5jdGlvbiByYW5kb21DbG91ZENvbG9yKCkge1xuICAgIHJldHVybiBbcmFuZEludCgyMDAsIDI1NSksIHJhbmRJbnQoMjAwLCAyNTUpLCByYW5kSW50KDIwMCwgMjU1KV07XG59XG5mdW5jdGlvbiByYW5kQ2xvdWRMYXllcnMoKSB7XG4gICAgY29uc3QgY2xvdWRMYXllcnMgPSBbXTtcbiAgICBjb25zdCBuID0gcmFuZEludCgxLCAyNSk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgY29uc3QgbGF5ZXIgPSB7XG4gICAgICAgICAgICBjb2xvcjogcmFuZG9tQ2xvdWRDb2xvcigpLFxuICAgICAgICAgICAgb3BhY2l0eTogcmFuZEZsb2F0KDAuMDUsIDAuNSksXG4gICAgICAgICAgICBtaW5TaXplOiByYW5kSW50KDUwMCwgMTAwMCksXG4gICAgICAgICAgICBtYXhTaXplOiByYW5kSW50KDUwMDAsIDUwMDAwKSxcbiAgICAgICAgICAgIHBIOiByYW5kRmxvYXQoMC41LCAwLjkpLCAvLyBQcm9iYWJpbGl0eSBvZiBob3Jpem9udGFsIGV4cGFuc2lvblxuICAgICAgICAgICAgcFY6IHJhbmRGbG9hdCgwLjEsIDAuNSksIC8vIFByb2JhYmlsaXR5IG9mIHZlcnRpY2FsIGV4cGFuc2lvblxuICAgICAgICB9O1xuICAgICAgICBjbG91ZExheWVycy5wdXNoKGxheWVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGNsb3VkTGF5ZXJzO1xufVxuZXhwb3J0cy5yYW5kQ2xvdWRMYXllcnMgPSByYW5kQ2xvdWRMYXllcnM7XG5mdW5jdGlvbiByYW5kQm9vbCgpIHtcbiAgICByZXR1cm4gTWF0aC5yYW5kb20oKSA8IDAuNTtcbn1cbmV4cG9ydHMucmFuZEJvb2wgPSByYW5kQm9vbDtcbmZ1bmN0aW9uIHJhbmRNdXRhdGlvblN0eWxlKCkge1xuICAgIGNvbnN0IHN0eWxlcyA9IFtcbiAgICAgICAgXCJDb2xvciBzcHJlYWRcIixcbiAgICAgICAgXCJSYW5kb21cIixcbiAgICAgICAgXCJQb2ludCBzcHJlYWRcIixcbiAgICAgICAgXCJQb2ludCBzcHJlYWQgd2F2eVwiLFxuICAgICAgICBcIkhvcml6b250YWxcIixcbiAgICAgICAgXCJWZXJ0aWNhbFwiLFxuICAgICAgICBcIkRpYWdvbmFsXCIsXG4gICAgXTtcbiAgICByZXR1cm4gc3R5bGVzW3JhbmRJbnQoMCwgc3R5bGVzLmxlbmd0aCAtIDEpXTtcbn1cbmV4cG9ydHMucmFuZE11dGF0aW9uU3R5bGUgPSByYW5kTXV0YXRpb25TdHlsZTtcbiIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY2xhc3MgVHVwbGVTZXQge1xuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICB0aGlzLmRhdGEgPSBuZXcgTWFwKCk7XG4gICAgICAgIHRoaXMuY291bnQgPSAwO1xuICAgIH1cbiAgICBhZGQoW2ZpcnN0LCBzZWNvbmRdKSB7XG4gICAgICAgIGlmICghdGhpcy5kYXRhLmhhcyhmaXJzdCkpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zZXQoZmlyc3QsIG5ldyBTZXQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLmdldChmaXJzdCkuYWRkKHNlY29uZCk7XG4gICAgICAgIHRoaXMuY291bnQrKztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIGhhcyhbZmlyc3QsIHNlY29uZF0pIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5oYXMoZmlyc3QpICYmIHRoaXMuZGF0YS5nZXQoZmlyc3QpLmhhcyhzZWNvbmQpO1xuICAgIH1cbiAgICBkZWxldGUoW2ZpcnN0LCBzZWNvbmRdKSB7XG4gICAgICAgIGlmICghdGhpcy5kYXRhLmhhcyhmaXJzdCkgfHwgIXRoaXMuZGF0YS5nZXQoZmlyc3QpLmhhcyhzZWNvbmQpKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kYXRhLmdldChmaXJzdCkuZGVsZXRlKHNlY29uZCk7XG4gICAgICAgIGlmICh0aGlzLmRhdGEuZ2V0KGZpcnN0KS5zaXplID09PSAwKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEuZGVsZXRlKGZpcnN0KTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNvdW50LS07XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBlbXB0eSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY291bnQgPT0gMDtcbiAgICB9XG59XG5leHBvcnRzLmRlZmF1bHQgPSBUdXBsZVNldDtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIik7XG4iLCIiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=