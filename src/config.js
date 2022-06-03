var config = {
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
            density: 0.005
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
                    yStretch: 1
                },
                {
                    colour: [255, 200, 200],
                    maxOpacity: 0.7,
                    proportion: 0.7,
                    mutationSpeed: 2,
                    xStretch: 1,
                    yStretch: 1
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
                    pH: 0.8,
                    pV: 0.3
                },
                {
                    colour: [200, 200, 200],
                    opacity: 0.2,
                    minSize: 1000,
                    maxSize: 10000,
                    pH: 0.8,
                    pV: 0.3
                },
                {
                    colour: [200, 200, 200],
                    opacity: 0.2,
                    minSize: 1000,
                    maxSize: 10000,
                    pH: 0.8,
                    pV: 0.3
                },
                {
                    colour: [200, 200, 200],
                    opacity: 0.2,
                    minSize: 1000,
                    maxSize: 10000,
                    pH: 0.8,
                    pV: 0.3
                },
                {
                    colour: [200, 200, 200],
                    opacity: 0.2,
                    minSize: 1000,
                    maxSize: 10000,
                    pH: 0.8,
                    pV: 0.3
                },
            ]
        }
    }
};
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
    var original = document.getElementById("sunsetLayer");
    document.getElementById('sunsetLayers').removeChild(original);
    for (var i = 0; i < config.sunset.properties.layers.length; i++) {
        var layer = original.cloneNode(true);
        layer.removeAttribute("id");
        layer.children[0].textContent = 'Layer ' + (i + 1);
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
    createSunsetLayers();
}
function createCloudsLayers() {
    var original = document.getElementById("cloudsLayer");
    document.getElementById('cloudsLayers').removeChild(original);
    for (var i = 0; i < config.clouds.properties.layers.length; i++) {
        var layer = original.cloneNode(true);
        layer.removeAttribute("id");
        layer.children[0].textContent = 'Layer ' + (i + 1);
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
    createCloudsLayers();
}
function init() {
    fillSkyDefaults();
    fillStarsDefault();
    fillMoonDefault();
    fillSunsetDefault();
    fillCloudsDefault();
}
function collectSky() {
    config.sky.properties.width = document.getElementById('skyWidth').value;
    config.sky.properties.height = document.getElementById('skyHeight').value;
    config.sky.properties.pixelSize = document.getElementById('skyPixelSize').value;
    config.sky.properties.colour[0] = document.getElementById('skyRed').value;
    config.sky.properties.colour[1] = document.getElementById('skyGreen').value;
    config.sky.properties.colour[2] = document.getElementById('skyBlue').value;
    config.sky.properties.opacity = document.getElementById('skyOpacity').value;
    config.sky.properties.mutationSpeed = document.getElementById('skyMutationSpeed').value;
}
function collectStars() {
    config.stars.include = document.getElementById('starsInclude').value;
    config.stars.properties.opacity = document.getElementById('starsOpacity').value;
    config.stars.properties.density = document.getElementById('starsDensity').value;
}
function collectMoon() {
    config.moon.include = document.getElementById('moonInclude').value;
    config.moon.properties.colour[0] = document.getElementById('moonRed').value;
    config.moon.properties.colour[1] = document.getElementById('moonGreen').value;
    config.moon.properties.colour[2] = document.getElementById('moonBlue').value;
    config.moon.properties.radius = document.getElementById('moonRadius').value;
    config.moon.properties.halfMoon = document.getElementById('moonHalfMoon').value;
    config.moon.properties.noise = document.getElementById('moonNoise').value;
}
function collectSunsetLayers() {
    var layers = document.getElementById('sunsetLayers');
    var configLayers = [];
    for (var i = 0; i < layers.children.length; i++) {
        var layer = layers.children[i];
        var configLayer = {
            colour: [layer.children[2].children[0].value, layer.children[2].children[1].value, layer.children[2].children[2].value],
            maxOpacity: layer.children[3].children[0].value,
            proportion: layer.children[4].children[0].value,
            mutationSpeed: layer.children[5].children[0].value,
            xStretch: layer.children[6].children[0].value,
            yStretch: layer.children[7].children[0].value
        };
        configLayers.push(configLayer);
    }
    config.sunset.properties.layers = configLayers;
}
function collectSunset() {
    config.sunset.include = document.getElementById('sunsetInclude').value;
    collectSunsetLayers();
}
function collectCloudsLayers() {
    var layers = document.getElementById('cloudsLayers');
    var configLayers = [];
    for (var i = 0; i < layers.children.length; i++) {
        var layer = layers.children[i];
        var configLayer = {
            colour: [layer.children[2].children[0].value, layer.children[2].children[1].value, layer.children[2].children[2].value],
            opacity: layer.children[3].children[0].value,
            maxSize: layer.children[4].children[0].value,
            minSize: layer.children[5].children[0].value,
            pH: layer.children[6].children[0].value,
            pV: layer.children[7].children[0].value
        };
        configLayers.push(configLayer);
    }
    config.clouds.properties.layers = configLayers;
}
function collectClouds() {
    config.clouds.include = document.getElementById('cloudsInclude').value;
    config.clouds.properties.quantity = document.getElementById('cloudsQuantity').value;
    collectCloudsLayers();
}
function collectInputs() {
    collectSky();
    collectStars();
    collectMoon();
    collectSunset();
    collectClouds();
}
function run() {
    collectInputs();
    runSkyGeneration();
    document.getElementById('config').style.display = 'none';
}
init();
