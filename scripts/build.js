#!/usr/bin/env node
/**
 * @fileoverview
 * Compiles our icons into static .js files that can be imported in the browser
 * and are tree-shakeable.
 * The static .js files go in icons/{filename}.js.
 * Also generates an index.js that exports all icons by title, but is not tree-shakeable
 */

const dataFile = "../data/orion-icons.json";
const indexFile = `${__dirname}/../dist/index.js`;
const iconsDir = `${__dirname}/../icons`;
const buildIconsDir = `${__dirname}/../dist/icons`;
const data = require(dataFile);
const fs = require("fs");

const { titleToFilename } = require("./utils");

const icons = {};
data.icons.forEach(icon => {
    const filename = titleToFilename(icon.title);
    icon.svg = fs.readFileSync(`${iconsDir}/${filename}.svg`, "utf8");
    icons[icon.title] = icon;
    // write the static .js file for the icon
    fs.writeFileSync(
        `${buildIconsDir}/${filename}.js`,
        `module.exports=${JSON.stringify(icon)};`
    );
});

// write our generic index.js
fs.writeFileSync(indexFile, `module.exports=${JSON.stringify(icons)};`);
