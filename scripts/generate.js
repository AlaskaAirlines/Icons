#!/usr/bin/env node
/**
 * @fileoverview
 * Compiles our icons into static .js files that can be imported in the browser
 * and are tree-shakeable.
 * The static .js files go in icons/{filename}.js.
 * Also generates an index.js that exports all icons by title, but is not tree-shakeable
 */

const dataFile = '../src/data/icons.json';
const restrictedDataFile = '../src/data/restrictedIcons.json';
const logoDataFile = '../src/data/logoIcons.json';
const distDir = `${__dirname}/../dist`;
const indexFileES5 = `${distDir}/index_es5.js`;
const indexFileES6 = `${distDir}/index.js`;
const iconsDir = `${__dirname}/../src`;
const iconData = require(dataFile);
const restrictedIconData = require(restrictedDataFile);
const logoData = require(logoDataFile);
const fileSys = require('file-system');
const chalk = require('chalk');
const fs = require('fs');
const { optimize } = require('svgo');

let buildIconsDir = `${__dirname}/../dist/icons`;

const { getDistFilename, getDistSubFolder } = require('./utils');

// creates necessary directory on build if not already there
const icoDir = './dist/icons';
if (!fileSys.existsSync(icoDir)) {
  fileSys.mkdirSync(icoDir);
}

function titleCase(str) {
  let splitStr = str.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}

// Helper function to convert file names to PascalCase (for React components)
function toCamelCase(str) {
  return str
    .replace(/[-_]+(.)?/g, (_, char) => char ? char.toUpperCase() : '')
    .replace(/^./, firstChar => firstChar.toUpperCase());
}

// export JS versions of Icons
// =======================================================================
const icons = {};

console.log(chalk.hex('#f26135')(`Generating Icons ... \n`));

// Accumulate import statements for the output file
let importStatements = '';

/**
 * Runs the generator to process the icons data and generate necessary files.
 *
 * @param {Object} data - The icons data object.
 */
