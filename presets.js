
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

let none = {
  include: false,
  properties: null
};

let stars1 = {
  include: true,
  properties: {
    opacity: 1,
    density: 0.005,
  }
};
let starsDense = {
  include: true,
  properties: {
    opacity: 1,
    density: 0.01,
  }
};
let starsFaint = {
  include: true,
  properties: {
    opacity: 0.5,
    density: 0.002,
  }
};

let moon1 = {
  include: true,
  properties: {
    colour: [248, 250, 244],
    radius: 40,
    halfMoon: true,
    noise: 2
  }
};


let sunset1 = {
  include: true,
  properties: {
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
  }
};
let sunset2 = {
  include: true,
  properties: {
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
  }
};

let clouds1 = {
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
  }
};
let cloudsBig = {
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
  }
};
let cloudsCloudy = {
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
  }
};
let cloudsMild = {
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
      }
    ],
  }
};




// ----------------------- PRESETS -----------------------

let presetLightDay = {
  sky: defaultSky([135, 206, 235]),
  stars: none,
  moon: none,
  sunset: none,
  clouds: clouds1
};

let presetSunset = {
  sky: defaultSky([135, 206, 235]),
  stars: starsFaint,
  moon: false,
  sunset: sunset1,
  clouds: clouds1
};

let presetMoonAndStars = {
  sky: defaultSky([8, 43, 94]),
  stars: starsFaint,
  moon: moon1,
  sunset: none,
  clouds: none
};

let presetLateEvening = {
  sky: defaultSky([8, 43, 94]),
  stars: starsFaint,
  moon: none,
  sunset: sunset2,
  clouds: cloudsBig
};

let presetPinkSky = {
  sky: defaultSky([255, 192, 203]),
  stars: none,
  moon: none,
  sunset: none,
  clouds: clouds1
};

let presetLightDayCloudy = {
  sky: defaultSky([135, 206, 235]),
  stars: none,
  moon: none,
  sunset: none,
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
  sky: defaultSky([135, 206, 235]),
  stars: stars1,
  moon: none,
  sunset: none,
  clouds: clouds1
};

let presetNight = {
  sky: defaultSky([40, 30, 45]),
  stars: stars1,
  moon: none,
  sunset: none,
  clouds: cloudsMild
};

let presetCloudy = {
  sky: defaultSky([115, 160, 200]),
  stars: starsDense,
  moon: none,
  sunset: none,
  clouds: cloudsCloudy
};
