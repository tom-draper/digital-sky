import * as PImage from "pureimage";
import * as fs from "fs";
import { Grid, collapsePixel, createSky } from "../src/app";
import { Config, randConfig } from "../src/config";
import path from "path";

(async () => {
  const count = getCount();
  console.log(`☁️  Generating ${count} ${count == 1 ? 'sky' : 'skies'}...`);
  for (let i = 0; i < count; i++) {
    console.log(`Generating sky ${i + 1}...`);
    await generateSky(randConfig());
    console.log();
  }
})();

function getCount() {
  const args = process.argv.slice(2);
  for (let i = 1; i < args.length; i++) {
    const value = parseInt(args[i]);
    if (args[i - 1] === "-n" && !isNaN(value)) {
      return value;
    }
  }
  return 1;
}

async function generateSky(config: Config) {
  const grid = await createSky(config);
  const img = gridToImage(grid, config);
  await saveImage(img);
}

function gridToImage(grid: Grid, config: Config) {
  const w = config.sky.properties.dimensions.width;
  const h = config.sky.properties.dimensions.height;
  const img = PImage.make(w, h);
  for (let i = 0; i < h; i++) {
    for (let j = 0; j < w; j++) {
      const pixel = grid.get(i)?.get(j);
      if (!pixel) continue;
      const color = collapsePixel(pixel);
      img.setPixelRGBA_i(j, i, color[0], color[1], color[2], 255);
    }
  }
  return img;
}

async function saveImage(img: PImage.Bitmap) {
  const filepath = path.join(__dirname, "../gallery");
  ensureFilePath(filepath);

  const filename = `sky-${fileTimestamp()}.png`;

  try {
    await PImage.encodePNGToStream(
      img,
      fs.createWriteStream(`${filepath}/${filename}`)
    );
    console.log(`Saved gallery/${filename}`);
  } catch (e) {
    console.log(`Error writing image ${filename}: `, e);
  }
}

function fileTimestamp() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0"); // January is 0
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

function ensureFilePath(filepath: string) {
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath);
  }
}
