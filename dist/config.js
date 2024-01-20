"use strict";
function defaultConfig() {
    const config = {
        sky: {
            properties: {
                height: 720,
                width: 1280,
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
                        pH: 0.72,
                        pV: 0.3, // Probability of vertical expansion
                    },
                    {
                        colour: [245, 245, 245],
                        opacity: 0.6,
                        minSize: 1000,
                        maxSize: 65000,
                        pH: 0.72,
                        pV: 0.3, // Probability of vertical expansion
                    },
                    {
                        colour: [255, 255, 255],
                        opacity: 0.6,
                        minSize: 1000,
                        maxSize: 65000,
                        pH: 0.72,
                        pV: 0.3, // Probability of vertical expansion
                    },
                    {
                        colour: [245, 245, 245],
                        opacity: 0.6,
                        minSize: 1000,
                        maxSize: 65000,
                        pH: 0.72,
                        pV: 0.3, // Probability of vertical expansion
                    },
                    {
                        colour: [225, 225, 225],
                        opacity: 0.5,
                        minSize: 1000,
                        maxSize: 65000,
                        pH: 0.72,
                        pV: 0.3, // Probability of vertical expansion
                    },
                    {
                        colour: [200, 200, 200],
                        opacity: 0.4,
                        minSize: 1000,
                        maxSize: 65000,
                        pH: 0.72,
                        pV: 0.3, // Probability of vertical expansion
                    },
                ],
            },
        },
    };
    return config;
}
function componentToHex(c) {
    const hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function hexToRGB(hex) {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16);
    return [r, g, b];
}
function initSkyDefaults(config) {
    document.getElementById("skyWidth").value =
        config.sky.properties.width.toString();
    document.getElementById("skyHeight").value =
        config.sky.properties.height.toString();
    document.getElementById("skyPixelSize").value =
        config.sky.properties.pixelSize.toString();
    document.getElementById("skyColour").value = rgbToHex(config.sky.properties.colour[0], config.sky.properties.colour[1], config.sky.properties.colour[2]);
    document.getElementById("skyOpacity").value =
        config.sky.properties.opacity.toString();
    document.getElementById("skyMutationSpeed").value =
        config.sky.properties.mutationSpeed.toString();
}
function initStarsDefaults(config) {
    document.getElementById("starsInclude").checked =
        config.stars.include;
    document.getElementById("starsOpacity").value =
        config.stars.properties.opacity.toString();
    document.getElementById("starsDensity").value =
        config.stars.properties.density.toString();
}
function toggleProperties(checkboxId, propertiesId) {
    if (document.getElementById(checkboxId).checked) {
        document.getElementById(propertiesId).style.display = "grid";
    }
    else {
        document.getElementById(propertiesId).style.display = "none";
    }
}
function initMoonDefaults(config) {
    document.getElementById("moonInclude").checked =
        config.moon.include;
    document.getElementById("moonColour").value = rgbToHex(config.moon.properties.colour[0], config.moon.properties.colour[1], config.moon.properties.colour[2]);
    document.getElementById("moonRadius").value =
        config.moon.properties.radius.toString();
    document.getElementById("moonHalfMoon").checked =
        config.moon.properties.halfMoon;
    document.getElementById("moonNoise").value =
        config.moon.properties.noise.toString();
}
function renameLayers(layersID) {
    const layers = document.getElementById(layersID);
    for (let i = 0; i < layers.children.length; i++) {
        layers.children[i].children[0].textContent = "Layer " + (i + 1);
    }
}
function createSunsetLayers(config) {
    const layers = document.getElementById("sunsetLayers");
    layers.removeChild(originalSunsetLayer);
    for (let i = 0; i < config.sunset.properties.layers.length; i++) {
        const layer = originalSunsetLayer.cloneNode(true);
        layer.removeAttribute("id");
        layer.children[0].textContent = "Layer " + (i + 1);
        layer.children[1].onclick = function () {
            layers.removeChild(layer);
            sunsetLayerCount -= 1;
            renameLayers("sunsetLayers");
        };
        layer.children[2].children[1].value = rgbToHex(config.sunset.properties.layers[i].colour[0], config.sunset.properties.layers[i].colour[1], config.sunset.properties.layers[i].colour[2]);
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
    const layers = document.getElementById("sunsetLayers");
    let layer;
    if (layers.children.length > 0) {
        // Take previous sunset layer as template
        layer = layers.children[layers.children.length - 1].cloneNode(true);
    }
    else {
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
function initSunsetDefaults(config) {
    document.getElementById("sunsetInclude").checked =
        config.sunset.include;
    createSunsetLayers(config);
}
function createCloudsLayers(config) {
    document.getElementById("cloudsLayers").removeChild(originalCloudLayer);
    for (let i = 0; i < config.clouds.properties.layers.length; i++) {
        const layer = originalCloudLayer.cloneNode(true);
        layer.removeAttribute("id");
        layer.children[0].textContent = "Layer " + (i + 1);
        layer.children[1].onclick = function () {
            document.getElementById("cloudsLayers").removeChild(layer);
            cloudLayerCount -= 1;
            renameLayers("cloudsLayers");
        };
        layer.children[2].children[1].value = rgbToHex(config.clouds.properties.layers[i].colour[0], config.clouds.properties.layers[i].colour[1], config.clouds.properties.layers[i].colour[2]);
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
    const layers = document.getElementById("cloudsLayers");
    let layer;
    if (layers.children.length > 0) {
        // Take previous cloud layer as template
        layer = layers.children[layers.children.length - 1].cloneNode(true);
    }
    else {
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
function initCloudsDefaults(config) {
    document.getElementById("cloudsInclude").checked =
        config.clouds.include;
    document.getElementById("cloudsQuantity").value =
        config.clouds.properties.quantity.toString();
    createCloudsLayers(config);
}
function hideExcluded(config) {
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
function initDefaults() {
    const config = defaultConfig();
    initSkyDefaults(config);
    initStarsDefaults(config);
    initMoonDefaults(config);
    initSunsetDefaults(config);
    initCloudsDefaults(config);
    hideExcluded(config);
}
function userSky() {
    const sky = {
        properties: {
            height: parseInt(document.getElementById("skyHeight").value),
            width: parseInt(document.getElementById("skyWidth").value),
            pixelSize: parseInt(document.getElementById("skyPixelSize").value),
            colour: hexToRGB(document.getElementById("skyColour").value),
            opacity: parseFloat(document.getElementById("skyOpacity").value),
            mutationSpeed: parseFloat(document.getElementById("skyMutationSpeed").value),
            mutationStyle: (document.getElementById("skyMutationStyle")).value
        },
    };
    return sky;
}
function userStars() {
    const stars = {
        include: (document.getElementById("starsInclude")).checked,
        properties: {
            opacity: parseFloat(document.getElementById("starsOpacity").value),
            density: parseFloat(document.getElementById("starsDensity").value)
        }
    };
    return stars;
}
function userMoon() {
    const moon = {
        include: (document.getElementById("moonInclude")).checked,
        properties: {
            colour: hexToRGB(document.getElementById("moonColour").value),
            radius: parseInt(document.getElementById("moonRadius").value),
            halfMoon: (document.getElementById("moonHalfMoon")).checked,
            noise: parseFloat(document.getElementById("moonNoise").value),
        }
    };
    return moon;
}
function userSunset() {
    const sunsetLayers = userSunsetLayers();
    const config = {
        include: (document.getElementById("sunsetInclude")).checked,
        properties: {
            layers: sunsetLayers,
        },
    };
    return config;
}
function userSunsetLayers() {
    const layers = document.getElementById("sunsetLayers");
    const configLayers = [];
    for (let i = 0; i < layers.children.length; i++) {
        const layer = layers.children[i];
        const configLayer = {
            colour: hexToRGB(layer.children[2].children[1].value),
            maxOpacity: parseFloat(layer.children[3].children[0].value),
            proportion: parseFloat(layer.children[4].children[0].value),
            mutationSpeed: parseFloat(layer.children[5].children[0].value),
            xStretch: parseFloat(layer.children[6].children[0].value),
            yStretch: parseFloat(layer.children[7].children[0].value),
        };
        configLayers.push(configLayer);
    }
    return configLayers;
}
function userCloudLayers() {
    const layers = document.getElementById("cloudsLayers");
    const cloudLayers = [];
    for (let i = 0; i < layers.children.length; i++) {
        const layer = layers.children[i];
        const configLayer = {
            colour: hexToRGB(layer.children[2].children[1].value),
            opacity: parseFloat(layer.children[3].children[0].value),
            minSize: parseInt(layer.children[4].children[0].value),
            maxSize: parseInt(layer.children[5].children[0].value),
            pH: parseFloat(layer.children[6].children[0].value),
            pV: parseFloat(layer.children[7].children[0].value),
        };
        cloudLayers.push(configLayer);
    }
    return cloudLayers;
}
function userClouds() {
    const clouds = {
        include: (document.getElementById("cloudsInclude")).checked,
        properties: {
            quantity: parseInt(document.getElementById("cloudsQuantity").value),
            layers: userCloudLayers(),
        },
    };
    return clouds;
}
function userConfig() {
    const config = {
        sky: userSky(),
        stars: userStars(),
        moon: userMoon(),
        sunset: userSunset(),
        clouds: userClouds(),
    };
    return config;
}
function lowerRandomMutationSpeed(config) {
    // "Random" mutation style is much more sensitive to mutation speed
    // -> works best with a much lower mutation speed
    if (config.sky.properties.mutationStyle == "Random") {
        config.sky.properties.mutationSpeed /= 60;
    }
}
function run(random) {
    document.getElementById("generate-btn").style.display = "none";
    document.getElementById("loading-spinner").style.display = "grid";
    setTimeout(function () {
        const config = random ? randConfig() : userConfig();
        lowerRandomMutationSpeed(config);
        generateSky(config).then(() => {
            document.getElementById("config").style.display = "none";
        });
    }, 10);
}
const originalSunsetLayer = document.getElementById("sunsetLayer");
let sunsetLayerCount = 0;
const originalCloudLayer = document.getElementById("cloudsLayer");
let cloudLayerCount = 0;
initDefaults();
