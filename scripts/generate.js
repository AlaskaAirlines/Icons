#!/usr/bin/env node
/**
 * @fileoverview
 * Compiles our icons into static .js files that can be imported in the browser
 * and are tree-shakeable.
 * The static .js files go in icons/{filename}.js.
 * Also generates an index.js that exports all icons by title, but is not tree-shakeable
 */

const dataFile = '../src/data/icons.json';
const indexFile = `${__dirname}/../dist/index.js`;
const iconsDir = `${__dirname}/../src`;
const buildIconsDir = `${__dirname}/../dist/icons`;
const data = require(dataFile);
const fileSys = require('file-system');
const chalk = require('chalk');
const fs = require('fs');

const { getDistFilename, getDistSubFolder } = require('./utils');

// creates necessary directory on build of not already there
const icoDir = './dist/icons';
if (!fileSys.existsSync(icoDir)){
  fileSys.mkdirSync(icoDir);
}

function titleCase(str) {
  let splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}

// export JS versions of Icons
// =======================================================================
const icons = {};

console.log(`Generating Icons
`)

//console.log(data.icons);
data.icons.forEach((iconRaw, index) => {
  let count = index + 1;
  let icon = {
    ...data.commonProperties,
    ...iconRaw
  }

  const filename = icon.name;
  const distFilename = getDistFilename(icon);
  icon.svg = fs.readFileSync(`${iconsDir}${icon.path}/${filename}.svg`, 'utf8');
  const insertPos = icon.svg.indexOf("svg") + 3;
  const height = icon.height ? `height: ${icon.height};` : '';
  const width = icon.width ? `width: ${icon.width};` : '';
  const elementStyle = `style="${width} ${height} fill: ${icon.color}" `;

  icon.style = icon.style || 'ico_squareLarge';

  // If svg has legacy HTML structure, replace with empty string
  icon.svg = icon.svg.replace(`<title>iconTitle</title>
  <desc>iconDesc</desc>
  <style></style>`, '');

  // Build new Title and Description from icon data
  const altName = filename.replace(/-/g, ' ');
  icon.title = icon.title || titleCase(altName);
  icon.desc = icon.desc || `${altName} icon`;
  const split = icon.svg.split(/(^<svg.*>)/);

  // Scrub out any pre-existing attributes
  split[1] = '<svg>';
  split.splice(2, 0, `
  <title>${icon.title}</title>
  <desc>${icon.desc}</desc>`);
  icon.svg = split.join('');

  if (icon.path === '/icons') {
    // Locate and remove undesired SVG attributes
    const fill = icon.svg.match(/fill="#......"/);
    const fillNone = icon.svg.match(/fill="none"/);

    if (fill) {
      icon.svg = icon.svg.replace(fill, '')
    }

    if (fillNone) {
      icon.svg = icon.svg.replace(fillNone, '')
    }
  }

  // adds attributes to SVG string based on icons.json data
  icon.svg = [icon.svg.slice(0, insertPos), `class="${icon.style}" `, icon.svg.slice(insertPos)].join('');
  icon.svg = [icon.svg.slice(0, insertPos), elementStyle, icon.svg.slice(insertPos)].join('');
  icon.svg = [icon.svg.slice(0, insertPos), `aria-hidden="${icon.hidden}" `, icon.svg.slice(insertPos)].join('');
  icon.svg = [icon.svg.slice(0, insertPos), `role="${icon.role}" `, icon.svg.slice(insertPos)].join('');
  icon.svg = [icon.svg.slice(0, insertPos), `xmlns="${icon.xmlns}" `, icon.svg.slice(insertPos)].join('');
  icon.svg = [icon.svg.slice(0, insertPos), `xmlns:xlink="${icon.xmlns_xlink}" `, icon.svg.slice(insertPos)].join('');
  icon.svg = [icon.svg.slice(0, insertPos), `viewBox="${icon.viewBox}" `, icon.svg.slice(insertPos)].join('');
  icon.svg = [icon.svg.slice(0, insertPos), ` `, icon.svg.slice(insertPos)].join('');

  const publishFolder = `${buildIconsDir}/${getDistSubFolder(icon.category)}`;
  if (!fileSys.existsSync(publishFolder)){
    fileSys.mkdirSync(publishFolder);
  }

  icons[icon.name] = icon;
  // write the static .js file for the icon
  fs.writeFileSync( `${buildIconsDir}/${distFilename}.js`, `module.exports=${JSON.stringify(icon)};`);
  fs.writeFileSync( `${buildIconsDir}/${distFilename}_es6.js`, `export default ${JSON.stringify(icon)};`);

  // write new SVGs to ./dist
  fs.writeFileSync( `${buildIconsDir}/${distFilename}.svg`, icon.svg);

  console.log(chalk.hex('#ffd200')(`- ${count}: `) + chalk.hex('#f26135')(`${distFilename}.svg
  `))
});

console.log(chalk.hex('#f26135')(`
 _______                   __           __ __
|     __|.---.-.--.--.    |  |--.-----.|  |  |.-----.
|__     ||  _  |  |  |    |     |  -__||  |  ||  _  |
|_______||___._|___  |    |__|__|_____||__|__||_____|
               |_____|
 __              _______                    __
|  |_.-----.    |   _   |.--.--.----.-----.|  |
|   _|  _  |    |       ||  |  |   _|  _  ||__|
|____|_____|    |___|___||_____|__| |_____||__|

Generating the Icons People Love.
`))

// write our generic index.js
fs.writeFileSync(indexFile, `module.exports=${JSON.stringify(icons)};`);
