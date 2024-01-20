"use strict";
// function randColour(): [number, number, number] {
//   return [randInt(0, 255), randInt(0, 255), randInt(0, 255)];
// }
// function randSkyColourNight(): [number, number, number] {
//   return [randInt(0, 100), randInt(0, 100), randInt(0, 100)];
// }
// function randSkyColourDay(): [number, number, number] {
//   return [randInt(150, 250), randInt(140, 240), randInt(160, 255)];
// }
// function randSkyColour(): [number, number, number] {
//   let colour: [number, number, number];
//   const pNight = 0.3;
//   if (Math.random() < pNight) {
//     colour = randSkyColourNight();
//   } else {
//     colour = randSkyColourDay();
//   }
//   return colour;
// }
// const res720 = [1280, 720];
// const res1080 = [1920, 1080];
// function generateSky(): SkyConfig {
//   const colour: [number, number, number] = randSkyColour();
//   const mutationSpeed = randInt(1, 5);
//   const sky = {
//     properties: {
//       height: res720[1],
//       width: res720[0],
//       pixelSize: 1,
//       colour: colour,
//       opacity: 1,
//       mutationSpeed: mutationSpeed,
//       mutationStyle: 'Colour spread'
//     },
//   };
//   return sky;
// }
function randFloat(min, max) {
    return Math.random() * (max - min) + min;
}
// function colourSum(colour: number[]): number {
//   return colour[0] + colour[1] + colour[2];
// }
// function generateStars(skyColour: number[]): StarsConfig {
//   let stars: StarsConfig;
//   const p = 0.6;
//   const threshold = 120;
//   if (Math.random() < p && colourSum(skyColour) < threshold) {
//     stars = {
//       include: true,
//       properties: {
//         opacity: 1,
//         density: 0.005,
//       },
//     };
//   } else {
//     stars = {
//       include: false,
//       properties: null,
//     };
//   }
//   return stars;
// }
// function randomMoonColour(): [number, number, number] {
//   return [randInt(250, 255), randInt(250, 255), randInt(250, 255)];
// }
// function generateMoon(skyColour: number[]): MoonConfig {
//   let moon: MoonConfig;
//   const p = 0.5;
//   const threshold = 120;
//   const colour = randomMoonColour();
//   const radius = randInt(20, 60);
//   const halfMoon = Math.random() >= 0.5;
//   const noise = randInt(1, 5);
//   if (Math.random() < p && colourSum(skyColour) < threshold) {
//     moon = {
//       include: true,
//       properties: {
//         colour: colour,
//         radius: radius,
//         halfMoon: halfMoon,
//         noise: noise,
//       },
//     };
//   } else {
//     moon = {
//       include: false,
//       properties: null,
//     };
//   }
//   return moon;
// }
function randomSunsetColour() {
    return [randInt(100, 255), randInt(100, 240), randInt(100, 255)];
}
function randSunsetLayers() {
    const sunsetLayers = [];
    const n = randInt(1, 10);
    for (let i = 0; i < n; i++) {
        const layer = {
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
// function generateSunset(): SunsetConfig {
//   let sunset: SunsetConfig;
//   const p = 1;
//   if (Math.random() < p) {
//     const sunsetLayers = generateSunsetLayers();
//     sunset = {
//       include: true,
//       properties: {
//         layers: sunsetLayers,
//       },
//     };
//   } else {
//     sunset = {
//       include: false,
//       properties: null,
//     };
//   }
//   return sunset;
// }
function randomCloudColour() {
    return [randInt(200, 255), randInt(200, 255), randInt(200, 255)];
}
function randCloudLayers() {
    const cloudLayers = [];
    const n = randInt(1, 25);
    for (let i = 0; i < n; i++) {
        const layer = {
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
// function generateClouds(): CloudsConfig {
//   let clouds: CloudsConfig;
//   const p = 1;
//   if (Math.random() < p) {
//     clouds = {
//       include: true,
//       properties: {
//         quantity: randInt(1, 25),
//         layers: generateCloudLayers(),
//       },
//     };
//   } else {
//     clouds = {
//       include: false,
//       properties: null,
//     };
//   }
//   return clouds;
// }
function randConfig() {
    const config = {
        sky: {
            properties: {
                height: 720,
                width: 1280,
                pixelSize: randInt(1, 5),
                colour: [randInt(0, 255), randInt(0, 255), randInt(0, 255)],
                opacity: randFloat(0.5, 1),
                mutationSpeed: randFloat(0.1, 0.5),
                mutationStyle: randMutationStyle(),
            },
        },
        stars: {
            include: randBool(),
            properties: {
                opacity: randFloat(0.1, 1),
                density: randFloat(0.001, 0.01),
            },
        },
        moon: {
            include: randBool(),
            properties: {
                colour: [randInt(0, 255), randInt(0, 255), randInt(0, 255)],
                radius: randInt(10, 50),
                halfMoon: randBool(),
                noise: randFloat(0, 1),
            },
        },
        sunset: {
            include: randBool(),
            properties: {
                layers: randSunsetLayers(),
            },
        },
        clouds: {
            include: randBool(),
            properties: {
                quantity: randInt(1, 25),
                layers: randCloudLayers(),
            },
        },
    };
    return config;
}
function randBool() {
    return Math.random() < 0.5;
}
function randMutationStyle() {
    const styles = [
        "Colour spread",
        "Random",
        "Point spread",
        "Point spread wavy",
        "Horizontal",
        "Vertical",
        "Diagonal",
    ];
    return styles[randInt(0, styles.length)];
}
// function generateConfig(): Config {
//   const sky = generateSky();
//   const stars = generateStars(sky.properties.colour);
//   const moon = generateMoon(sky.properties.colour);
//   const sunset = generateSunset();
//   const clouds = generateClouds();
//   const config = {
//     sky: sky,
//     stars: stars,
//     moon: moon,
//     sunset: sunset,
//     clouds: clouds,
//   };
//   return config;
// }
