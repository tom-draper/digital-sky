
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
          mutationSpeed: 2,
          xStretch: 1,
          yStretch: 1,
        },
        {
          colour: [255, 200, 200],
          maxOpacity: 0.7,
          proportion: 0.7,
          mutationSpeed: 2,
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

function createSunsetLayers() {
  let original = document.getElementById("sunsetLayer");
  document.getElementById('sunsetLayers').removeChild(original);
  for (let i = 0; i < config.sunset.properties.layers.length; i++) {
    let layer: any = original.cloneNode(true);
    layer.removeAttribute("id");
    layer.children[0].textContent = 'Layer ' + (i+1);
    layer.children[2].children[0].value = config.sunset.properties.layers[i].colour[0];
    layer.children[2].children[1].value = config.sunset.properties.layers[i].colour[1];
    layer.children[2].children[2].value = config.sunset.properties.layers[i].colour[2];
    layer.children[3].children[0].value = config.sunset.properties.layers[i].maxOpacity;
    layer.children[4].children[0].value = config.sunset.properties.layers[i].proportion;
    layer.children[5].children[0].value = config.sunset.properties.layers[i].mutationSpeed;
    layer.children[6].children[0].value = config.sunset.properties.layers[i].xStretch;
    layer.children[7].children[0].value = config.sunset.properties.layers[i].yStretch;
    document.getElementById('sunsetLayers').appendChild(layer);
  }
}

function fillSunsetDefault() {
  document.getElementById('sunsetInclude').value = config.sunset.include;
  createSunsetLayers()
}

function createCloudsLayers() {
  let original = document.getElementById("cloudsLayer");
  document.getElementById('cloudsLayers').removeChild(original);
  for (let i = 0; i < config.clouds.properties.layers.length; i++) {
    let layer: any = original.cloneNode(true);
    console.log(layer.children)
    layer.removeAttribute("id");
    layer.children[0].textContent = 'Layer ' + (i+1);
    layer.children[2].children[0].value = config.clouds.properties.layers[i].colour[0];
    layer.children[2].children[1].value = config.clouds.properties.layers[i].colour[1];
    layer.children[2].children[2].value = config.clouds.properties.layers[i].colour[2];
    layer.children[3].children[0].value = config.clouds.properties.layers[i].opacity;
    layer.children[4].children[0].value = config.clouds.properties.layers[i].minSize;
    layer.children[5].children[0].value = config.clouds.properties.layers[i].maxSize;
    layer.children[6].children[0].value = config.clouds.properties.layers[i].pH;
    layer.children[7].children[0].value = config.clouds.properties.layers[i].pV;
    document.getElementById('cloudsLayers').appendChild(layer);
  }
}

function fillCloudsDefault() {
  document.getElementById('cloudsInclude').value = config.clouds.include;
  document.getElementById('cloudsQuantity').value = config.clouds.properties.quantity;
  createCloudsLayers()
}

function init() {
  fillSkyDefaults();
  fillStarsDefault();
  fillMoonDefault();
  fillSunsetDefault();
  fillCloudsDefault();
}

function collectInputs() {

}

function run() {
  collectInputs();
  runSkyGeneration();
  document.getElementById('config').style.display = 'none';
}

init();