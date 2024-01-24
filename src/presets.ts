import { Config, None } from "./config";

const defaultHeight = 720;
const defaultWidth = 1280;

function defaultSky(colour: [number, number, number]) {
  return {
    properties: {
      dimensions: {
        height: defaultHeight,
        width: defaultWidth,
      },
      pixelSize: 1,
      colour: colour,
      mutationSpeed: 1,
      mutationStyle: "Colour spread",
      opacity: 1,
    },
  };
}

const none: None = {
  include: false,
  properties: null,
};

const stars1 = {
  include: true,
  properties: {
    opacity: 1,
    density: 0.005,
  },
};
const starsDense = {
  include: true,
  properties: {
    opacity: 1,
    density: 0.01,
  },
};
const starsFaint = {
  include: true,
  properties: {
    opacity: 0.5,
    density: 0.002,
  },
};

const moon1 = {
  include: true,
  properties: {
    colour: [248, 250, 244],
    radius: 40,
    halfMoon: true,
    noise: 2,
  },
};

const sunset1 = {
  include: true,
  properties: {
    layers: [
      {
        colour: [253, 94, 83],
        maxOpacity: 0.45,
        // The proportion of the height used as the max distance that the sunset travels
        proportion: 0.7,
        // Magnitude of the inc/dec of one rgb value with each colour step
        mutationSpeed: 1,
        xStretch: 0.5, // >1 (thinner), <1 (wider)
        yStretch: 0, // >1 (shorter), <1 (taller)
      },
      {
        colour: [255, 201, 34],
        maxOpacity: 0.4,
        proportion: 0.7,
        mutationSpeed: 1,
        xStretch: 0.7,
        yStretch: 0,
      },
    ],
  },
};
const sunset2 = {
  include: true,
  properties: {
    layers: [
      {
        colour: [99, 197, 218],
        maxOpacity: 0.25,
        proportion: 0.6,
        mutationSpeed: 1,
        xStretch: 0.7,
        yStretch: 0.5,
      },
      {
        colour: [33, 89, 136],
        maxOpacity: 0.4,
        proportion: 0.9,
        mutationSpeed: 3,
        xStretch: 0.8,
        yStretch: 0.6,
      },
      {
        colour: [253, 94, 83],
        maxOpacity: 0.45,
        // The proportion of the height used as the max distance that the sunset travels
        proportion: 0.7,
        // Magnitude of the inc/dec of one rgb value with each colour step
        mutationSpeed: 1,
        xStretch: 0.5, // >1 (thinner), <1 (wider)
        yStretch: 0, // >1 (shorter), <1 (taller)
      },
      {
        colour: [255, 201, 34],
        maxOpacity: 0.4,
        proportion: 0.7,
        mutationSpeed: 1,
        xStretch: 0.7,
        yStretch: 0,
      },
    ],
  },
};

