"use strict";
class MyTupleSet {
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
function createGrid2(h, w) {
    let grid = [...Array(h)].map((e) => Array(w));
    return grid;
}
function formatColour(r, g, b, a) {
    return `rgba(${r},${g},${b},${a})`;
}
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function mutateColour(colour, p, step = 1) {
    if (Math.random() < p) {
        let mutatedColour = Object.values(colour);
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
    return colour;
}
function mutateColourInPlace(colour, p, step = 1) {
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
function colourSpreadBottom(x, y, colour, seen, toPaint) {
    if (y < h - 1 && !seen.has([x, y + 1])) {
        toPaint.push([x, y + 1, colour]);
        seen.add([x, y + 1]);
    }
}
function colourSpreadRight(x, y, colour, seen, toPaint) {
    if (x < w - 1 && !seen.has([x + 1, y])) {
        toPaint.push([x + 1, y, colour]);
        seen.add([x + 1, y]);
    }
}
function colourSpreadTop(x, y, colour, seen, toPaint) {
    if (y > 0 && !seen.has([x, y - 1])) {
        toPaint.push([x, y - 1, colour]);
        seen.add([x, y - 1]);
    }
}
function colourSpreadLeft(x, y, colour, seen, toPaint) {
    if (x > 0 && !seen.has([x - 1, y])) {
        toPaint.push([x - 1, y, colour]);
        seen.add([x - 1, y]);
    }
}
function colourSpreadTopLeft(x, y, colour, seen, toPaint) {
    if (x > 0 && y > 0 && !seen.has([x - 1, y - 1])) {
        toPaint.push([x - 1, y - 1, colour]);
        seen.add([x - 1, y - 1]);
    }
}
function colourSpreadBottomLeft(x, y, colour, seen, toPaint) {
    if (x > 0 && y < h - 1 && !seen.has([x - 1, y + 1])) {
        toPaint.push([x - 1, y + 1, colour]);
        seen.add([x - 1, y + 1]);
    }
}
function colourSpreadTopRight(x, y, colour, seen, toPaint) {
    if (x < w - 1 && y > 0 && !seen.has([x + 1, y - 1])) {
        toPaint.push([x + 1, y - 1, colour]);
        seen.add([x + 1, y - 1]);
    }
}
function colourSpreadBottomRight(x, y, colour, seen, toPaint) {
    if (x < w - 1 && y < h - 1 && !seen.has([x + 1, y + 1])) {
        toPaint.push([x + 1, y + 1, colour]);
        seen.add([x + 1, y + 1]);
    }
}
/*
 * Colour appears drawn out from the starting point.
*/
function colourSpread8Dir(x, y, colour, seen, toPaint) {
    colourSpreadBottom(x, y, colour, seen, toPaint);
    colourSpreadRight(x, y, colour, seen, toPaint);
    colourSpreadTop(x, y, colour, seen, toPaint);
    colourSpreadLeft(x, y, colour, seen, toPaint);
    colourSpreadTopLeft(x, y, colour, seen, toPaint);
    colourSpreadBottomLeft(x, y, colour, seen, toPaint);
    colourSpreadTopRight(x, y, colour, seen, toPaint);
    colourSpreadBottomRight(x, y, colour, seen, toPaint);
}
function colourSpread4Dir(x, y, colour, seen, toPaint) {
    colourSpreadBottom(x, y, colour, seen, toPaint);
    colourSpreadRight(x, y, colour, seen, toPaint);
    colourSpreadTop(x, y, colour, seen, toPaint);
    colourSpreadLeft(x, y, colour, seen, toPaint);
}
/*
 * Picks a random starting pixel, and adds its 8 neighbours to the pool of pixels
 * to be randomly selected next iteration whilst mutating the brush colour each iteration.
 */
function colourSpread(grid, skyConfig) {
    let seen = new MyTupleSet();
    let toPaint = [];
    let mutationSpeed = skyConfig.properties.mutationSpeed;
    let startColour = [
        ...skyConfig.properties.colour,
        skyConfig.properties.opacity,
    ];
    let start = [randInt(0, w - 1), randInt(0, h - 1)];
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
        colourSpread8Dir(x, y, mutateColour(colour, mutationSpeed), seen, toPaint);
    }
}
/*
 * Picks a random starting pixel, and adds its 8 neighbours to the pool of pixels
 * to be randomly selected next iteration whilst mutating the brush colour each iteration.
 */
function colourPointSpreadWavy(grid, skyConfig) {
    let seen = new MyTupleSet();
    let toPaint = [];
    let mutationSpeed = skyConfig.properties.mutationSpeed;
    let colour = [
        ...skyConfig.properties.colour,
        skyConfig.properties.opacity,
    ];
    let start = [randInt(0, w - 1), randInt(0, h - 1)];
    toPaint.push([start[0], start[1], colour]);
    seen.add(start);
    for (let i = 0; i < w * h; i++) {
        let [x, y, _] = nextPixel(toPaint);
        colour = mutateColour(colour, mutationSpeed);
        grid.get(y).set(x, [
            {
                type: "sky",
                colour: colour,
            },
        ]);
        colourSpread8Dir(x, y, null, seen, toPaint);
    }
}
function nextClosestPixel(toPaint, centre) {
    let idx = 0;
    let d = Number.POSITIVE_INFINITY;
    for (let i = 0; i < toPaint.length; i++) {
        let dist = distance(toPaint[i][0], toPaint[i][1], centre[0], centre[1]);
        if (dist < d) {
            d = dist;
            idx = i;
        }
    }
    /* Select and remove random pixel from toPaint list
    Achieved by moving random element to the end and using .pop() -> for 720p
    image, found to be 10X faster than Array.splice on the random index. */
    [toPaint[idx], toPaint[toPaint.length - 1]] = [toPaint[toPaint.length - 1], toPaint[idx]];
    let next = toPaint.pop();
    return next;
}
/*
 * Picks a random starting pixel, and adds its 8 neighbours to the pool of pixels
 * to be selected next iteration. The closest pixel to the starting point is selected next.
 */
function colourPointSpread(grid, skyConfig) {
    let seen = new MyTupleSet();
    let toPaint = [];
    let mutationSpeed = skyConfig.properties.mutationSpeed;
    let colour = [
        ...skyConfig.properties.colour,
        skyConfig.properties.opacity,
    ];
    let start = [randInt(0, w - 1), randInt(0, h - 1)];
    toPaint.push([start[0], start[1], null]);
    seen.add(start);
    for (let i = 0; i < w * h; i++) {
        let [x, y, _] = nextClosestPixel(toPaint, start);
        colour = mutateColour(colour, mutationSpeed);
        grid.get(y).set(x, [
            {
                type: "sky",
                colour: colour,
            },
        ]);
        colourSpread8Dir(x, y, null, seen, toPaint);
    }
}
/*
 * Picks a random starting pixel, and adds its 8 neighbours to the queue from
 * a pixel is popped each iteration.
*/
function colourSpreadQueue(grid, skyConfig, colourSpreadFunc) {
    let seen = new MyTupleSet();
    let toPaint = [];
    let mutationSpeed = skyConfig.properties.mutationSpeed;
    let startColour = [
        ...skyConfig.properties.colour,
        skyConfig.properties.opacity,
    ];
    let start = [randInt(0, w - 1), randInt(0, h - 1)];
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
        colourSpreadFunc(x, y, mutateColour(colour, mutationSpeed), seen, toPaint);
    }
}
/*
 * Pick random pixels across the entire image whilst mutating the brush colour
 * to creates a noise effect.
 */
function colourRandom(grid, skyConfig) {
    let pixels = [];
    for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
            pixels.push([x, y]);
        }
    }
    shuffleArray(pixels);
    let colour = [
        ...skyConfig.properties.colour,
        skyConfig.properties.opacity,
    ];
    let mutationSpeed = skyConfig.properties.mutationSpeed;
    for (let i = 0; i < w * h; i++) {
        let [x, y] = pixels.pop();
        grid.get(y).set(x, [
            {
                type: "sky",
                colour: colour,
            },
        ]);
        colour = mutateColour(colour, mutationSpeed);
    }
}
function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}
function colourHorizontal(x, y, colour, seen, toPaint) {
    colourSpreadTop(x, y, colour, seen, toPaint);
    colourSpreadBottom(x, y, colour, seen, toPaint);
    colourSpreadLeft(x, y, colour, seen, toPaint);
    colourSpreadRight(x, y, colour, seen, toPaint);
}
function colourDiagonal(x, y, colour, seen, toPaint) {
    colourSpreadBottom(x, y, colour, seen, toPaint);
    colourSpreadRight(x, y, colour, seen, toPaint);
    colourSpreadTop(x, y, colour, seen, toPaint);
    colourSpreadLeft(x, y, colour, seen, toPaint);
    colourSpreadTopLeft(x, y, colour, seen, toPaint);
    colourSpreadBottomLeft(x, y, colour, seen, toPaint);
    colourSpreadTopRight(x, y, colour, seen, toPaint);
    colourSpreadBottomRight(x, y, colour, seen, toPaint);
}
function colourVertical(x, y, colour, seen, toPaint) {
    colourSpreadLeft(x, y, colour, seen, toPaint);
    colourSpreadRight(x, y, colour, seen, toPaint);
    colourSpreadTop(x, y, colour, seen, toPaint);
    colourSpreadBottom(x, y, colour, seen, toPaint);
}
function colourSky(grid, skyConfig) {
    let mutationStyle = skyConfig.properties.mutationStyle;
    if (mutationStyle == 'Colour spread') {
        colourSpread(grid, skyConfig);
    }
    else if (mutationStyle == 'Random') {
        colourRandom(grid, skyConfig);
    }
    else if (mutationStyle == 'Point spread') {
        colourPointSpread(grid, skyConfig);
    }
    else if (mutationStyle == 'Point spread wavy') {
        colourPointSpreadWavy(grid, skyConfig);
    }
    else if (mutationStyle == 'Horizontal') {
        colourSpreadQueue(grid, skyConfig, colourHorizontal);
    }
    else if (mutationStyle == 'Vertical') {
        colourSpreadQueue(grid, skyConfig, colourVertical);
    }
    else if (mutationStyle == 'Diagonal') {
        colourSpreadQueue(grid, skyConfig, colourDiagonal);
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
function createCloudPixel(colour) {
    let cloudPixel = document.createElement("div");
    cloudPixel.className = "pixel cloud";
    cloudPixel.style.background = formatColour(...colour);
    return cloudPixel;
}
function nextPixel(toPaint) {
    /* Select and remove random pixel from toPaint list
    Achieved by moving random element to the end and using .pop() -> for 720p
    image, found to be 10X faster than Array.splice on the random index. */
    const idx = Math.floor(Math.random() * toPaint.length);
    [toPaint[idx], toPaint[toPaint.length - 1]] = [toPaint[toPaint.length - 1], toPaint[idx]];
    let next = toPaint.pop();
    return next;
}
function addCloudToSky(grid, x, y, colour, layer) {
    let [hasCloud, idx] = pixelHasType(grid.get(y).get(x), "cloud" + layer);
    if (hasCloud) {
        grid.get(y).get(x)[idx].colour = combineColours(colour, grid.get(y).get(x)[idx].colour);
    }
    else {
        grid.get(y).get(x).push({ type: "cloud" + layer, colour: colour });
    }
}
function createCloudBase(grid, startColour, sizeRange, pH, pV) {
    let seen = new MyTupleSet();
    let toPaint = [];
    let start = [randInt(0, w - 1), randInt(0, h - 1)];
    toPaint.push([start[0], start[1], startColour]);
    seen.add(start);
    let cloudSize = 1;
    while (toPaint.length > 0) {
        let [x, y, colour] = nextPixel(toPaint);
        addCloudToSky(grid, x, y, colour, 0);
        let nextColour = mutateColour(colour, 0.9);
        cloudSize = cloudsSpread(x, y, nextColour, seen, toPaint, cloudSize, sizeRange, pH, pV);
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
function addCloudLayer(grid, start, layer, startColour, sizeRange, pH, pV) {
    let seen = new MyTupleSet();
    let toPaint = [];
    toPaint.push([start[0], start[1], startColour]);
    seen.add(start);
    let currentSize = 1;
    while (toPaint.length > 0) {
        let [x, y, colour] = nextPixel(toPaint);
        addCloudToSky(grid, x, y, colour, layer);
        let nextColour = mutateColour(colour, 0.9);
        currentSize = cloudsSpread(x, y, nextColour, seen, toPaint, currentSize, sizeRange, pH, pV);
    }
}
function createCloud(grid, layers) {
    let start = createCloudBase(grid, [...layers[0].colour, layers[0].opacity], [layers[0].minSize, layers[0].maxSize], layers[0].pH, layers[0].pV);
    for (let i = 1; i < layers.length; i++) {
        addCloudLayer(grid, start, i, [...layers[i].colour, layers[i].opacity], [layers[i].minSize, layers[i].maxSize], layers[i].pH, layers[i].pV);
    }
}
function createClouds(grid, cloudConfig) {
    for (let i = 0; i < cloudConfig.properties.quantity; i++) {
        createCloud(grid, cloudConfig.properties.layers);
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
    grid.get(y).get(x).push({ type: "star", colour: colour });
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
function createStars(grid, starsConfig) {
    let n = h * w * starsConfig.properties.density;
    for (let i = 0; i < n; i++) {
        let x = randInt(0, w - 1);
        let y = randInt(0, h - 1);
        createStar(x, y, grid, starsConfig.properties.opacity);
    }
}
function createSunsetPixel(colour) {
    let sunsetPixel = document.createElement("div");
    sunsetPixel.className = "pixel sunset";
    sunsetPixel.style.background = formatColour(...colour);
    return sunsetPixel;
}
function getRGBValues(str) {
    let vals = str.substring(str.indexOf("(") + 1, str.length - 1).split(", ");
    return [parseInt(vals[0]), parseInt(vals[1]), parseInt(vals[2])];
}
function sunsetSpread(x, y, colour, toPaint, seen) {
    colourSpreadBottom(x, y, colour, seen, toPaint);
    colourSpreadTop(x, y, colour, seen, toPaint);
    colourSpreadRight(x, y, colour, seen, toPaint);
    colourSpreadLeft(x, y, colour, seen, toPaint);
}
function warpedDistance(x1, y1, x2, y2, xStretch, yStretch) {
    let x = (y2 - y1) * (1 - yStretch);
    let y = (x2 - x1) * (1 - xStretch);
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
        a,
    ];
    return colour;
}
function addSunsetToSky(grid, x, y, colour) {
    let [hasSunset, idx] = pixelHasType(grid.get(y).get(x), "sunset");
    if (hasSunset) {
        grid.get(y).get(x)[idx].colour = combineColours(colour, grid.get(y).get(x)[idx].colour);
    }
    else {
        grid.get(y).get(x).push({ type: "sunset", colour: colour });
    }
}
function createSunsetLayer(grid, layerConfig) {
    const maxD = h * layerConfig.proportion;
    let seen = new MyTupleSet();
    let toPaint = [];
    const start = [randInt(0, w - 1), h - 1];
    toPaint.push([start[0], start[1], [...layerConfig.colour, 1]]);
    seen.add(start);
    let scale;
    let x, y, colour;
    while (toPaint.length > 0) {
        [x, y, colour] = nextPixel(toPaint);
        scale =
            1 -
                warpedDistance(x, y, start[0], start[1], layerConfig.xStretch, layerConfig.yStretch) /
                    maxD;
        if (scale > 0) {
            colour[3] = layerConfig.maxOpacity * scale; // Adjust opacity
            // addSunsetToSky(grid, x, y, colour);
            grid.get(y).get(x).push({ type: "sunset", colour: colour });
            sunsetSpread(x, y, mutateColour(colour, layerConfig.mutationSpeed), toPaint, seen);
        }
    }
}
function createSunset(grid, sunsetConfig) {
    for (let i = 0; i < sunsetConfig.properties.layers.length; i++) {
        createSunsetLayer(grid, sunsetConfig.properties.layers[i]);
    }
}
function distance(x1, y1, x2, y2) {
    const x = y2 - y1;
    const y = x2 - x1;
    return Math.sqrt(x * x + y * y);
}
function createMoonPixel(colour) {
    let moonPixel = document.createElement("div");
    moonPixel.className = "pixel moon";
    moonPixel.style.background = formatColour(...colour);
    return moonPixel;
}
function fullMoon(grid, toPaint, moonConfig) {
    console.log(moonConfig);
    let colour = [...moonConfig.properties.colour, 1];
    while (toPaint.length > 0) {
        const [x, y] = nextPixel(toPaint);
        grid.get(y).get(x).push({ type: "moon", colour: colour });
        colour = mutateColour(colour, moonConfig.properties.noise);
    }
}
function halfMoon(grid, toPaint, moonConfig, start) {
    const r = moonConfig.properties.radius;
    const position = randInt(0.25 * r, r * 0.9);
    const edge = [
        start[0] - position,
        start[1] - position * Math.min(Math.random(), 0.8),
    ];
    const fadeMargin = randInt(0, 10);
    let colour = [...moonConfig.properties.colour, 1];
    while (toPaint.length > 0) {
        const [x, y] = nextPixel(toPaint);
        const d = distance(x, y, edge[0], edge[1]);
        if (d >= r) {
            const opacity = Math.min((d - r) / fadeMargin, 1);
            colour[3] = opacity;
            grid.get(y).get(x).push({
                type: "moon",
                colour: colour,
            });
            colour = mutateColour(colour, moonConfig.properties.noise);
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
function createMoon(grid, moonConfig) {
    const r = moonConfig.properties.radius;
    const border = Math.round(1.5 * r);
    const start = [
        randInt(border, w - 1 - border),
        randInt(border, h - 1 - border),
    ];
    let toPaint = [];
    for (let y = start[1] - r; y < start[1] + r; y++) {
        for (let x = start[0] - r; x < start[0] + r; x++) {
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
function createGrid(h, w) {
    let grid = new Map();
    for (let i = 0; i < h; i++) {
        grid.set(i, new Map());
    }
    return grid;
}
function showProgress() {
    document.getElementById('progress-text').style.display = 'block';
}
function updateProgress(text) {
    document.getElementById('progress-text').innerText = text;
}
function createSky(config) {
    let grid = createGrid(h, w);
    return new Promise(function (res, err) {
        console.log("Colouring sky...");
        showProgress();
        updateProgress("Colouring sky...");
        colourSky(grid, config.sky);
        if (config.sunset.include) {
            updateProgress("Creating sunset...");
            console.log("Creating sunset...");
            createSunset(grid, config.sunset);
        }
        if (config.stars.include) {
            updateProgress("Creating stars...");
            console.log("Creating stars...");
            createStars(grid, config.stars);
        }
        if (config.moon.include) {
            updateProgress("Creating moon...");
            console.log("Creating moon...");
            createMoon(grid, config.moon);
        }
        if (config.clouds.include) {
            updateProgress("Creating clouds...");
            console.log("Creating clouds...");
            createClouds(grid, config.clouds);
        }
        res(grid);
    });
}
function collapsePixel(pixel) {
    let colour = pixel[0].colour;
    for (let j = 1; j < pixel.length; j++) {
        colour = combineColours(pixel[j].colour, colour);
    }
    return colour;
}
function getCanvasContext() {
    let canvas = document.getElementById("canvas");
    canvas.width = w;
    canvas.height = h;
    let context = canvas.getContext("2d");
    return context;
}
function buildCanvas(grid) {
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
let w;
let h;
function runSkyGeneration() {
    let start = Date.now();
    w = config.sky.properties.width;
    h = config.sky.properties.height;
    createSky(config).then(grid => {
        buildCanvas(grid);
        let end = Date.now();
        console.log(`Completed in ${end - start}ms`);
    });
}
