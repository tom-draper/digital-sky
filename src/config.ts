import {
  randBool,
  randCloudLayers,
  randFloat,
  randInt,
  randMutationStyle,
  randSunsetLayers,
} from "./generate";

const originalSunsetLayer = document.getElementById("sunsetLayer");
let sunsetLayerCount = 0;
const originalCloudLayer = document.getElementById("cloudsLayer");
let cloudLayerCount = 0;

export type StarsConfig = {
  include: boolean;
  properties: {
    opacity: number;
    density: number;
  };
};

export type MoonConfig = {
  include: boolean;
  properties: {
    colour: [number, number, number];
    radius: number;
    halfMoon: boolean;
    noise: number;
  };
};
export type SunsetLayer = {
  colour: [number, number, number];
  maxOpacity: number;
  proportion: number;
  mutationSpeed: number;
  xStretch: number;
  yStretch: number;
};

export type SunsetConfig = {
  include: boolean;
  properties: {
    layers: SunsetLayer[];
  };
};

export type CloudLayer = {
  colour: [number, number, number];
  opacity: number;
  minSize: number;
  maxSize: number;
  pH: number;
  pV: number;
};

export type CloudsConfig = {
  include: boolean;
  properties: {
    quantity: number;
    layers: CloudLayer[];
  };
};

export type None = {
  include: boolean;
  properties: null;
};

export type SkyConfig = {
  properties: {
    dimensions: CanvasDimensions;
    pixelSize: number;
    colour: [number, number, number];
    mutationSpeed: number;
    mutationStyle: string;
    opacity: number;
  };
};

export type CanvasDimensions = {
  width: number;
  height: number;
};

export type Config = {
  sky: SkyConfig;
  stars: StarsConfig | None;
  moon: MoonConfig | None;
  sunset: SunsetConfig | None;
  clouds: CloudsConfig | None;
};

function defaultConfig() {
  const config: Config = {
    sky: {
      properties: {
        dimensions: {
          width: 1280,
          height: 720,
        },
        pixelSize: 1,
        colour: [94, 122, 187],
        opacity: 1,
        mutationSpeed: 0.3,
        mutationStyle: "Colour spread",
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
        quantity: 6,
        layers: [
          {
            colour: [255, 255, 255],
            opacity: 0.6,
            minSize: 1000,
            maxSize: 65000,
            pH: 0.72, // Probability of horizontal expansion
            pV: 0.3, // Probability of vertical expansion
          },
          {
            colour: [245, 245, 245],
            opacity: 0.6,
            minSize: 1000,
            maxSize: 65000,
            pH: 0.72, // Probability of horizontal expansion
            pV: 0.3, // Probability of vertical expansion
          },
          {
            colour: [255, 255, 255],
            opacity: 0.6,
            minSize: 1000,
            maxSize: 65000,
            pH: 0.72, // Probability of horizontal expansion
            pV: 0.3, // Probability of vertical expansion
          },
          {
            colour: [245, 245, 245],
            opacity: 0.6,
            minSize: 1000,
            maxSize: 65000,
            pH: 0.72, // Probability of horizontal expansion
            pV: 0.3, // Probability of vertical expansion
          },
          {
            colour: [225, 225, 225],
            opacity: 0.5,
            minSize: 1000,
            maxSize: 65000,
            pH: 0.72, // Probability of horizontal expansion
            pV: 0.3, // Probability of vertical expansion
          },
          {
            colour: [200, 200, 200],
            opacity: 0.4,
            minSize: 1000,
            maxSize: 65000,
            pH: 0.72, // Probability of horizontal expansion
            pV: 0.3, // Probability of vertical expansion
          },
        ],
      },
    },
  };
  return config;
}

