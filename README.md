# Auro Icon Library

The focus of this repository is to manage, at scale, the enterprise need for icons in the new Auro Design System and deprecate any legacy items. Please see all supporting documentation for contributing to, and consuming icons from this SVG icon library.

## Install

[![Build Status](https://img.shields.io/github/actions/workflow/status/AlaskaAirlines/Icons/testPublish.yml?branch=master&style=for-the-badge)](https://github.com/AlaskaAirlines/Icons/actions?query=workflow%3A%22Test+and+publish%22)
[![See it on NPM!](https://img.shields.io/npm/v/@alaskaairux/icons.svg?style=for-the-badge&color=orange)](https://www.npmjs.com/package/@alaskaairux/icons)
[![License](https://img.shields.io/npm/l/@alaskaairux/icons.svg?color=blue&style=for-the-badge)](https://www.apache.org/licenses/LICENSE-2.0)
![ESM supported](https://img.shields.io/badge/ESM-compatible-FFE900?style=for-the-badge)

```bash
$ npm i @alaskaairux/icons
```

## Icon categories

Icons fall into a series of use categories, these are:

| category | description |
|---|---|
| alert | Icons used specifically to alert users as to the state of awareness |
| in-flight | icons reserved for 'day of travel' user experiences |
| interface | Icons used to create interface enhancements |
| payment | Icons specifically to be used in a transaction flow |
| shop | icons for use with shopping experiences |
| social | Icons for use with social media |
| terminal | Icons related to terminal experiences |
| partnership | Icons related to business partnerships |
| programs | Icons related to Alaska Airlines programs |


## JavaScript framework support

When using other JavaScript development frameworks, the process above may not parse to HTML. To address this, there are a few techniques that could be used.

Within the npm, `@alaskaairux/icons/dist/icons/`, developers may access the SVGs directly for consumption into the development environment.

### JS versions of SVGs

This repo output two types of JS wrapped SVGs for easy inclusion with front-end frameworks.

#### ES5 style - iconName.js

**Note:** for icon SVGs, the ES5 `iconName.js` versions have been deprecated. Please update to the newly supported `iconName.mjs` file type. This currently does not apply to SVG logos or tails.

```javascript
module.exports={ ... }
```

#### ES6 style - iconName.mjs

**Note:** the `iconName_es6.js` file type is deprecated, be sure to update all references to `iconName.mjs`. This currently does not apply to SVG logos or tails.

```javascript
export default { ... }
```

### Lit-element

Lit-element requires the ES6 module export syntax for use, so an example dependency reference would be:

```js
import warning from '@alaskaairux/icons/dist/icons/alert/warning.mjs';
```

#### Non-directive use

Parsing out the SVG HTML to become DOM requires lines of code within the scope of the new custom element class, for example:

```javascript
constructor() {
  this.dom = new DOMParser().parseFromString(warning.svg, 'text/html');
  this.svg = this.dom.body.firstChild;
}
```

Now that the SVG DOM is assigned to the `this.svg` variable, rendering this within the HTML render() template could be like the following:

```html
<p>${this.svg}</p>
```

#### Directive use

In the head of your component file, import the [Lit Element directive](https://lit.dev/docs/templates/directives/#unsafesvg).

```js
// Lit2.0
import { unsafeSVG } from 'lit/directives/unsafe-svg.mjs';

// Legacy Lit Element
import { unsafeSVG } from 'lit-html/directives/unsafe-svg.mjs';
```

Import your icon SVG reference

```js
import warning from '@alaskaairux/icons/dist/icons/alert/warning.mjs';
```

Use in HTML template

```html
<p>${unsafeSVG(warning.svg)}</p>
```

### Web Component

The easiest use of Auro Icons is to use the auro-icon web component. See the following HTML with attribute API examples. See the  [Auro site](https://auro.alaskaair.com/components/auro/icon) for more details on use.

```html
<auro-icon category="" name="" [optional state]>[optional description]</auro-icon>
```

### React

React supports a standard for linking to assets and using them within the context of a component.

```javascript
import warning from '@alaskaairux/icons/dist/icons/alert/warning.svg';
```

Within the component's `render()` function, passing in the new variable into the `src` attribute of an `<img>` element will render the asset.

```html
<img src={warning} alt="warning" />
```

### SVG React Loader

Using `svg-react-loader` in combination with webpack will render the SVG inline from the designated resource location.

```javascript
import warning from '-!svg-react-loader!@alaskaairux/icons/dist/icons/alert/warning.svg';
```

Within the component's `render()` function, simply reference the new component that is generated via `svg-react-loader`.

```html
<warning />
```

With SVG React Loader, users are also able to over-ride attributes within the SVG. For example, the following code illustrates how a user could over-ride the `role="img"` and `aria-hidden="true"` attributes:

```html
<warning role="group" aria-hidden="false"/>
```

### Note: eslint support

The above syntax may cause issues with your eslint configurations. The following error may appear:

```bash
Unexpected '!' in '-!svg-react-loader?name=Icon!@alaskaairux/icons/dist/icons/alert/warning.svg'. Do not use import syntax to configure webpack loaders
```

In this event, adding the following comments within the component may address the issue:

```javascript
// eslint-disable-next-line import/no-webpack-loader-syntax
import Arrowdown from '-!svg-react-loader?name=Icon!@alaskaairux/icons/dist/icons/alert/warning.svg';
```

## Node application dependency

Via a node.js dependency or other node like dependency management architecture, a developer can choose from two different scenarios for the rendering of the SVG. This technique will render the SVG inline from the designated resource location.

### Individual icon request

It is suggested that developers list individual dependencies per UI component, like so:

```javascript
const arrowDown = require('@alaskaairux/icons/dist/icons/arrowdown');
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
const auroIcons = require('@alaskaairux/icons/dist');
```

Then within UI component, a developer can render a specific icon from the output array, like so:

```js
<button>Click Me ${auroIcons['Arrow Down'].svg}</button>
```

This will return the icon's SVG HTML inline.

### Altering the SVG output

Using either method, the SVG is captured as an object that can be manipulated. For example, calling the `arrow-down.js` file as shown below ...

```js
const arrowDown = require('@alaskaairux/icons/dist/icons/arrow-down');
```

... will output the following HTML

```html
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="ico_squareLarge" role="img" style="min-width:var(--auro-size-lg);height:var(--auro-size-lg);fill:currentColor" viewBox="0 0 24 24">
  <title>Directional pointer; down</title>
  <desc/>
  <path d="m11.47 19.78-5.25-5.25a.75.75 0 0 1 .976-1.133l.084.073 3.97 3.97V4.75a.75.75 0 0 1 .648-.743L12 4a.75.75 0 0 1 .743.648l.007.102v12.69l3.97-3.97a.75.75 0 0 1 .976-.073l.084.073a.75.75 0 0 1 .073.976l-.073.084-5.25 5.25a.75.75 0 0 1-.976.073l-.084-.073-5.25-5.25 5.25 5.25Z"/>
</svg>
```

Adding the following line of JavaScript will find and update the `aria-hidden` attribute in the `arrowDown.svg` string ...

```javascript
arrowDown.svg = arrowDown.svg.replace(/role="img"/g, `role="img" aria-hidden="true"`);
```

... and then output the following:

```html
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="ico_squareLarge" role="img" aria-hidden="true" style="min-width:var(--auro-size-lg);height:var(--auro-size-lg);fill:currentColor" viewBox="0 0 24 24">
  <title>Directional pointer; down</title>
  <desc/>
  <path d="m11.47 19.78-5.25-5.25a.75.75 0 0 1 .976-1.133l.084.073 3.97 3.97V4.75a.75.75 0 0 1 .648-.743L12 4a.75.75 0 0 1 .743.648l.007.102v12.69l3.97-3.97a.75.75 0 0 1 .976-.073l.084.073a.75.75 0 0 1 .073.976l-.073.084-5.25 5.25a.75.75 0 0 1-.976.073l-.084-.073-5.25-5.25 5.25 5.25Z"/>
</svg>
```

## Adding new icons

Adding new icons to this repository requires a few steps.

1. Node.js minimum version `20.x`
1. Add a new icon `.svg` file to the `src/icons/` directory (see Guidelines below)
1. If the icons are to retain designed color specs, please place the new icon in the `src/icons/fullColor` directory
1. Add **shape schema** to `./src/data/icons.json` file (see example below)
1. Submit pull request for approval

### Icon shape schema

When adding new icons, be sure to follow the example below to add the proper data to the `icons.json` file. Any attribute defined in the `"commonProperties"` object may be over-written in the individual `"icons"` object.

#### Default attributes for each SVG

| key | type | default | description |
|---|---|---|---|
| color | string | `currentcolor` | sets CSS property of `color` to `currentcolor` |
| height | string | `var(--auro-size-lg)` | sets CSS property of `height` to `var(--auro-size-lg)` |
| path | string | `/icons` | sets path for pre-build icon; icons that require full color spec, use `"path": "/icons/fullColor"` |
| role | string | `img` | sets aria role to `img` |
| style | string | `ico_squareLarge` | value is applied to SVG as CSS class attribute |
| viewbox | string | `0 0 24 24` | sets SVG attribute to default shape |
| width | string | `var(--auro-size-lg)` | sets CSS property of `width` to `var(--auro-size-lg)` |
| xmlns | string | `http://www.w3.org/2000/svg` | sets xmlns SVG attribute |
| xmlns_xlink | string | `http://www.w3.org/1999/xlink` | sets xmlns SVG attribute |

#### Required attributes for each SVG

| key | type | default | description |
|---|---|---|---|
| name | string |  | The name of the svg file |
| category | string |  | Defines categorical placement of the icon |
| title | string |  | The `<title>` element provides an accessible, short-text description of any SVG, may appear as a tool-tip in the browser; can be derived from the file name |

#### Optional attributes for each SVG

| key | type | default | description |
|---|---|---|---|
| desc | string |  | The `<desc>` element provides an accessible, long-text description of any SVG |

The `title` attribute is needed when you may want a simpler name than the file name. In the example data below, there is the `information-stroke.svg`, but the name `information-stroke` is meaningless if rendered to the browser. Updating the title to simply be `information` will address that.

#### Example data

```javascript
{
  "commonProperties":
  {
      "role": "img",
      "color": "currentColor",
      "title": "",
      "desc": "",
      "width": "var(--auro-size-lg)",
      "height": "var(--auro-size-lg)",
      "xmlns": "http://www.w3.org/2000/svg",
      "xmlns_xlink": "http://www.w3.org/1999/xlink",
      "viewBox": "0 0 24 24",
      "path": "/icons",
      "style": "ico_squareLarge",
      "type": "icon"
  },
  "icons": [
    {
      "name": "error",
      "title": "Error alert indicator",
      "category": "alert"
    },
    {
      "name": "information-stroke",
      "title": "Important information indicator",
      "category": "alert"
    },
  ]
}
```

**Discouraged**: For `color` and `width` do not use hard-coded values. To be compliant you must use Auro Design Token references.

### Test new icon SVG code

Once the new icon has been added to the icons directory and the icon data JSON file has been updated, run the following commands.

```
$ npm run generate
$ npm run serve
```

As update are made, simply run `$ npm run generate` to generate a new series of icons and rebuild the demo page.

### Publish static demo page

All the resources needed to deploy a static demo page are in the `./demo` directory.

### Icon guidelines

All new icon pull requests MUST comply with the following specifications. Any pull-request that does not follow these specifications will be considered non-compliant and will be rejected.

1. icon.svg file names must be camelCased, no spaces, dashes or underscores
1. SVG code should be the minimal code to render the SVG

#### DO

Please reduce the SVG HTML to only the following attributes. The build process will scrub away any unwanted attributes from the SVG file.

```html
<svg>
  <g>
    <polygon points="43.9886686 48 24 27.9721836 4.01133144 48 0 44.0611961 19.9886686 23.9666203 0.0679886686 3.93880389 4.14730878 0 24 19.961057 43.8526912 0 47.9320113 3.93880389 27.9433428 23.9666203 48 44.0611961"></polygon>
  </g>
</svg>
```

#### DO NOT

Please do not include unnecessary specifications, attributes, spaces and returns in the HTML as they will be scrubbed away in the build process. Anything not manually removed or scrubbed will fail the svglint tests.

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

## Thanks!

This project was forked from, and inspired by [simple-icons](https://github.com/simple-icons). On the shoulder's of giants, open-source projects help and inspire us all to do better things!
