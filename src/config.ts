let config: Config = {
  sky: {
    properties: {
      height: 720,
      width: 1280,
      pixelSize: 1,
      colour: [94, 122, 187],
      opacity: 1,
      mutationSpeed: 0.4,
      mutationStyle: 'Colour spread'
    },
  },
  stars: {
    include: false,
    properties: {
      opacity: 1,
      density: 0.005,
    },
  },
  moon: {
    include: false,
    properties: {
      colour: [200, 200, 200],
      radius: 25,
      halfMoon: false,
      noise: 0.5,
    },
  },
  sunset: {
    include: true,
    properties: {
      layers: [
        {
          colour: [254, 207, 199],
          maxOpacity: 0.7,
          proportion: 0.7,
          mutationSpeed: 0.2,
          xStretch: 0.7,
          yStretch: 0.5,
        },
        {
          colour: [253, 227, 228],
          maxOpacity: 0.5,
          proportion: 0.7,
          mutationSpeed: 0.2,
          xStretch: 0.6,
          yStretch: 0.3,
        },
      ],
    },
  },
  clouds: {
    include: false,
    properties: {
      quantity: 10,
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
  },
};

function componentToHex(c: number) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRGB(hex: string): [number, number, number] {
  let r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function fillSkyDefaults() {
  (<HTMLInputElement>document.getElementById("skyWidth")).value =
    config.sky.properties.width.toString();
  (<HTMLInputElement>document.getElementById("skyHeight")).value =
    config.sky.properties.height.toString();
  (<HTMLInputElement>document.getElementById("skyPixelSize")).value =
    config.sky.properties.pixelSize.toString();
  (<HTMLInputElement>document.getElementById("skyColour")).value = rgbToHex(
    config.sky.properties.colour[0],
    config.sky.properties.colour[1],
    config.sky.properties.colour[2]
  );
  (<HTMLInputElement>document.getElementById("skyOpacity")).value =
    config.sky.properties.opacity.toString();
  (<HTMLInputElement>document.getElementById("skyMutationSpeed")).value =
    config.sky.properties.mutationSpeed.toString();
}

function fillStarsDefault() {
  (<HTMLInputElement>document.getElementById("starsInclude")).checked =
    config.stars.include;
  (<HTMLInputElement>document.getElementById("starsOpacity")).value =
    config.stars.properties.opacity.toString();
  (<HTMLInputElement>document.getElementById("starsDensity")).value =
    config.stars.properties.density.toString();
}

function toggleProperties(checkboxId: string, propertiesId: string) {
  if ((<HTMLInputElement>document.getElementById(checkboxId)).checked) {
    document.getElementById(propertiesId).style.display = "grid";
  } else {
    document.getElementById(propertiesId).style.display = "none";
  }
}

function fillMoonDefault() {
  (<HTMLInputElement>document.getElementById("moonInclude")).checked =
    config.moon.include;
  (<HTMLInputElement>document.getElementById("moonColour")).value = rgbToHex(
    config.moon.properties.colour[0],
    config.moon.properties.colour[1],
    config.moon.properties.colour[2]
  );
  (<HTMLInputElement>document.getElementById("moonRadius")).value =
    config.moon.properties.radius.toString();
  (<HTMLInputElement>document.getElementById("moonHalfMoon")).checked =
    config.moon.properties.halfMoon;
  (<HTMLInputElement>document.getElementById("moonNoise")).value =
    config.moon.properties.noise.toString();
}

function renameLayers(layersID: string) {
  let layers = document.getElementById(layersID);
  for (let i = 0; i < layers.children.length; i++) {
    layers.children[i].children[0].textContent = "Layer " + (i + 1);
  }
}

function createSunsetLayers() {
  let layers = document.getElementById("sunsetLayers")
  layers.removeChild(originalSunsetLayer);
  for (let i = 0; i < config.sunset.properties.layers.length; i++) {
    let layer: any = originalSunsetLayer.cloneNode(true);
    layer.removeAttribute("id");

    layer.children[0].textContent = "Layer " + (i + 1);
    layer.children[1].onclick = function () {
      layers.removeChild(layer);
      sunsetLayerCount -= 1;
      renameLayers("sunsetLayers");
    };
    layer.children[2].children[1].value = rgbToHex(
      config.sunset.properties.layers[i].colour[0],
      config.sunset.properties.layers[i].colour[1],
      config.sunset.properties.layers[i].colour[2]
    );
    layer.children[3].children[0].value =
      config.sunset.properties.layers[i].maxOpacity;
    layer.children[4].children[0].value =
      config.sunset.properties.layers[i].proportion;
    layer.children[5].children[0].value =
      config.sunset.properties.layers[i].mutationSpeed;
    layer.children[6].children[0].value =
      config.sunset.properties.layers[i].xStretch;
    layer.children[7].children[0].value =
      config.sunset.properties.layers[i].yStretch;
    layers.appendChild(layer);
    sunsetLayerCount += 1;
  }
}

function addSunsetLayer() {
  let layers = document.getElementById("sunsetLayers");
  let layer: any;
  if (layers.children.length > 0) {
    // Take previous sunset layer as template
    layer = layers.children[layers.children.length-1].cloneNode(true);
  } else {
    // Revert to default template
    layer = originalSunsetLayer.cloneNode(true);
    layer.removeAttribute("id");
  }
  
  sunsetLayerCount += 1;
  layer.children[0].textContent = "Layer " + sunsetLayerCount;
  layer.children[1].onclick = function () {
    layers.removeChild(layer);
    sunsetLayerCount -= 1;
    renameLayers("sunsetLayers");
  };
  layers.appendChild(layer);
}

function fillSunsetDefault() {
  (<HTMLInputElement>document.getElementById("sunsetInclude")).checked =
    config.sunset.include;
  createSunsetLayers();
}

function createCloudsLayers() {
  document.getElementById("cloudsLayers").removeChild(originalCloudLayer);
  for (let i = 0; i < config.clouds.properties.layers.length; i++) {
    let layer: any = originalCloudLayer.cloneNode(true);
    layer.removeAttribute("id");
    layer.children[0].textContent = "Layer " + (i + 1);
    layer.children[1].onclick = function () {
      document.getElementById("cloudsLayers").removeChild(layer);
      cloudLayerCount -= 1;
      renameLayers("cloudsLayers");
    };
    layer.children[2].children[1].value = rgbToHex(
      config.clouds.properties.layers[i].colour[0],
      config.clouds.properties.layers[i].colour[1],
      config.clouds.properties.layers[i].colour[2]
    );
    layer.children[3].children[0].value =
      config.clouds.properties.layers[i].opacity;
    layer.children[4].children[0].value =
      config.clouds.properties.layers[i].minSize;
    layer.children[5].children[0].value =
      config.clouds.properties.layers[i].maxSize;
    layer.children[6].children[0].value = config.clouds.properties.layers[i].pH;
    layer.children[7].children[0].value = config.clouds.properties.layers[i].pV;
    document.getElementById("cloudsLayers").appendChild(layer);
    cloudLayerCount += 1;
  }
}

function addCloudsLayer() {
  let layers = document.getElementById("cloudsLayers");
  let layer: any;
  if (layers.children.length > 0) {
    // Take previous cloud layer as template
    layer = layers.children[layers.children.length-1].cloneNode(true);
  } else {
    // Revert to default template
    layer = originalCloudLayer.cloneNode(true);
    layer.removeAttribute("id");
  }

  cloudLayerCount += 1;
  layer.children[0].textContent = "Layer " + cloudLayerCount;
  layer.children[1].onclick = function () {
    document.getElementById("cloudsLayers").removeChild(layer);
    cloudLayerCount -= 1;
    renameLayers("cloudsLayers");
  };
  layers.appendChild(layer);
}

function fillCloudsDefault() {
  (<HTMLInputElement>document.getElementById("cloudsInclude")).checked =
    config.clouds.include;
  (<HTMLInputElement>document.getElementById("cloudsQuantity")).value =
    config.clouds.properties.quantity.toString();
  createCloudsLayers();
}

function fadeExcluded() {
  if (!config.stars.include) {
    document.getElementById("starsProperties").style.display = "none";
  }
  if (!config.moon.include) {
    document.getElementById("moonProperties").style.display = "none";
  }
  if (!config.sunset.include) {
    document.getElementById("sunsetProperties").style.display = "nonw";
  }
  if (!config.clouds.include) {
    document.getElementById("cloudsProperties").style.display = "none";
  }
}

function initDefaults() {
  fillSkyDefaults();
  fillStarsDefault();
  fillMoonDefault();
  fillSunsetDefault();
  fillCloudsDefault();
  fadeExcluded();
}

function collectSky() {
  config.sky.properties.width = parseInt(
    (<HTMLInputElement>document.getElementById("skyWidth")).value
  );
  config.sky.properties.height = parseInt(
    (<HTMLInputElement>document.getElementById("skyHeight")).value
  );
  config.sky.properties.pixelSize = parseInt(
    (<HTMLInputElement>document.getElementById("skyPixelSize")).value
  );
  config.sky.properties.colour = hexToRGB(
    (<HTMLInputElement>document.getElementById("skyColour")).value
  );
  config.sky.properties.opacity = parseFloat(
    (<HTMLInputElement>document.getElementById("skyOpacity")).value
  );
  config.sky.properties.mutationSpeed = parseFloat(
    (<HTMLInputElement>document.getElementById("skyMutationSpeed")).value
  );
  config.sky.properties.mutationStyle = 
    (<HTMLInputElement>document.getElementById("skyMutationStyle")).value
}

function collectStars() {
  config.stars.include = (<HTMLInputElement>(
    document.getElementById("starsInclude")
  )).checked;
  config.stars.properties.opacity = parseFloat(
    (<HTMLInputElement>document.getElementById("starsOpacity")).value
  );
  config.stars.properties.density = parseFloat(
    (<HTMLInputElement>document.getElementById("starsDensity")).value
  );
}

function collectMoon() {
  config.moon.include = (<HTMLInputElement>(
    document.getElementById("moonInclude")
  )).checked;
  config.moon.properties.colour = hexToRGB(
    (<HTMLInputElement>document.getElementById("moonColour")).value
  );
  config.moon.properties.radius = parseInt(
    (<HTMLInputElement>document.getElementById("moonRadius")).value
  );
  config.moon.properties.halfMoon = (<HTMLInputElement>(
    document.getElementById("moonHalfMoon")
  )).checked;
  config.moon.properties.noise = parseFloat(
    (<HTMLInputElement>document.getElementById("moonNoise")).value
  );
}

function collectSunsetLayers() {
  let layers = document.getElementById("sunsetLayers");
  let configLayers: SunsetLayer[] = [];
  for (let i = 0; i < layers.children.length; i++) {
    let layer = layers.children[i];
    let configLayer: SunsetLayer = {
      colour: hexToRGB((<HTMLInputElement>layer.children[2].children[1]).value),
      maxOpacity: parseFloat(
        (<HTMLInputElement>layer.children[3].children[0]).value
      ),
      proportion: parseFloat(
        (<HTMLInputElement>layer.children[4].children[0]).value
      ),
      mutationSpeed: parseFloat(
        (<HTMLInputElement>layer.children[5].children[0]).value
      ),
      xStretch: parseFloat(
        (<HTMLInputElement>layer.children[6].children[0]).value
      ),
      yStretch: parseFloat(
        (<HTMLInputElement>layer.children[7].children[0]).value
      ),
    };
    configLayers.push(configLayer);
  }
  config.sunset.properties.layers = configLayers;
}

function collectSunset() {
  config.sunset.include = (<HTMLInputElement>(
    document.getElementById("sunsetInclude")
  )).checked;
  collectSunsetLayers();
}

function collectCloudsLayers() {
  let layers = document.getElementById("cloudsLayers");
  let configLayers: CloudLayer[] = [];
  for (let i = 0; i < layers.children.length; i++) {
    let layer = layers.children[i];
    let configLayer: CloudLayer = {
      colour: hexToRGB((<HTMLInputElement>layer.children[2].children[1]).value),
      opacity: parseFloat(
        (<HTMLInputElement>layer.children[3].children[0]).value
      ),
      maxSize: parseInt(
        (<HTMLInputElement>layer.children[4].children[0]).value
      ),
      minSize: parseInt(
        (<HTMLInputElement>layer.children[5].children[0]).value
      ),
      pH: parseFloat((<HTMLInputElement>layer.children[6].children[0]).value),
      pV: parseFloat((<HTMLInputElement>layer.children[7].children[0]).value),
    };
    configLayers.push(configLayer);
  }
  config.clouds.properties.layers = configLayers;
}

function collectClouds() {
  config.clouds.include = (<HTMLInputElement>(
    document.getElementById("cloudsInclude")
  )).checked;
  config.clouds.properties.quantity = parseInt(
    (<HTMLInputElement>document.getElementById("cloudsQuantity")).value
  );
  collectCloudsLayers();
}

function collectInputs() {
  collectSky();
  collectStars();
  collectMoon();
  collectSunset();
  collectClouds();
}

function lowerRandomMutationSpeed() {
  // "Random" mutation style is much more sensitive to mutation speed
  // -> works best with a much lower mutation speed
  if (config.sky.properties.mutationStyle == "Random") {
    console.log(config.sky.properties.mutationSpeed);
    config.sky.properties.mutationSpeed /= 60;
    console.log(config.sky.properties.mutationSpeed);
  }
}

function run() {
  document.getElementById("generate-btn").style.display = "none";
  document.getElementById("loading-spinner").style.display = "grid";
  setTimeout(function () {
    collectInputs();
    lowerRandomMutationSpeed();
    runSkyGeneration();
    document.getElementById("config").style.display = "none";
  }, 500);
}

let originalSunsetLayer = document.getElementById("sunsetLayer");
let sunsetLayerCount = 0;
let originalCloudLayer = document.getElementById("cloudsLayer");
let cloudLayerCount = 0;

initDefaults();