function componentToHex(c: number) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r: number, g: number, b: number) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function hexToRGB(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function initSkyDefaults(config: Config) {
  (<HTMLInputElement>document.getElementById("skyWidth")).value =
    config.sky.properties.dimensions.width.toString();
  (<HTMLInputElement>document.getElementById("skyHeight")).value =
    config.sky.properties.dimensions.height.toString();
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

function initStarsDefaults(config: Config) {
  (<HTMLInputElement>document.getElementById("starsInclude")).checked =
    config.stars.include;
  (<HTMLInputElement>document.getElementById("starsOpacity")).value =
    config.stars.properties.opacity.toString();
  (<HTMLInputElement>document.getElementById("starsDensity")).value =
    config.stars.properties.density.toString();
}

export function toggleProperties(checkboxId: string, propertiesId: string) {
  if ((<HTMLInputElement>document.getElementById(checkboxId)).checked) {
    document.getElementById(propertiesId).style.display = "grid";
  } else {
    document.getElementById(propertiesId).style.display = "none";
  }
}

function initMoonDefaults(config: Config) {
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
  const layers = document.getElementById(layersID);
  for (let i = 0; i < layers.children.length; i++) {
    layers.children[i].children[0].textContent = "Layer " + (i + 1);
  }
}

function createSunsetLayers(config: Config) {
  const layers = document.getElementById("sunsetLayers");
  layers.removeChild(originalSunsetLayer);
  for (let i = 0; i < config.sunset.properties.layers.length; i++) {
    const layer: any = originalSunsetLayer.cloneNode(true);
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

export function addSunsetLayer() {
  const layers = document.getElementById("sunsetLayers");
  let layer: any;
  if (layers.children.length > 0) {
    // Take previous sunset layer as template
    layer = layers.children[layers.children.length - 1].cloneNode(true);
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

function initSunsetDefaults(config: Config) {
  (<HTMLInputElement>document.getElementById("sunsetInclude")).checked =
    config.sunset.include;
  createSunsetLayers(config);
}

function createCloudsLayers(config: Config) {
  document.getElementById("cloudsLayers").removeChild(originalCloudLayer);
  for (let i = 0; i < config.clouds.properties.layers.length; i++) {
    const layer: any = originalCloudLayer.cloneNode(true);
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

export function addCloudsLayer() {
  const layers = document.getElementById("cloudsLayers");
  let layer: any;
  if (layers.children.length > 0) {
    // Take previous cloud layer as template
    layer = layers.children[layers.children.length - 1].cloneNode(true);
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

function initCloudsDefaults(config: Config) {
  (<HTMLInputElement>document.getElementById("cloudsInclude")).checked =
    config.clouds.include;
  (<HTMLInputElement>document.getElementById("cloudsQuantity")).value =
    config.clouds.properties.quantity.toString();
  createCloudsLayers(config);
}

function hideExcluded(config: Config) {
  if (!config.stars.include) {
    document.getElementById("starsProperties").style.display = "none";
  }
  if (!config.moon.include) {
    document.getElementById("moonProperties").style.display = "none";
  }
  if (!config.sunset.include) {
    document.getElementById("sunsetProperties").style.display = "none";
  }
  if (!config.clouds.include) {
    document.getElementById("cloudsProperties").style.display = "none";
  }
}

export function initDefaults() {
  const config = defaultConfig();
  initSkyDefaults(config);
  initStarsDefaults(config);
  initMoonDefaults(config);
  initSunsetDefaults(config);
  initCloudsDefaults(config);
  hideExcluded(config);
}

function userSky() {
  const sky: SkyConfig = {
    properties: {
      dimensions: {
        height: parseInt(
          (<HTMLInputElement>document.getElementById("skyHeight")).value
        ),
        width: parseInt(
          (<HTMLInputElement>document.getElementById("skyWidth")).value
        ),
      },
      pixelSize: parseInt(
        (<HTMLInputElement>document.getElementById("skyPixelSize")).value
      ),
      colour: hexToRGB(
        (<HTMLInputElement>document.getElementById("skyColour")).value
      ),
      opacity: parseFloat(
        (<HTMLInputElement>document.getElementById("skyOpacity")).value
      ),
      mutationSpeed: parseFloat(
        (<HTMLInputElement>document.getElementById("skyMutationSpeed")).value
      ),
      mutationStyle: (<HTMLInputElement>(
        document.getElementById("skyMutationStyle")
      )).value,
    },
  };
  return sky;
}

function userStars() {
  const stars: StarsConfig = {
    include: (<HTMLInputElement>document.getElementById("starsInclude"))
      .checked,
    properties: {
      opacity: parseFloat(
        (<HTMLInputElement>document.getElementById("starsOpacity")).value
      ),
      density: parseFloat(
        (<HTMLInputElement>document.getElementById("starsDensity")).value
      ),
    },
  };
  return stars;
}

function userMoon() {
  const moon: MoonConfig = {
    include: (<HTMLInputElement>document.getElementById("moonInclude")).checked,
    properties: {
      colour: hexToRGB(
        (<HTMLInputElement>document.getElementById("moonColour")).value
      ),
      radius: parseInt(
        (<HTMLInputElement>document.getElementById("moonRadius")).value
      ),
      halfMoon: (<HTMLInputElement>document.getElementById("moonHalfMoon"))
        .checked,
      noise: parseFloat(
        (<HTMLInputElement>document.getElementById("moonNoise")).value
      ),
    },
  };
  return moon;
}

function userSunset() {
  const sunsetLayers = userSunsetLayers();
  const config = {
    include: (<HTMLInputElement>document.getElementById("sunsetInclude"))
      .checked,
    properties: {
      layers: sunsetLayers,
    },
  };
  return config;
}

function userSunsetLayers() {
  const layers = document.getElementById("sunsetLayers");
  const configLayers: SunsetLayer[] = [];
  for (let i = 0; i < layers.children.length; i++) {
    const layer = layers.children[i];
    const configLayer: SunsetLayer = {
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
  return configLayers;
}

function userCloudLayers() {
  const layers = document.getElementById("cloudsLayers");
  const cloudLayers: CloudLayer[] = [];
  for (let i = 0; i < layers.children.length; i++) {
    const layer = layers.children[i];
    const configLayer: CloudLayer = {
      colour: hexToRGB((<HTMLInputElement>layer.children[2].children[1]).value),
      opacity: parseFloat(
        (<HTMLInputElement>layer.children[3].children[0]).value
      ),
      minSize: parseInt(
        (<HTMLInputElement>layer.children[4].children[0]).value
      ),
      maxSize: parseInt(
        (<HTMLInputElement>layer.children[5].children[0]).value
      ),
      pH: parseFloat((<HTMLInputElement>layer.children[6].children[0]).value),
      pV: parseFloat((<HTMLInputElement>layer.children[7].children[0]).value),
    };
    cloudLayers.push(configLayer);
  }
  return cloudLayers;
}

function userClouds() {
  const clouds: CloudsConfig = {
    include: (<HTMLInputElement>document.getElementById("cloudsInclude"))
      .checked,
    properties: {
      quantity: parseInt(
        (<HTMLInputElement>document.getElementById("cloudsQuantity")).value
      ),
      layers: userCloudLayers(),
    },
  };
  return clouds;
}

export function userConfig() {
  const config = {
    sky: userSky(),
    stars: userStars(),
    moon: userMoon(),
    sunset: userSunset(),
    clouds: userClouds(),
  };
  lowerRandomMutationSpeed(config);
  return config;
}

export function randConfig() {
  const config: Config = {
    sky: {
      properties: {
        dimensions: {
          height: 720,
          width: 1280,
        },
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
  lowerRandomMutationSpeed(config);
  return config;
}

function lowerRandomMutationSpeed(config: Config) {
  // "Random" mutation style is much more sensitive to mutation speed
  // -> works best with a much lower mutation speed
  if (config.sky.properties.mutationStyle == "Random") {
    config.sky.properties.mutationSpeed /= 60;
  }
}
