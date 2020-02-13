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
const fs = require('fs');
const DesignTokens = require('style-dictionary').extend('./scripts/colorTokensConfig.json');

const { getDistFilename, getDistSubFolder } = require('./utils');

// creates necessary directory on build of not already there
const icoDir = './dist/icons';
if (!fileSys.existsSync(icoDir)){
  fileSys.mkdirSync(icoDir);
}

// export JS versions of Icons
// =======================================================================
const icons = {};

//console.log(data.icons);
data.icons.forEach(iconRaw => {
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

  icon.style = icon.style || 'ico_squareLg';

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
});

// export PNG versions of Icons; default colors
// =======================================================================
const pngIcons = {};
const SizeMedIcons = data.icons.filter(function(sizeData) {
  return sizeData.PngSize == 24;
});

SizeMedIcons.forEach(icon => {
  const filename = icon.name;
  const distFilename = getDistFilename(icon);
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

  const publishFolder = `${buildIconsDir}/${getDistSubFolder(icon.category)}`;
  if (!fileSys.existsSync(publishFolder)){
    fileSys.mkdirSync(publishFolder);
  }
  icons[icon.name] = icon;

  // write new SVGs to ./dist
  fs.writeFileSync( `${buildIconsDir}/${distFilename}--24@2x.png`, icon.svg);
  fs.writeFileSync( `${buildIconsDir}/${distFilename}--24@3x.png`, icon.svg);

  // console.log(`${filename}.js / ${filename}.png written to ./dist dir`)
});

// export 20px PNGs versions of Icons; alt colors
// =======================================================================
const pngIconsAlt = {};
const altColorSet = data.icons.filter(function(altData) {
  return altData.AltPngColor && altData.PngSize == 24;
});

altColorSet.forEach(icon => {
  const filename = icon.name;
  const distFilename = getDistFilename(icon);
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

  const publishFolder = `${buildIconsDir}/${getDistSubFolder(icon.category)}`;
  if (!fileSys.existsSync(publishFolder)){
    fileSys.mkdirSync(publishFolder);
  }

  icons[icon.name] = icon;

  // write new SVGs to ./dist
  fs.writeFileSync( `${buildIconsDir}/${distFilename}-alt--24@2x.png`, icon.svg);
  fs.writeFileSync( `${buildIconsDir}/${distFilename}-alt--24@3x.png`, icon.svg);
});

// Standard Style Dictionary build function
DesignTokens.buildPlatform('colorTokens');


// Custom Style Dictionary build function
const CustomStyleDictionary = require('style-dictionary');
const _ = require('lodash');

function variablesWithPrefix(prefix, properties) {
  return _.map(properties, function(prop) {
    var to_ret_prop = prefix + prop.name + ': ' + (prop.attributes.category === 'asset' ? '"' + prop.value + '"' : prop.value) + ';';

    if (prop.comment) to_ret_prop = to_ret_prop.concat(' /* ' + prop.comment + ' */');
    return to_ret_prop;
  })
    .filter(function(strVal) {
    return !!strVal
  })
    .join('\n');
}

function fileHeader(options) {
  var to_ret = '';
  // for backward compatibility we need to have the user explicitly hide them
  var showFileHeader = (options) ? options.showFileHeader : true;
  if (showFileHeader) {
    to_ret += '/**\n';
    to_ret += ' * Do not edit directly\n';
    to_ret += ' * Generated on ' + new Date().toUTCString() + '\n';
    to_ret += ' */\n\n';
  }

  return to_ret;
}

function titleCase(str) {
  let splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}

CustomStyleDictionary.registerFormat({
  name: 'custom/css/variables',
  formatter: function(dictionary, platform) {
    return fileHeader(this.options) + ':host {\n' + variablesWithPrefix(' --', dictionary.allProperties) + '\n}\n';
  }
});

// Build custom platform(s)
const componentConfig = CustomStyleDictionary.extend('./scripts/CSSCustomProperty.json');
componentConfig.buildAllPlatforms();


console.log("")
console.log(
  `
 █████╗ ██╗   ██╗██████╗  ██████╗
██╔══██╗██║   ██║██╔══██╗██╔═══██╗
███████║██║   ██║██████╔╝██║   ██║
██╔══██║██║   ██║██╔══██╗██║   ██║
██║  ██║╚██████╔╝██║  ██║╚██████╔╝
╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝ ╚═════╝

██╗ ██████╗ ██████╗ ███╗   ██╗███████╗
██║██╔════╝██╔═══██╗████╗  ██║██╔════╝
██║██║     ██║   ██║██╔██╗ ██║███████╗
██║██║     ██║   ██║██║╚██╗██║╚════██║
██║╚██████╗╚██████╔╝██║ ╚████║███████║
╚═╝ ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝

Generating the Icons People Love.
`
)
console.log("")

// write our generic index.js
fs.writeFileSync(indexFile, `module.exports=${JSON.stringify(icons)};`);