const clouds1 = {
  include: true,
  properties: {
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
        colour: [173, 216, 230],
        opacity: 0.15,
        minSize: 100,
        maxSize: 10000,
        pH: 0.6,
        pV: 0.2,
      },
      {
        colour: [173, 216, 230],
        opacity: 0.15,
        minSize: 100,
        maxSize: 10000,
        pH: 0.6,
        pV: 0.2,
      },
      {
        colour: [240, 240, 240],
        opacity: 0.2,
        minSize: 100,
        maxSize: 10000,
        pH: 0.6,
        pV: 0.2,
      },
    ],
  },
};
const c = [160, 170, 190];
const clouds2 = {
  include: true,
  properties: {
    quantity: 4,
    // Cloud layers are created in order
    layers: [
      {
        colour: c,
        opacity: 0.15,
        minSize: 100,
        maxSize: 20000,
        pH: 0.8,
        pV: 0.25,
      },
      {
        colour: c,
        opacity: 0.15,
        minSize: 100,
        maxSize: 20000,
        pH: 0.8,
        pV: 0.25,
      },
      {
        colour: c,
        opacity: 0.15,
        minSize: 100,
        maxSize: 20000,
        pH: 0.8,
        pV: 0.25,
      },
      {
        colour: c,
        opacity: 0.15,
        minSize: 100,
        maxSize: 20000,
        pH: 0.8,
        pV: 0.25,
      },
      {
        colour: c,
        opacity: 0.15,
        minSize: 100,
        maxSize: 20000,
        pH: 0.8,
        pV: 0.25,
      },
    ],
  },
};
const cloudsBig = {
  include: true,
  properties: {
    quantity: 10,
    // Cloud layers are created in order
    layers: [
      {
        colour: [235, 235, 235],
        opacity: 0.2,
        minSize: 100,
        maxSize: 20000,
        pH: 0.7, // Probability of horizontal expansion
        pV: 0.3, // Probability of vertical expansion
      },
      {
        colour: [235, 235, 235],
        opacity: 0.15,
        minSize: 100,
        maxSize: 20000,
        pH: 0.7,
        pV: 0.3,
      },
      {
        colour: [235, 235, 235],
        opacity: 0.15,
        minSize: 100,
        maxSize: 20000,
        pH: 0.7,
        pV: 0.3,
      },
      {
        colour: [235, 235, 235],
        opacity: 0.15,
        minSize: 100,
        maxSize: 20000,
        pH: 0.7,
        pV: 0.3,
      },
      {
        colour: [173, 216, 230],
        opacity: 0.15,
        minSize: 100,
        maxSize: 20000,
        pH: 0.6,
        pV: 0.2,
      },
      {
        colour: [173, 216, 230],
        opacity: 0.15,
        minSize: 100,
        maxSize: 20000,
        pH: 0.6,
        pV: 0.2,
      },
      {
        colour: [240, 240, 240],
        opacity: 0.2,
        minSize: 100,
        maxSize: 20000,
        pH: 0.6,
        pV: 0.2,
      },
    ],
  },
};
const cloudsCloudy = {
  include: true,
  properties: {
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
const cloudsMild = {
  include: true,
  properties: {
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
      },
    ],
  },
};

// ----------------------- PRESETS -----------------------

const presetLightDay = {
  sky: defaultSky([135, 206, 235]),
  stars: none,
  moon: none,
  sunset: none,
  clouds: clouds1,
};

const presetSunset = {
  sky: defaultSky([135, 206, 235]),
  stars: starsFaint,
  moon: false,
  sunset: sunset1,
  clouds: clouds1,
};

const presetMoonAndStars = {
  sky: defaultSky([8, 43, 94]),
  stars: starsFaint,
  moon: moon1,
  sunset: none,
  clouds: none,
};

const presetLateEvening = {
  sky: defaultSky([8, 43, 94]),
  stars: starsFaint,
  moon: none,
  sunset: sunset2,
  clouds: cloudsBig,
};

const presetLateEvening2 = {
  sky: defaultSky([8, 43, 94]),
  stars: starsFaint,
  moon: moon1,
  sunset: sunset2,
  clouds: none,
};

const presetLateEvening3: Config = {
  sky: defaultSky([94, 122, 187]),
  stars: none,
  moon: none,
  sunset: {
    include: true,
    properties: {
      layers: [
        {
          colour: [254, 207, 199],
          maxOpacity: 0.7,
          proportion: 0.7,
          mutationSpeed: 1,
          xStretch: 0.7,
          yStretch: 0.5,
        },
        {
          colour: [253, 227, 228],
          maxOpacity: 0.5,
          proportion: 0.7,
          mutationSpeed: 1,
          xStretch: 0.6,
          yStretch: 0.3,
        },
      ],
    },
  },
  clouds: none,
};

const presetPinkSky = {
  sky: defaultSky([255, 192, 203]),
  stars: none,
  moon: none,
  sunset: none,
  clouds: clouds1,
};

