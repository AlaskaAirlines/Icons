<img src="https://resource.alaskaair.net/-/media/2C1969F8FB244C919205CD48429C13AC" alt="Orion Design System Logo" title="Be the change you want to see" width="125" align="right" />

[![Build Status](https://travis-ci.org/AlaskaAirlines/OrionIcons.svg?branch=master)](https://travis-ci.org/AlaskaAirlines/OrionDesignTokens)
![npm (scoped)](https://img.shields.io/npm/v/@alaskaairux/orion-icons.svg?color=orange)
![NPM](https://img.shields.io/npm/l/@alaskaairux/orion-icons.svg?color=blue)

# Orion SVG Icon Library

The focus of this repository is to manage, at scale, the enterprise need for icons in the Orion Design System. Please see all supporting documentation for contributing to, and consuming icons from the Orion SVG Icon Library.

## Supported icons

All currently supported icons are located in the `icons/` directory.

## Install

```bash
$ npm i @alaskaairux/orion-icons
```

## Node application dependency

Via a node.js dependency or other node like dependency management architecture, developer can choose from two different scenarios for the rendering of the SVG. This technique will render the SVG inline from the designated resource location.

### Individual icon request

It is suggested that developers list individual dependencies per UI component, like so:

```javascript
const arrowDown = require('@alaskaairux/orion-icons/dist/icons/arrowdown');
```

Within the UI component a developer can reference the object assigned to the newly created variable to get the specific icon's SVG code:

```javascript
<button>Click Me ${arrowDown.svg}</button>
```

This will return the icon's SVG HTML inline.

### Full library dependency

If there are several icons within a view, developers may opt to include all available icons. **Be aware**, as this npm grows, so will this type of dependency. It's strongly suggested that dependencies are individually declared.

To require the full library as a dependency of the UI, do the following:

```javascript
const orionIcons = require('@alaskaairux/orion-icons/dist');
```

Then within UI component, a developer can render a specific icon from the output array, like so:

```javascript
<button>Click Me ${orionIcons['Arrow Down'].svg}</button>
```

This will return the icon's SVG HTML inline.

### Altering the SVG output

Using either method, the SVG is captured as an object that can be manipulated. For example, calling the `arrowdown.js` file as shown below ...

```javascript
const arrowDown = require('@alaskaairux/orion-icons/dist/icons/arrowdown');
```

... will output the following HTML

```html
<svg role="img" aria-hidden="true" style="width: var(--size-icon-toggle-arrow-horizontal-width);  fill: var(--color-icon-toggle-arrow)" class="ico__toggleArrowHorizontal" viewBox="0 0 8 4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Arrow Down</title>
  <g>
    <polygon points="4 4 0 0 8 0"></polygon>
  </g>
</svg>
```

Adding the following line of JavaScript will find and replace the `aria-hidden` attribute in the `arrowDown.svg` string ...

```javascript
arrowDown.svg = arrowDown.svg.replace(/aria-hidden="true"/g, `aria-hidden="false"`);
```

... and then output the following: 

```html
<svg role="img" aria-hidden="false" style="width: var(--size-icon-toggle-arrow-horizontal-width);  fill: var(--color-icon-toggle-arrow)" class="ico__toggleArrowHorizontal" viewBox="0 0 8 4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Arrow Down</title>
  <g>
    <polygon points="4 4 0 0 8 0"></polygon>
  </g>
</svg>
```

## JavaScript framework support

When using other JavaScript development frameworks, the process above may not parse to HTML. To address this, there are a few techniques that could be used.

Within the npm, `@alaskaairux/orion-icons/dist/icons/`, developers may access the SVGs directly for consumption into the development environment.

### React

React supports a standard for linking to assets and using them within the context of a component.

```javascript
import arrowup from '@alaskaairux/orion-icons/dist/icons/arrowup.svg';
```

Within the component's `render()` function, passing in the new variable into the `src` attribute of an `<img>` element will render the asset.

```html
<img src={arrowup} alt="arrow up" />
```

### SVG React Loader

Using `svg-react-loader` in combination with webpack will render the SVG inline from the designated resource location.

```javascript
import Arrowdown from '-!svg-react-loader!@alaskaairux/orion-icons/dist/icons/arrowdown.svg';
```

Within the component's `render()` function, simply reference the new component that is generated via `svg-react-loader`.

```html
<Arrowdown />
```

With SVG React Loader, users are also able to over-ride attributes within the SVG. For example, the following code illustrates how a user could over-ride the `role="img"` and `aria-hidden="true"` attributes:

```html
<Arrowdown role="group" aria-hidden="false"/>
```

##### Note: 

The above syntax may cause issues with your eslint configurations. The following error may appear:

```bash
Unexpected '!' in '-!svg-react-loader?name=Icon!@alaskaairux/orion-icons/dist/icons/arrowdown.svg'. Do not use import syntax to configure webpack loaders
```

In this event, adding the following comments within the component may address the issue:

```javascript
// eslint-disable-next-line import/no-webpack-loader-syntax
import Arrowdown from '-!svg-react-loader?name=Icon!@alaskaairux/orion-icons/dist/icons/arrowdown.svg';
```

### Angular SVG Icon

For use with Angular projects, `angular-svg-icon` renders a component that will render the SVG inline from the designated resource location.

See [angular-svg-icon](https://www.npmjs.com/package/angular-svg-icon) for more information.


## Icon styles

Embedded with each SVG file are the default styles for that icon. These styles are leveraging CSS Custom Properties, installing Design Tokens or referencing the tokens via the CSS in the package is required. See example icon SVG below.

```html
<svg style="width: var(--size-icon-toggle-arrow-horizontal-width);  fill: var(--color-icon-toggle-arrow)" class="ico__toggleArrowHorizontal" aria-hidden="false" role="img" viewBox="0 0 8 4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Arrow Down</title>
  <g>
    <polygon points="4 4 0 0 8 0"></polygon>
  </g>
</svg>
```

If the user support matrix requires support for browsers that do not support CSS Custom Properties, see the fallback Sass solution below. 


### Using Sass styles

In the `dist/` directory is `orion-icons.scss`. Import this Sass file for default shape styles.

```scss
@import '@alaskaairux/orion-icons/dist/orion-icons';
```

Within React, Sass requires a `~` character prior to the importing library, example:

```scss
@import '~@alaskaairux/orion-icons/dist/orion-icons';
```

By default, no CSS classes are created when importing this file. To opt-in to the icon styles needed, add a config variable map that will set a flag to `true` to output the classes needed. See the following example:

```scss
$iconMap: (
  toggleArrowHorizontal: true,
  toggleArrowVertical: true
);
```

The use of `orion-icons.scss` has a dependency on the Sass version of Orion Design Tokens, so a typical Sass file may look like the following: 

```scss
@import "~@alaskaairux/orion-design-tokens/tokens/TokenVariables";    <= Sass variables
@import "~@alaskaairux/orion-design-tokens/tokens/TokenProperties";   <= CSS Custom Properties 

// The following map will override the default settings inside orion-icons.scss
$iconMap: (
  toggleArrowHorizontal: true
);

// Output the requested selectors 
@import '~@alaskaairux/orion-icons/dist/orion-icons';
```

This will produce the CSS Custom Properties needed to produce the UI, as well provide a CSS fallback for browsers that do not support CSS Custom Properties. 

### Building CSS in JS

If you prefer to build your CSS in the JS component itself, this is supported in the exported icon object js file. There is a dependency to output CSS Custom Properties from the Orion Design Tokens. See the [Orion Design Token documentation](https://github.com/AlaskaAirlines/OrionIcons#building-css-in-js) to support this process.

Example:

```javascript
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
1. Submit pull request for approval

### Test new icon SVG code

Be sure to test your new SVG code. There is a template HTML file in this project. Please follow the directions below to copy the file and run a local server. DO NOT edit the template file.

From the root of the project, run:

```bash
$ cd validate
$ cp icons.template icons.html
$ npm run icoserve
```

Open the new `icons.html` file in your editor and you should be able to see the icon HTML at `http://localhost:9001/validate/icons.html`

### Icon shape schema

When adding new icons, be sure to follow this example to add the proper data to the `orion-icons.json` file

```javascript
{
  "icons": [
    {
      "title": "[icon title]",
      "hidden": "true",
      "role": "img",
      "color": "[Orion Design Token reference]",
      "width": "[Orion Design Token reference]",
      "style": "[Icon class name]"
    }
  ]
}
```

Example:

```javascript
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

1. Keep `viewBox`
1. Keep `xmlns`
1. Keep `xmlns:xlink`
1. Set `<title>` specifically to `<title>iconTitle</title>`
1. Keep all necessary `<svg>` elements to render output

```html
<svg viewBox="0 0 8 4" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>iconTitle</title>
  <g>
    <polygon points="4 4 0 0 8 0"></polygon>
  </g>
</svg>
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
