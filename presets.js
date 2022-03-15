/* jshint esversion: 6 */

let defaultHeight = 720;
let defaultWidth = 1280;

// Light day
let presetLightDay = {
  animate: false,
  sky: {
    height: defaultHeight,
    width: defaultWidth,
    pixelSize: 1,
    colour: [135, 206, 235],
    opacity: 1,
  },
  stars: {
    include: false,
    density: 0,
  },
  sun: false,
  moon: false,
  sunset: false,
  clouds: {
    include: true,
    quantity: 10,
    // Cloud layers are created in order
    layers: [
      {
        colour: [235, 235, 235],
        opacity: 0.2,
        minSize: 100,
        maxSize: 10000,
        pH: 0.7, // Probability of horizontal expansion
        pV: 0.3, // Probability of vertical expansion
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
    ],
  },
};


let presetSunset = {
  animate: false,
  sky: {
    height: defaultHeight,
    width: defaultWidth,
    pixelSize: 1,
    colour: [135, 206, 235],
    opacity: 1,
  },
  stars: {
    include: false,
    density: 0,
  },
  sun: false,
  moon: false,
  sunset: true,
  clouds: {
    include: true,
    quantity: 10,
    // Cloud layers are created in order
    layers: [
      {
        colour: [235, 235, 235],
        opacity: 0.2,
        minSize: 100,
        maxSize: 10000,
        pH: 0.7, // Probability of horizontal expansion
        pV: 0.3, // Probability of vertical expansion
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
    ],
  },
};

let presetPinkSky = {
  animate: false,
  sky: {
    height: defaultHeight,
    width: defaultWidth,
    pixelSize: 1,
    colour: [255, 192, 203],
    opacity: 1,
  },
  stars: {
    include: false,
    density: 0,
  },
  sun: false,
  moon: false,
  sunset: false,
  clouds: {
    include: true,
    quantity: 10,
    // Cloud layers are created in order
    layers: [
      {
        colour: [235, 235, 235],
        opacity: 0.2,
        minSize: 100,
        maxSize: 10000,
        pH: 0.7, // Probability of horizontal expansion
        pV: 0.3, // Probability of vertical expansion
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
    ],
  },
};

let presetLightDayCloudy = {
  animate: false,
  sky: {
    height: defaultHeight,
    width: defaultWidth,
    pixelSize: 1,
    colour: [135, 206, 235],
    opacity: 1,
  },
  stars: {
    include: false,
    density: 0,
  },
  sun: false,
  moon: false,
  sunset: false,
  clouds: {
    include: true,
    quantity: 10,
    // Cloud layers are created in order
    layers: [
      {
        colour: [235, 235, 235],
        opacity: 0.5,
        minSize: 100,
        maxSize: 10000,
        pH: 0.7, // Probability of horizontal expansion
        pV: 0.3, // Probability of vertical expansion
      },
      {
        colour: [235, 235, 235],
        opacity: 0.4,
        minSize: 100,
        maxSize: 10000,
        pH: 0.7,
        pV: 0.3,
      },
      {
        colour: [235, 235, 235],
        opacity: 0.4,
        minSize: 100,
        maxSize: 10000,
        pH: 0.7,
        pV: 0.3,
      },
      {
        colour: [235, 235, 235],
        opacity: 0.4,
        minSize: 100,
        maxSize: 10000,
        pH: 0.7,
        pV: 0.3,
      },
      {
        colour: [240, 211, 201],
        opacity: 0.4,
        minSize: 100,
        maxSize: 2000,
        pH: 0.6,
        pV: 0.2,
      },
      {
        colour: [240, 211, 201],
        opacity: 0.4,
        minSize: 100,
        maxSize: 2000,
        pH: 0.6,
        pV: 0.2,
      },
      {
        colour: [173, 216, 230],
        opacity: 0.4,
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
    ],
  },
};

let presetLightDayStarry = {
  animate: false,
  sky: {
    height: defaultHeight,
    width: defaultWidth,
    pixelSize: 1,
    colour: [135, 206, 235],
    opacity: 1,
  },
  stars: {
    include: true,
    density: 0.005,
  },
  sun: false,
  moon: false,
  sunset: false,
  clouds: {
    include: true,
    quantity: 10,
    // Cloud layers are created in order
    layers: [
      {
        colour: [235, 235, 235],
        opacity: 0.2,
        minSize: 100,
        maxSize: 10000,
        pH: 0.7, // Probability of horizontal expansion
        pV: 0.3, // Probability of vertical expansion
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
    ],
  },
};

let presetNight = {
  animate: false,
  sky: {
    height: defaultHeight,
    width: defaultWidth,
    pixelSize: 1,
    colour: [40, 30, 45],
    opacity: 1,
  },
  stars: {
    include: true,
    density: 0.006,
  },
  sun: false,
  moon: false,
  sunset: false,
  clouds: {
    include: true,
    quantity: 6,
    // Cloud layers are created in order
    layers: [
      {
        colour: [200, 200, 200],
        opacity: 0.2,
        minSize: 100,
        maxSize: 30000,
        pH: 0.7, // Probability of horizontal expansion
        pV: 0.3, // Probability of vertical expansion
      },
      {
        colour: [235, 235, 235],
        opacity: 0.15,
        minSize: 100,
        maxSize: 30000,
        pH: 0.7,
        pV: 0.3,
      },
      {
        colour: [235, 235, 235],
        opacity: 0.15,
        minSize: 100,
        maxSize: 30000,
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
        maxSize: 10000,
        pH: 0.6,
        pV: 0.2,
      },
      {
        colour: [240, 211, 201],
        opacity: 0.15,
        minSize: 100,
        maxSize: 10000,
        pH: 0.6,
        pV: 0.2,
      },
      {
        colour: [173, 216, 230],
        opacity: 0.1,
        minSize: 100,
        maxSize: 10000,
        pH: 0.6,
        pV: 0.2,
      },
      {
        colour: [173, 216, 230],
        opacity: 0.1,
        minSize: 100,
        maxSize: 10000,
        pH: 0.6,
        pV: 0.2,
      }
    ],
  },
};

let presetCloudy = {
  animate: false,
  sky: {
    height: defaultHeight,
    width: defaultWidth,
    pixelSize: 1,
    colour: [115, 160, 200],
    opacity: 1,
  },
  stars: {
    include: true,
    density: 0.01,
  },
  sun: false,
  moon: false,
  sunset: false,
  clouds: {
    include: true,
    quantity: 30,
    // Cloud layers are created in order
    layers: [
      {
        colour: [183, 183, 178],
        opacity: 0.8,
        minSize: 100,
        maxSize: 50000,
        pH: 0.8, // Probability of horizontal expansion
        pV: 0.5, // Probability of vertical expansion
      },
      {
        colour: [183, 183, 178],
        opacity: 0.7,
        minSize: 100,
        maxSize: 50000,
        pH: 0.8,
        pV: 0.5,
      },
      {
        colour: [183, 183, 178],
        opacity: 0.15,
        minSize: 100,
        maxSize: 10000,
        pH: 0.7,
        pV: 0.3,
      },
      {
        colour: [183, 183, 178],
        opacity: 0.3,
        minSize: 100,
        maxSize: 10000,
        pH: 0.7,
        pV: 0.3,
      },
      {
        colour: [183, 183, 178],
        opacity: 0.3,
        minSize: 100,
        maxSize: 10000,
        pH: 0.7,
        pV: 0.3,
      },
      {
        colour: [183, 183, 178],
        opacity: 0.3,
        minSize: 100,
        maxSize: 10000,
        pH: 0.7,
        pV: 0.3,
      },
    ],
  },
};