const presetPinkSky2 = {
  sky: defaultSky([255, 182, 193]),
  stars: none,
  moon: none,
  sunset: {
    include: true,
    properties: {
      layers: [
        {
          colour: [253, 240, 240], // White
          maxOpacity: 0.3,
          proportion: 0.7,
          mutationSpeed: 1,
          xStretch: 0.3,
          yStretch: 0,
        },
        {
          colour: [252, 210, 102], // Yellow
          maxOpacity: 0.3,
          proportion: 0.7,
          mutationSpeed: 1,
          xStretch: 0.3,
          yStretch: 0,
        },
        {
          colour: [255, 227, 115], // Yellow
          maxOpacity: 0.35,
          proportion: 0.6,
          mutationSpeed: 1,
          xStretch: 0.3,
          yStretch: 0,
        },
        {
          colour: [252, 156, 84], // Sandy brown
          maxOpacity: 0.4,
          proportion: 0.5,
          mutationSpeed: 1,
          xStretch: 0.3,
          yStretch: 0,
        },
        {
          colour: [253, 94, 83], // Sunset orange
          maxOpacity: 0.45,
          proportion: 0.5,
          mutationSpeed: 1,
          xStretch: 0.3,
          yStretch: 0,
        },
      ],
    },
  },
  clouds: none,
};


const presetLightDayCloudy: Config = {
  sky: defaultSky([135, 206, 235]),
  stars: none,
  moon: none,
  sunset: none,
  clouds: {
    include: true,
    properties: {
      quantity: 10,
      // cloud layers are created in order
      layers: [
        {
          colour: [235, 235, 235],
          opacity: 0.5,
          minSize: 100,
          maxSize: 10000,
          pH: 0.7, // probability of horizontal expansion
          pV: 0.3, // probability of vertical expansion
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
  },
};

const presetLightDayStarry = {
  sky: defaultSky([135, 206, 235]),
  stars: stars1,
  moon: none,
  sunset: none,
  clouds: clouds1,
};

const presetNight = {
  sky: defaultSky([40, 30, 45]),
  stars: stars1,
  moon: none,
  sunset: none,
  clouds: cloudsMild,
};

const presetCloudy = {
  sky: defaultSky([115, 160, 200]),
  stars: starsDense,
  moon: none,
  sunset: none,
  clouds: cloudsCloudy,
};

const presetSunset2: Config = {
  sky: {
    properties: {
      dimensions: {
        height: 720,
        width: 1280,
      },
      pixelSize: 1,
      colour: [98, 119, 158],
      opacity: 1,
      mutationSpeed: 0.3,
      mutationStyle: "Colour spread",
    },
  },
  stars: none,
  moon: none,
  sunset: {
    include: true,
    properties: {
      layers: [
        {
          colour: [144, 152, 171],
          maxOpacity: 0.7,
          proportion: 0.7,
          mutationSpeed: 0.2,
          xStretch: 0.8,
          yStretch: 0.3,
        },
        {
          colour: [220, 217, 222],
          maxOpacity: 1,
          proportion: 0.6,
          mutationSpeed: 0.2,
          xStretch: 0.9,
          yStretch: 0.3,
        },
        {
          colour: [233, 212, 193],
          maxOpacity: 0.8,
          proportion: 0.5,
          mutationSpeed: 0.2,
          xStretch: 0.9,
          yStretch: 0.3,
        },
        {
          colour: [225, 161, 117],
          maxOpacity: 0.8,
          proportion: 0.4,
          mutationSpeed: 0.2,
          xStretch: 1,
          yStretch: 0.3,
        },
        {
          colour: [190, 140, 111],
          maxOpacity: 0.9,
          proportion: 0.2,
          mutationSpeed: 0.2,
          xStretch: 1,
          yStretch: 0.2,
        },
        {
          colour: [220, 130, 101],
          maxOpacity: 0.9,
          proportion: 0.15,
          mutationSpeed: 0.2,
          xStretch: 1,
          yStretch: 0.2,
        },
      ],
    },
  },
  clouds: none,
};
