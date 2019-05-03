#!/usr/bin/env node
/**
 * @fileoverview
 * Compiles our icons into static .js files that can be imported in the browser
 * and are tree-shakeable.
 * The static .js files go in icons/{filename}.js.
 * Also generates an index.js that exports all icons by title, but is not tree-shakeable
 */

const dataFile = '../src/data/orion-icons.json';
const indexFile = `${__dirname}/../dist/index.js`;
const iconsDir = `${__dirname}/../src/icons`;
const buildIconsDir = `${__dirname}/../dist/icons`;
const data = require(dataFile);
const fileSys = require('file-system');
const fs = require('fs');

const { titleToFilename } = require('./utils');

const icoDir = './dist/icons';
if (!fileSys.existsSync(icoDir)){
  fileSys.mkdirSync(icoDir);
}

const icons = {};
data.icons.forEach(icon => {
  const filename = titleToFilename(icon.title);
  icon.svg = fs.readFileSync(`${iconsDir}/${filename}.svg`, 'utf8');
  icons[icon.title] = icon;
  // write the static .js file for the icon
  fs.writeFileSync( `${buildIconsDir}/${filename}.js`, `module.exports=${JSON.stringify(icon)};`);

  // copy SVGs from ./src to ./dist
  fs.copyFile( `${iconsDir}/${filename}.svg`, `${buildIconsDir}/${filename}.svg`, (err) => {
    if (err) throw err;
  });
});

console.log('')
console.log('         .         . ')
console.log('               *       *')
console.log('')
console.log('                 * * *')
console.log('                    !')
console.log('               *       * ')
console.log('')
console.log(" ██████╗ ██████╗ ██╗ ██████╗ ███╗   ██╗")
console.log("██╔═══██╗██╔══██╗██║██╔═══██╗████╗  ██║")
console.log("██║   ██║██████╔╝██║██║   ██║██╔██╗ ██║")
console.log("██║   ██║██╔══██╗██║██║   ██║██║╚██╗██║")
console.log("╚██████╔╝██║  ██║██║╚██████╔╝██║ ╚████║")
console.log("╚═════╝ ╚═╝  ╚═╝╚═╝ ╚═════╝ ╚═╝  ╚═══╝")
console.log("                                       ")
console.log("██╗ ██████╗ ██████╗ ███╗   ██╗███████╗ ")
console.log("██║██╔════╝██╔═══██╗████╗  ██║██╔════╝ ")
console.log("██║██║     ██║   ██║██╔██╗ ██║███████╗ ")
console.log("██║██║     ██║   ██║██║╚██╗██║╚════██║ ")
console.log("██║╚██████╗╚██████╔╝██║ ╚████║███████║ ")
console.log("╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝ ")
console.log('')

// write our generic index.js
fs.writeFileSync(indexFile, `module.exports=${JSON.stringify(icons)};`);
