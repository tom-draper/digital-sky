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
  var colour;
  var pNight = 0.3;
  if (Math.random() < pNight) {
    colour = randomSkyColourNight();
  } else {
    colour = randomSkyColourDay();
  }
  return colour;
}
var res720 = [1280, 720];
var res1080 = [1920, 1080];
function generateSky() {
  var colour = randomSkyColour();
  var mutationSpeed = randInt(1, 5);
  var sky = {
    properties: {
      height: res720[1],
      width: res720[0],
      pixelSize: 1,
      colour: colour,
      opacity: 1,
      mutationSpeed: mutationSpeed,
    },
  };
  return sky;
}
function colourSum(colour) {
  return colour[0] + colour[1] + colour[2];
}
function generateStars(skyColour) {
  var stars;
  var p = 0.6;
  var threshold = 120;
  if (Math.random() < p && colourSum(skyColour) < threshold) {
    stars = {
      include: true,
      properties: {
        opacity: 1,
        density: 0.005,
      },
    };
  } else {
    stars = {
      include: false,
      properties: null,
    };
  }
  return stars;
}
function randomMoonColour() {
  return [randInt(250, 255), randInt(250, 255), randInt(250, 255)];
}
function generateMoon(skyColour) {
  var moon;
  var p = 0.5;
  var threshold = 120;
  var colour = randomMoonColour();
  var radius = randInt(20, 60);
  var halfMoon = Math.random() >= 0.5;
  var noise = randInt(1, 5);
  if (Math.random() < p && colourSum(skyColour) < threshold) {
    moon = {
      include: true,
      properties: {
        colour: colour,
        radius: radius,
        halfMoon: halfMoon,
        noise: noise,
      },
    };
  } else {
    moon = {
      include: false,
      properties: null,
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
  var sunsetLayers = [];
  var n = randInt(1, 10);
  for (var i = 0; i < n; i++) {
    var layer = {
      colour: randomSunsetColour(),
      maxOpacity: randFloat(0.2, 1),
      proportion: randFloat(0.2, 1),
      colourMutationSpeed: randInt(1, 3),
      xStretch: randFloat(0.2, 1.2),
      yStretch: randFloat(0.7, 1.5),
    };
    sunsetLayers.push(layer);
  }
  return sunsetLayers;
}
function generateSunset() {
  var sunset;
  var p = 1;
  if (Math.random() < p) {
    var sunsetLayers = generateSunsetLayers();
    sunset = {
      include: true,
      properties: {
        layers: sunsetLayers,
      },
    };
  } else {
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
  var cloudLayers = [];
  var n = randInt(1, 25);
  for (var i = 0; i < n; i++) {
    var layer = {
      colour: randomCloudColour(),
      opacity: randFloat(0.05, 0.5),
      minSize: randInt(500, 1000),
      maxSize: randInt(5000, 50000),
      pH: randFloat(0.5, 0.9),
      pV: randFloat(0.1, 0.5),
    };
    cloudLayers.push(layer);
  }
  return cloudLayers;
}
function generateClouds() {
  var clouds;
  var p = 1;
  if (Math.random() < p) {
    clouds = {
      include: true,
      properties: {
        quantity: randInt(1, 25),
        layers: generateCloudLayers(),
      },
    };
  } else {
    clouds = {
      include: false,
      properties: null,
    };
  }
  return clouds;
}
function generateConfig() {
  var sky = generateSky();
  var stars = generateStars(sky.properties.colour);
  var moon = generateMoon(sky.properties.colour);
  var sunset = generateSunset();
  var clouds = generateClouds();
  var config = {
    sky: sky,
    stars: stars,
    moon: moon,
    sunset: sunset,
    clouds: clouds,
  };
  return config;
}
