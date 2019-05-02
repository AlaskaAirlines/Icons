<img src="https://resource.alaskaair.net/-/media/2C1969F8FB244C919205CD48429C13AC" alt="Orion Design System Logo" title="Be the change you want to see" width="125" align="right" />

[![Build Status](https://travis-ci.org/AlaskaAirlines/OrionIcons.svg?branch=master)](https://travis-ci.org/AlaskaAirlines/OrionDesignTokens)
![npm (scoped)](https://img.shields.io/npm/v/@alaskaairux/orion-icons.svg?color=orange)
![NPM](https://img.shields.io/npm/l/@alaskaairux/orion-icons.svg?color=blue)

# Orion SVG Icon Library

The focus of this repository is to manage, at scale, the enterprise need for icons in the Orion Design System. Please see all supporting documentation for contributing to, and consuming icons from the Orion SVG Icon Library.

## Supported icons

All currently supported icons are located in the `icons/` directory.

## Install

```
$ npm i @alaskaairux/orion-icons -D
```

## Node application dependency

Via a node.js dependency or other node like dependency management architecture, developer can choose from two different scenarios for consumption.

### Individual icon request

It is suggested that developers list individual dependencies per UI component, like so:

```js
const arrowDown = require('@alaskaair/orion-icons/dist/icons/arrowdown');
```

Within the UI component a developer can reference the object assigned to the newly created variable to get the specific icon's SVG code:

```js
console.log(`<button>Click Me ${arrowDown.svg}</button>`);
```

This will return the icon's SVG code from the object

### Full library dependency

If there are several icons within a view, developers may opt to include all available icons. **Be aware**, as this npm grows, so will this type of dependency. It's strongly suggested that dependencies are individually declared.

To require the full library as a dependency of the UI, do the following:

```js
const orionIcons = require('@alaskaair/orion-icons/dist');
```

Then within UI component, a developer can render a specific icon from the output array, like so:

```js
console.log(orionIcons['Arrow Down'].svg);
```

This will return the icon's SVG code from the object.

## Using Icon styles

In the `dist/` directory is `orion-icons.scss`. Import this Sass file for default shape styles.

```scss
@import '@alaskaair/orion-icons/dist/orion-icons';
```

With Sass, React requires a `~` character prior to the importing library, example:

```scss
@import '~@alaskaair/orion-icons/dist/orion-icons';
```

By default, no CSS classes are created when importing this file. To opt-in to the icon styles you need, you need to add a config variable map that will set a flag to `true` to process the classes you want.

```scss
$iconMap: (
  toggleArrowHorizontal: true,
  toggleArrowVertical: true
);
```

### Building CSS in JS

If you prefer to build your CSS in the JS component itself, this is supported in the exported icon object js file. There is a dependency to output CSS Custom Properties from the Orion Design Tokens. See the [Orion Design Token documentation](https://github.com/AlaskaAirlines/OrionIcons#building-css-in-js) to support this process.

Example:

```js
const arrowDown = require('@alaskaair/orion-icons/dist/icons/arrowdown');

console.log(`
.${arrowDown.style} {
  fill: ${arrowDown.color};
  width: ${arrowDown.width};
}
`)
```

This will output the following:

```css
.ico__toggleArrowHorizontal {
  color: var(--color-brand-blue-atlas);
  width: var(--size-icon-toggle-arrow-horizontal-width);
}
```

## Adding Icons

Adding new icons to this repository requires a few steps.

1. Add a new icon `.svg` file to the `src/icons/` directory (see DOs and DON'Ts below)
1. Add **shape schema** to `./src/data/orion-icons.json` file (see example below)
1. Run `npm run build` to clear the repository of old build artifacts, build new artifacts and run tests
  1. You can run `npm run tests` to ensure that output artifacts meet specifications independently if needed
1. Submit pull request for approval

### Test new icon SVG code

Be sure to test your new SVG code. There is a template HTML file in this project. Please follow the directions below to copy the file and run a local server. DO NOT edit the template file.

From the root of the project, run:

```
$ cd validate
$ cp icons.template icons.html
$ npm run icoserve
```

Open the new `icons.html` file in your editor and you should be able to see the icon HTML at `http://localhost:9001/validate/icons.html`

### Icon shape schema

When adding new icons, be sure to follow this example to add the proper data to the `orion-icons.json` file

```js
{
  "icons": [
    {
      "title": "[icon title]",
      "color": "[Orion Design Token reference]",
      "width": "[Orion Design Token reference]",
      "style": "[Icon class name]"
    }
  ]
}
```

Example:

```js
{
  "icons": [
    {
      "title": "Arrow Up",
      "color": "val(--color-icon-toggle-arrow)",
      "width": "val(--size-icon-toggle-arrow-horizontal-width)",
      "style": "ico__toggleArrowHorizontal"
    }
  ]
}
```

**NEVER**: For `color` and `width` do not use hard-coded values. To be compliant you must use Orion Design Token references.

### Icon guide-lines

All new icon pull requests MUST comply with the following specifications. Any pull-request that does not follow these specifications will be considered non-compliant and will be rejected.

1. icon.svg file names must be camelCased, no spaces, dashes or underscores
1. SVG code should be the minimal code to render the SVG

#### DO

Reduce the SVG HTML to only the following attributes;

1. Add CSS class
1. Add `role="img"`
1. Add `aria-hidden="true"` for decorative icons
1. Add `aria-labelledby="[unique id]"`
1. Keep `viewBox`
1. Keep `xmlns`
1. Keep `xmlns:xlink`
1. Populate `<title>` element
1. Add id="[unique id]" to `<title>` tag referencing `aria-labelledby` unique id
1. Keep all necessary `<svg>` elements to render output
1. Reduce HTML to remove all spaces and returns

```html
<svg class="ico__toggleArrow" aria-hidden="true" aria-labelledby="icoArrowDown" role="img" viewBox="0 0 8 4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><title id="icoArrowDown">Arrow Down</title><g><polygon points="4 4 0 0 8 0"></polygon></g></svg>
```

#### DO NOT

Do not include unnecessary specifications, attributes, spaces and returns in the HTML

Never include the following:

1. xml version
1. `width` or `height` hard coded HTML attributes
1. Any auto generated comments
1. Description, unless title is unable to describe the intent of the SVG image/icon
1. Any IDs, stroke or fill attributes, unless required for the complexity of the SVG image/icon

```html
<?xml version="1.0" encoding="UTF-8"?>
<svg width="8px" height="4px" viewBox="0 0 8 4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 52.5 (67469) - http://www.bohemiancoding.com/sketch -->
    <title>Arrow Down</title>
    <desc>Created with Sketch.</desc>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Arrow-Down" fill="#0074C8">
            <polygon id="Path" points="4 4 0 0 8 0"></polygon>
        </g>
    </g>
</svg>
```

## npm API

The following scripts are available from `./package.json`

| script | Description |
|----|----|
| icoserve | opens dev test file in browser |
| svgTest | runs `jest` to ensure that `index.js` and `./data/orion-icons.json` are formatted correctly |
| jsonlint | validates that `./data/orion-icons.json` is correctly formatted JSON |
| svglint | validates all SVGs per spec `./.svglintrc.js`|
| test | runs jsonlint and svglint |
| changelog | builds new changelog document |
| concat | concatenates CHANGELOG.md with README.md |
| copySass | build step to copy resource |
| newbuild | to execute `./scripts/build.js` |


## Thanks!

This project was forked from, and inspired by [simple-icons](https://github.com/simple-icons). On the shoulder's of giants, open-source projects help and inspire us all to do better things!
