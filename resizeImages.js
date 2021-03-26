const Jimp = require("jimp");
const fs = require("fs");
const path = require("path");
const images = path.resolve(__dirname, "src/static/images/sprites");
const moveToSprites = path.resolve(__dirname, "src/static/images/reSizedsprites/");

async function resize(imageType, imageUrl, fileName) {
  let width;
  let height;
  switch (imageType) {
    case "sprites":
      (width = 64), (height = 64);
      break;
    default:
      break;
  }
  const image = await Jimp.read(imageUrl);
  const outputPath = path.join(moveToSprites, fileName);
  console.log({ outputPath });

  await image.resize(width, height);
  await image.write(outputPath);
}

// resize("cover", path.join(__dirname, "src/static/images/covers/2door.jpg"), "2door");

// Make an async function that gets executed immediately
async function resizeDirectory(folderPath, imageType) {
  // Our starting point
  try {
    // Get the files as an array
    const files = await fs.promises.readdir(folderPath);
    // Loop them all with the new for...of
    for (const file of files) {
      // Get the full paths
      const fromPath = path.join(folderPath, file);
      // Stat the file to see if we have a file or dir
      const stat = await fs.promises.stat(fromPath);
      // const imageUrl = path.join(fromPath, file);
      console.log({ file });
      if (stat.isFile()) {
        await resize(imageType, fromPath, file);
        console.log("'%s' done resizing.", fromPath);
      } else if (stat.isDirectory()) {
        console.log("'%s' is a directory.", fromPath);
      }
    } // End for...of
  } catch (e) {
    // Catch anything bad that happens
    console.error("We've thrown! Whoops!", e);
  }
}

resizeDirectory(images, "sprites");
