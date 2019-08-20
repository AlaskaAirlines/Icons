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
const LocalTokens = require('style-dictionary').extend('./scripts/tokensConfig.json');
const DesignTokens = require('style-dictionary').extend('./scripts/colorTokensConfig.json');

const { titleToFilename } = require('./utils');

// creates necessary directory on build of not already there
const icoDir = './dist/icons';
if (!fileSys.existsSync(icoDir)){
  fileSys.mkdirSync(icoDir);
}

// export JS versions of Icons
// =======================================================================
const icons = {};
data.icons.forEach(icon => {
  const filename = titleToFilename(icon.title);
  icon.svg = fs.readFileSync(`${iconsDir}/${filename}.svg`, 'utf8');
  const insertPos = icon.svg.indexOf("svg") + 4;
  const height = icon.height ? `height: ${icon.height};` : '';
  const width = icon.width ? `width: ${icon.width};` : '';
  const elementStyle = `style="${width} ${height} fill: ${icon.color}" `;

  // adds attributes to SVG string based on orion-icons.json data
  icon.svg = [icon.svg.slice(0, insertPos), `class="${icon.style}" `, icon.svg.slice(insertPos)].join('');
  icon.svg = [icon.svg.slice(0, insertPos), elementStyle, icon.svg.slice(insertPos)].join('');
  icon.svg = [icon.svg.slice(0, insertPos), `aria-hidden="${icon.hidden}" `, icon.svg.slice(insertPos)].join('');
  icon.svg = [icon.svg.slice(0, insertPos), `role="${icon.role}" `, icon.svg.slice(insertPos)].join('');
  icon.svg = icon.svg.replace("iconTitle", `${icon.title}`);
  icon.svg = icon.svg.replace("iconDesc", `${icon.desc}`);

  icons[icon.title] = icon;
  // write the static .js file for the icon
  fs.writeFileSync( `${buildIconsDir}/${filename}.js`, `module.exports=${JSON.stringify(icon)};`);
  fs.writeFileSync( `${buildIconsDir}/${filename}_es6.js`, `export default ${JSON.stringify(icon)};`);

  // write new SVGs to ./dist
  fs.writeFileSync( `${buildIconsDir}/${filename}.svg`, icon.svg);

  // console.log(`${filename}.js / ${filename}.svg written to ./dist dir`)
});

// export 16px PNGs versions of Icons; default colors
// =======================================================================
const pngIcons = {};
const SizeMedIcons = data.icons.filter(function(sizeData) {
  return sizeData.PngSize == 20;
});

SizeMedIcons.forEach(icon => {
  const filename = titleToFilename(icon.title);
  icon.svg = fs.readFileSync(`${iconsDir}/${filename}.svg`, 'utf8');
  const insertPos = icon.svg.indexOf("svg") + 4;
  const elementStyle = `style="fill: ${icon.PngColor}" `;
  const iconStyle = `
  <style xmlns="http://www.w3.org/2000/svg" type="text/css"><![CDATA[
    @import url("../../dist/tokens/colorToken.css");
  ]]></style>
  `

  icon.svg = [icon.svg.slice(0, insertPos), elementStyle, icon.svg.slice(insertPos)].join('');
  icon.svg = icon.svg.replace("<style></style>", `${iconStyle}`);

  icons[icon.title] = icon;

  // write new SVGs to ./dist
  fs.writeFileSync( `${buildIconsDir}/${filename}--20@2.png`, icon.svg);
  fs.writeFileSync( `${buildIconsDir}/${filename}--20@3.png`, icon.svg);

  // console.log(`${filename}.js / ${filename}.png written to ./dist dir`)
});

// export 16px PNGs versions of Icons; alt colors
// =======================================================================
const pngIconsAlt = {};
const altColorSet = data.icons.filter(function(altData) {
  return altData.AltPngColor && altData.PngSize == 20;
});

altColorSet.forEach(icon => {
  const filename = titleToFilename(icon.title);
  icon.svg = fs.readFileSync(`${iconsDir}/${filename}.svg`, 'utf8');
  const insertPos = icon.svg.indexOf("svg") + 4;
  const elementStyle = `style="fill: ${icon.AltPngColor}" `;
  const iconStyle = `
  <style xmlns="http://www.w3.org/2000/svg" type="text/css"><![CDATA[
    @import url("../../dist/tokens/colorToken.css");
  ]]></style>
  `

  icon.svg = [icon.svg.slice(0, insertPos), elementStyle, icon.svg.slice(insertPos)].join('');
  icon.svg = icon.svg.replace("<style></style>", `${iconStyle}`);

  icons[icon.title] = icon;

  // write new SVGs to ./dist
  fs.writeFileSync( `${buildIconsDir}/${filename}-alt--20@2.png`, icon.svg);
  fs.writeFileSync( `${buildIconsDir}/${filename}-alt--20@3.png`, icon.svg);

  // console.log(`${filename}.js / ${filename}.png written to ./dist dir`)
});


// Style Dictionary build function
LocalTokens.buildPlatform('SassVariables');
LocalTokens.buildPlatform('CSSCustomElements');
LocalTokens.buildPlatform('CSSCustomElements_SassFiletype');
DesignTokens.buildPlatform('colorTokens');

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
