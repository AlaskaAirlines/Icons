const dataFile = `${__dirname}/../src/data/orion-icons.json`;
//const indexFile = `${__dirname}/../dist/index.js`;
const iconsDir = `${__dirname}/../src/icons`;
//const buildIconsDir = `${__dirname}/../dist/icons`;
const data = require(dataFile);
const fs = require("fs");

const { titleToFilename } = require("./utils");

const icoDir = './dist/icons';
if (!fs.existsSync(icoDir)){
  fs.mkdirSync(icoDir);
}

// const icons = {};
data.icons.forEach(icon => {
  const filename = titleToFilename(icon.title);
  icon.svg = fs.readFileSync(`${iconsDir}/${filename}.svg`, "utf8");

  console.log(icon.svg)
});
