
function randomColour(): [number, number, number] {
  return [randInt(0, 255), randInt(0, 255), randInt(0, 255)];
}

function randomSkyColourNight(): [number, number, number]{
 return [randInt(0, 100), randInt(0, 100), randInt(0, 100)];
}
function randomSkyColourDay(): [number, number, number] {
  return [randInt(150, 250), randInt(140, 240), randInt(160, 255)];
}

function randomSkyColour(): [number, number, number] {
  let colour: [number, number, number];
  let pNight = 0.3;
  if (Math.random() < pNight) {
    colour = randomSkyColourNight();
  } else {
    colour = randomSkyColourDay();
  }
  return colour;
}

let res720 = [1280, 720];
let res1080 = [1920, 1080];

function generateSky(): SkyConfig {
  let colour: [number, number, number] = randomSkyColour();
  let mutationSpeed = randInt(1, 5);

  let sky =  {
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

function colourSum(colour: number[]): number {
  return colour[0] + colour[1] + colour[2];
}

function generateStars(skyColour: number[]): StarsConfig {
  let stars: StarsConfig;
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
  } else {
    stars = {
      include: false,
      properties: null
    };
  }

  return stars;
}

function randomMoonColour(): [number, number, number] {
  return [randInt(250, 255), randInt(250, 255), randInt(250, 255)];
}

function generateMoon(skyColour: number[]): MoonConfig {
  let moon: MoonConfig;
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
  } else {
    moon = {
      include: false,
      properties: null
    };
  }

  return moon;
}

function randomSunsetColour(): [number, number, number] {
  return [randInt(100, 255), randInt(100, 240), randInt(100, 255)];
}

function randFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function generateSunsetLayers(): SunsetLayer[] {
  let sunsetLayers: SunsetLayer[] = [];
  let n = randInt(1, 10);
  for (let i = 0; i < n; i++) {
    let layer = {
      colour: randomSunsetColour(),
      maxOpacity: randFloat(0.2, 1),
      proportion: randFloat(0.2, 1),
      colourMutationSpeed: randInt(1, 3),
      xStretch: randFloat(0.2, 1.2),  // >1 (thinner), <1 (wider) 
      yStretch: randFloat(0.7, 1.5),  // >1 (shorter), <1 (taller) 
    };
    sunsetLayers.push(layer);
  }
  return sunsetLayers;
}

function generateSunset(): SunsetConfig {
  let sunset: SunsetConfig;
  let p = 1;

  if (Math.random() < p) {
    let sunsetLayers = generateSunsetLayers();

    sunset = {
      include: true,
      properties: {
        layers: sunsetLayers
      }
    };
  } else {
    sunset = {
      include: false,
      properties: null,
    };
  }

  return sunset;
}

function randomCloudColour(): [number, number, number] {
  return [randInt(200, 255), randInt(200, 255), randInt(200, 255)];
}

function generateCloudLayers(): CloudLayer[] {
  let cloudLayers: CloudLayer[] = [];
  let n = randInt(1, 25);
  for (let i = 0; i < n; i++) {
    let layer: CloudLayer = {
      colour: randomCloudColour(),
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

function generateClouds(): CloudsConfig {
  let clouds: CloudsConfig;
  let p = 1;

  if (Math.random() < p) {
    clouds = {
      include: true,
      properties: {
        quantity: randInt(1, 25),
        layers: generateCloudLayers()
      }
    };
  } else {
    clouds = {
      include: false,
      properties: null,
    };
  }
  return clouds;
}

function generateConfig(): Config {
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