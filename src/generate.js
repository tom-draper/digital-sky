"use strict";
function randomColour() {
    return [randInt(0, 255), randInt(0, 255), randInt(0, 255)];
}
function randomSkyColourNight() {
    return [randInt(0, 100), randInt(0, 100), randInt(0, 100)];
}
function randomSkyColourDay() {
    return [randInt(150, 250), randInt(140, 240), randInt(160, 255)];
}
function randomSkyColour() {
    let colour;
    let pNight = 0.3;
    if (Math.random() < pNight) {
        colour = randomSkyColourNight();
    }
    else {
        colour = randomSkyColourDay();
    }
    return colour;
}
let res720 = [1280, 720];
let res1080 = [1920, 1080];
function generateSky() {
    let colour = randomSkyColour();
    let mutationSpeed = randInt(1, 5);
    let sky = {
        properties: {
            height: res720[1],
            width: res720[0],
            pixelSize: 1,
            colour: colour,
            opacity: 1,
            mutationSpeed: mutationSpeed
        }
    };
    return sky;
}
function colourSum(colour) {
    return colour[0] + colour[1] + colour[2];
}
function generateStars(skyColour) {
    let stars;
    let p = 0.6;
    let threshold = 120;
    if (Math.random() < p && colourSum(skyColour) < threshold) {
        stars = {
            include: true,
            properties: {
                opacity: 1,
                density: 0.005,
            }
        };
    }
    else {
        stars = {
            include: false,
            properties: null
        };
    }
    return stars;
}
function randomMoonColour() {
    return [randInt(250, 255), randInt(250, 255), randInt(250, 255)];
}
function generateMoon(skyColour) {
    let moon;
    let p = 0.5;
    let threshold = 120;
    let colour = randomMoonColour();
    let radius = randInt(20, 60);
    let halfMoon = Math.random() >= 0.5;
    let noise = randInt(1, 5);
    if (Math.random() < p && colourSum(skyColour) < threshold) {
        moon = {
            include: true,
            properties: {
                colour: colour,
                radius: radius,
                halfMoon: halfMoon,
                noise: noise
            }
        };
    }
    else {
        moon = {
            include: false,
            properties: null
        };
    }
    return moon;
}
function randomSunsetColour() {
    return [randInt(100, 255), randInt(100, 240), randInt(100, 255)];
}
function randFloat(min, max) {
    return Math.random() * (max - min) + min;
}
function generateSunsetLayers() {
    let sunsetLayers = [];
    let n = randInt(1, 10);
    for (let i = 0; i < n; i++) {
        let layer = {
            colour: randomSunsetColour(),
            maxOpacity: randFloat(0.2, 1),
            proportion: randFloat(0.2, 1),
            mutationSpeed: randInt(1, 3),
            xStretch: randFloat(0.2, 1.2),
            yStretch: randFloat(0.7, 1.5), // >1 (shorter), <1 (taller) 
        };
        sunsetLayers.push(layer);
    }
    return sunsetLayers;
}
function generateSunset() {
    let sunset;
    let p = 1;
    if (Math.random() < p) {
        let sunsetLayers = generateSunsetLayers();
        sunset = {
            include: true,
            properties: {
                layers: sunsetLayers
            }
        };
    }
    else {
        sunset = {
            include: false,
            properties: null,
        };
    }
    return sunset;
}
function randomCloudColour() {
    return [randInt(200, 255), randInt(200, 255), randInt(200, 255)];
}
function generateCloudLayers() {
    let cloudLayers = [];
    let n = randInt(1, 25);
    for (let i = 0; i < n; i++) {
        let layer = {
            colour: randomCloudColour(),
            opacity: randFloat(0.05, 0.5),
            minSize: randInt(500, 1000),
            maxSize: randInt(5000, 50000),
            pH: randFloat(0.5, 0.9),
            pV: randFloat(0.1, 0.5), // Probability of vertical expansion
        };
        cloudLayers.push(layer);
    }
    return cloudLayers;
}
function generateClouds() {
    let clouds;
    let p = 1;
    if (Math.random() < p) {
        clouds = {
            include: true,
            properties: {
                quantity: randInt(1, 25),
                layers: generateCloudLayers()
            }
        };
    }
    else {
        clouds = {
            include: false,
            properties: null,
        };
    }
    return clouds;
}
function generateConfig() {
    let sky = generateSky();
    let stars = generateStars(sky.properties.colour);
    let moon = generateMoon(sky.properties.colour);
    let sunset = generateSunset();
    let clouds = generateClouds();
    let config = {
        sky: sky,
        stars: stars,
        moon: moon,
        sunset: sunset,
        clouds: clouds
    };
    return config;
}
