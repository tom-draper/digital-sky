// let defaultHeight = 1080;
// let defaultWidth = 1920;
var defaultHeight = 720;
var defaultWidth = 1280;
function defaultSky(colour) {
    return {
        properties: {
            height: defaultHeight,
            width: defaultWidth,
            pixelSize: 1,
            colour: colour,
            mutationSpeed: 1,
            opacity: 1
        }
    };
}
var none = {
    include: false,
    properties: null
};
var stars1 = {
    include: true,
    properties: {
        opacity: 1,
        density: 0.005
    }
};
var starsDense = {
    include: true,
    properties: {
        opacity: 1,
        density: 0.01
    }
};
var starsFaint = {
    include: true,
    properties: {
        opacity: 0.5,
        density: 0.002
    }
};
var moon1 = {
    include: true,
    properties: {
        colour: [248, 250, 244],
        radius: 40,
        halfMoon: true,
        noise: 2
    }
};
var sunset1 = {
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
                xStretch: 0.5,
                yStretch: 0
            },
            {
                colour: [255, 201, 34],
                maxOpacity: 0.4,
                proportion: 0.7,
                mutationSpeed: 1,
                xStretch: 0.7,
                yStretch: 0
            },
        ]
    }
};
var sunset2 = {
    include: true,
    properties: {
        layers: [
            {
                colour: [99, 197, 218],
                maxOpacity: 0.25,
                proportion: 0.6,
                mutationSpeed: 1,
                xStretch: 0.7,
                yStretch: 0.5
            },
            {
                colour: [33, 89, 136],
                maxOpacity: 0.4,
                proportion: 0.9,
                mutationSpeed: 3,
                xStretch: 0.8,
                yStretch: 0.6
            },
            {
                colour: [253, 94, 83],
                maxOpacity: 0.45,
                // The proportion of the height used as the max distance that the sunset travels
                proportion: 0.7,
                // Magnitude of the inc/dec of one rgb value with each colour step
                mutationSpeed: 1,
                xStretch: 0.5,
                yStretch: 0
            },
            {
                colour: [255, 201, 34],
                maxOpacity: 0.4,
                proportion: 0.7,
                mutationSpeed: 1,
                xStretch: 0.7,
                yStretch: 0
            },
        ]
    }
};
var clouds1 = {
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
                pH: 0.7,
                pV: 0.3
            },
            {
                colour: [235, 235, 235],
                opacity: 0.15,
                minSize: 100,
                maxSize: 10000,
                pH: 0.7,
                pV: 0.3
            },
            {
                colour: [235, 235, 235],
                opacity: 0.15,
                minSize: 100,
                maxSize: 10000,
                pH: 0.7,
                pV: 0.3
            },
            {
                colour: [235, 235, 235],
                opacity: 0.15,
                minSize: 100,
                maxSize: 10000,
                pH: 0.7,
                pV: 0.3
            },
            {
                colour: [173, 216, 230],
                opacity: 0.15,
                minSize: 100,
                maxSize: 10000,
                pH: 0.6,
                pV: 0.2
            },
            {
                colour: [173, 216, 230],
                opacity: 0.15,
                minSize: 100,
                maxSize: 10000,
                pH: 0.6,
                pV: 0.2
            },
            {
                colour: [240, 240, 240],
                opacity: 0.2,
                minSize: 100,
                maxSize: 10000,
                pH: 0.6,
                pV: 0.2
            },
        ]
    }
};
var c = [160, 170, 190];
var clouds2 = {
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
                pV: 0.25
            },
            {
                colour: c,
                opacity: 0.15,
                minSize: 100,
                maxSize: 20000,
                pH: 0.8,
                pV: 0.25
            },
            {
                colour: c,
                opacity: 0.15,
                minSize: 100,
                maxSize: 20000,
                pH: 0.8,
                pV: 0.25
            },
            {
                colour: c,
                opacity: 0.15,
                minSize: 100,
                maxSize: 20000,
                pH: 0.8,
                pV: 0.25
            },
            {
                colour: c,
                opacity: 0.15,
                minSize: 100,
                maxSize: 20000,
                pH: 0.8,
                pV: 0.25
            },
        ]
    }
};
var cloudsBig = {
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
                pH: 0.7,
                pV: 0.3
            },
            {
                colour: [235, 235, 235],
                opacity: 0.15,
                minSize: 100,
                maxSize: 20000,
                pH: 0.7,
                pV: 0.3
            },
            {
                colour: [235, 235, 235],
                opacity: 0.15,
                minSize: 100,
                maxSize: 20000,
                pH: 0.7,
                pV: 0.3
            },
            {
                colour: [235, 235, 235],
                opacity: 0.15,
                minSize: 100,
                maxSize: 20000,
                pH: 0.7,
                pV: 0.3
            },
            {
                colour: [173, 216, 230],
                opacity: 0.15,
                minSize: 100,
                maxSize: 20000,
                pH: 0.6,
                pV: 0.2
            },
            {
                colour: [173, 216, 230],
                opacity: 0.15,
                minSize: 100,
                maxSize: 20000,
                pH: 0.6,
                pV: 0.2
            },
            {
                colour: [240, 240, 240],
                opacity: 0.2,
                minSize: 100,
                maxSize: 20000,
                pH: 0.6,
                pV: 0.2
            },
        ]
    }
};
var cloudsCloudy = {
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
                pH: 0.8,
                pV: 0.5
            },
            {
                colour: [183, 183, 178],
                opacity: 0.7,
                minSize: 100,
                maxSize: 50000,
                pH: 0.8,
                pV: 0.5
            },
            {
                colour: [183, 183, 178],
                opacity: 0.15,
                minSize: 100,
                maxSize: 10000,
                pH: 0.7,
                pV: 0.3
            },
            {
                colour: [183, 183, 178],
                opacity: 0.3,
                minSize: 100,
                maxSize: 10000,
                pH: 0.7,
                pV: 0.3
            },
            {
                colour: [183, 183, 178],
                opacity: 0.3,
                minSize: 100,
                maxSize: 10000,
                pH: 0.7,
                pV: 0.3
            },
            {
                colour: [183, 183, 178],
                opacity: 0.3,
                minSize: 100,
                maxSize: 10000,
                pH: 0.7,
                pV: 0.3
            },
        ]
    }
};
var cloudsMild = {
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
                pH: 0.7,
                pV: 0.3
            },
            {
                colour: [235, 235, 235],
                opacity: 0.15,
                minSize: 100,
                maxSize: 30000,
                pH: 0.7,
                pV: 0.3
            },
            {
                colour: [235, 235, 235],
                opacity: 0.15,
                minSize: 100,
                maxSize: 30000,
                pH: 0.7,
                pV: 0.3
            },
            {
                colour: [235, 235, 235],
                opacity: 0.15,
                minSize: 100,
                maxSize: 10000,
                pH: 0.7,
                pV: 0.3
            },
            {
                colour: [240, 211, 201],
                opacity: 0.3,
                minSize: 100,
                maxSize: 10000,
                pH: 0.6,
                pV: 0.2
            },
            {
                colour: [240, 211, 201],
                opacity: 0.15,
                minSize: 100,
                maxSize: 10000,
                pH: 0.6,
                pV: 0.2
            },
            {
                colour: [173, 216, 230],
                opacity: 0.1,
                minSize: 100,
                maxSize: 10000,
                pH: 0.6,
                pV: 0.2
            },
            {
                colour: [173, 216, 230],
                opacity: 0.1,
                minSize: 100,
                maxSize: 10000,
                pH: 0.6,
                pV: 0.2
            },
        ]
    }
};
// ----------------------- PRESETS -----------------------
var presetLightDay = {
    sky: defaultSky([135, 206, 235]),
    stars: none,
    moon: none,
    sunset: none,
    clouds: clouds1
};
var presetSunset = {
    sky: defaultSky([135, 206, 235]),
    stars: starsFaint,
    moon: false,
    sunset: sunset1,
    clouds: clouds1
};
var presetMoonAndStars = {
    sky: defaultSky([8, 43, 94]),
    stars: starsFaint,
    moon: moon1,
    sunset: none,
    clouds: none
};
var presetLateEvening = {
    sky: defaultSky([8, 43, 94]),
    stars: starsFaint,
    moon: none,
    sunset: sunset2,
    clouds: cloudsBig
};
var presetLateEvening2 = {
    sky: defaultSky([8, 43, 94]),
    stars: starsFaint,
    moon: moon1,
    sunset: sunset2,
    clouds: none
};
var presetLateEvening3 = {
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
                    yStretch: 0.5
                },
                {
                    colour: [253, 227, 228],
                    maxOpacity: 0.5,
                    proportion: 0.7,
                    mutationSpeed: 1,
                    xStretch: 0.6,
                    yStretch: 0.3
                },
            ]
        }
    },
    clouds: none
};
var presetPinkSky = {
    sky: defaultSky([255, 192, 203]),
    stars: none,
    moon: none,
    sunset: none,
    clouds: clouds1
};
var presetPinkSky2 = {
    sky: defaultSky([255, 182, 193]),
    stars: none,
    moon: none,
    sunset: {
        include: true,
        properties: {
            layers: [
                {
                    colour: [253, 240, 240],
                    maxOpacity: 0.3,
                    proportion: 0.7,
                    mutationSpeed: 1,
                    xStretch: 0.3,
                    yStretch: 0
                },
                {
                    colour: [252, 210, 102],
                    maxOpacity: 0.3,
                    proportion: 0.7,
                    mutationSpeed: 1,
                    xStretch: 0.3,
                    yStretch: 0
                },
                {
                    colour: [255, 227, 115],
                    maxOpacity: 0.35,
                    proportion: 0.6,
                    mutationSpeed: 1,
                    xStretch: 0.3,
                    yStretch: 0
                },
                {
                    colour: [252, 156, 84],
                    maxOpacity: 0.4,
                    proportion: 0.5,
                    mutationSpeed: 1,
                    xStretch: 0.3,
                    yStretch: 0
                },
                {
                    colour: [253, 94, 83],
                    maxOpacity: 0.45,
                    proportion: 0.5,
                    mutationSpeed: 1,
                    xStretch: 0.3,
                    yStretch: 0
                },
            ]
        }
    },
    clouds: none
};
var presetLightDayCloudy = {
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
                    pH: 0.7,
                    pV: 0.3
                },
                {
                    colour: [235, 235, 235],
                    opacity: 0.4,
                    minSize: 100,
                    maxSize: 10000,
                    pH: 0.7,
                    pV: 0.3
                },
                {
                    colour: [235, 235, 235],
                    opacity: 0.4,
                    minSize: 100,
                    maxSize: 10000,
                    pH: 0.7,
                    pV: 0.3
                },
                {
                    colour: [235, 235, 235],
                    opacity: 0.4,
                    minSize: 100,
                    maxSize: 10000,
                    pH: 0.7,
                    pV: 0.3
                },
                {
                    colour: [240, 211, 201],
                    opacity: 0.4,
                    minSize: 100,
                    maxSize: 2000,
                    pH: 0.6,
                    pV: 0.2
                },
                {
                    colour: [240, 211, 201],
                    opacity: 0.4,
                    minSize: 100,
                    maxSize: 2000,
                    pH: 0.6,
                    pV: 0.2
                },
                {
                    colour: [173, 216, 230],
                    opacity: 0.4,
                    minSize: 100,
                    maxSize: 1000,
                    pH: 0.6,
                    pV: 0.2
                },
                {
                    colour: [173, 216, 230],
                    opacity: 0.15,
                    minSize: 100,
                    maxSize: 1000,
                    pH: 0.6,
                    pV: 0.2
                },
                {
                    colour: [240, 240, 240],
                    opacity: 0.2,
                    minSize: 100,
                    maxSize: 1000,
                    pH: 0.6,
                    pV: 0.2
                },
            ]
        }
    }
};
var presetLightDayStarry = {
    sky: defaultSky([135, 206, 235]),
    stars: stars1,
    moon: none,
    sunset: none,
    clouds: clouds1
};
var presetNight = {
    sky: defaultSky([40, 30, 45]),
    stars: stars1,
    moon: none,
    sunset: none,
    clouds: cloudsMild
};
var presetCloudy = {
    sky: defaultSky([115, 160, 200]),
    stars: starsDense,
    moon: none,
    sunset: none,
    clouds: cloudsCloudy
};