function runGenerator(data) {
  data.icons.forEach((iconRaw, index) => {
    let count = index + 1;
    let icon = {
      ...data.commonProperties,
      ...iconRaw
    };

    const iconName = icon.name;
    const distFilename = getDistFilename(icon);
    icon.svg = fs.readFileSync(`${iconsDir}${icon.path}/${iconName}.svg`, 'utf8');
    const insertPos = icon.svg.indexOf("svg") + 3;
    const width = icon.width ? `min-width: ${icon.width};` : '';
    const height = icon.height ? `height: ${icon.height};` : '';
    const elementStyle = `style="${width} ${height} fill: ${icon.color}" `;
    const ariaHidden = !icon.desc ? `aria-hidden="true"` : undefined;
    const labelledByTitle = icon.title ? `${icon.name}__title ` : "";
    const labelledByDesc = icon.desc ? `${icon.name}__desc` : "";
    const iconDeprecated = icon.deprecated ? `data-deprecated="${icon.deprecated}" ` : "";
    const labelledBy = icon.desc ? `aria-labelledby="${labelledByTitle}${labelledByDesc}" ` : undefined;

    // Build new Title from icon file name
    const titleName = iconName.replace(/-/g, ' ');
    icon.title = icon.title;
    const split = icon.svg.split(/(^<svg.*>)/);

    // Scrub out any pre-existing attributes
    split[1] = '<svg>';
    split.splice(2, 0, `
    <title ${icon.title ? `id="${icon.name}__title"` : ""}>${icon.title}</title>
    ${icon.desc ? `<desc id="${icon.name}__desc">${icon.desc}</desc>` : "" }`);
    icon.svg = split.join('');

    if (icon.path === '/icons') {
      // Locate and remove undesired SVG attributes
      const fill = icon.svg.match(/fill="#......"/);
      const fillNone = icon.svg.match(/fill="none"/);

      if (fill) {
        icon.svg = icon.svg.replace(fill, '');
      }

      if (fillNone) {
        icon.svg = icon.svg.replace(fillNone, '');
      }
    }

    // Adds attributes to SVG string based on icons.json data
    icon.svg = [icon.svg.slice(0, insertPos), ariaHidden, icon.svg.slice(insertPos)].join('');
    icon.svg = [icon.svg.slice(0, insertPos), elementStyle, icon.svg.slice(insertPos)].join('');
    icon.svg = [icon.svg.slice(0, insertPos), labelledBy, icon.svg.slice(insertPos)].join('');
    icon.svg = [icon.svg.slice(0, insertPos), `class="${icon.style}" `, icon.svg.slice(insertPos)].join('');
    icon.svg = [icon.svg.slice(0, insertPos), `role="${icon.role}" `, icon.svg.slice(insertPos)].join('');
    icon.svg = [icon.svg.slice(0, insertPos), `xmlns="${icon.xmlns}" `, icon.svg.slice(insertPos)].join('');
    icon.svg = [icon.svg.slice(0, insertPos), `xmlns:xlink="${icon.xmlns_xlink}" `, icon.svg.slice(insertPos)].join('');
    icon.svg = [icon.svg.slice(0, insertPos), `viewBox="${icon.viewBox}" `, icon.svg.slice(insertPos)].join('');
    icon.svg = [icon.svg.slice(0, insertPos), iconDeprecated, icon.svg.slice(insertPos)].join('');
    icon.svg = [icon.svg.slice(0, insertPos), ` `, icon.svg.slice(insertPos)].join('');

    // Optimize SVG
    icon.svg = optimize(icon.svg, {
      plugins: [
        {
          name: 'preset-default',
          params: {
            overrides: {
              removeDesc: false,            // keep <desc>
              cleanupIds: false,
              sortDefsChildren: false,
              removeTitle: false,           // keep <title>
              removeUnusedNS: false,        // keep xmlns:xlink=
              removeUnknownsAndDefaults: {
                keepRoleAttr: true,         // keep role=
              }
            },
          },
        },
        {
          name: 'addAttributesToSVGElement',
          params: {
            attributes: [
              {
                part: 'svg'
              }
            ]
          }
        },
      ],
    }).data;

    if (icon.category === 'restricted') {
      buildIconsDir = `${__dirname}/../dist`;
    }

    if (icon.category === 'logos') {
      buildIconsDir = `${__dirname}/../dist`;
    }

    // Create the publish folder if it doesn't exist
    const publishFolder = `${buildIconsDir}/${getDistSubFolder(icon.category)}`;

    if (!fileSys.existsSync(publishFolder)) {
      fileSys.mkdirSync(publishFolder);
    }

    // Add the icon to the icons object
    icons[icon.name] = icon;

    // Generate the import statement for react specific icons
    const camelCaseName = toCamelCase(icon.name);
    const importStatement = `import { ReactComponent as ${camelCaseName} } from "@alaskaairux/icons/dist/icons/${icon.category}/${iconName}.svg";`;

    // Identify deprecated icons
    if (icon.deprecated) {
      importStatements += `${importStatement} // deprecated: discontinue use!\n`;
    } else {
      importStatements += `${importStatement}\n`;
    }

    // Write the static .js file for the icon
    fs.writeFileSync(`${buildIconsDir}/${distFilename}.js`, `module.exports=${JSON.stringify(icon)};`);
    fs.writeFileSync(`${buildIconsDir}/${distFilename}_es6.js`, `export default ${JSON.stringify(icon)};`);

    // restrict new extension generation of files
    if (icon.type === 'icon' || icon.type === 'restricted' || icon.esm === true) {
      fs.writeFileSync(`${buildIconsDir}/${distFilename}.mjs`, `export default ${JSON.stringify(icon)};`);
    }

    // write new SVGs to ./dist
    fs.writeFileSync(`${buildIconsDir}/${distFilename}.svg`, icon.svg);
    process.stdout.write(`- `);
  });
}

// Generate the icons and React imports
runGenerator(iconData);
runGenerator(restrictedIconData);
runGenerator(logoData);

// Write the accumulated React import statements to the output file after all icons are processed
const outputFile = `${distDir}/reactComponents.js`;
fs.writeFileSync(outputFile, importStatements);
console.log(chalk.green(`\n\nGenerated reactComponents.js with ${Object.keys(icons).length} icons.`));


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
 fs.writeFileSync(indexFileES5, `module.exports=${JSON.stringify(icons)};`);
 fs.writeFileSync(indexFileES6, `export default ${JSON.stringify(icons)};`);
