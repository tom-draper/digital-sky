/* jshint esversion: 6 */

let defaultHeight = 720;
let defaultWidth = 1280;

function defaultSky(colour) {
  return {
    height: defaultHeight,
    width: defaultWidth,
    pixelSize: 1,
    colour: colour,
    opacity: 1
  };
} 

let wind1 = {
  speed: 0.1,
  direction: 'left'
};
let noWind = {
  speed: null,
  direction: null
};

let stars1 = {
  include: true,
  opacity: 1,
  density: 0.005,
};
let starsDense = {
  include: true,
  opacity: 1,
  density: 0.01,
};
let starsFaint = {
  include: true,
  opacity: 0.5,
  density: 0.002,
};
let noStars = {
  include: false,
  opacity: null,
  density: null,
};

let sunset1 = {
  include: true,
  layers: [
    {
      colour: [253, 94, 83],
      maxOpacity: 0.45,
      // The proportion of the height used as the max distance that the sunset travels
      proportion: 0.7,
      // Magnitude of the inc/dec of one rgb value with each colour step
      colourMutationSpeed: 1,
      xStretch: 0.5,  // >1 (thinner), <1 (wider) 
      yStretch: 1,  // >1 (shorter), <1 (taller) 
    },
    {
      colour: [255, 201, 34],
      maxOpacity: 0.4,
      proportion: 0.7,
      colourMutationSpeed: 1,
      xStretch: 0.3,
      yStretch: 1,
    }
  ]
};
let sunset2 = {
  include: true,
  layers: [
    {
      colour: [99, 197, 218],
      maxOpacity: 0.25,
      proportion: 0.6,
      colourMutationSpeed: 1,
      xStretch: 0.3,
      yStretch: 0.5,
    },
    {
      colour: [33, 89, 136],
      maxOpacity: 0.4,
      proportion: 0.9,
      colourMutationSpeed: 3,
      xStretch: 0.2,
      yStretch: 0.4,
    },
    {
      colour: [253, 94, 83],
      maxOpacity: 0.45,
      // The proportion of the height used as the max distance that the sunset travels
      proportion: 0.7,
      // Magnitude of the inc/dec of one rgb value with each colour step
      colourMutationSpeed: 1,
      xStretch: 0.5,  // >1 (thinner), <1 (wider) 
      yStretch: 1,  // >1 (shorter), <1 (taller) 
    },
    {
      colour: [255, 201, 34],
      maxOpacity: 0.4,
      proportion: 0.7,
      colourMutationSpeed: 1,
      xStretch: 0.3,
      yStretch: 1,
    },
  ]
};
let noSunset = {
  include: false,
  colour: null,
  maxOpacity: null,
  xStretch: null,
  yStretch: null,
};

let clouds1 = {
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
      maxSize: 20000,
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
};
let cloudsCloudy = {
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
};
let cloudsMild = {
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
};
let noClouds = {
  include: false,
  quantity: null,
  layers: null
};





// ----------------------- PRESETS -----------------------

let presetLightDay = {
  animate: false,
  wind: noWind,
  sky: defaultSky([135, 206, 235]),
  stars: noStars,
  sun: false,
  moon: false,
  sunset: noSunset,
  clouds: clouds1
};

let presetSunset = {
  animate: false,
  wind: noWind,
  sky: defaultSky([135, 206, 235]),
  stars: starsFaint,
  sun: false,
  moon: false,
  sunset: sunset1,
  clouds: clouds1
};

let presetLateEvening = {
  animate: false,
  wind: noWind,
  sky: defaultSky([8, 43, 94]),
  stars: starsFaint,
  sun: false,
  moon: false,
  sunset: sunset2,
  clouds: clouds1
};

let presetPinkSky = {
  animate: false,
  wind: noWind,
  sky: defaultSky([255, 192, 203]),
  stars: noStars,
  sun: false,
  moon: false,
  sunset: noSunset,
  clouds: clouds1
};

let presetLightDayCloudy = {
  animate: false,
  wind: noWind,
  sky: defaultSky([135, 206, 235]),
  stars: noStars,
  sun: false,
  moon: false,
  sunset: noSunset,
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
  wind: noWind,
  sky: defaultSky([135, 206, 235]),
  stars: stars1,
  sun: false,
  moon: false,
  sunset: noSunset,
  clouds: clouds1
};

let presetNight = {
  animate: false,
  wind: noWind,
  sky: defaultSky([40, 30, 45]),
  stars: stars1,
  sun: false,
  moon: false,
  sunset: noSunset,
  clouds: cloudsMild
};

let presetCloudy = {
  animate: false,
  wind: noWind,
  sky: defaultSky([115, 160, 200]),
  stars: starsDense,
  sun: false,
  moon: false,
  sunset: noSunset,
  clouds: cloudsCloudy
};
