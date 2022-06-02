
let config: Config = {
  sky: {
    properties: {
      height: 720,
      width: 1280,
      pixelSize: 1,
      colour: [200, 200, 250],
      opacity: 1,
      mutationSpeed: 2
    }
  },
  stars: {
    include: true,
    properties: {
      opacity: 1,
      density: 0.005,
    }
  },
  moon: {
    include: true,
    properties: {
      colour: [200, 200, 200],
      radius: 10,
      halfMoon: false,
      noise: 2
    }
  },
  sunset: {
    include: true,
    properties: {
      layers: [
        {
          colour: [255, 160, 160],
          maxOpacity: 0.7,
          proportion: 0.7,
          colourMutationSpeed: 2,
          xStretch: 1,
          yStretch: 1,
        },
        {
          colour: [255, 200, 200],
          maxOpacity: 0.7,
          proportion: 0.7,
          colourMutationSpeed: 2,
          xStretch: 1,
          yStretch: 1,
        }
      ]
    }
  },
  clouds: {
    include: true,
    properties: {
      quantity: 5,
      layers: [
        {
          colour: [200, 200, 200],
          opacity: 0.2,
          minSize: 1000,
          maxSize: 10000,
          pH: 0.8, // Probability of horizontal expansion
          pV: 0.3, // Probability of vertical expansion
        },
        {
          colour: [200, 200, 200],
          opacity: 0.2,
          minSize: 1000,
          maxSize: 10000,
          pH: 0.8, // Probability of horizontal expansion
          pV: 0.3, // Probability of vertical expansion
        },
        {
          colour: [200, 200, 200],
          opacity: 0.2,
          minSize: 1000,
          maxSize: 10000,
          pH: 0.8, // Probability of horizontal expansion
          pV: 0.3, // Probability of vertical expansion
        },
        {
          colour: [200, 200, 200],
          opacity: 0.2,
          minSize: 1000,
          maxSize: 10000,
          pH: 0.8, // Probability of horizontal expansion
          pV: 0.3, // Probability of vertical expansion
        },
        {
          colour: [200, 200, 200],
          opacity: 0.2,
          minSize: 1000,
          maxSize: 10000,
          pH: 0.8, // Probability of horizontal expansion
          pV: 0.3, // Probability of vertical expansion
        },
      ]
    }
  }
}

function fillSkyDefaults() {
  document.getElementById('skyWidth').value = config.sky.properties.width;
  document.getElementById('skyHeight').value = config.sky.properties.height;
  document.getElementById('skyPixelSize').value = config.sky.properties.pixelSize;
  document.getElementById('skyRed').value = config.sky.properties.colour[0];
  document.getElementById('skyGreen').value = config.sky.properties.colour[1];
  document.getElementById('skyBlue').value = config.sky.properties.colour[2];
  document.getElementById('skyOpacity').value = config.sky.properties.opacity;
  document.getElementById('skyMutationSpeed').value = config.sky.properties.mutationSpeed;
}

function fillStarsDefault() {
  document.getElementById('starsInclude').value = config.stars.include;
  document.getElementById('starsOpacity').value = config.stars.properties.opacity;
  document.getElementById('starsDensity').value = config.stars.properties.density;
}

function fillMoonDefault() {
  document.getElementById('moonInclude').value = config.moon.include;
  document.getElementById('moonRed').value = config.moon.properties.colour[0];
  document.getElementById('moonGreen').value = config.moon.properties.colour[1];
  document.getElementById('moonBlue').value = config.moon.properties.colour[2];
  document.getElementById('moonRadius').value = config.moon.properties.radius;
  document.getElementById('moonHalfMoon').value = config.moon.properties.halfMoon;
  document.getElementById('moonNoise').value = config.moon.properties.noise;

}

function init() {
  fillSkyDefaults()
  fillStarsDefault()
  fillMoonDefault()
}

function run() {
  runSkyGeneration();
  document.getElementById('config').style.display = 'none';
}

init();